"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { User, LoginRequest, RegisterRequest } from "@/lib/types"
import { isSafeAvatarUrl, validateAvatarDataUrl } from "@/lib/avatar"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

// SECURITY NOTE — server-side requirements for the /api/users/me/avatar
// endpoints (PUT, DELETE):
//   1. The endpoints MUST require a valid JWT in the `Authorization: Bearer …`
//      header and reject (401) any request without one.
//   2. The endpoints MUST re-validate the uploaded avatar payload (MIME
//      allowlist, magic-byte signature, structural decode, max size). The
//      client-side checks in `lib/avatar.ts` are defense-in-depth, not a
//      substitute for server-side validation.
//   3. Avatars SHOULD be stored as binary blobs and served from a separate,
//      sandboxed origin (or with `Content-Disposition: attachment` and a
//      strict CSP) to neutralize any HTML/script that bypasses validation.
//
// The backend implementation lives outside this repository, so we cannot
// enforce these properties from here. The client-side mitigations below
// (URL validation before send, automatic logout on 401/403) are intended to
// reduce blast radius if the server is missing or misconfigured.

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
          if (data?.user) {
            // Strip any avatar URL the server returns that fails our safety
            // check, so a compromised / misbehaving server cannot inject an
            // unsafe value into rendered <img src=…> attributes.
            if (
              data.user.avatarUrl != null &&
              !isSafeAvatarUrl(data.user.avatarUrl)
            ) {
              data.user.avatarUrl = null
            }
            setUser(data.user)
          }
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

  // If the server says the credential is invalid, drop it from storage so
  // the next render returns the user to a logged-out state instead of
  // continuing to send a bad token.
  const handleAuthFailure = useCallback(() => {
    localStorage.removeItem("auth_token")
    setUser(null)
  }, [])

  const updateAvatar = useCallback(async (avatarDataUrl: string) => {
    const token = localStorage.getItem("auth_token")
    if (!token) return { success: false, error: "No autenticado" }

    // Re-validate the data URL on this side of the boundary too. Even if a
    // caller bypasses the upload UI, we never want to ship a non-image URL
    // to the server (or, if the server is missing, persist one in state).
    let safeDataUrl: string
    try {
      safeDataUrl = await validateAvatarDataUrl(avatarDataUrl)
    } catch {
      return { success: false, error: "Imagen inválida" }
    }

    try {
      const res = await fetch(`${API_URL}/api/users/me/avatar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatarUrl: safeDataUrl }),
      })

      // Server says our token is bad: clear local auth state so the UI
      // recovers instead of silently retrying with the same credential.
      if (res.status === 401 || res.status === 403) {
        handleAuthFailure()
        return { success: false, error: "Sesión expirada. Iniciá sesión nuevamente." }
      }

      const json = await res.json()

      if (!res.ok) {
        return { success: false, error: json.error || "Error al actualizar avatar" }
      }

      // The server may echo back any value as `avatarUrl`. Re-validate before
      // accepting it into client state so a misbehaving / compromised server
      // cannot inject an unsafe URL into the rendered <img src=…>.
      if (json.user && !isSafeAvatarUrl(json.user.avatarUrl) && json.user.avatarUrl !== null) {
        return { success: false, error: "Respuesta del servidor inválida" }
      }

      setUser(json.user)
      return { success: true }
    } catch {
      return { success: false, error: "Error de conexión con el servidor" }
    }
  }, [handleAuthFailure])

  const removeAvatar = useCallback(async () => {
    const token = localStorage.getItem("auth_token")
    if (!token) return { success: false, error: "No autenticado" }

    try {
      const res = await fetch(`${API_URL}/api/users/me/avatar`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.status === 401 || res.status === 403) {
        handleAuthFailure()
        return { success: false, error: "Sesión expirada. Iniciá sesión nuevamente." }
      }

      const json = await res.json()

      if (!res.ok) {
        return { success: false, error: json.error || "Error al eliminar avatar" }
      }

      if (json.user && !isSafeAvatarUrl(json.user.avatarUrl) && json.user.avatarUrl !== null) {
        return { success: false, error: "Respuesta del servidor inválida" }
      }

      setUser(json.user)
      return { success: true }
    } catch {
      return { success: false, error: "Error de conexión con el servidor" }
    }
  }, [handleAuthFailure])

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
