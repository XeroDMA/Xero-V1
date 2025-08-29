import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../lib/auth.js"
import pool from "../../../../lib/db.js"
import bcrypt from "bcryptjs"

export async function GET(request, { params }) {
  try {
    const [rows] = await pool.execute(
      `SELECT g.*, u.name as author_name 
       FROM guides g 
       JOIN users u ON g.author_id = u.id 
       WHERE g.id = ? AND g.status = 'published'`,
      [params.id],
    )

    if (rows.length === 0) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 })
    }

    const guide = rows[0]

    // Increment view count
    await pool.execute("UPDATE guides SET views = views + 1 WHERE id = ?", [params.id])

    return NextResponse.json(guide)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch guide" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { title, description, category, isPasswordProtected, password } = await request.json()

    let hashedPassword = null
    if (isPasswordProtected && password) {
      hashedPassword = await bcrypt.hash(password, 12)
    }

    await pool.execute(
      `UPDATE guides 
       SET title = ?, description = ?, category = ?, is_password_protected = ?, password = ?, last_modified = CURRENT_TIMESTAMP
       WHERE id = ? AND author_id = ?`,
      [title, description, category, isPasswordProtected, hashedPassword, params.id, session.user.id],
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update guide" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await pool.execute("DELETE FROM guides WHERE id = ? AND author_id = ?", [params.id, session.user.id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete guide" }, { status: 500 })
  }
}
