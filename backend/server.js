import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import doctorRoutes from "./routes/doctors.js"
import appointmentRoutes from "./routes/appointments.js"
import medicalRecordRoutes from "./routes/medicalRecords.js"
import reminderRoutes from "./routes/reminders.js"

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mediassist")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/doctors", doctorRoutes)
app.use("/api/appointments", appointmentRoutes)
app.use("/api/medical-records", medicalRecordRoutes)
app.use("/api/reminders", reminderRoutes)

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
