# Adventure Website

Next.js 16 front-end for Patagonia Trekking, a bilingual (Spanish/English) adventure tourism website. Built with React 19, Tailwind CSS 4, and shadcn/ui components (New York style).

## Tech Stack

- **Framework**: Next.js 16.0.10 (App Router, React Server Components enabled)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4.1 with `tailwindcss-animate` and `tw-animate-css`
- **UI Library**: shadcn/ui (New York style, Lucide icons, Radix UI primitives)
- **Forms**: react-hook-form 7 + zod 3 validation (`@hookform/resolvers`)
- **Charts**: Recharts 2.15
- **Analytics**: Vercel Analytics
- **Package Manager**: pnpm

## Project Structure

```
adventure-website/
  app/
    layout.tsx              # Root layout (AuthProvider > LanguageProvider)
    page.tsx                # Home page
    globals.css             # Global styles (Tailwind v4)
    actividades/page.tsx    # Activities listing
    calendario/page.tsx     # Calendar view
    contacto/page.tsx       # Contact page
    login/page.tsx          # Login page (auth)
    registro/page.tsx       # Registration page (auth)
    nosotros/page.tsx       # About us
    reservar/page.tsx       # Booking page
    trekkings/
      page.tsx              # Trekkings listing
      [id]/page.tsx         # Trekking detail (dynamic route)
    lugares/                # Location landing pages
      cerro-guanaco/page.tsx
      glaciar-ojo-del-albino/page.tsx
      glaciar-vinciguerra/page.tsx
      laguna-de-los-tempanos/page.tsx
      laguna-esmeralda/page.tsx
      valle-de-andorra/page.tsx
      valle-tierra-mayor/page.tsx
  components/
    navigation.tsx          # Main navbar with auth-aware UI
    hero-section.tsx        # Landing hero
    top-experiences.tsx     # Featured experiences
    destinations-section.tsx
    testimonials-section.tsx
    cta-section.tsx
    footer.tsx
    about-content.tsx
    actividades-view.tsx
    calendar-view.tsx
    contact-form.tsx
    reservar-view.tsx
    trekking-detail.tsx
    trekkings-list.tsx
    lugar-landing.tsx
    image-gallery-lightbox.tsx
    scroll-to-top.tsx
    theme-provider.tsx
    ui/                     # shadcn/ui primitives (button, card, input, etc.)
  contexts/
    auth-context.tsx        # Authentication state (JWT-based)
    language-context.tsx    # i18n toggle (es/en)
  lib/
    api.ts                  # API client with JWT auth headers
    types.ts                # Shared TypeScript interfaces
    whatsapp.ts             # WhatsApp link helper
    utils.ts                # Utility functions (cn, etc.)
```

## Running the Project

```bash
pnpm install
pnpm dev          # Development server on default port
pnpm build        # Production build (uses next build --webpack)
pnpm start        # Production server on port 3005
pnpm lint         # ESLint
```

The `.sundaysrc` configures the runtime environment:
- Runtime: `node`
- Build command: `pnpm exec next build --webpack`
- Start command: `pnpm exec next start -p 3005`
- Port: `3005`

## Path Aliases

Configured in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

All imports use the `@/` prefix. Examples:
- `import { Navigation } from "@/components/navigation"`
- `import { useAuth } from "@/contexts/auth-context"`
- `import { apiFetch } from "@/lib/api"`
- `import type { AuthUser } from "@/lib/types"`

## Context Providers

The root layout (`app/layout.tsx`) wraps the entire application with two context providers. `AuthProvider` is the outermost, followed by `LanguageProvider`:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${lato.variable} font-sans antialiased`}>
        <ScrollToTop />
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
```

### AuthProvider (`contexts/auth-context.tsx`)

Manages JWT-based authentication state. On mount, calls the backend `/api/auth/me` endpoint to validate any existing session (relying on cookies sent by the browser); the token itself is held in memory only and is never written to `localStorage` or `sessionStorage`, to avoid XSS exfiltration.

Exposed via `useAuth()` hook:

```tsx
type AuthContextType = {
  user: AuthUser | null   // Current user or null if unauthenticated
  isLoading: boolean      // True while checking token on mount
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
}
```

Token storage:
- Held in memory only (a module-scoped variable in `lib/api.ts`); never persisted to `localStorage`/`sessionStorage` to mitigate XSS token theft
- Automatically attached to API requests via the `apiFetch` helper
- Cleared on logout or when `/api/auth/me` returns an error
- The proper long-term storage is an `HttpOnly` + `Secure` + `SameSite` cookie set by the backend on login; that change is tracked separately

Login/register flow:
1. Call `login()` or `register()` with credentials
2. On success, the function stores the JWT and sets the user state
3. On failure, the function throws an `Error` (callers catch and display)

```tsx
// Example usage in a page component
const { login } = useAuth()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    await login({ email, password })
    router.push("/")
  } catch (err) {
    setError(err instanceof Error ? err.message : "Login error")
  }
}
```

### LanguageProvider (`contexts/language-context.tsx`)

Simple bilingual toggle between `"es"` (Spanish, default) and `"en"` (English). No persistence -- defaults to Spanish on each page load.

Exposed via `useLanguage()` hook:

```tsx
type LanguageContextType = {
  language: "es" | "en"
  setLanguage: (lang: "es" | "en") => void
  toggleLanguage: () => void
  t: (es: string, en: string) => string   // Inline translation helper
}
```

Usage pattern throughout the codebase:

```tsx
const { language, t } = useLanguage()

// Inline translations
<CardTitle>{t("Iniciar Sesion", "Log In")}</CardTitle>

// Conditional arrays based on language
const navItems = language === "es"
  ? [{ label: "Actividades", href: "/actividades" }]
  : [{ label: "Activities", href: "/actividades" }]
```

## API Client (`lib/api.ts`)

A typed `fetch` wrapper that handles JSON serialization, JWT auth headers, and error extraction:

```tsx
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  // Held in memory only — never read from localStorage (XSS hardening).
  const token = getAuthToken()

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || "Error en la solicitud")
  }

  return data as T
}
```

Key details:
- Backend URL configured via `NEXT_PUBLIC_API_URL` env var (defaults to `http://localhost:3001`)
- All requests include `Content-Type: application/json`
- JWT token automatically included as `Bearer` token when present in the in-memory token store (set via `setAuthToken`)
- Non-OK responses throw an `Error` with the server's `error` field or a default message
- Generic type parameter `T` ensures type safety at call sites

## TypeScript Types (`lib/types.ts`)

### Auth Types

```tsx
interface AuthUser {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface AuthResponse {
  message: string
  token: string
  user: AuthUser
}
```

### Domain Types

```tsx
type Difficulty = "Facil" | "Moderado" | "Avanzado"

interface Activity {
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

interface BookingRequest {
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

interface BookingResponse {
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

## Authentication Pages

### Login (`app/login/page.tsx`)

Client component with form fields for email and password. Features:
- Password visibility toggle (Eye/EyeOff icons)
- Error display in a destructive-styled banner
- Loading state on submit button
- Bilingual labels via `useLanguage().t()`
- Redirects to `/` on successful login
- Link to `/registro` for new users

### Registration (`app/registro/page.tsx`)

Client component with fields: first name, last name, email, password, confirm password. Features:
- Client-side password match validation before submission
- Password visibility toggle (shared for both password fields)
- 2-column grid layout for first/last name
- Minimum 6-character password requirement (`minLength={6}`)
- Redirects to `/` on successful registration
- Link to `/login` for existing users

Both pages share the same layout pattern:

```tsx
<>
  <Navigation />
  <main className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
    <Card className="w-full max-w-md">
      {/* Card with form content */}
    </Card>
  </main>
  <Footer />
</>
```

## Navigation Component

The `Navigation` component (`components/navigation.tsx`) is auth-aware and bilingual. It renders differently based on authentication state:

**Authenticated**: Shows user's first name with a `User` icon and a logout button (`LogOut` icon). On mobile, shows full name (first + last).

**Unauthenticated**: Shows "Ingresar"/"Log in" (ghost button) and "Registrarse"/"Sign up" (default button) linking to `/login` and `/registro`.

```tsx
{user ? (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-muted-foreground">
      <User className="h-4 w-4 inline mr-1" />
      {user.firstName}
    </span>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => { logout(); router.push("/") }}
      title={language === "es" ? "Cerrar sesion" : "Log out"}
    >
      <LogOut className="h-4 w-4" />
    </Button>
  </div>
) : (
  <div className="flex items-center gap-2">
    <Link href="/login">
      <Button variant="ghost" size="sm">
        {language === "es" ? "Ingresar" : "Log in"}
      </Button>
    </Link>
    <Link href="/registro">
      <Button size="sm">
        {language === "es" ? "Registrarse" : "Sign up"}
      </Button>
    </Link>
  </div>
)}
```

The nav is fixed to the top (`fixed top-0 z-50`) with backdrop blur. Desktop links are shown via `hidden md:flex`, and mobile uses a hamburger menu that toggles a dropdown.

Navigation items are defined inline with bilingual support:

```tsx
const navItems = language === "es"
  ? [
      { label: "Actividades", href: "/actividades" },
      { label: "Quienes Somos", href: "/nosotros" },
      { label: "Contacto", href: createWhatsAppHref(), isExternal: true },
    ]
  : [
      { label: "Activities", href: "/actividades" },
      { label: "About Us", href: "/nosotros" },
      { label: "Contact", href: createWhatsAppHref(), isExternal: true },
    ]
```

External links (WhatsApp contact) open in a new tab with `target="_blank"`.

## Page Composition Pattern

Pages are composed by importing and arranging section components. The home page demonstrates the typical pattern:

```tsx
// app/page.tsx
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { TopExperiences } from "@/components/top-experiences"
import { DestinationsSection } from "@/components/destinations-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

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

Each page includes `<Navigation />` at the top and `<Footer />` at the bottom. Content sections are self-contained components.

## Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001` |

## Fonts

Two Google Fonts loaded via `next/font/google`:
- **Montserrat** (`--font-montserrat`): Headings/display
- **Lato** (weights 300, 400, 700, `--font-lato`): Body text

## shadcn/ui Configuration

Configured in `components.json`:
- Style: `new-york`
- RSC: enabled
- Icon library: `lucide`
- Base color: `neutral`
- CSS variables: enabled
- UI components path: `@/components/ui`

The `components/ui/` directory contains a full set of Radix-based primitives: `button`, `card`, `input`, `label`, `dialog`, `dropdown-menu`, `tabs`, `toast`, `form`, `calendar`, `carousel`, and many more.
