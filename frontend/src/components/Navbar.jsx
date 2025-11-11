"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/navbar.css"

function Navbar({ user, onLogout, onThemeChange, theme }) {
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <span className="brand-icon">⚕️</span>
          <span className="brand-text">MediAssist</span>
        </Link>

        <div className="navbar-menu">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/doctors" className="nav-link">
            Find Doctors
          </Link>
          <Link to="/appointments" className="nav-link">
            Appointments
          </Link>
          <Link to="/medical-records" className="nav-link">
            Records
          </Link>
        </div>

        <div className="navbar-actions">
          <div className="theme-selector">
            <button className="theme-btn" onClick={() => setShowThemeMenu(!showThemeMenu)} title="Change theme">
              🌓
            </button>
            {showThemeMenu && (
              <div className="theme-menu">
                <button
                  onClick={() => {
                    onThemeChange("default")
                    setShowThemeMenu(false)
                  }}
                  className={theme === "default" ? "active" : ""}
                >
                  Default
                </button>
                <button
                  onClick={() => {
                    onThemeChange("dark")
                    setShowThemeMenu(false)
                  }}
                  className={theme === "dark" ? "active" : ""}
                >
                  Dark
                </button>
                <button
                  onClick={() => {
                    onThemeChange("light")
                    setShowThemeMenu(false)
                  }}
                  className={theme === "light" ? "active" : ""}
                >
                  Light
                </button>
              </div>
            )}
          </div>
          <span className="user-name">{user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
