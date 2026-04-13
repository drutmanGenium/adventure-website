# Adventure Website (Patagonia Trek)

Tourism website for a Patagonia-based trekking company operating in Ushuaia, Tierra del Fuego. Built with Next.js 16, React 19, Tailwind CSS 4, and shadcn/ui (New York style).

## Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Framework      | Next.js 16.0.10 (App Router)       |
| UI Library     | React 19.2.0                        |
| Styling        | Tailwind CSS 4.1.9 + tw-animate-css |
| Component Lib  | shadcn/ui (New York variant)        |
| Icons          | Lucide React 0.454.0               |
| Forms          | React Hook Form 7.60 + Zod 3.25    |
| Charts         | Recharts 2.15.4                     |
| Analytics      | Vercel Analytics                    |
| Fonts          | Montserrat + Lato (Google Fonts)    |
| Language        | TypeScript 5                       |

## Project Structure

```
adventure-website/
  app/
    layout.tsx               # Root layout with fonts, LanguageProvider, Analytics
    page.tsx                 # Homepage
    globals.css              # Theme variables (oklch), Tailwind config
    actividades/page.tsx     # Activities listing page
    calendario/page.tsx      # Calendar view
    contacto/page.tsx        # Contact page
    nosotros/page.tsx        # About us page
    reservar/page.tsx        # Booking page
    trekkings/
      page.tsx               # Trekkings listing
      [id]/page.tsx          # Dynamic trekking detail page
    lugares/                 # Destination landing pages
      laguna-esmeralda/page.tsx
      glaciar-vinciguerra/page.tsx
      glaciar-ojo-del-albino/page.tsx
      laguna-de-los-tempanos/page.tsx
      valle-de-andorra/page.tsx
      valle-tierra-mayor/page.tsx
      cerro-guanaco/page.tsx
  components/
    navigation.tsx           # Fixed top navbar with mobile menu
    hero-section.tsx         # Full-screen hero with background image
    top-experiences.tsx      # Featured activities grid + benefits pillars
    destinations-section.tsx # Horizontal scroll carousel of destinations
    testimonials-section.tsx # Customer testimonials
    cta-section.tsx          # Call-to-action section
    footer.tsx               # Site footer with links, contact, newsletter
    about-content.tsx        # About us page content
    actividades-view.tsx     # Activities listing with filters
    calendar-view.tsx        # Calendar view component
    contact-form.tsx         # Contact form
    reservar-view.tsx        # Booking flow
    trekking-detail.tsx      # Full trekking detail page
    trekkings-list.tsx       # Trekking cards listing
    lugar-landing.tsx        # Reusable destination landing template
    image-gallery-lightbox.tsx # Image gallery with lightbox
    benefits-section.tsx     # Benefits display
    scroll-to-top.tsx        # Scroll-to-top utility
    theme-provider.tsx       # Theme provider (dark mode support)
    ui/                      # shadcn/ui primitives (40+ components)
  contexts/
    language-context.tsx     # i18n context (ES/EN toggle)
  lib/
    data.ts                  # Static activity/trekking/calendar data
    types.ts                 # Shared TypeScript interfaces
    utils.ts                 # cn() utility (clsx + tailwind-merge)
    whatsapp.ts              # WhatsApp link generator
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

## Page Layout Pattern

Every page follows a consistent structure with the shared `Navigation` and `Footer` components:

```tsx
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ActividadesView } from "@/components/actividades-view"

export default function ActividadesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ActividadesView />
      </div>
      <Footer />
    </main>
  )
}
```

The `pt-16` on the content wrapper accounts for the fixed navbar height (`h-16`).

## Navigation Component

The `Navigation` component (`components/navigation.tsx`) is a fixed top navbar used on every page. It features:

- Fixed positioning with blur backdrop: `fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm`
- Responsive design with desktop links and a mobile hamburger menu
- Language toggle button (ES/EN) using a Globe icon
- WhatsApp-based contact link (external)

The brand title "Patagonia Trek" uses explicit emerald color with dark mode support:

```tsx
<Link href="/" className="flex items-center space-x-2">
  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
    {language === "es" ? "Patagonia Trek" : "Patagonia Trek"}
  </div>
</Link>
```

Navigation items are defined with bilingual labels and support both internal routes and external links:

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

## Internationalization (i18n)

The app supports Spanish (default) and English via a React context in `contexts/language-context.tsx`.

```tsx
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

// Simple translation helper
<h1>{t("Explorá Tierra del Fuego", "Explore Tierra del Fuego")}</h1>

// Direct language checks for complex content
{language === "es" ? "Laguna Esmeralda" : "Laguna Esmeralda"}
```

The `LanguageProvider` wraps the entire app in `app/layout.tsx`. Default language is Spanish (`"es"`).

## Theming and Color System

The app uses oklch-based CSS custom properties defined in `app/globals.css`. The color palette is designed around an outdoor adventure theme with earthy, natural tones.

### Key Theme Colors

| Variable     | Light Mode                  | Dark Mode                   |
|-------------|-----------------------------|-----------------------------|
| `--primary` | `oklch(0.42 0.08 155)` (deep green) | `oklch(0.5 0.1 155)` (brighter green) |
| `--secondary` | `oklch(0.3 0.05 240)` (dark blue) | `oklch(0.35 0.06 240)` |
| `--background` | `oklch(0.98 0.008 85)` (warm off-white) | `oklch(0.15 0.02 140)` (dark green-gray) |
| `--foreground` | `oklch(0.25 0.02 140)` (dark text) | `oklch(0.95 0.01 85)` (light text) |
| `--accent` | `oklch(0.85 0.04 75)` (warm tan) | `oklch(0.25 0.03 140)` |

### Explicit Color Overrides

Some components use explicit Tailwind color classes instead of CSS variables for specific branding:

- **Navbar title**: `text-emerald-700 dark:text-emerald-400` -- the "Patagonia Trek" brand name uses a distinct emerald green that stands out from the generic `--primary` color in both light and dark modes.

### Fonts

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

The default sans-serif stack is Montserrat, set via `--font-sans` in `globals.css`:

```css
@theme inline {
  --font-sans: "Montserrat", "Geist", "Geist Fallback", sans-serif;
}
```

## Data Types

Core interfaces are defined in `lib/types.ts`:

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
```

## Static Data

All activity, trekking, and calendar data is defined in `lib/data.ts` as exported constants (`ACTIVITIES`, etc.). There is no backend API integration on the frontend -- all data is static and bundled at build time.

Activities reference image paths from the `/public` directory and include availability dates, pricing in USD, difficulty levels, and gallery images.

## WhatsApp Integration

Contact links use WhatsApp via `lib/whatsapp.ts`:

```typescript
const DEFAULT_PHONE = "549XXXXXXXXX"
const PRESET_MESSAGE = "Hola! Estoy interesado en una actividad..."

export function createWhatsAppHref(customMessage?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || DEFAULT_PHONE
  const message = customMessage || PRESET_MESSAGE
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
```

The phone number is configured via `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` environment variable.

## UI Component Library

The project uses shadcn/ui with the "new-york" style variant, configured in `components.json`:

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

Over 40 shadcn/ui primitives are available under `components/ui/`, including: accordion, alert-dialog, badge, button, card, carousel, dialog, drawer, dropdown-menu, form, input, select, sheet, tabs, toast, tooltip, and more.

The `cn()` utility merges Tailwind classes:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Destination Landing Pages

The `app/lugares/` directory contains individual landing pages for each trekking destination:

- `/lugares/laguna-esmeralda`
- `/lugares/glaciar-vinciguerra`
- `/lugares/glaciar-ojo-del-albino`
- `/lugares/laguna-de-los-tempanos`
- `/lugares/valle-de-andorra`
- `/lugares/valle-tierra-mayor`
- `/lugares/cerro-guanaco`

These pages likely use the shared `LugarLanding` component (`components/lugar-landing.tsx`) for consistent layout.

## Key Routes

| Route                    | Description                        |
|--------------------------|------------------------------------|
| `/`                      | Homepage with hero, experiences, destinations, testimonials |
| `/actividades`           | Activity listing with filters      |
| `/actividades?actividad=slug` | Deep link to specific activity |
| `/nosotros`              | About us page                      |
| `/contacto`              | Contact page                       |
| `/reservar`              | Booking flow                       |
| `/calendario`            | Calendar view of available dates   |
| `/trekkings`             | Trekking listing                   |
| `/trekkings/[id]`        | Dynamic trekking detail            |
| `/lugares/[destination]` | Destination-specific landing pages |

## Build and Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

## Environment Variables

| Variable                               | Purpose                          |
|----------------------------------------|----------------------------------|
| `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER`  | WhatsApp phone number for contact links |
