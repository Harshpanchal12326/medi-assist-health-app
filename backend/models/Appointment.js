import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  appointmentDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  reason: String,
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
  notes: String,
  reminder: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Appointment", appointmentSchema)
