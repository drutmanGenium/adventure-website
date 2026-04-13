# Adventure Website (Patagonia Trek)

## Overview

A Next.js 16 marketing and booking website for **Patagonia Trek**, an outdoor adventure tourism company based in Ushuaia, Tierra del Fuego, Argentina. The site showcases trekking activities (Laguna Esmeralda, Glaciar Vinciguerra, Ojo del Albino, and others), supports bilingual content (Spanish/English), and uses a nature-inspired design system built on Tailwind CSS v4 with shadcn/ui components.

## Tech Stack

| Layer         | Technology                                  |
|---------------|---------------------------------------------|
| Framework     | Next.js 16 (App Router, React 19)           |
| Language      | TypeScript 5                                |
| Styling       | Tailwind CSS v4 with `tw-animate-css`       |
| UI Components | shadcn/ui (new-york style)                  |
| Icons         | Lucide React                                |
| Forms         | React Hook Form + Zod validation            |
| Analytics     | Vercel Analytics                            |
| Theming       | next-themes (dark mode support)             |
| Package Mgr   | pnpm                                        |
| Port          | 3005 (dev/start)                            |

## Project Structure

```
adventure-website/
  app/
    layout.tsx              # Root layout (fonts, metadata, LanguageProvider)
    page.tsx                # Homepage
    globals.css             # Theme tokens, Tailwind config
    actividades/page.tsx    # Activities listing page
    calendario/page.tsx     # Calendar view page
    contacto/page.tsx       # Contact page
    nosotros/page.tsx       # About us page
    reservar/page.tsx       # Booking page
    trekkings/
      page.tsx              # Trekkings listing
      [id]/page.tsx         # Dynamic trekking detail
    lugares/                # Destination landing pages
      laguna-esmeralda/
      glaciar-vinciguerra/
      glaciar-ojo-del-albino/
      laguna-de-los-tempanos/
      valle-de-andorra/
      valle-tierra-mayor/
      cerro-guanaco/
  components/
    navigation.tsx          # Fixed top navbar with mobile menu
    hero-section.tsx        # Homepage hero with CTA
    top-experiences.tsx     # Featured activities + benefit pillars
    destinations-section.tsx # Horizontal scrollable destination cards
    testimonials-section.tsx
    cta-section.tsx
    footer.tsx              # Site footer with newsletter
    about-content.tsx
    actividades-view.tsx    # Activities page with filters and search
    calendar-view.tsx
    contact-form.tsx
    reservar-view.tsx
    lugar-landing.tsx       # Reusable destination landing component
    trekking-detail.tsx
    trekkings-list.tsx
    image-gallery-lightbox.tsx
    scroll-to-top.tsx
    theme-provider.tsx
    ui/                     # shadcn/ui primitives (button, card, badge, etc.)
  contexts/
    language-context.tsx    # Bilingual i18n context provider
  hooks/
    use-mobile.ts           # Responsive breakpoint hook (768px)
    use-toast.ts
  lib/
    data.ts                 # Static activity, trekking, and calendar data
    types.ts                # Shared TypeScript interfaces
    utils.ts                # cn() utility for class merging
    whatsapp.ts             # WhatsApp link generator
```

## Design System and Theming

The site uses a custom earthy, nature-inspired color palette defined with OKLCH color values in `app/globals.css`. Colors are mapped to CSS custom properties and consumed through Tailwind's theme system.

### Key Color Tokens

```css
:root {
  --primary: oklch(0.42 0.08 155);         /* Deep forest green */
  --primary-foreground: oklch(0.99 0.01 85); /* Light cream */
  --foreground: oklch(0.25 0.02 140);       /* Dark green-gray text */
  --background: oklch(0.98 0.008 85);       /* Warm off-white */
  --secondary: oklch(0.3 0.05 240);         /* Deep blue */
  --accent: oklch(0.85 0.04 75);            /* Warm tan */
  --muted-foreground: oklch(0.5 0.02 140);  /* Subdued green-gray */
}
```

Dark mode is supported via the `.dark` class selector:

```css
@custom-variant dark (&:is(.dark *));
```

### Typography

Two Google Fonts are loaded in `app/layout.tsx`:

- **Montserrat** (`--font-montserrat`): Used as the primary sans-serif via `--font-sans`
- **Lato** (`--font-lato`, weights 300/400/700): Secondary font available via CSS variable

```tsx
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})
```

## Navigation Component

The `Navigation` component (`components/navigation.tsx`) provides the site's fixed top navigation bar with responsive desktop/mobile views and bilingual support.

### Structure

- Fixed position (`fixed top-0 z-50`) with blurred background (`bg-background/95 backdrop-blur-sm`)
- Desktop: horizontal link row with language toggle button
- Mobile: hamburger menu with slide-down panel
- External links (e.g., WhatsApp contact) open in new tabs

### Link Color Scheme

Navigation links use the **primary** color as their default text color and transition to **foreground** on hover:

```tsx
// Desktop links
className="text-primary hover:text-foreground transition-colors font-medium"

// Mobile links
className="block px-3 py-2 text-base font-medium text-primary hover:text-foreground hover:bg-accent rounded-md transition-colors"
```

This means nav text renders in the site's green primary color (`--primary`) by default, and shifts to the darker foreground color (`--foreground`) on hover. The logo also uses `text-primary`.

### Navigation Items

Navigation items are defined inline and change based on the current language:

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

Items with `isExternal: true` render as `<a>` tags with `target="_blank"`, while internal items use Next.js `<Link>`.

## Internationalization (i18n)

The site uses a lightweight client-side translation system via React Context.

### Language Context

Defined in `contexts/language-context.tsx`, it provides:

```tsx
type LanguageContextType = {
  language: Language          // "es" | "en"
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void  // Switches between es/en
  t: (es: string, en: string) => string  // Inline translation helper
}
```

### Usage Pattern

Components consume translations via the `useLanguage` hook:

```tsx
const { t, language } = useLanguage()

// Simple translations
<h1>{t("Explorá Tierra del Fuego", "Explore Tierra del Fuego")}</h1>

// Conditional content based on language
const label = language === "es" ? "Laguna Esmeralda" : "Laguna Esmeralda"
```

The `LanguageProvider` wraps the entire app in `app/layout.tsx`. Default language is Spanish (`"es"`).

## Data Layer

All activity and trekking data is currently defined as static TypeScript constants in `lib/data.ts`.

### Key Types (`lib/types.ts`)

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

### Activities Catalog

Activities are defined in `ACTIVITIES` array in `lib/data.ts`. Current offerings:

| Activity                    | Difficulty | Duration | Price (USD) |
|-----------------------------|-----------|----------|-------------|
| Laguna Esmeralda Express    | Facil     | 4 hs     | $45         |
| Laguna Esmeralda Sunset     | Facil     | 5 hs     | $55         |
| Glaciar Vinciguerra         | Moderado  | 8 hs     | $75         |
| Ojo del Albino Ice Trekking | Avanzado  | 9 hs     | $95         |

## WhatsApp Integration

Contact links throughout the site (navbar, footer) use WhatsApp deep links generated by `lib/whatsapp.ts`:

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

## Page Architecture

All pages follow a consistent layout pattern:

```tsx
export default function SomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">   {/* Offset for fixed navbar */}
        <PageContent />
      </div>
      <Footer />
    </main>
  )
}
```

The homepage (`app/page.tsx`) omits the `pt-16` wrapper since the hero section handles its own spacing with full-bleed imagery.

### Route Map

| Route                          | Component                 | Description                         |
|--------------------------------|---------------------------|-------------------------------------|
| `/`                            | `HomePage`                | Hero, experiences, destinations     |
| `/actividades`                 | `ActividadesView`         | Filterable activity catalog         |
| `/calendario`                  | `CalendarView`            | Calendar-based availability view    |
| `/nosotros`                    | `AboutContent`            | Company information                 |
| `/contacto`                    | `ContactForm`             | Contact form                        |
| `/reservar`                    | `ReservarView`            | Booking flow                        |
| `/trekkings`                   | `TrekkingsList`           | Trekking listing                    |
| `/trekkings/[id]`              | `TrekkingDetail`          | Individual trekking detail          |
| `/lugares/laguna-esmeralda`    | `LugarLanding`            | Destination landing page            |
| `/lugares/glaciar-vinciguerra` | `LugarLanding`            | Destination landing page            |
| `/lugares/valle-de-andorra`    | `LugarLanding`            | Destination landing page            |

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

The `cn()` utility in `lib/utils.ts` combines `clsx` and `tailwind-merge` for conditional class composition:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Build and Development

```bash
# Install dependencies
pnpm install

# Development server (port 3005)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint
```

The `.sundaysrc` configuration:

```json
{
  "runtime": "node",
  "install": "pnpm install",
  "build": "pnpm exec next build --webpack",
  "start": "pnpm exec next start -p 3005",
  "port": 3005
}
```

## Environment Variables

| Variable                              | Usage                          | Required |
|---------------------------------------|-------------------------------|----------|
| `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` | WhatsApp contact phone number | No (has fallback) |

## Style Conventions

- All client components are marked with `"use client"` directive at the top of the file
- Tailwind utility classes are used directly in JSX (no separate CSS modules)
- Responsive design uses Tailwind breakpoints: `md:` (768px), `lg:` (1024px), `sm:` (640px)
- Color references use semantic tokens (`text-primary`, `text-foreground`, `bg-background`) rather than raw color values
- Hover states use `hover:` prefix with `transition-colors` for smooth transitions
- The `text-balance` and `text-pretty` utilities are used for typographic refinement
