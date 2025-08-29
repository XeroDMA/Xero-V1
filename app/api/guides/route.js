import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/auth.js"
import pool from "../../../lib/db.js"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const [rows] = await pool.execute(`
      SELECT g.*, u.name as author_name 
      FROM guides g 
      JOIN users u ON g.author_id = u.id 
      WHERE g.status = 'published'
      ORDER BY g.created_date DESC
    `)

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch guides" }, { status: 500 })
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { title, description, category, isPasswordProtected, password } = await request.json()

    const guideId = `guide_${Date.now()}`
    let hashedPassword = null

    if (isPasswordProtected && password) {
      hashedPassword = await bcrypt.hash(password, 12)
    }

    await pool.execute(
      `INSERT INTO guides (id, title, description, category, is_password_protected, password, author_id, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'published')`,
      [guideId, title, description, category, isPasswordProtected, hashedPassword, session.user.id],
    )

    return NextResponse.json({ success: true, id: guideId })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create guide" }, { status: 500 })
  }
}
