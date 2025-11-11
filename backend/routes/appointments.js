import express from "express"
import Appointment from "../models/Appointment.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

// Book appointment
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot, reason } = req.body

    const appointment = new Appointment({
      patientId: req.userId,
      doctorId,
      appointmentDate,
      timeSlot,
      reason,
    })

    await appointment.save()
    res.status(201).json({ message: "Appointment booked", appointment })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get patient appointments
router.get("/patient/:patientId", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.params.patientId })
      .populate("doctorId")
      .sort({ appointmentDate: 1 })
    res.json(appointments)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Cancel appointment
router.put("/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: "cancelled" }, { new: true })
    res.json({ message: "Appointment cancelled", appointment })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
