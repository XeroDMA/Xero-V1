const express = require("express")
const bcrypt = require("bcrypt")
const { body, validationResult } = require("express-validator")
const db = require("../database/connection")
const router = express.Router()

// Staff login
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { username, password } = req.body

      // Query staff user from database
      const user = await db.query("SELECT * FROM staff_users WHERE username = ?", [username])

      if (!user.length) {
        return res.status(401).json({ error: "Invalid credentials" })
      }

      const isValidPassword = await bcrypt.compare(password, user[0].password_hash)

      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" })
      }

      // Set session
      req.session.userId = user[0].id
      req.session.username = user[0].username
      req.session.role = user[0].role

      // Log login activity
      await db.query("INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)", [
        user[0].id,
        "login",
        `Staff login from ${req.ip}`,
      ])

      res.json({
        success: true,
        user: {
          id: user[0].id,
          username: user[0].username,
          role: user[0].role,
        },
      })
    } catch (error) {
      console.error("Login error:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  },
)

// Check session
router.get("/session", (req, res) => {
  if (req.session.userId) {
    res.json({
      authenticated: true,
      user: {
        id: req.session.userId,
        username: req.session.username,
        role: req.session.role,
      },
    })
  } else {
    res.json({ authenticated: false })
  }
})

// Logout
router.post("/logout", async (req, res) => {
  try {
    if (req.session.userId) {
      // Log logout activity
      await db.query("INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)", [
        req.session.userId,
        "logout",
        `Staff logout from ${req.ip}`,
      ])
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Could not log out" })
      }
      res.json({ success: true })
    })
  } catch (error) {
    console.error("Logout error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
