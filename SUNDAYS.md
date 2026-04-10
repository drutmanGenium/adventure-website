# Adventure Website (Patagonia Trek)

A Next.js 16 marketing and booking website for a Patagonia trekking tourism company based in Ushuaia, Tierra del Fuego. The site is bilingual (Spanish/English), uses Tailwind CSS v4 with a custom earthy/nature-inspired design system, and shadcn/ui (New York style) for component primitives.

## Tech Stack

- **Framework**: Next.js 16.0.10 with App Router and React 19.2
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4.1 with `tw-animate-css`, CSS custom properties for theming
- **UI Components**: shadcn/ui (New York variant) with Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Analytics**: Vercel Analytics
- **Fonts**: Montserrat (headings/sans) + Lato (body weights 300/400/700) via `next/font/google`

## Project Structure

```
adventure-website/
  app/
    layout.tsx              # Root layout with fonts, LanguageProvider, ScrollToTop, Analytics
    page.tsx                # Home page (Navigation, Hero, TopExperiences, Destinations, Testimonials, CTA, Footer)
    globals.css             # Tailwind v4 imports, theme variables (light + dark), @theme inline block
    actividades/page.tsx    # Activities listing with filtering and search
    calendario/page.tsx     # Calendar view of upcoming treks
    contacto/page.tsx       # Contact form page
    nosotros/page.tsx       # About us page
    reservar/page.tsx       # Booking/reservation page
    trekkings/
      page.tsx              # Trekkings list
      [id]/page.tsx         # Dynamic trekking detail page
    lugares/                # Static destination landing pages
      laguna-esmeralda/page.tsx
      glaciar-vinciguerra/page.tsx
      glaciar-ojo-del-albino/page.tsx
      laguna-de-los-tempanos/page.tsx
      valle-de-andorra/page.tsx
      valle-tierra-mayor/page.tsx
      cerro-guanaco/page.tsx
  components/
    navigation.tsx          # Fixed navbar with mobile hamburger menu and language toggle
    hero-section.tsx        # Full-screen hero with background image and CTA
    top-experiences.tsx     # Featured activities grid + benefits pillars section
    destinations-section.tsx # Horizontal-scroll destination cards
    testimonials-section.tsx
    benefits-section.tsx
    cta-section.tsx
    footer.tsx              # 4-column footer with newsletter signup
    about-content.tsx
    actividades-view.tsx    # Activity listing with search, filtering, calendar dates
    calendar-view.tsx
    contact-form.tsx
    image-gallery-lightbox.tsx
    lugar-landing.tsx       # Reusable destination landing page component
    reservar-view.tsx
    scroll-to-top.tsx
    theme-provider.tsx
    trekking-detail.tsx
    trekkings-list.tsx
    ui/                     # shadcn/ui primitives (button, card, badge, dialog, etc.)
  contexts/
    language-context.tsx    # Bilingual context provider (es/en)
  lib/
    data.ts                 # Static activity, trekking, and calendar data
    types.ts                # Shared TypeScript interfaces
    utils.ts                # cn() utility (clsx + tailwind-merge)
    whatsapp.ts             # WhatsApp link generator with env var support
```

## Configuration

### Path Aliases

The project uses `@/*` mapped to the project root in `tsconfig.json`:

```typescript
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
```

### Next.js Config (`next.config.mjs`)

ESLint and TypeScript errors are ignored during builds. Images are unoptimized (no Image Optimization API):

```javascript
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}
```

### shadcn/ui (`components.json`)

Uses the `new-york` style, RSC-enabled, with Lucide icons:

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  },
  "iconLibrary": "lucide"
}
```

## Design System and Theming

### Color Tokens

The theme uses OKLCH colors defined as CSS custom properties in `app/globals.css`. The palette is earthy and nature-inspired, built around deep greens and warm neutrals:

```css
:root {
  --primary: oklch(0.42 0.08 155);           /* Deep forest green */
  --primary-foreground: oklch(0.99 0.01 85); /* Near-white for text on primary */
  --secondary: oklch(0.3 0.05 240);          /* Deep blue-grey */
  --secondary-foreground: oklch(0.99 0.01 85);
  --background: oklch(0.98 0.008 85);        /* Warm off-white */
  --foreground: oklch(0.25 0.02 140);        /* Dark green-grey */
  --accent: oklch(0.85 0.04 75);             /* Warm tan */
  --muted: oklch(0.94 0.01 85);
  --border: oklch(0.88 0.01 85);
  --ring: oklch(0.42 0.08 155);              /* Matches primary */
}
```

A `.dark` variant is also defined with adjusted OKLCH values for dark mode support.

### Tailwind v4 Theme Integration

Colors are bridged from CSS variables to Tailwind via the `@theme inline` block:

```css
@theme inline {
  --font-sans: "Montserrat", "Geist", "Geist Mono Fallback", sans-serif;
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... additional color mappings ... */
  --radius-lg: var(--radius);
}
```

### Navigation Color Scheme

The navbar uses the `primary` color as its background, with `primary-foreground` for all text and interactive elements. This creates a colored (green) navigation bar that contrasts with the page background:

```tsx
// Navbar container - primary background with subtle transparency
<nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary/80">

// Logo text
<div className="text-2xl font-bold text-primary-foreground">

// Nav links - slightly transparent, full opacity on hover
<Link className="text-primary-foreground/85 hover:text-primary-foreground transition-colors font-medium">

// Icon buttons (language toggle, mobile menu)
<Button variant="ghost" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/15">

// Mobile menu container
<div className="md:hidden border-t border-primary-foreground/20">

// Mobile menu links
<Link className="block px-3 py-2 text-base font-medium text-primary-foreground/85 hover:text-primary-foreground hover:bg-primary-foreground/15 rounded-md transition-colors">
```

Key pattern: The navbar uses `primary-foreground` with opacity modifiers (`/85`, `/15`, `/20`) to create a hierarchy of text and interactive states against the `bg-primary` background.

## Internationalization (i18n)

The site uses a client-side language context for Spanish/English toggling. Spanish is the default language.

### Language Context API

```typescript
// contexts/language-context.tsx
type Language = "es" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (es: string, en: string) => string
}
```

### Usage Pattern

Components access translations via the `useLanguage` hook:

```tsx
import { useLanguage } from "@/contexts/language-context"

export function MyComponent() {
  const { t, language } = useLanguage()

  return (
    <h1>{t("Explorá Tierra del Fuego", "Explore Tierra del Fuego")}</h1>
  )
}
```

The `t()` function takes Spanish as the first argument and English as the second. Navigation items are defined as conditional arrays based on the `language` value:

```tsx
const navItems =
  language === "es"
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

## Core Data Types

Defined in `lib/types.ts`, these interfaces are shared across the frontend:

```typescript
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
  availability_dates: string[]   // ISO date strings
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
  guests: number
  isHotel: boolean
  hotelName?: string
}
```

## Key Components

### Navigation (`components/navigation.tsx`)

Fixed-position navbar with responsive design. Uses `bg-primary/95` background with `backdrop-blur-sm` for a semi-transparent colored navbar effect. Includes:

- Brand logo link (Patagonia Trek)
- Desktop nav links (hidden on mobile via `hidden md:flex`)
- Language toggle button (Globe icon)
- Mobile hamburger menu with slide-down panel
- External link support (WhatsApp contact opens in new tab)

All text and interactive elements use `text-primary-foreground` with opacity variants for visual hierarchy. Hover states use `hover:bg-primary-foreground/15` for subtle light overlays.

### Hero Section (`components/hero-section.tsx`)

Full-viewport hero with a background image, gradient overlay, and centered content:

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <img src="/images/..." className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
  {/* Content positioned with relative z-10 */}
</section>
```

### Lugar Landing (`components/lugar-landing.tsx`)

A reusable component for destination pages (`/lugares/*`). Accepts a `LugarData` interface with fields for SEO metadata, hero content, geographic coordinates, content sections (ubicacion, caracteristicas, importancia, popularidad), gallery images, map embed URL, and FAQ data for structured schema markup.

### Activities View (`components/actividades-view.tsx`)

The main activities listing page with search, category filtering, and availability date display. Contains its own inline type definitions and activity data. Supports deep linking via URL search params (e.g., `?actividad=laguna-esmeralda-visita-express`).

## WhatsApp Integration

Contact links route to WhatsApp via a utility in `lib/whatsapp.ts`:

```typescript
const DEFAULT_PHONE = "549XXXXXXXXX"
const PRESET_MESSAGE = "Hola! Estoy interesado en una actividad en Ushuaia..."

export function createWhatsAppHref(customMessage?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || DEFAULT_PHONE
  const message = customMessage || PRESET_MESSAGE
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
```

The phone number is configurable via the `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` environment variable.

## Page Layout Pattern

All pages follow a consistent structure with the Navigation component at the top and Footer at the bottom. Pages that sit below the fixed navbar use `pt-16` padding to account for the navbar height:

```tsx
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

The root layout wraps everything in `LanguageProvider` for i18n support and includes `ScrollToTop` for route-change scroll reset:

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${lato.variable} font-sans antialiased`}>
        <ScrollToTop />
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
```

## Utility: `cn()` Helper

Standard shadcn/ui class merging utility:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` | WhatsApp phone number for contact links (falls back to placeholder) |

## Development

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```
