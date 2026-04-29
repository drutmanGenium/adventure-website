# SUNDAYS.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

- **Package name:** `my-v0-project`
- **Version:** 0.1.0
- **Description:** A tourism website for "Patagonia Trek," a trekking and adventure company based in Ushuaia, Tierra del Fuego, Argentina. The site allows users to browse outdoor activities (glacier treks, lake hikes, boat tours, city tours), view availability calendars, and submit booking requests.
- **Primary language:** TypeScript
- **Framework:** Next.js 16 (App Router) with React 19
- **UI library:** shadcn/ui (new-york style) with Radix UI primitives
- **Styling:** Tailwind CSS v4 with custom OKLCH color theme
- **Deployment:** Vercel (auto-synced from v0.app)
- **Runtime config port:** 3005 (defined in `.sundaysrc`)

## Commands

```bash
# Install dependencies (pnpm is the preferred package manager per .sundaysrc)
pnpm install

# Start development server on port 3005
pnpm exec next dev

# Build for production (uses webpack per .sundaysrc override)
pnpm exec next build --webpack

# Start production server on port 3005
pnpm exec next start -p 3005

# Lint the codebase
pnpm run lint

# Standard npm alternatives (defined in package.json scripts)
npm run dev       # next dev
npm run build     # next build
npm run start     # next start
npm run lint      # eslint .
```

The `.sundaysrc` file defines runtime overrides:

```json
{
  "runtime": "node",
  "install": "pnpm install",
  "build": "pnpm exec next build --webpack",
  "start": "pnpm exec next start -p 3005",
  "port": 3005
}
```

## Architecture

### Directory Structure

```
.
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Montserrat + Lato fonts, LanguageProvider, Analytics)
│   ├── page.tsx                  # Homepage (hero, experiences, destinations, testimonials, CTA)
│   ├── globals.css               # Tailwind imports + custom OKLCH theme variables
│   ├── actividades/
│   │   └── page.tsx              # Activities listing with search/filter bar
│   ├── calendario/
│   │   └── page.tsx              # Calendar view of scheduled events
│   ├── contacto/
│   │   └── page.tsx              # Contact form page
│   ├── nosotros/
│   │   └── page.tsx              # About us page (team, values)
│   ├── reservar/
│   │   └── page.tsx              # Booking/checkout page
│   ├── trekkings/
│   │   └── [id]/
│   │       └── page.tsx          # Dynamic trekking detail page
│   └── lugares/                  # SEO landing pages for destinations
│       ├── laguna-esmeralda/
│       ├── glaciar-vinciguerra/
│       ├── glaciar-ojo-del-albino/
│       ├── laguna-de-los-tempanos/
│       ├── cerro-guanaco/
│       ├── valle-de-andorra/
│       └── valle-tierra-mayor/
├── components/                   # React components
│   ├── ui/                       # shadcn/ui primitives (~55 components)
│   ├── navigation.tsx            # Fixed top nav with language toggle and avatar upload
│   ├── avatar-upload.tsx         # Dialog-based avatar upload with preview, validation, and base64 encoding
│   ├── user-avatar.tsx           # Reusable avatar display component with size variants and initials fallback
│   ├── hero-section.tsx          # Full-screen hero with CTA
│   ├── top-experiences.tsx       # Featured experiences carousel
│   ├── destinations-section.tsx  # Destination cards with horizontal scroll
│   ├── testimonials-section.tsx  # Customer reviews section with user avatars
│   ├── cta-section.tsx           # Call-to-action banner
│   ├── footer.tsx                # Site footer with links and contact info
│   ├── actividades-view.tsx      # Activities listing + search bar + filters + mini calendar
│   ├── calendar-view.tsx         # Monthly calendar with event cards
│   ├── trekking-detail.tsx       # Full trekking detail page (itinerary, pricing, gallery)
│   ├── reservar-view.tsx         # Booking form with validation and price summary
│   ├── contact-form.tsx          # Contact form with FAQ section
│   ├── about-content.tsx         # About page content (team, values, member avatars)
│   ├── lugar-landing.tsx         # Reusable SEO landing page template for destinations
│   ├── image-gallery-lightbox.tsx# Lightbox gallery with keyboard/touch navigation
│   ├── benefits-section.tsx      # Benefits section with custom SVG icons
│   ├── scroll-to-top.tsx         # Scroll restoration on route change
│   ├── theme-provider.tsx        # next-themes dark/light mode provider
│   └── trekkings-list.tsx        # Trekkings listing component
├── contexts/
│   └── language-context.tsx      # i18n context (Spanish/English toggle)
├── hooks/
│   ├── use-mobile.ts             # Responsive breakpoint hook (768px)
│   └── use-toast.ts              # Toast notification state management
├── lib/
│   ├── data.ts                   # Centralized data store (activities, trekking details, calendar events, bookings)
│   ├── types.ts                  # Shared TypeScript interfaces
│   ├── utils.ts                  # Tailwind cn() merge utility
│   └── whatsapp.ts               # WhatsApp deep link generator
├── public/                       # Static assets (30+ high-res photos, icons, placeholders)
├── styles/
│   └── globals.css               # Additional global styles
├── components.json               # shadcn/ui configuration
├── next.config.mjs               # Next.js config (unoptimized images, 1 CPU worker)
├── postcss.config.mjs            # PostCSS with @tailwindcss/postcss
├── tsconfig.json                 # TypeScript config (ES6 target, bundler resolution)
└── package.json                  # Dependencies and scripts
```

### Key Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout: sets `lang="es"`, loads Montserrat and Lato fonts, wraps app in `LanguageProvider` and `ScrollToTop`, includes Vercel Analytics |
| `lib/types.ts` | Central type definitions: `Activity`, `TrekkingDetail`, `CalendarEvent`, `BookingRequest`, `BookingResponse`, `ContactRequest`, `UserProfile` |
| `components/avatar-upload.tsx` | Dialog-based avatar upload component with file validation (type + 2MB size limit), base64 encoding, preview, and remove functionality. Integrated into the navigation bar. |
| `components/user-avatar.tsx` | Presentational avatar component with five size variants (`xs`/`sm`/`md`/`lg`/`xl`), initials fallback, and optional image source. Used in about-content and testimonials. |
| `lib/data.ts` | In-memory data store with 8 activities, 8 trekking detail entries, 35 calendar events, and placeholder arrays for bookings and contact messages |
| `components/actividades-view.tsx` | Most complex component: Airbnb-style search bar with category/date-range/guests filters, mini calendar widget, activity card grid, and empty state |
| `components/lugar-landing.tsx` | Reusable template for SEO destination pages with structured data, map embeds, FAQ schema, and gallery carousel |
| `contexts/language-context.tsx` | Client-side i18n with `t(es, en)` helper function for bilingual string rendering |
| `lib/whatsapp.ts` | WhatsApp link generator using `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` env var |

### Design Patterns

**1. App Router Page Pattern**

Every page follows the same structural pattern -- a `<main>` wrapper with `Navigation`, page content, and `Footer`:

```tsx
// app/nosotros/page.tsx
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about-content"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <AboutContent />
      </div>
      <Footer />
    </main>
  )
}
```

The `pt-16` padding compensates for the fixed navigation bar height (h-16).

**2. Client Components with Suspense Boundaries**

Pages that read `useSearchParams()` wrap their content component in `<Suspense>` to support Next.js streaming:

```tsx
// app/actividades/page.tsx
export default function ActividadesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Suspense>
          <ActividadesView />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
```

**3. Bilingual i18n via Context**

The `LanguageProvider` wraps the entire app in the root layout. Components use the `t()` helper for inline translations:

```tsx
// contexts/language-context.tsx
type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (es: string, en: string) => string
}

// Usage in components:
const { t } = useLanguage()
<h1>{t("Explorá Tierra del Fuego", "Explore Tierra del Fuego")}</h1>
```

**4. In-Memory Data Store Pattern**

All data lives in `lib/data.ts` as exported constants and mutable arrays. There is no database -- bookings and contact messages are stored in memory:

```typescript
// lib/data.ts
export const bookings: Array<{
  id: string
  activityId: string
  activityTitle: string
  date: string
  firstName: string
  lastName: string
  email: string
  phone: string
  pickupAddress: string
  city: string
  references: string
  isHotel: boolean
  hotelName: string
  guests: number
  total: number
  currency: string
  status: "confirmed" | "pending"
  createdAt: string
}> = []
```

**5. SEO Landing Page Template**

Destination pages (`/lugares/*`) use a shared `LugarLanding` component with a typed `LugarData` interface for structured, SEO-friendly content:

```typescript
// components/lugar-landing.tsx
export interface LugarData {
  slug: string
  calendarSlug: string | null
  metaTitle: string
  metaDescription: string
  title: string
  heroSubtitle: string
  heroIntro: string
  heroImage: string
  heroImageAlt: string
  geo: { latitude: number; longitude: number }
  ubicacion: React.ReactNode
  caracteristicas: React.ReactNode
  importancia: React.ReactNode
  popularidad: React.ReactNode
  galleryImages: { src: string; alt: string }[]
  mapEmbedUrl: string
  faqs: LugarFAQ[]
}
```

**6. Form Validation Pattern**

The booking form (`reservar-view.tsx`) implements field-level validation with blur-triggered errors, ref-based scroll-to-error, and a centralized `validateAll` function:

```typescript
const validateField = useCallback((field: keyof BookingForm, values: BookingForm): FormErrors => {
  const errs: FormErrors = {}
  switch (field) {
    case "firstName":
      if (!values.firstName.trim()) errs.firstName = "El nombre es obligatorio."
      break
    case "email":
      if (!values.email.trim()) errs.email = "El email es obligatorio."
      else if (!isValidEmail(values.email)) errs.email = "Ingresá un email válido."
      break
    // ...
  }
  return errs
}, [])
```

**7. Tailwind CN Utility**

All components use the `cn()` utility from `lib/utils.ts` for conditional class merging:

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**8. Avatar Component System**

The avatar feature is split into two components with distinct responsibilities:

- `UserAvatar` -- a pure display component that renders a Radix `Avatar` with an image source or initials fallback. It accepts five size variants and an optional `className` for border/shadow customization:

```tsx
// components/user-avatar.tsx
interface UserAvatarProps {
  src?: string | null
  name?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeClasses = {
  xs: "size-6",
  sm: "size-8",
  md: "size-10",
  lg: "size-16",
  xl: "size-24",
}

// Usage in about-content.tsx (team member cards):
<UserAvatar
  src={member.image}
  name={member.name}
  size="lg"
  className="border-4 border-background shadow-md"
/>
```

- `AvatarUpload` -- a client component that wraps a `Dialog` trigger around an avatar button. Clicking opens a modal with file input, preview, save, and remove actions. It validates file type (JPG, PNG, WebP, GIF) and size (2MB max), reads the file as a base64 data URL, and passes the raw base64 string and MIME type to the parent via `onAvatarChange`:

```tsx
// components/avatar-upload.tsx
interface AvatarUploadProps {
  currentAvatarUrl?: string | null
  userName?: string
  onAvatarChange: (avatarData: string | null, mimeType: string | null) => void
  size?: "sm" | "md" | "lg"
}

// Usage in navigation.tsx:
const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

const handleAvatarChange = useCallback((avatarData: string | null, mimeType: string | null) => {
  if (avatarData && mimeType) {
    const dataUrl = `data:${mimeType};base64,${avatarData}`
    setAvatarUrl(dataUrl)
  } else {
    setAvatarUrl(null)
  }
}, [])

<AvatarUpload
  currentAvatarUrl={avatarUrl}
  onAvatarChange={handleAvatarChange}
  size="sm"
/>
```

The avatar state is currently held in `Navigation` component state (not persisted). The `AvatarUpload` appears in both the desktop and mobile navigation layouts. The `UserAvatar` display component is used in `about-content.tsx` (team member cards) and `testimonials-section.tsx` (reviewer avatars). Both components use the bilingual `t()` helper for all user-facing strings.

## Data Model

There is no external database. All data is hardcoded in TypeScript constants. Key types from `lib/types.ts`:

### Activity

```typescript
export interface Activity {
  id: string
  title: string
  cover_image: string
  price_from: number          // USD price per person
  currency: string            // "USD"
  difficulty: "Facil" | "Moderado" | "Avanzado"
  duration: string            // e.g. "4 hs", "2 dias"
  category: Category
  availability_dates: string[] // ISO date strings
  capacity_remaining: number
  rating?: number
  reviews_count?: number
  popular?: boolean
  location: string            // Always "Ushuaia" currently
  calendarioSlug?: string
  galleryImages?: { src: string; alt: string }[]
}
```

### TrekkingDetail

```typescript
export interface TrekkingDetail {
  title: string
  location: string
  difficulty: string
  image: string
  duration: string
  groupSize: string           // e.g. "8-12"
  price: string               // ARS formatted, e.g. "$180.000"
  type: "Trekking" | "Campamento" | "Montanismo"
  description: string
  longDescription: string
  itinerary: { day: string; title: string; description: string }[]
  included: string[]
  notIncluded: string[]
  requirements: string[]
  dates: string[]
}
```

### CalendarEvent

```typescript
export interface CalendarEvent {
  id: string
  title: string
  date: string
  month: string
  year: number
  difficulty: "Facil" | "Moderado" | "Avanzado"
  location: string
  duration: string
  groupSize: string
  price: string
  spotsLeft: number
}
```

### UserProfile

```typescript
export interface UserProfile {
  id: string
  name: string
  email: string
  avatarUrl: string
  createdAt: string
  updatedAt: string
}
```

This type is defined in `lib/types.ts` to support the avatar feature. It is not yet backed by a data store or API endpoint -- it exists as the target schema for when user profile persistence is wired up.

### Current Activities (8 total)

| ID | Title | Price | Difficulty | Duration |
|----|-------|-------|------------|----------|
| `laguna-esmeralda-express` | Laguna Esmeralda, Visita Express | USD 45 | Facil | 4 hs |
| `laguna-esmeralda-sunset` | Laguna Esmeralda Sunset | USD 55 | Facil | 5 hs |
| `glaciar-vinciguerra` | Glaciar Vinciguerra y Laguna de los Tempanos | USD 75 | Moderado | 8 hs |
| `ojo-del-albino` | Ojo del Albino -- Ice Trekking | USD 95 | Avanzado | 9 hs |
| `campamento-vinciguerra` | Campamento Vinciguerra -- Noche en la montana | USD 140 | Avanzado | 2 dias |
| `parque-nacional-tierra-del-fuego` | Parque Nacional Tierra del Fuego | USD 35 | Facil | 3 hs |
| `canal-beagle-navegacion` | Navegacion por el Canal Beagle | USD 60 | Facil | 3.5 hs |
| `city-tour-ushuaia` | City Tour Ushuaia | USD 25 | Facil | 2.5 hs |

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `HomePage` | Landing page with hero, top experiences, destinations, testimonials, CTA |
| `/actividades` | `ActividadesPage` | Searchable/filterable activities grid with Airbnb-style search bar |
| `/trekkings/[id]` | `TrekkingDetailPage` | Dynamic detail page for a specific trekking (itinerary, gallery, pricing) |
| `/calendario` | `CalendarPage` | Monthly calendar view of all scheduled departures |
| `/reservar` | `ReservarPage` | Booking checkout form (expects `?departureId=<activityId>-<date>`) |
| `/contacto` | `ContactoPage` | Contact form with company info and FAQ |
| `/nosotros` | `AboutPage` | About page with team bios, values, and company history |
| `/lugares/laguna-esmeralda` | `LugarLanding` | SEO landing page for Laguna Esmeralda |
| `/lugares/glaciar-vinciguerra` | `LugarLanding` | SEO landing page for Glaciar Vinciguerra |
| `/lugares/glaciar-ojo-del-albino` | `LugarLanding` | SEO landing page for Glaciar Ojo del Albino |
| `/lugares/laguna-de-los-tempanos` | `LugarLanding` | SEO landing page for Laguna de los Tempanos |
| `/lugares/cerro-guanaco` | `LugarLanding` | SEO landing page for Cerro Guanaco |
| `/lugares/valle-de-andorra` | `LugarLanding` | SEO landing page for Valle de Andorra |
| `/lugares/valle-tierra-mayor` | `LugarLanding` | SEO landing page for Valle Tierra Mayor |

### Booking Flow

1. User browses `/actividades` and selects an activity card
2. Navigates to `/trekkings/<id>?from=actividades&date=<iso-date>`
3. Selects a departure date and clicks "Reservar"
4. Redirected to `/reservar?departureId=<activityId>-<date>`
5. Fills out participant details, pickup address, and guest count
6. Submits booking (currently client-side only -- no server action)

## Environment Variables

| Variable | Usage | Location |
|----------|-------|----------|
| `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` | WhatsApp phone number for contact links | `lib/whatsapp.ts` |

If not set, falls back to `"549XXXXXXXXX"` (placeholder).

## Important Notes

### Conventions

- **Language:** The site defaults to Spanish (`lang="es"` on `<html>`). English is available via the globe toggle in the navigation. All user-facing strings use the `t(es, en)` pattern from `useLanguage()`.
- **Component organization:** Page-level components live in `components/` (e.g., `actividades-view.tsx`). Reusable UI primitives live in `components/ui/`. All custom components are `"use client"` since they use hooks.
- **Data duplication:** Activity data exists in two places: `lib/data.ts` (canonical store) and `components/actividades-view.tsx` (inline copy). The `reservar-view.tsx` component imports from `actividades-view.tsx`. When modifying activity data, update both locations.
- **Path aliases:** The `@/*` alias maps to the project root, configured in `tsconfig.json`.
- **Image handling:** `next.config.mjs` sets `images.unoptimized: true`, so all images are served as-is from `/public`. No `next/image` optimization.
- **Fonts:** Montserrat (headings, general text via `--font-montserrat`) and Lato (body weight variants 300, 400, 700 via `--font-lato`), loaded via `next/font/google`.

### Gotchas

- **No backend API:** Despite having `BookingRequest`/`BookingResponse` types in `lib/types.ts` and in-memory `bookings`/`contactMessages` arrays in `lib/data.ts`, there are no server actions or API routes. The booking form submits client-side only and the contact form logs to console.
- **Duplicated data:** The `ACTIVITIES` array and related types are defined in both `lib/data.ts` and `components/actividades-view.tsx`. The component-level copy is the one actually used by the UI.
- **Memory-limited build:** `next.config.mjs` sets `experimental.cpus: 1` to reduce memory usage during builds.
- **shadcn/ui component count:** There are ~55 UI components in `components/ui/`. Most are standard shadcn/ui components and should not need modification.
- **Dynamic route params:** The `trekkings/[id]/page.tsx` uses `params: Promise<{ id: string }>` (Next.js 16 async params pattern) and must `await params` before accessing `id`.
- **Tailwind v4:** This project uses Tailwind CSS v4 with `@tailwindcss/postcss` (not the older `tailwindcss` PostCSS plugin). The theme is configured via CSS custom properties in `globals.css` using `@theme inline`, not in a `tailwind.config.ts` file.
- **OKLCH color system:** All theme colors use the OKLCH color space (e.g., `oklch(0.42 0.08 155)` for primary green). The primary color is a forest green, secondary is a dark blue, and the accent is a warm earth tone.
- **Vercel Analytics:** Included via `@vercel/analytics/next` in the root layout. Runs automatically in production.
- **Avatar state is ephemeral:** The user avatar uploaded via `AvatarUpload` in the navigation is stored in React state (`useState` in `navigation.tsx`). It is lost on page navigation or refresh. The `UserProfile` type exists in `lib/types.ts` but there is no persistence layer, API endpoint, or context provider for user profile data yet. Testimonial avatars in `testimonials-section.tsx` default to `null` (showing initials fallback).
