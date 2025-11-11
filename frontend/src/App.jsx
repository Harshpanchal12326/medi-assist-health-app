"use client"

import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import DoctorBrowse from "./pages/DoctorBrowse"
import MedicalRecords from "./pages/MedicalRecords"
import Appointments from "./pages/Appointments"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"

function App() {
  const [theme, setTheme] = useState("default")
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const savedTheme = localStorage.getItem("theme") || "default"
    setTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)

    if (token) {
      fetchCurrentUser(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchCurrentUser = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        localStorage.removeItem("token")
      }
    } catch (error) {
      console.error("Error fetching user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      {user && <Navbar user={user} onLogout={handleLogout} onThemeChange={toggleTheme} theme={theme} />}
      <main className={`main-content theme-${theme}`}>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={setUser} />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors"
            element={
              <ProtectedRoute user={user}>
                <DoctorBrowse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute user={user}>
                <Appointments userId={user?.id} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medical-records"
            element={
              <ProtectedRoute user={user}>
                <MedicalRecords userId={user?.id} />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
