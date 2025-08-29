import bcrypt from "bcryptjs"
import pool from "./db.js"

export async function verifyUser(username, password) {
  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE username = ?", [username])

    if (rows.length === 0) {
      return null
    }

    const user = rows[0]
    const isValid = await bcrypt.compare(password, user.password)

    if (isValid) {
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      }
    }

    return null
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}

export async function getUserById(id) {
  try {
    const [rows] = await pool.execute("SELECT id, username, name, role FROM users WHERE id = ?", [id])

    return rows.length > 0 ? rows[0] : null
  } catch (error) {
    console.error("Database error:", error)
    return null
  }
}
