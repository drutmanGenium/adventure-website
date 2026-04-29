"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token")
    if (savedToken) {
      setToken(savedToken)
      fetchUser(savedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  async function fetchUser(authToken: string) {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
        setToken(authToken)
      } else {
        localStorage.removeItem("auth_token")
        setToken(null)
      }
    } catch {
      localStorage.removeItem("auth_token")
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  async function login(email: string, password: string) {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem("auth_token", data.token)
        return { success: true }
      }
      return { success: false, error: data.error || "Error al iniciar sesión" }
    } catch {
      return { success: false, error: "Error de conexión con el servidor" }
    }
  }

  async function register(registerData: RegisterData) {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      })
      const data = await res.json()
      if (res.ok) {
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem("auth_token", data.token)
        return { success: true }
      }
      return { success: false, error: data.error || "Error al crear la cuenta" }
    } catch {
      return { success: false, error: "Error de conexión con el servidor" }
    }
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_token")
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
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
