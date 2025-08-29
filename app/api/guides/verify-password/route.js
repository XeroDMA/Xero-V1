import { NextResponse } from "next/server"
import pool from "../../../../lib/db.js"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    const { guideId, password } = await request.json()

    const [rows] = await pool.execute("SELECT password FROM guides WHERE id = ? AND is_password_protected = TRUE", [
      guideId,
    ])

    if (rows.length === 0) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 })
    }

    const guide = rows[0]
    const isValid = await bcrypt.compare(password, guide.password)

    return NextResponse.json({ valid: isValid })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to verify password" }, { status: 500 })
  }
}
