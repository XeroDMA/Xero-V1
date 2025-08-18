const express = require("express")
const bcrypt = require("bcrypt")
const { body, validationResult } = require("express-validator")
const db = require("../database/connection")
const { requireAuth } = require("../middleware/auth")
const router = express.Router()

// Get all guides (public)
router.get("/", async (req, res) => {
  try {
    const guides = await db.query(`
      SELECT id, title, description, category, created_at, updated_at, 
             CASE WHEN password_hash IS NOT NULL THEN true ELSE false END as is_protected
      FROM guides 
      WHERE status = 'published' 
      ORDER BY created_at DESC
    `)

    res.json(guides)
  } catch (error) {
    console.error("Get guides error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get guide content (with password check if needed)
router.post("/:id/access", async (req, res) => {
  try {
    const { id } = req.params
    const { password } = req.body

    const guide = await db.query('SELECT * FROM guides WHERE id = ? AND status = "published"', [id])

    if (!guide.length) {
      return res.status(404).json({ error: "Guide not found" })
    }

    const guideRecord = guide[0]

    // Check password if guide is protected
    if (guideRecord.password_hash) {
      if (!password) {
        return res.status(401).json({ error: "Password required" })
      }

      const isValidPassword = await bcrypt.compare(password, guideRecord.password_hash)
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid password" })
      }
    }

    // Update view count
    await db.query("UPDATE guides SET view_count = view_count + 1 WHERE id = ?", [id])

    res.json({
      id: guideRecord.id,
      title: guideRecord.title,
      content: guideRecord.content,
      category: guideRecord.category,
      created_at: guideRecord.created_at,
      updated_at: guideRecord.updated_at,
    })
  } catch (error) {
    console.error("Access guide error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Staff routes - Get all guides for management
router.get("/manage", requireAuth, async (req, res) => {
  try {
    const guides = await db.query(`
      SELECT g.*, u.username as created_by_name,
             CASE WHEN g.password_hash IS NOT NULL THEN true ELSE false END as is_protected
      FROM guides g 
      LEFT JOIN staff_users u ON g.created_by = u.id 
      ORDER BY g.created_at DESC
    `)

    res.json(guides)
  } catch (error) {
    console.error("Get manage guides error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Create guide
router.post(
  "/manage",
  requireAuth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { title, content, description, category, password, status = "draft" } = req.body

      let passwordHash = null
      if (password) {
        passwordHash = await bcrypt.hash(password, 10)
      }

      const result = await db.query(
        `
      INSERT INTO guides (title, content, description, category, password_hash, status, created_by) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
        [title, content, description, category, passwordHash, status, req.session.userId],
      )

      // Log activity
      await db.query("INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)", [
        req.session.userId,
        "guide_create",
        `Created guide: ${title}`,
      ])

      res.json({ success: true, id: result.insertId })
    } catch (error) {
      console.error("Create guide error:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  },
)

// Update guide
router.put("/manage/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, description, category, password, status } = req.body

    let passwordHash = null
    if (password) {
      passwordHash = await bcrypt.hash(password, 10)
    }

    await db.query(
      `
      UPDATE guides 
      SET title = ?, content = ?, description = ?, category = ?, 
          password_hash = ?, status = ?, updated_at = NOW()
      WHERE id = ?
    `,
      [title, content, description, category, passwordHash, status, id],
    )

    // Log activity
    await db.query("INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)", [
      req.session.userId,
      "guide_update",
      `Updated guide: ${title}`,
    ])

    res.json({ success: true })
  } catch (error) {
    console.error("Update guide error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Delete guide
router.delete("/manage/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params

    const guide = await db.query("SELECT title FROM guides WHERE id = ?", [id])

    if (!guide.length) {
      return res.status(404).json({ error: "Guide not found" })
    }

    await db.query("DELETE FROM guides WHERE id = ?", [id])

    // Log activity
    await db.query("INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)", [
      req.session.userId,
      "guide_delete",
      `Deleted guide: ${guide[0].title}`,
    ])

    res.json({ success: true })
  } catch (error) {
    console.error("Delete guide error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
