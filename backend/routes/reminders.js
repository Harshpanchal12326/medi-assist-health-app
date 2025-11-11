import express from "express"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

// Send reminder
router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { email, appointmentDate, doctorName } = req.body

    // EmailJS integration would go here
    console.log(`Reminder sent to ${email} for appointment on ${appointmentDate} with ${doctorName}`)

    res.json({ message: "Reminder sent successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export default router
