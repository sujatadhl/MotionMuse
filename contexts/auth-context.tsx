"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  plan: "free" | "single" | "enterprise" | null
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("motionmuse_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substring(2, 9),
        name: email.split("@")[0],
        email,
        plan: "free",
      }

      setUser(mockUser)
      localStorage.setItem("motionmuse_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Login failed:", error)
      throw new Error("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll create a mock user
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substring(2, 9),
        name,
        email,
        plan: "free",
      }

      setUser(mockUser)
      localStorage.setItem("motionmuse_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Signup failed:", error)
      throw new Error("Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("motionmuse_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
