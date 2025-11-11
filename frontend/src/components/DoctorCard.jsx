"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/doctor-card.css"

function DoctorCard({ doctor }) {
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleBook = async () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select date and time slot")
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId: doctor._id,
          appointmentDate: selectedDate,
          timeSlot: selectedSlot,
          reason: reason,
        }),
      })
      alert("Appointment booked successfully!")
      setShowModal(false)
      navigate("/appointments")
    } catch (error) {
      alert("Error booking appointment")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="doctor-card">
        <div className="doctor-card-image">
          <img src="/doctor-portrait.jpg" alt={doctor.userId?.name} />
        </div>
        <div className="doctor-card-content">
          <h3>{doctor.userId?.name}</h3>
          <p className="specialization">{doctor.specialization}</p>
          <p className="experience">{doctor.experience} years experience</p>
          <div className="rating">
            <span className="stars">⭐ {doctor.rating || "4.5"}</span>
            <span className="reviews">({doctor.totalReviews || "150"} reviews)</span>
          </div>
          <p className="fee">Consultation Fee: ₹{doctor.consultationFee}</p>
          <button className="btn-book" onClick={() => setShowModal(true)}>
            Book Appointment
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Book Appointment with {doctor.userId?.name}</h2>
            <div className="booking-form">
              <div className="form-group">
                <label>Select Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="form-group">
                <label>Select Time Slot:</label>
                <div className="time-slots">
                  {["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"].map((slot) => (
                    <button
                      key={slot}
                      className={`time-slot ${selectedSlot === slot ? "selected" : ""}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Reason for Visit:</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Brief description of your symptoms or reason"
                />
              </div>
              <div className="modal-actions">
                <button className="btn-primary" onClick={handleBook} disabled={loading}>
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
                <button className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DoctorCard
