# Adventure Website - Frontend Documentation

## Overview

Next.js 16 tourism website for a Patagonia trekking company based in Ushuaia, Tierra del Fuego. The site showcases trekking activities, handles bookings, and provides authentication for user accounts. Built with React 19, TypeScript, Tailwind CSS 4, and shadcn/ui (New York style).

Primary language is Spanish (Argentina). The site includes a bilingual toggle (ES/EN) via a React context provider.

## Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| Framework     | Next.js 16 (App Router, RSC)      |
| UI Library    | React 19                          |
| Styling       | Tailwind CSS 4, tw-animate-css    |
| Components    | shadcn/ui (New York variant)      |
| Icons         | Lucide React                      |
| Forms         | React Hook Form + Zod validation  |
| Charts        | Recharts                          |
| Analytics     | Vercel Analytics                  |
| Fonts         | Montserrat (headings), Lato (body)|
| Package Mgr   | pnpm                              |

## Project Structure

```
adventure-website/
  app/
    page.tsx                  # Homepage - hero, experiences, destinations, testimonials
    layout.tsx                # Root layout with fonts, LanguageProvider, analytics
    globals.css               # Tailwind base + CSS variables for theming
    login/page.tsx            # Login form with rate limit handling
    registro/page.tsx         # Registration form with rate limit handling
    actividades/page.tsx      # Activities listing page
    calendario/page.tsx       # Calendar view of upcoming events
    contacto/page.tsx         # Contact form page
    nosotros/page.tsx         # About us page
    reservar/page.tsx         # Booking/reservation page
    trekkings/
      page.tsx                # Trekkings listing
      [id]/page.tsx           # Individual trekking detail (dynamic route)
    lugares/                  # Static landing pages for specific locations
      cerro-guanaco/page.tsx
      glaciar-ojo-del-albino/page.tsx
      glaciar-vinciguerra/page.tsx
      laguna-de-los-tempanos/page.tsx
      laguna-esmeralda/page.tsx
      valle-de-andorra/page.tsx
      valle-tierra-mayor/page.tsx
  components/
    navigation.tsx            # Fixed top navbar with language toggle
    hero-section.tsx          # Landing hero with CTA
    top-experiences.tsx       # Featured activities carousel/grid
    destinations-section.tsx  # Destination cards
    testimonials-section.tsx  # User testimonials
    cta-section.tsx           # Call-to-action banner
    footer.tsx                # Site footer
    about-content.tsx         # About page content
    actividades-view.tsx      # Activities page content
    calendar-view.tsx         # Calendar page content
    contact-form.tsx          # Contact form component
    reservar-view.tsx         # Reservation form component
    lugar-landing.tsx         # Reusable location landing template
    trekking-detail.tsx       # Trekking detail view
    trekkings-list.tsx        # Trekkings list view
    image-gallery-lightbox.tsx # Image gallery with lightbox
    scroll-to-top.tsx         # Scroll restoration on navigation
    theme-provider.tsx        # next-themes provider
    benefits-section.tsx      # Benefits/features section
    ui/                       # shadcn/ui primitives (button, card, input, etc.)
  contexts/
    language-context.tsx      # Bilingual ES/EN context provider
  lib/
    api.ts                    # API client with rate limit error handling
    data.ts                   # Static activity/trekking/calendar data
    types.ts                  # Shared TypeScript interfaces
    utils.ts                  # cn() utility for Tailwind class merging
    whatsapp.ts               # WhatsApp deep link generator
```

## Running the Project

```bash
pnpm install
pnpm dev          # Development server on http://localhost:3000
pnpm build        # Production build (uses webpack bundler)
pnpm start        # Production server on port 3005
pnpm lint         # ESLint
```

The `.sundaysrc` configures the runtime port as 3005 for production.

## Environment Variables

| Variable                              | Purpose                          |
|---------------------------------------|----------------------------------|
| `NEXT_PUBLIC_API_URL`                 | Backend API base URL (default: `http://localhost:3001`) |
| `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` | WhatsApp phone number for contact links |

## API Client and Rate Limiting

The API client in `lib/api.ts` provides a typed `apiPost` function that handles HTTP 429 (Too Many Requests) responses with a custom `RateLimitError` class:

```typescript
// lib/api.ts
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
```

Key behaviors:
- On HTTP 429, extracts `retryAfter` from the JSON body or the `Retry-After` header (defaults to 60 seconds).
- Throws a `RateLimitError` that consuming components can detect via `instanceof`.
- On other HTTP errors, throws the parsed JSON as an `ApiError`.

## Authentication Pages

### Login (`app/login/page.tsx`)

Client component that posts to `/api/auth/login` with `{ email, password }`. Handles three error states:

1. **Rate limit** (`RateLimitError`): Shows a destructive alert with a clock icon and human-readable retry time.
2. **API error**: Displays the `error` field from the response.
3. **Network error**: Shows a generic connection error message.

When rate-limited, all form inputs and the submit button are disabled:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  try {
    await apiPost("/api/auth/login", formData)
    // Redirect on success
  } catch (err) {
    if (err instanceof RateLimitError) {
      setRateLimitInfo({
        message: err.message,
        retryAfter: err.retryAfter,
      })
    } else if (err && typeof err === "object" && "error" in err) {
      setError((err as { error: string }).error)
    } else {
      setError("Error de conexion. Intenta de nuevo.")
    }
  } finally {
    setLoading(false)
  }
}
```

The `formatRetryTime` helper converts seconds to a readable Spanish string (e.g., "2 minutos", "30 segundos").

### Registration (`app/registro/page.tsx`)

Client component that posts to `/api/auth/register` with `{ firstName, lastName, email, password }`. Same rate limit handling pattern as login. On success, displays a confirmation card with a link to the login page. Password field enforces `minLength={8}`.

## Bilingual Support

The `LanguageProvider` in `contexts/language-context.tsx` provides a simple toggle between Spanish and English:

```typescript
type Language = "es" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (es: string, en: string) => string
}
```

Usage in components:

```tsx
const { language, toggleLanguage, t } = useLanguage()
// ...
<span>{t("Actividades", "Activities")}</span>
```

Default language is Spanish (`"es"`). The toggle is in the navigation bar.

## Data Types

Core interfaces defined in `lib/types.ts`:

```typescript
export type Difficulty = "Facil" | "Moderado" | "Avanzado"

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
```

Activity data is currently stored as static arrays in `lib/data.ts` rather than fetched from the backend.

## WhatsApp Integration

Contact links use WhatsApp deep links generated by `lib/whatsapp.ts`:

```typescript
const DEFAULT_PHONE = "549XXXXXXXXX"
const PRESET_MESSAGE = "Hola! Estoy interesado en una actividad en Ushuaia..."

export function getWhatsAppLink(customMessage?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || DEFAULT_PHONE
  const message = customMessage || PRESET_MESSAGE
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
```

The navigation "Contact" link opens WhatsApp directly instead of an internal page.

## UI Component Library

Uses shadcn/ui with the New York style variant. Configuration in `components.json`:

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  },
  "iconLibrary": "lucide"
}
```

The `cn()` utility in `lib/utils.ts` merges Tailwind classes with conflict resolution:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Backend API Endpoints Used

The frontend communicates with the backend at `NEXT_PUBLIC_API_URL`:

| Method | Endpoint              | Purpose             | Request Body                                      |
|--------|-----------------------|----------------------|--------------------------------------------------|
| POST   | `/api/auth/login`     | User login           | `{ email, password }`                            |
| POST   | `/api/auth/register`  | User registration    | `{ firstName, lastName, email, password }`       |

Both endpoints may return HTTP 429 with a `retryAfter` field when rate limits are exceeded. The frontend handles this by disabling the form and showing a countdown message.

## Conventions

- All page components use the Next.js App Router file convention (`page.tsx`).
- Client components are marked with `"use client"` at the top of the file.
- Spanish is the default UI language; user-facing strings use Argentine Spanish dialect ("vos" conjugation: "registrate", "accede").
- Form state management uses React `useState` hooks directly (no global state for forms).
- Error handling follows a cascading pattern: rate limit check first, then API error, then generic network error.
- Tailwind classes use CSS variables for theming (`bg-primary`, `text-muted-foreground`, etc.).
- The `disabled` prop is applied to all form inputs when rate-limited, not just the submit button, to prevent user interaction during the cooldown period.
