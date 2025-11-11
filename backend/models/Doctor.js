import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  qualifications: [String],
  hospital: String,
  consultationFee: { type: Number, required: true },
  availableSlots: [
    {
      day: String,
      startTime: String,
      endTime: String,
    },
  ],
  bio: String,
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Doctor", doctorSchema)
