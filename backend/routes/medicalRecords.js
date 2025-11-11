import express from "express"
import MedicalRecord from "../models/MedicalRecord.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

// Upload medical record
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { recordType, title, description, fileUrl, prescription, testResults } = req.body

    const record = new MedicalRecord({
      patientId: req.userId,
      recordType,
      title,
      description,
      fileUrl,
      prescription,
      testResults,
    })

    await record.save()
    res.status(201).json({ message: "Medical record saved", record })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get patient medical records
router.get("/:patientId", authMiddleware, async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patientId: req.params.patientId }).sort({ createdAt: -1 })
    res.json(records)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

export default router
