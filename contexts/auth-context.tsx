"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { User } from "@/lib/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

type AuthContextType = {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ error?: string }>
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<{ error?: string }>
  logout: () => void
  updateAvatar: (avatarUrl: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// SECURITY: Auth tokens were previously persisted in localStorage, which exposes
// them to any JavaScript executing in the page (XSS). The proper fix is to have
// the backend issue the JWT as an httpOnly, Secure, SameSite=Strict cookie so
// the token is unreachable from JS — but that requires backend changes outside
// this repo. As a frontend-only mitigation we now store the token in
// sessionStorage: it is still readable by JS on this origin (so XSS is still a
// concern and the codebase must keep aggressively avoiding dangerouslySetInnerHTML,
// untrusted React refs, etc.), but it is scoped per browser tab and cleared
// when the tab closes, which materially shrinks the exfiltration window.
// User profile data (non-secret) remains in localStorage so the UI can render
// quickly on reload before re-validating with the server.
const TOKEN_STORAGE_KEY = "auth_token"
const USER_STORAGE_KEY = "auth_user"

const tokenStorage = {
  get(): string | null {
    if (typeof window === "undefined") return null
    return window.sessionStorage.getItem(TOKEN_STORAGE_KEY)
  },
  set(value: string) {
    if (typeof window === "undefined") return
    window.sessionStorage.setItem(TOKEN_STORAGE_KEY, value)
    // Clear any legacy token that was previously persisted in localStorage so
    // existing sessions don't leave a long-lived copy behind.
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
  },
  clear() {
    if (typeof window === "undefined") return
    window.sessionStorage.removeItem(TOKEN_STORAGE_KEY)
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session: token from sessionStorage (per-tab, cleared on tab close),
  // user metadata from localStorage (non-secret).
  useEffect(() => {
    // One-time migration: if a token is still sitting in localStorage from a
    // previous build, move it to sessionStorage and remove the localStorage copy.
    const legacyToken = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (legacyToken && !sessionStorage.getItem(TOKEN_STORAGE_KEY)) {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, legacyToken)
    }
    localStorage.removeItem(TOKEN_STORAGE_KEY)

    const savedToken = tokenStorage.get()
    const savedUser = localStorage.getItem(USER_STORAGE_KEY)
    if (savedToken && savedUser) {
      try {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      } catch {
        tokenStorage.clear()
        localStorage.removeItem(USER_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        return { error: data.error || "Error al iniciar sesión" }
      }

      setToken(data.token)
      setUser(data.user)
      tokenStorage.set(data.token)
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user))
      return {}
    } catch {
      return { error: "Error de conexión con el servidor" }
    }
  }, [])

  const register = useCallback(async (data: { firstName: string; lastName: string; email: string; password: string }): Promise<{ error?: string }> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        return { error: result.error || "Error al registrarse" }
      }

      setToken(result.token)
      setUser(result.user)
      tokenStorage.set(result.token)
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user))
      return {}
    } catch {
      return { error: "Error de conexión con el servidor" }
    }
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    tokenStorage.clear()
    localStorage.removeItem(USER_STORAGE_KEY)
  }, [])

  const updateAvatar = useCallback((avatarUrl: string) => {
    setUser((prev) => {
      if (!prev) return prev
      const updated = { ...prev, avatarUrl }
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, updateAvatar }}>
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
