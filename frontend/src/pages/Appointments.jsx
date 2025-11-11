"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/appointments.css"

function Appointments({ userId }) {
  const [appointments, setAppointments] = useState([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [userId])

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`http://localhost:5000/api/appointments/patient/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setAppointments(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching appointments:", error)
      setLoading(false)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.put(
        `http://localhost:5000/api/appointments/${appointmentId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      alert("Appointment cancelled")
      fetchAppointments()
    } catch (error) {
      alert("Error cancelling appointment")
    }
  }

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "upcoming") return apt.status === "scheduled"
    if (filter === "completed") return apt.status === "completed"
    if (filter === "cancelled") return apt.status === "cancelled"
    return true
  })

  return (
    <div className="appointments-container">
      <h1>My Appointments</h1>

      <div className="appointment-filters">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          All Appointments
        </button>
        <button className={`filter-btn ${filter === "upcoming" ? "active" : ""}`} onClick={() => setFilter("upcoming")}>
          Upcoming
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`filter-btn ${filter === "cancelled" ? "active" : ""}`}
          onClick={() => setFilter("cancelled")}
        >
          Cancelled
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading appointments...</div>
      ) : filteredAppointments.length > 0 ? (
        <div className="appointments-list">
          {filteredAppointments.map((apt) => (
            <div key={apt._id} className="appointment-item">
              <div className="apt-content">
                <h3>{apt.doctorId?.userId?.name}</h3>
                <p className="specialization">{apt.doctorId?.specialization}</p>
                <p className="date-time">
                  📅 {new Date(apt.appointmentDate).toLocaleDateString()} at {apt.timeSlot}
                </p>
                <p className="reason">Reason: {apt.reason}</p>
                <span className={`status ${apt.status}`}>{apt.status}</span>
              </div>
              {apt.status === "scheduled" && (
                <button className="btn-cancel" onClick={() => cancelAppointment(apt._id)}>
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-appointments">No appointments found</p>
      )}
    </div>
  )
}

export default Appointments
