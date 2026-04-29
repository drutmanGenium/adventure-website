# Adventure Website - Patagonia Trekking

## Overview

Next.js 16 website for a Patagonia trekking tour company based in Ushuaia, Tierra del Fuego. The site is bilingual (Spanish/English), uses Tailwind CSS v4 with shadcn/ui components (new-york style), and connects to a backend API for authentication and bookings. Runs on port 3005 in development.

## Tech Stack

- **Framework**: Next.js 16.0.10 (App Router, React 19.2)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1 with `tw-animate-css`
- **UI Library**: shadcn/ui (new-york style, Radix primitives, Lucide icons)
- **Forms**: react-hook-form 7 + zod 3.25 + @hookform/resolvers
- **Charts**: Recharts 2.15
- **Analytics**: @vercel/analytics
- **Package Manager**: pnpm
- **Fonts**: Montserrat (headings) + Lato (body), loaded via `next/font/google`

## Project Structure

```
adventure-website/
  app/
    layout.tsx              # Root layout with providers (Language + Auth)
    page.tsx                # Homepage
    globals.css             # Tailwind + CSS variables
    login/page.tsx          # Login page
    register/page.tsx       # Registration page
    actividades/page.tsx    # Activities listing
    calendario/page.tsx     # Calendar view
    contacto/page.tsx       # Contact form
    nosotros/page.tsx       # About us
    reservar/page.tsx       # Booking page
    trekkings/
      page.tsx              # Trekkings listing
      [id]/page.tsx         # Dynamic trekking detail
    lugares/                # Location-specific landing pages
      cerro-guanaco/page.tsx
      glaciar-ojo-del-albino/page.tsx
      glaciar-vinciguerra/page.tsx
      laguna-de-los-tempanos/page.tsx
      laguna-esmeralda/page.tsx
      valle-de-andorra/page.tsx
      valle-tierra-mayor/page.tsx
  components/
    navigation.tsx          # Main nav with auth state, language toggle
    login-form.tsx          # Login form component
    register-form.tsx       # Registration form component
    hero-section.tsx        # Homepage hero
    top-experiences.tsx     # Featured experiences
    destinations-section.tsx
    testimonials-section.tsx
    cta-section.tsx
    footer.tsx
    contact-form.tsx
    calendar-view.tsx
    actividades-view.tsx
    reservar-view.tsx
    about-content.tsx
    trekking-detail.tsx
    trekkings-list.tsx
    lugar-landing.tsx
    image-gallery-lightbox.tsx
    scroll-to-top.tsx
    theme-provider.tsx
    ui/                     # shadcn/ui primitives (button, card, input, etc.)
  contexts/
    language-context.tsx    # Bilingual ES/EN context + translation helper
    auth-context.tsx        # Authentication context (login, register, logout)
  lib/
    data.ts                 # Static activity, trekking, and calendar data
    types.ts                # Shared TypeScript interfaces
    utils.ts                # cn() helper for Tailwind class merging
    whatsapp.ts             # WhatsApp link generation utility
```

## Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001` |
| `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` | WhatsApp contact number | `549XXXXXXXXX` |

## Context Providers

The root layout wraps children with two context providers in this order:

```tsx
// app/layout.tsx
<LanguageProvider>
  <AuthProvider>
    {children}
  </AuthProvider>
</LanguageProvider>
```

### LanguageContext (`contexts/language-context.tsx`)

Manages bilingual support with a simple toggle between Spanish and English.

```tsx
type LanguageContextType = {
  language: "es" | "en"
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (es: string, en: string) => string
}
```

Usage in components:

```tsx
const { language, t } = useLanguage()
// ...
<h1>{t("Iniciar Sesion", "Sign In")}</h1>
```

### AuthContext (`contexts/auth-context.tsx`)

Manages user authentication state, communicating with the backend API via JWT tokens stored in `localStorage` under the key `auth_token`.

```tsx
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
}
```

On mount, the provider checks `localStorage` for a saved token and validates it against `GET /api/auth/me`. If valid, the user object is populated; otherwise the token is cleared.

API endpoints used:
- `POST /api/auth/login` -- body: `{ email, password }` -- returns `{ user, token }`
- `POST /api/auth/register` -- body: `{ firstName, lastName, email, password }` -- returns `{ user, token }`
- `GET /api/auth/me` -- header: `Authorization: Bearer <token>` -- returns `{ user }`

Usage in components:

```tsx
const { user, login, logout } = useAuth()

// Login
const result = await login(email, password)
if (result.success) router.push("/")

// Check auth state
if (user) {
  return <span>{user.firstName}</span>
}
```

## Authentication Pages

### Login (`/login`)

Renders `LoginForm` component. Fields: email, password (with show/hide toggle). On successful login, redirects to `/`. Links to `/register` for new users.

```tsx
// components/login-form.tsx
export function LoginForm() {
  const { login } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await login(email, password)
    if (result.success) {
      router.push("/")
    } else {
      setError(result.error || t("Error al iniciar sesion", "Login error"))
    }
  }
  // ...
}
```

### Register (`/register`)

Renders `RegisterForm` component. Fields: firstName, lastName, email, password, confirmPassword. Client-side validation includes password match check and minimum 6 character requirement. On success, auto-logs in and redirects to `/`. Links to `/login` for existing users.

```tsx
// components/register-form.tsx - client-side validation
if (formData.password !== formData.confirmPassword) {
  setError(t("Las contrasenas no coinciden", "Passwords do not match"))
  return
}
if (formData.password.length < 6) {
  setError(t("La contrasena debe tener al menos 6 caracteres", "Password must be at least 6 characters"))
  return
}
```

## Navigation Component

The `Navigation` component (`components/navigation.tsx`) is a fixed top navbar used on every page. It integrates both `useLanguage` and `useAuth` contexts.

Features:
- Fixed position with backdrop blur (`bg-background/95 backdrop-blur-sm`)
- Responsive: desktop inline nav + mobile hamburger menu
- Language toggle button (Globe icon)
- Auth-aware: shows user name + logout button when authenticated, sign-in button when not

Desktop auth section:

```tsx
{user ? (
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
      <User className="h-4 w-4" />
      <span>{user.firstName}</span>
    </div>
    <Button variant="ghost" size="sm" onClick={logout}>
      <LogOut className="h-4 w-4 mr-1" />
      {language === "es" ? "Salir" : "Logout"}
    </Button>
  </div>
) : (
  <Link href="/login">
    <Button variant="default" size="sm">
      <User className="h-4 w-4 mr-1" />
      {language === "es" ? "Ingresar" : "Sign In"}
    </Button>
  </Link>
)}
```

The mobile menu includes a separate auth section separated by a border, showing full name (`firstName lastName`) when authenticated.

## Shared Types (`lib/types.ts`)

Core domain interfaces used across the application:

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

export interface TrekkingDetail {
  title: string
  location: string
  difficulty: string
  image: string
  duration: string
  groupSize: string
  price: string
  type: "Trekking" | "Campamento" | "Montanismo"
  description: string
  longDescription: string
  itinerary: { day: string; title: string; description: string }[]
  included: string[]
  notIncluded: string[]
  requirements: string[]
  dates: string[]
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

## Static Data (`lib/data.ts`)

Activities, trekking details, and calendar events are defined as static arrays in `lib/data.ts`. The data includes activities at locations like Laguna Esmeralda, Glaciar Vinciguerra, Valle Tierra Mayor, and more -- all based in Ushuaia.

```typescript
import type { Activity, TrekkingDetail, CalendarEvent } from "./types"

export const ACTIVITIES: Activity[] = [
  {
    id: "laguna-esmeralda-express",
    title: "Laguna Esmeralda, Visita Express",
    price_from: 45,
    currency: "USD",
    difficulty: "Facil",
    duration: "4 hs",
    category: "Laguna Esmeralda",
    // ...
  },
  // ...
]
```

## Utility Functions

### `cn()` - Class Name Merger (`lib/utils.ts`)

Standard shadcn/ui utility combining `clsx` and `tailwind-merge`:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### WhatsApp Links (`lib/whatsapp.ts`)

Generates WhatsApp contact links using the `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` environment variable:

```typescript
export function createWhatsAppHref(customMessage?: string): string {
  return getWhatsAppLink(customMessage)
}
```

## Build and Run

```bash
pnpm install
pnpm dev          # Development server on port 3005
pnpm build        # Production build (uses webpack)
pnpm start        # Production server on port 3005
pnpm lint         # ESLint
```

## Page Patterns

All pages follow a consistent layout pattern with `Navigation` at the top and `Footer` at the bottom:

```tsx
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function SomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Page content - pt-16 offsets the fixed nav */}
      </div>
      <Footer />
    </main>
  )
}
```

The homepage (`app/page.tsx`) composes multiple sections:

```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TopExperiences />
      <DestinationsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
```

## Routing

| Route | Description |
|---|---|
| `/` | Homepage with hero, experiences, destinations, testimonials |
| `/login` | User login form |
| `/register` | User registration form |
| `/actividades` | Activities listing with filters |
| `/calendario` | Calendar view of upcoming events |
| `/contacto` | Contact form |
| `/nosotros` | About us page |
| `/reservar` | Booking page |
| `/trekkings` | Trekkings listing |
| `/trekkings/[id]` | Dynamic trekking detail page |
| `/lugares/<slug>` | Location-specific landing pages (7 locations) |

## Key Conventions

- All interactive components use the `"use client"` directive
- Bilingual text uses the `t(es, en)` helper from `useLanguage()` rather than i18n libraries
- shadcn/ui components live in `components/ui/` and use Radix primitives with Lucide icons
- Authentication tokens are JWT-based, stored in `localStorage`, and sent as Bearer tokens
- The backend API URL is configured via `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:3001`)
- CSS uses Tailwind v4 with CSS variables for theming (`--font-montserrat`, `--font-lato`)
