const mysql = require("mysql2/promise")
const fs = require("fs").promises
const path = require("path")
require("dotenv").config()

async function setupDatabase() {
  try {
    console.log("Setting up XERODMA database...")

    // Create connection without database first
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    })

    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "xerodma_staff"}`)
    await connection.execute(`USE ${process.env.DB_NAME || "xerodma_staff"}`)

    // Read and execute schema
    const schemaPath = path.join(__dirname, "../database/schema.sql")
    const schema = await fs.readFile(schemaPath, "utf8")

    const statements = schema.split(";").filter((stmt) => stmt.trim())

    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement)
      }
    }

    // Create uploads directory
    const uploadsDir = path.join(__dirname, "../uploads")
    try {
      await fs.mkdir(uploadsDir, { recursive: true })
      console.log("Created uploads directory")
    } catch (err) {
      if (err.code !== "EEXIST") {
        throw err
      }
    }

    await connection.end()
    console.log("Database setup completed successfully!")
    console.log("Default admin credentials: admin / admin123")
  } catch (error) {
    console.error("Setup failed:", error)
    process.exit(1)
  }
}

setupDatabase()
