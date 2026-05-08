// ─── API client for adventure-backend ─────────────────────────────────────────

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export class ApiError extends Error {
  status: number
  details?: Record<string, string[]>

  constructor(message: string, status: number, details?: Record<string, string[]>) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.details = details
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  const body = await res.json()
  if (!res.ok) {
    throw new ApiError(
      body.error || "Error inesperado",
      res.status,
      body.details
    )
  }
  return body as T
}

// ─── Bookings ────────────────────────────────────────────────────────────────

export interface CreateBookingPayload {
  activityId: string
  date: string
  firstName: string
  lastName: string
  email: string
  phone: string
  pickupAddress: string
  city: string
  references?: string
  isHotel: boolean
  hotelName?: string
  guests: number
}

export interface CreateBookingResponse {
  message: string
  booking: {
    id: string
    status: "confirmed" | "pending"
    activityTitle: string
    date: string
    guests: number
    total: number
    currency: string
    createdAt: string
  }
}

export async function createBooking(
  payload: CreateBookingPayload
): Promise<CreateBookingResponse> {
  const res = await fetch(`${API_BASE_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return handleResponse<CreateBookingResponse>(res)
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface CreateContactPayload {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface CreateContactResponse {
  message: string
  id: string
}

export async function createContact(
  payload: CreateContactPayload
): Promise<CreateContactResponse> {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return handleResponse<CreateContactResponse>(res)
}
