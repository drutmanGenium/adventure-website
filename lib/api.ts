const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

// SECURITY: The JWT auth token is held in memory only — it is intentionally
// NOT persisted to localStorage or sessionStorage. Storing JWTs in
// localStorage exposes them to any script running on the page, so an XSS
// vulnerability anywhere in the app (or in a third-party dependency) would
// let an attacker exfiltrate the token and impersonate the user.
//
// The proper long-term fix is for the backend to set the JWT in an
// HttpOnly + Secure + SameSite=Strict cookie via the `Set-Cookie` response
// header on /api/auth/login and /api/auth/register. HttpOnly cookies are
// not readable from JavaScript, which closes the XSS exfiltration vector.
// That requires backend changes which are outside the scope of this client
// repository, so as a defense-in-depth measure we keep the token in memory
// only. The trade-off is that users must re-authenticate after a full page
// reload; this is preferable to leaving the token sitting in localStorage.
let authToken: string | null = null

export function setAuthToken(token: string | null): void {
  authToken = token
}

export function getAuthToken(): string | null {
  return authToken
}

export function clearAuthToken(): void {
  authToken = null
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const token = getAuthToken()

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    // When the backend is migrated to set an HttpOnly auth cookie, this
    // ensures the cookie is sent on cross-origin requests to the API.
    credentials: "include",
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || "Error en la solicitud")
  }

  return data as T
}
