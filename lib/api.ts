// ─── API Client ─────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export interface ApiError {
  error: string
  message?: string
  details?: Record<string, string[]>
  retryAfter?: number
}

export class RateLimitError extends Error {
  retryAfter: number

  constructor(message: string, retryAfter: number) {
    super(message)
    this.name = "RateLimitError"
    this.retryAfter = retryAfter
  }
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (res.status === 429) {
    const retryAfter = data.retryAfter || parseInt(res.headers.get("Retry-After") || "60", 10)
    throw new RateLimitError(
      data.message || "Demasiados intentos. Por favor, intenta de nuevo más tarde.",
      retryAfter,
    )
  }

  if (!res.ok) {
    const err: ApiError = data
    throw err
  }

  return data as T
}
