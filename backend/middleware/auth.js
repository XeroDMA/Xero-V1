const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" })
  }
  next()
}

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Authentication required" })
    }

    if (req.session.role !== role && req.session.role !== "admin") {
      return res.status(403).json({ error: "Insufficient permissions" })
    }

    next()
  }
}

module.exports = {
  requireAuth,
  requireRole,
}
