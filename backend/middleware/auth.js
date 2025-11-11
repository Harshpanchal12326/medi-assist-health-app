import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret")
    req.userId = decoded.userId
    req.userRole = decoded.role
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}

export const patientOnly = (req, res, next) => {
  if (req.userRole !== "patient") {
    return res.status(403).json({ message: "Access denied" })
  }
  next()
}

export const doctorOnly = (req, res, next) => {
  if (req.userRole !== "doctor") {
    return res.status(403).json({ message: "Access denied" })
  }
  next()
}
