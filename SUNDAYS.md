# Adventure Website - Patagonia Trek

## Overview

A bilingual (Spanish/English) tourism website for a Patagonia trekking company based in Ushuaia, Tierra del Fuego. Built with Next.js 16, React 19, Tailwind CSS 4, and shadcn/ui (new-york style). The site showcases trekking activities, destination landing pages, a booking flow, and a calendar of scheduled events.

## Tech Stack

- **Framework**: Next.js 16.0.10 (App Router, React Server Components enabled)
- **React**: 19.2.0
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4.1.9 with `tw-animate-css`
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives
- **Icons**: lucide-react 0.454.0
- **Forms**: react-hook-form 7.60 + zod 3.25 + @hookform/resolvers
- **Charts**: recharts 2.15.4
- **Carousel**: embla-carousel-react 8.5.1
- **Date Handling**: date-fns 4.1.0, react-day-picker 9.8.0
- **Analytics**: @vercel/analytics
- **Fonts**: Montserrat (headings) + Lato (body), loaded via `next/font/google`

## Project Structure

```
adventure-website/
  app/
    layout.tsx              # Root layout with font setup and LanguageProvider
    page.tsx                # Home page (Navigation, Hero, TopExperiences, Destinations, Testimonials, CTA, Footer)
    globals.css             # Theme tokens (oklch), Tailwind config, dark mode
    actividades/page.tsx    # Activities listing page
    calendario/page.tsx     # Calendar/schedule page
    contacto/page.tsx       # Contact page
    nosotros/page.tsx       # About us page
    reservar/page.tsx       # Booking page
    lugares/                # Destination landing pages
      cerro-guanaco/page.tsx
      glaciar-ojo-del-albino/page.tsx
      glaciar-vinciguerra/page.tsx
      laguna-de-los-tempanos/page.tsx
      laguna-esmeralda/page.tsx
      valle-de-andorra/page.tsx
      valle-tierra-mayor/page.tsx
    trekkings/
      page.tsx              # Trekkings listing
      [id]/page.tsx         # Dynamic trekking detail page
  components/
    navigation.tsx          # Fixed top navbar with bilingual nav items
    hero-section.tsx        # Full-screen hero with background image
    top-experiences.tsx     # Featured experiences section
    destinations-section.tsx
    testimonials-section.tsx
    cta-section.tsx
    footer.tsx              # Site footer with contact info and newsletter
    about-content.tsx
    actividades-view.tsx
    calendar-view.tsx
    contact-form.tsx
    reservar-view.tsx
    lugar-landing.tsx       # Reusable destination landing component
    trekking-detail.tsx
    trekkings-list.tsx
    image-gallery-lightbox.tsx
    scroll-to-top.tsx
    theme-provider.tsx
    ui/                     # shadcn/ui components (button, card, dialog, etc.)
  contexts/
    language-context.tsx    # Bilingual context provider (es/en)
  lib/
    data.ts                # Static data: ACTIVITIES, TREKKINGS, CALENDAR_EVENTS
    types.ts               # Shared TypeScript interfaces
    utils.ts               # cn() utility (clsx + tailwind-merge)
    whatsapp.ts            # WhatsApp link generator
```

## Path Aliases

Configured in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

All imports use the `@/` prefix:

```tsx
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import type { Activity } from "@/lib/types"
```

## Theming and Color System

The site uses a custom outdoor adventure theme with earthy, natural tones defined in `app/globals.css` using oklch color space. Colors are configured as CSS custom properties and mapped to Tailwind via the `@theme inline` block.

### Key Color Tokens (Light Mode)

```css
:root {
  --primary: oklch(0.42 0.08 155);           /* Deep forest green */
  --primary-foreground: oklch(0.99 0.01 85); /* Near-white for text on primary */
  --secondary: oklch(0.3 0.05 240);          /* Dark blue */
  --accent: oklch(0.85 0.04 75);             /* Warm sand/earth tone */
  --background: oklch(0.98 0.008 85);        /* Off-white */
  --foreground: oklch(0.25 0.02 140);        /* Dark green-gray */
  --border: oklch(0.88 0.01 85);
  --muted: oklch(0.94 0.01 85);
}
```

Dark mode is supported via the `.dark` class with adjusted color values.

### Navbar Color Scheme

The navigation bar uses the `primary` color as its background, creating a branded header that stands out from the page content. The specific classes applied are:

```tsx
{/* Navbar container */}
<nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary/80">

{/* Logo text */}
<div className="text-2xl font-bold text-primary-foreground">

{/* Nav links (desktop) */}
<Link className="text-primary-foreground hover:text-accent transition-colors font-medium">

{/* Mobile menu container */}
<div className="md:hidden border-t border-primary/80">

{/* Mobile nav links */}
<Link className="block px-3 py-2 text-base font-medium text-primary-foreground hover:text-accent hover:bg-primary/80 rounded-md transition-colors">
```

Key points about the navbar styling:
- Background: `bg-primary/95` -- the primary green color at 95% opacity with backdrop blur
- Border: `border-primary/80` -- a slightly transparent version of the primary color
- Text: `text-primary-foreground` -- near-white text for contrast against the primary background
- Hover state: `hover:text-accent` -- links shift to the warm accent color on hover
- Mobile hover: `hover:bg-primary/80` -- subtle background highlight on mobile items

## Internationalization (i18n)

The site supports Spanish (default) and English via a React context-based system.

### Language Context

```tsx
// contexts/language-context.tsx
type Language = "es" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (es: string, en: string) => string
}
```

### Usage in Components

```tsx
"use client"
import { useLanguage } from "@/contexts/language-context"

export function MyComponent() {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <div>
      <h1>{t("Explorá Tierra del Fuego", "Explore Tierra del Fuego")}</h1>
      <Button onClick={toggleLanguage}>
        <Globe className="h-5 w-5" />
      </Button>
    </div>
  )
}
```

The `t()` helper takes the Spanish string first, English second. The language toggle button is displayed in the navigation bar on both desktop and mobile views.

## Data Layer

All data is statically defined in `lib/data.ts` and typed in `lib/types.ts`.

### Core Types

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
  availability_dates: string[]
  capacity_remaining: number
  rating?: number
  reviews_count?: number
  popular?: boolean
  location: string
  calendarioSlug?: string
  galleryImages?: { src: string; alt: string }[]
}

interface TrekkingDetail {
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

interface CalendarEvent {
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
```

## WhatsApp Integration

Contact links route to WhatsApp using a utility in `lib/whatsapp.ts`:

```typescript
// Uses NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER env var, falls back to placeholder
export function createWhatsAppHref(customMessage?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || "549XXXXXXXXX"
  const message = customMessage || "Hola! Estoy interesado en una actividad..."
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
```

The "Contacto" / "Contact" nav item opens WhatsApp in a new tab via `target="_blank"`.

## Navigation Component

The `Navigation` component (`components/navigation.tsx`) is a fixed-position top navbar that appears on all pages. It is a client component using `"use client"` due to interactive state (mobile menu toggle, language switching).

### Structure

```tsx
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)      // Mobile menu state
  const { language, toggleLanguage } = useLanguage() // i18n

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

  // Renders: desktop nav (hidden md:flex), mobile hamburger (md:hidden),
  // and collapsible mobile menu
}
```

Nav items with `isExternal: true` render as `<a>` tags with `target="_blank"`, while internal links use Next.js `<Link>`.

## Layout and Fonts

The root layout (`app/layout.tsx`) wraps the app in:

1. **LanguageProvider** -- provides i18n context to all client components
2. **ScrollToTop** -- scrolls to top on route changes
3. **Analytics** -- Vercel analytics

Fonts are loaded via `next/font/google`:

```tsx
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
})
```

The default `--font-sans` in the theme is set to `"Montserrat", "Geist", "Geist Fallback", sans-serif`.

## shadcn/ui Configuration

Configured in `components.json`:

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

The `cn()` utility from `lib/utils.ts` combines `clsx` and `tailwind-merge` for conditional class composition:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` | WhatsApp phone number for contact links (format: country code + number, e.g., `5492902491234`) |

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Patterns

### Client vs Server Components

- Pages under `app/` are server components by default (RSC enabled)
- Interactive components use `"use client"` directive: `navigation.tsx`, `hero-section.tsx`, `footer.tsx`, `calendar-view.tsx`, `contact-form.tsx`, etc.
- The `LanguageProvider` wraps all children in the root layout, making `useLanguage()` available to any client component

### Destination Pages

Each destination under `app/lugares/` has its own page that likely uses the shared `LugarLanding` component from `components/lugar-landing.tsx`.

### Responsive Design

- Mobile-first with Tailwind breakpoints: `sm:`, `md:`, `lg:`
- Navigation switches between desktop horizontal nav (`hidden md:flex`) and mobile hamburger menu (`md:hidden`)
- Grid layouts use responsive columns: `grid md:grid-cols-4`
