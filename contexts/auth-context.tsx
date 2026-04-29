"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { AuthUser } from "@/lib/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

// SECURITY: Auth tokens are no longer stored in localStorage (vulnerable to XSS).
// Instead, this client relies on the backend issuing an httpOnly, Secure, SameSite
// cookie via the Set-Cookie response header on /api/auth/login, /api/auth/register,
// and clearing it on /api/auth/logout. All auth requests use `credentials: "include"`
// so the browser transmits the cookie automatically without exposing it to JS.
//
// Backend requirement: the /api/auth/{login,register,logout,me} endpoints must
// set/clear an httpOnly cookie (e.g. `Set-Cookie: auth_token=...; HttpOnly; Secure;
// SameSite=Lax; Path=/`). If the backend has not been updated to do so, sessions
// will not persist — that is the intended fail-closed behavior of this fix.
const AUTH_FETCH_INIT: RequestInit = { credentials: "include" }

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

  // Check for existing session on mount by hitting /me with the httpOnly cookie.
  useEffect(() => {
    fetch(`${API_URL}/api/auth/me`, AUTH_FETCH_INIT)
      .then((res) => {
        if (res.ok) return res.json()
        throw new Error("Invalid session")
      })
      .then((data) => {
        setUser(data.user)
      })
      .catch(() => {
        // No active session — leave user null.
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        ...AUTH_FETCH_INIT,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        return { success: false, error: data.error || "Error al iniciar sesión" }
      }

      // The backend is expected to set an httpOnly auth cookie in this response.
      // Do NOT persist data.token in JS-accessible storage.
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
          ...AUTH_FETCH_INIT,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData),
        })

        const data = await res.json()

        if (!res.ok) {
          return { success: false, error: data.error || "Error al crear la cuenta" }
        }

        // The backend is expected to set an httpOnly auth cookie in this response.
        // Do NOT persist data.token in JS-accessible storage.
        setUser(data.user)
        return { success: true }
      } catch {
        return { success: false, error: "Error de conexión con el servidor" }
      }
    },
    []
  )

  const logout = useCallback(async () => {
    try {
      // Backend should clear the httpOnly cookie via Set-Cookie with Max-Age=0.
      await fetch(`${API_URL}/api/auth/logout`, {
        ...AUTH_FETCH_INIT,
        method: "POST",
      })
    } catch {
      // Ignore logout errors
    }
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
