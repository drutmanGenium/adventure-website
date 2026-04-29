// ─── Shared types for frontend + backend ─────────────────────────────────────

export type Difficulty = "Fácil" | "Moderado" | "Avanzado"

export type Category =
  | "Todas"
  | "Laguna Esmeralda"
  | "Glaciar Vinciguerra"
  | "Ojo del Albino"
  | "Valle Tierra Mayor"
  | "Valle de Andorra"
  | string // allow extra categories like "Trekking", "Parque Nacional", etc.

export interface Activity {
  id: string
  title: string
  cover_image: string
  price_from: number
  currency: string
  difficulty: Difficulty
  duration: string
  category: Category
  availability_dates: string[]
  capacity_remaining: number
  rating?: number
  reviews_count?: number
  popular?: boolean
  location: string
  calendarioSlug?: string
  galleryImages?: { src: string; alt: string }[]
}

export interface TrekkingDetail {
  title: string
  location: string
  difficulty: string
  image: string
  duration: string
  groupSize: string
  price: string
  type: "Trekking" | "Campamento" | "Montañismo"
  description: string
  longDescription: string
  itinerary: { day: string; title: string; description: string }[]
  included: string[]
  notIncluded: string[]
  requirements: string[]
  dates: string[]
}

export interface CalendarEvent {
  id: string
  title: string
  date: string
  month: string
  year: number
  difficulty: Difficulty
  location: string
  duration: string
  groupSize: string
  price: string
  spotsLeft: number
}

export interface BookingRequest {
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

export interface BookingResponse {
  id: string
  status: "confirmed" | "pending"
  activityTitle: string
  date: string
  guests: number
  total: number
  currency: string
  createdAt: string
}

export interface ContactRequest {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

// ─── Auth types ──────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

export interface AuthResponse {
  message: string
  token: string
  user: AuthUser
}
