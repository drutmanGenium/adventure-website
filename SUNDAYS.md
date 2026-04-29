# Adventure Website - Frontend

## Overview

Next.js 16 marketing and booking website for a Patagonia trekking company based in Ushuaia, Tierra del Fuego. The site supports bilingual content (Spanish/English), user authentication with avatar support, activity browsing, calendar-based booking, and contact via WhatsApp. Built with React 19, Tailwind CSS 4, and shadcn/ui components (New York style).

## Tech Stack

- **Framework**: Next.js 16.0.10 (App Router, RSC enabled)
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4.1.9 with `tw-animate-css`, CSS variables for theming
- **UI Components**: shadcn/ui (New York style) via `@radix-ui/*` primitives
- **Icons**: `lucide-react`
- **Forms**: `react-hook-form` + `zod` for validation
- **Charts**: `recharts`
- **Analytics**: `@vercel/analytics`
- **Fonts**: Montserrat (headings) + Lato (body) via `next/font/google`
- **Package Manager**: pnpm

## Project Structure

```
adventure-website/
  app/
    layout.tsx              # Root layout with AuthProvider + LanguageProvider
    page.tsx                # Homepage (hero, top experiences, destinations, testimonials, CTA)
    globals.css             # Tailwind base + CSS custom properties
    actividades/page.tsx    # Activity listing page
    calendario/page.tsx     # Calendar view for scheduling
    contacto/page.tsx       # Contact page
    login/page.tsx          # Login/register page
    nosotros/page.tsx       # About page
    perfil/page.tsx         # User profile page (avatar management)
    reservar/page.tsx       # Booking page
    trekkings/
      page.tsx              # Trekking listing
      [id]/page.tsx         # Dynamic trekking detail
    lugares/                # Location landing pages
      cerro-guanaco/
      glaciar-ojo-del-albino/
      glaciar-vinciguerra/
      laguna-de-los-tempanos/
      laguna-esmeralda/
      valle-de-andorra/
      valle-tierra-mayor/
  components/
    navigation.tsx          # Fixed navbar with auth-aware user menu + avatar
    footer.tsx
    hero-section.tsx
    top-experiences.tsx
    destinations-section.tsx
    testimonials-section.tsx
    cta-section.tsx
    about-content.tsx
    actividades-view.tsx
    benefits-section.tsx
    calendar-view.tsx
    contact-form.tsx
    image-gallery-lightbox.tsx
    login-form.tsx          # Login/register form component
    lugar-landing.tsx
    profile-view.tsx        # Profile page with avatar upload/remove
    reservar-view.tsx
    scroll-to-top.tsx
    theme-provider.tsx
    trekking-detail.tsx
    trekkings-list.tsx
    ui/                     # shadcn/ui components (avatar, button, card, dropdown-menu, etc.)
  contexts/
    auth-context.tsx        # Authentication state (user, token, login, register, logout, updateAvatar)
    language-context.tsx    # Bilingual i18n (es/en toggle)
  lib/
    data.ts                 # Static data: ACTIVITIES, TREKKINGS, CALENDAR_EVENTS
    types.ts                # Shared TypeScript interfaces
    utils.ts                # cn() utility (clsx + tailwind-merge)
    whatsapp.ts             # WhatsApp link generator
```

## Running the Project

```bash
pnpm install
pnpm dev          # Development server
pnpm build        # Production build (uses webpack)
pnpm start        # Production server on port 3005
pnpm lint         # ESLint
```

The dev server runs on the default Next.js port. Production runs on port 3005 (configured in `.sundaysrc`).

## Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001` |
| `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` | WhatsApp contact number | `549XXXXXXXXX` |

## Context Provider Hierarchy

The root layout wraps all pages in two context providers. `AuthProvider` is the outermost so both the language and auth systems are available everywhere:

```tsx
// app/layout.tsx
<html lang="es">
  <body className={`${montserrat.variable} ${lato.variable} font-sans antialiased`}>
    <ScrollToTop />
    <AuthProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AuthProvider>
    <Analytics />
  </body>
</html>
```

## Authentication System

### AuthContext (`contexts/auth-context.tsx`)

Client-side auth using JWT tokens stored in `localStorage`. The context provides:

```typescript
type AuthContextType = {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ error?: string }>
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<{ error?: string }>
  logout: () => void
  updateAvatar: (avatarUrl: string) => void
}
```

Session persistence uses `localStorage` keys `auth_token` and `auth_user`. On mount, the provider restores any saved session. The `isLoading` flag is `true` until hydration completes, preventing UI flash of unauthenticated state.

### Usage Pattern

```tsx
import { useAuth } from "@/contexts/auth-context"

function MyComponent() {
  const { user, token, isLoading, login, logout, updateAvatar } = useAuth()

  if (isLoading) return null // Wait for hydration
  if (!user) return <RedirectToLogin />

  return <div>Hello {user.firstName}</div>
}
```

### API Endpoints Used

- `POST /api/auth/login` - Returns `{ token, user }`
- `POST /api/auth/register` - Returns `{ token, user }`
- `POST /api/upload/avatar` - Upload avatar image (base64), returns `{ avatarUrl }`
- `DELETE /api/auth/avatar` - Remove avatar

All authenticated requests use `Authorization: Bearer <token>` header.

### Login/Register Form (`components/login-form.tsx`)

A single component that toggles between login and register modes. On success, redirects to homepage via `router.push("/")`.

```tsx
// Login mode: sends email + password
const result = await login(formData.email, formData.password)

// Register mode: sends firstName, lastName, email, password
const result = await register(formData)
```

## Avatar System

### User Type

```typescript
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl: string | null
  createdAt: string
}
```

### Avatar URL Resolution

Both `navigation.tsx` and `profile-view.tsx` use a shared pattern for resolving avatar URLs. If the URL is relative, it is prefixed with `NEXT_PUBLIC_API_URL`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

function getAvatarUrl(avatarUrl: string | null): string | undefined {
  if (!avatarUrl) return undefined
  if (avatarUrl.startsWith("http")) return avatarUrl
  return `${API_URL}${avatarUrl}`
}
```

### Navigation Avatar and User Menu (`components/navigation.tsx`)

The navigation bar is auth-aware. When a user is logged in, an avatar dropdown replaces the "Log in" button. The `UserAvatar` component shows the user's uploaded image or falls back to initials:

```tsx
function UserAvatar({ className }: { className?: string }) {
  const { user } = useAuth()
  if (!user) return null

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()

  return (
    <Avatar className={className}>
      <AvatarImage src={getAvatarUrl(user.avatarUrl)} alt={`${user.firstName} ${user.lastName}`} />
      <AvatarFallback className="bg-red-500 text-white text-xs font-bold">{initials}</AvatarFallback>
    </Avatar>
  )
}
```

The `UserMenu` dropdown provides links to the profile page (`/perfil`) and a logout action:

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
      <UserAvatar className="h-9 w-9" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-56">
    <DropdownMenuLabel>...</DropdownMenuLabel>
    <DropdownMenuItem asChild>
      <Link href="/perfil">...</Link>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={logout}>...</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

Conditional rendering in the nav bar prevents flash during hydration:

```tsx
{!isLoading && (
  user ? <UserMenu /> : (
    <Link href="/login">
      <Button variant="outline" size="sm">{t("Ingresar", "Log in")}</Button>
    </Link>
  )
)}
```

### Profile Page (`components/profile-view.tsx`)

The profile view allows avatar upload, removal, and displays user information. Redirects to `/login` if unauthenticated.

Avatar upload sends base64-encoded image data to the backend:

```typescript
const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  // Validate: JPEG, PNG, WebP, GIF only; max 2MB
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  if (!allowedTypes.includes(file.type)) { /* show error */ return }
  if (file.size > 2 * 1024 * 1024) { /* show error */ return }

  const reader = new FileReader()
  reader.onload = async () => {
    const base64 = (reader.result as string).split(",")[1]
    const res = await fetch(`${API_URL}/api/upload/avatar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ image: base64, mimeType: file.type }),
    })
    const data = await res.json()
    if (res.ok) updateAvatar(data.avatarUrl)
  }
  reader.readAsDataURL(file)
}
```

Avatar removal calls `DELETE /api/auth/avatar` and sets `avatarUrl` to empty string.

## Internationalization

### LanguageContext (`contexts/language-context.tsx`)

Simple client-side i18n with `es` (default) and `en` languages. The `t()` helper selects the correct string:

```typescript
type LanguageContextType = {
  language: "es" | "en"
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (es: string, en: string) => string
}
```

Usage throughout components:

```tsx
const { t } = useLanguage()
// ...
<CardTitle>{t("Mi Perfil", "My Profile")}</CardTitle>
```

## Shared Types (`lib/types.ts`)

Key interfaces shared across the frontend:

```typescript
export interface Activity {
  id: string
  title: string
  cover_image: string
  price_from: number
  currency: string
  difficulty: "Facil" | "Moderado" | "Avanzado"
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

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl: string | null
  createdAt: string
}

export interface AuthResponse {
  message: string
  token: string
  user: User
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
```

## Page Composition Pattern

All pages follow a consistent structure with `Navigation` at top and `Footer` at bottom:

```tsx
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function SomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">   {/* offset for fixed nav */}
        <PageContent />
      </div>
      <Footer />
    </main>
  )
}
```

The navigation is fixed (`position: fixed`) with `h-16`, so page content uses `pt-16` to avoid overlap.

## WhatsApp Integration (`lib/whatsapp.ts`)

Contact links redirect to WhatsApp with a preset message:

```typescript
export function createWhatsAppHref(customMessage?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || DEFAULT_PHONE
  const message = customMessage || PRESET_MESSAGE
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
```

## Static Data (`lib/data.ts`)

Activity and trekking data is stored as static arrays in `lib/data.ts` rather than fetched from the API. Exports include `ACTIVITIES`, `TREKKINGS`, and `CALENDAR_EVENTS` arrays typed with the interfaces from `lib/types.ts`.

## UI Component Library

Uses shadcn/ui with the "new-york" style variant. Components are in `components/ui/` and include: `accordion`, `alert`, `alert-dialog`, `avatar`, `badge`, `button`, `calendar`, `card`, `carousel`, `checkbox`, `dialog`, `dropdown-menu`, `form`, `input`, `label`, `popover`, `select`, `separator`, `sheet`, `table`, `tabs`, `textarea`, `toast`, `tooltip`, and more.

Configuration in `components.json`:

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
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## Key Routes

| Route | Description |
|---|---|
| `/` | Homepage with hero, top experiences, destinations, testimonials, CTA |
| `/actividades` | Activity listing/browsing |
| `/calendario` | Calendar view for scheduling |
| `/contacto` | Contact page |
| `/login` | Login/register form |
| `/nosotros` | About the company |
| `/perfil` | User profile with avatar management (auth-protected) |
| `/reservar` | Booking form |
| `/trekkings` | Trekking listing |
| `/trekkings/[id]` | Individual trekking detail |
| `/lugares/*` | Location-specific landing pages (7 locations) |
