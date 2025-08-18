const express = require("express")
const cors = require("cors")
const session = require("express-session")
const multer = require("multer")
const path = require("path")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const fileRoutes = require("./routes/files")
const guideRoutes = require("./routes/guides")

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "xerodma-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
)

// Static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/files", fileRoutes)
app.use("/api/guides", guideRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "XERODMA Backend Server Running" })
})

app.listen(PORT, () => {
  console.log(`XERODMA Backend Server running on port ${PORT}`)
})
