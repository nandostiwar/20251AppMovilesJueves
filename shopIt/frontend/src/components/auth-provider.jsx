"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

// Create an Authentication Context
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      // Set default Authorization header for all axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      // Optionally verify the token with your backend
      checkAuthStatus(token)
    } else {
      setLoading(false)
    }
  }, [])

  // Function to verify token validity with backend
  const checkAuthStatus = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/verify")
      setUser(response.data.user)
    } catch (error) {
      // If token verification fails, clear it
      console.error("Auth verification failed:", error)
      localStorage.removeItem("authToken")
      delete axios.defaults.headers.common["Authorization"]
    } finally {
      setLoading(false)
    }
  }

  // Login function
  const login = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials)
      const { token, user } = response.data

      // Save token and set axios default header
      localStorage.setItem("authToken", token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setUser(user)
      return { success: true }
    } catch (error) {
      console.error("Login failed:", error)
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please try again.",
      }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken")
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
    // Redirect to login page
    window.location.href = "/login"
  }

  // Create an axios interceptor to handle 401 errors globally
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Automatically logout on 401 responses
          logout()
        }
        return Promise.reject(error)
      },
    )

    // Clean up interceptor on unmount
    return () => axios.interceptors.response.eject(interceptor)
  }, [])

  const value = {
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

