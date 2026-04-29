"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { User, LoginRequest, RegisterRequest } from "@/lib/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (data: LoginRequest) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterRequest) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateAvatar: (avatarDataUrl: string) => Promise<{ success: boolean; error?: string }>
  removeAvatar: () => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      fetch(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) return res.json()
          // Token invalid, clean up
          localStorage.removeItem("auth_token")
          return null
        })
        .then((data) => {
          if (data?.user) setUser(data.user)
        })
        .catch(() => {
          localStorage.removeItem("auth_token")
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (data: LoginRequest) => {
    try {
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        return { success: false, error: json.error || "Error al iniciar sesión" }
      }

      localStorage.setItem("auth_token", json.token)
      setUser(json.user)
      return { success: true }
    } catch {
      return { success: false, error: "Error de conexión con el servidor" }
    }
  }, [])

  const register = useCallback(async (data: RegisterRequest) => {
    try {
      const res = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        return { success: false, error: json.error || "Error al crear la cuenta" }
      }

      localStorage.setItem("auth_token", json.token)
      setUser(json.user)
      return { success: true }
    } catch {
      return { success: false, error: "Error de conexión con el servidor" }
    }
  }, [])

  const logout = useCallback(async () => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      try {
        await fetch(`${API_URL}/api/users/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch {
        // Ignore network errors on logout
      }
    }
    localStorage.removeItem("auth_token")
    setUser(null)
  }, [])

  const updateAvatar = useCallback(async (avatarDataUrl: string) => {
    const token = localStorage.getItem("auth_token")
    if (!token) return { success: false, error: "No autenticado" }

    try {
      const res = await fetch(`${API_URL}/api/users/me/avatar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatarUrl: avatarDataUrl }),
      })

      const json = await res.json()

      if (!res.ok) {
        return { success: false, error: json.error || "Error al actualizar avatar" }
      }

      setUser(json.user)
      return { success: true }
    } catch {
      return { success: false, error: "Error de conexión con el servidor" }
    }
  }, [])

  const removeAvatar = useCallback(async () => {
    const token = localStorage.getItem("auth_token")
    if (!token) return { success: false, error: "No autenticado" }

    try {
      const res = await fetch(`${API_URL}/api/users/me/avatar`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await res.json()

      if (!res.ok) {
        return { success: false, error: json.error || "Error al eliminar avatar" }
      }

      setUser(json.user)
      return { success: true }
    } catch {
      return { success: false, error: "Error de conexión con el servidor" }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateAvatar, removeAvatar }}>
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
