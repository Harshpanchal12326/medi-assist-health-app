import express from "express"
import Doctor from "../models/Doctor.js"
import { authMiddleware, doctorOnly } from "../middleware/auth.js"

const router = express.Router()

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userId", "name email phone")
    res.json(doctors)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Get doctor by specialization
router.get("/specialization/:specialization", async (req, res) => {
  try {
    const doctors = await Doctor.find({ specialization: req.params.specialization }).populate(
      "userId",
      "name email phone",
    )
    res.json(doctors)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Create doctor profile
router.post("/", authMiddleware, doctorOnly, async (req, res) => {
  try {
    const { specialization, experience, qualifications, hospital, consultationFee, availableSlots, bio } = req.body

    const doctor = new Doctor({
      userId: req.userId,
      specialization,
      experience,
      qualifications,
      hospital,
      consultationFee,
      availableSlots,
      bio,
    })

    await doctor.save()
    res.status(201).json({ message: "Doctor profile created", doctor })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export default router
