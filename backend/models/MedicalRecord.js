import mongoose from "mongoose"

const medicalRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recordType: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  fileUrl: String,
  prescription: {
    medicines: [{ name: String, dosage: String, duration: String }],
    doctor: String,
    date: Date,
  },
  testResults: {
    testName: String,
    result: String,
    date: Date,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model("MedicalRecord", medicalRecordSchema)
