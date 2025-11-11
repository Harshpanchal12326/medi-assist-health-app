"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/medical-records.css"

function MedicalRecords({ userId }) {
  const [records, setRecords] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    recordType: "prescription",
    title: "",
    description: "",
    medicines: [],
    testName: "",
    testResult: "",
  })

  useEffect(() => {
    fetchRecords()
  }, [userId])

  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`http://localhost:5000/api/medical-records/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setRecords(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching records:", error)
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddRecord = async () => {
    try {
      const token = localStorage.getItem("token")

      const recordPayload = {
        recordType: formData.recordType,
        title: formData.title,
        description: formData.description,
        prescription:
          formData.recordType === "prescription"
            ? {
                medicines: formData.medicines.filter((m) => m.name),
                date: new Date(),
              }
            : null,
        testResults:
          formData.recordType === "test"
            ? {
                testName: formData.testName,
                result: formData.testResult,
                date: new Date(),
              }
            : null,
      }

      await axios.post("http://localhost:5000/api/medical-records", recordPayload, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert("Record added successfully")
      setShowForm(false)
      setFormData({
        recordType: "prescription",
        title: "",
        description: "",
        medicines: [],
        testName: "",
        testResult: "",
      })
      fetchRecords()
    } catch (error) {
      alert("Error adding record")
    }
  }

  return (
    <div className="medical-records-container">
      <div className="records-header">
        <h1>Medical Records</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Record"}
        </button>
      </div>

      {showForm && (
        <div className="record-form">
          <h2>Add New Medical Record</h2>
          <div className="form-group">
            <label>Record Type:</label>
            <select name="recordType" value={formData.recordType} onChange={handleInputChange}>
              <option value="prescription">Prescription</option>
              <option value="test">Test Result</option>
              <option value="report">Medical Report</option>
            </select>
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Blood Test Report"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Additional details about this record"
            />
          </div>
          {formData.recordType === "test" && (
            <>
              <div className="form-group">
                <label>Test Name:</label>
                <input
                  type="text"
                  name="testName"
                  value={formData.testName}
                  onChange={handleInputChange}
                  placeholder="e.g., Complete Blood Count"
                />
              </div>
              <div className="form-group">
                <label>Result:</label>
                <textarea
                  name="testResult"
                  value={formData.testResult}
                  onChange={handleInputChange}
                  placeholder="Test results details"
                />
              </div>
            </>
          )}
          <button className="btn-primary" onClick={handleAddRecord}>
            Save Record
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading records...</div>
      ) : records.length > 0 ? (
        <div className="records-list">
          {records.map((record) => (
            <div key={record._id} className="record-card">
              <div className="record-icon">
                {record.recordType === "prescription" && "💊"}
                {record.recordType === "test" && "🧪"}
                {record.recordType === "report" && "📋"}
              </div>
              <div className="record-details">
                <h3>{record.title}</h3>
                <p className="record-type">{record.recordType}</p>
                <p className="record-description">{record.description}</p>
                {record.prescription && (
                  <div className="prescription-details">
                    <strong>Medicines:</strong>
                    {record.prescription.medicines?.map((med, idx) => (
                      <p key={idx}>
                        - {med.name} ({med.dosage})
                      </p>
                    ))}
                  </div>
                )}
                <p className="record-date">📅 {new Date(record.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-records">No medical records yet. Add one to get started!</p>
      )}
    </div>
  )
}

export default MedicalRecords
