"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { AuthUser, LoginRequest, RegisterRequest, AuthResponse } from "@/lib/types"
import { apiFetch, setAuthToken, clearAuthToken } from "@/lib/api"

type AuthContextType = {
  user: AuthUser | null
  isLoading: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // SECURITY: We intentionally do NOT read a token from localStorage on
  // mount. JWTs in localStorage are accessible to any JS on the page and
  // are a classic XSS exfiltration target. Tokens are kept in memory only
  // (see lib/api.ts) — see that file for the rationale and the proper
  // long-term fix (HttpOnly + Secure + SameSite cookies set by the
  // backend). On a full page reload, the in-memory token is gone, so we
  // probe /api/auth/me, which will succeed only if the backend has
  // already migrated to cookie-based auth; otherwise the user is treated
  // as logged out and asked to authenticate again.
  const loadUser = useCallback(async () => {
    try {
      const data = await apiFetch<{ user: AuthUser }>("/api/auth/me")
      setUser(data.user)
    } catch {
      clearAuthToken()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const login = async (credentials: LoginRequest) => {
    const data = await apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
    setAuthToken(data.token)
    setUser(data.user)
  }

  const register = async (info: RegisterRequest) => {
    const data = await apiFetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(info),
    })
    setAuthToken(data.token)
    setUser(data.user)
  }

  const logout = () => {
    clearAuthToken()
    setUser(null)
  }

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
