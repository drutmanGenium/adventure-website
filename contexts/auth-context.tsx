"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { AuthUser } from "@/lib/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

type AuthContextType = {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone?: string
  }) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) return res.json()
          throw new Error("Invalid session")
        })
        .then((data) => {
          setUser(data.user)
        })
        .catch(() => {
          localStorage.removeItem("auth_token")
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        return { success: false, error: data.error || "Error al iniciar sesión" }
      }

      localStorage.setItem("auth_token", data.token)
      setUser(data.user)
      return { success: true }
    } catch {
      return { success: false, error: "Error de conexión con el servidor" }
    }
  }, [])

  const register = useCallback(
    async (registerData: {
      firstName: string
      lastName: string
      email: string
      password: string
      phone?: string
    }) => {
      try {
        const res = await fetch(`${API_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData),
        })

        const data = await res.json()

        if (!res.ok) {
          return { success: false, error: data.error || "Error al crear la cuenta" }
        }

        localStorage.setItem("auth_token", data.token)
        setUser(data.user)
        return { success: true }
      } catch {
        return { success: false, error: "Error de conexión con el servidor" }
      }
    },
    []
  )

  const logout = useCallback(async () => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      try {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch {
        // Ignore logout errors
      }
    }
    localStorage.removeItem("auth_token")
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
