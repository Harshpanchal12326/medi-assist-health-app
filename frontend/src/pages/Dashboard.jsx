"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "../styles/dashboard.css"

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    upcomingAppointments: 0,
    completedAppointments: 0,
    medicalRecords: 0,
  })
  const [recentAppointments, setRecentAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [user?.id])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token")
      const [aptResponse, recordsResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/appointments/patient/${user?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://localhost:5000/api/medical-records/${user?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      const appointments = aptResponse.data || []
      const records = recordsResponse.data || []

      setStats({
        upcomingAppointments: appointments.filter((a) => a.status === "scheduled").length,
        completedAppointments: appointments.filter((a) => a.status === "completed").length,
        medicalRecords: records.length,
      })

      setRecentAppointments(appointments.slice(0, 3))
      setLoading(false)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setLoading(false)
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <p>Your personal health management hub</p>
      </div>

      {loading ? (
        <div className="loading">Loading dashboard...</div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card upcoming">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <p className="stat-label">Upcoming Appointments</p>
                <p className="stat-number">{stats.upcomingAppointments}</p>
              </div>
              <Link to="/appointments" className="stat-link">
                View All
              </Link>
            </div>

            <div className="stat-card completed">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <p className="stat-label">Completed Visits</p>
                <p className="stat-number">{stats.completedAppointments}</p>
              </div>
              <Link to="/appointments" className="stat-link">
                View All
              </Link>
            </div>

            <div className="stat-card records">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <p className="stat-label">Medical Records</p>
                <p className="stat-number">{stats.medicalRecords}</p>
              </div>
              <Link to="/medical-records" className="stat-link">
                View All
              </Link>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Upcoming Appointments</h2>
              <Link to="/appointments" className="view-all">
                View All →
              </Link>
            </div>
            {recentAppointments.length > 0 ? (
              <div className="recent-appointments">
                {recentAppointments
                  .filter((a) => a.status === "scheduled")
                  .map((apt) => (
                    <div key={apt._id} className="appointment-preview">
                      <div className="apt-preview-content">
                        <h4>{apt.doctorId?.userId?.name}</h4>
                        <p className="specialist">{apt.doctorId?.specialization}</p>
                        <p className="datetime">
                          📅 {new Date(apt.appointmentDate).toLocaleDateString()} at {apt.timeSlot}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="empty-state">
                No upcoming appointments. <Link to="/doctors">Book one now</Link>
              </p>
            )}
          </div>

          <div className="dashboard-actions">
            <Link to="/doctors" className="action-button find-doctors">
              <span className="action-icon">🔍</span>
              <span>Find Doctors</span>
            </Link>
            <Link to="/medical-records" className="action-button records">
              <span className="action-icon">📄</span>
              <span>Medical Records</span>
            </Link>
            <Link to="/appointments" className="action-button appointments">
              <span className="action-icon">🗓️</span>
              <span>Appointments</span>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
