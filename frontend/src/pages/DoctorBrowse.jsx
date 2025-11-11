"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import DoctorCard from "../components/DoctorCard"
import "../styles/doctor-browse.css"

function DoctorBrowse() {
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [selectedSpec, setSelectedSpec] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors")
      setDoctors(response.data)
      setFilteredDoctors(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching doctors:", error)
      setLoading(false)
    }
  }

  const filterBySpecialization = (spec) => {
    setSelectedSpec(spec)
    if (spec === "All") {
      setFilteredDoctors(doctors)
    } else {
      setFilteredDoctors(doctors.filter((d) => d.specialization === spec))
    }
  }

  const specializations = ["All", ...new Set(doctors.map((d) => d.specialization))]

  return (
    <div className="doctor-browse-container">
      <div className="doctor-header">
        <h1>Find the Right Doctor</h1>
        <p>Browse through our network of qualified healthcare professionals</p>
      </div>

      <div className="doctor-filters">
        {specializations.map((spec) => (
          <button
            key={spec}
            className={`filter-btn ${selectedSpec === spec ? "active" : ""}`}
            onClick={() => filterBySpecialization(spec)}
          >
            {spec}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading doctors...</div>
      ) : (
        <div className="doctor-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => <DoctorCard key={doctor._id} doctor={doctor} />)
          ) : (
            <p className="no-doctors">No doctors found in this specialization</p>
          )}
        </div>
      )}
    </div>
  )
}

export default DoctorBrowse
