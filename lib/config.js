// Environment configuration helper
export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },

  // NextAuth
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
  },

  // File uploads
  uploads: {
    directory: process.env.UPLOAD_DIR || "./uploads",
    maxSize: process.env.MAX_FILE_SIZE || "100MB",
    allowedTypes: process.env.ALLOWED_FILE_TYPES?.split(",") || [".exe", ".zip", ".rar", ".7z", ".pdf", ".txt", ".md"],
  },

  // Downloads
  downloads: {
    baseUrl: process.env.DOWNLOAD_BASE_URL,
    expirationHours: Number.parseInt(process.env.LINK_EXPIRATION_HOURS || "168"),
  },

  // Security
  security: {
    corsOrigins: process.env.CORS_ORIGINS?.split(",") || [],
    rateLimitRequests: Number.parseInt(process.env.RATE_LIMIT_REQUESTS || "100"),
  },

  // Defaults
  defaults: {
    adminUsername: process.env.DEFAULT_ADMIN_USERNAME || "admin",
    adminPassword: process.env.DEFAULT_ADMIN_PASSWORD || "admin123",
    guidePassword: process.env.DEFAULT_GUIDE_PASSWORD || "xerodma2024",
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || "info",
    file: process.env.LOG_FILE || "./logs/app.log",
  },
}
