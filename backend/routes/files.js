const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs").promises
const crypto = require("crypto")
const { body, validationResult } = require("express-validator")
const db = require("../database/connection")
const { requireAuth } = require("../middleware/auth")
const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    // Add file type restrictions if needed
    cb(null, true)
  },
})

// Get all files
router.get("/", requireAuth, async (req, res) => {
  try {
    const files = await db.query(`
      SELECT f.*, u.username as uploaded_by_name 
      FROM files f 
      LEFT JOIN staff_users u ON f.uploaded_by = u.id 
      ORDER BY f.created_at DESC
    `)

    res.json(files)
  } catch (error) {
    console.error("Get files error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Upload file
router.post("/upload", requireAuth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const { originalname, filename, size, mimetype } = req.file
    const { product_name, access_key } = req.body

    // Generate unique download link
    const downloadToken = crypto.randomBytes(32).toString("hex")
    const downloadUrl = `${process.env.DOMAIN || req.get("host")}/api/files/download/${downloadToken}`

    // Save file info to database
    const result = await db.query(
      `
      INSERT INTO files (original_name, file_name, file_size, mime_type, product_name, 
                        access_key, download_token, download_url, uploaded_by, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
    `,
      [
        originalname,
        filename,
        size,
        mimetype,
        product_name,
        access_key,
        downloadToken,
        downloadUrl,
        req.session.userId,
      ],
    )

    // Log activity
    await db.query("INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)", [
      req.session.userId,
      "file_upload",
      `Uploaded file: ${originalname}`,
    ])

    res.json({
      success: true,
      file: {
        id: result.insertId,
        original_name: originalname,
        product_name,
        download_url: downloadUrl,
        access_key,
        status: "active",
      },
    })
  } catch (error) {
    console.error("Upload error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Download file
router.get("/download/:token", async (req, res) => {
  try {
    const { token } = req.params
    const { key } = req.query

    const file = await db.query('SELECT * FROM files WHERE download_token = ? AND status = "active"', [token])

    if (!file.length) {
      return res.status(404).json({ error: "File not found" })
    }

    const fileRecord = file[0]

    // Check access key if required
    if (fileRecord.access_key && fileRecord.access_key !== key) {
      return res.status(403).json({ error: "Invalid access key" })
    }

    const filePath = path.join(__dirname, "../uploads", fileRecord.file_name)

    // Update download count
    await db.query("UPDATE files SET download_count = download_count + 1, last_downloaded = NOW() WHERE id = ?", [
      fileRecord.id,
    ])

    // Log download
    await db.query("INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)", [
      null,
      "file_download",
      `Downloaded file: ${fileRecord.original_name} (Token: ${token})`,
    ])

    res.download(filePath, fileRecord.original_name)
  } catch (error) {
    console.error("Download error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Delete file
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params

    const file = await db.query("SELECT * FROM files WHERE id = ?", [id])

    if (!file.length) {
      return res.status(404).json({ error: "File not found" })
    }

    // Delete physical file
    const filePath = path.join(__dirname, "../uploads", file[0].file_name)
    try {
      await fs.unlink(filePath)
    } catch (err) {
      console.error("Error deleting physical file:", err)
    }

    // Delete from database
    await db.query("DELETE FROM files WHERE id = ?", [id])

    // Log activity
    await db.query("INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)", [
      req.session.userId,
      "file_delete",
      `Deleted file: ${file[0].original_name}`,
    ])

    res.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
