# Adventure Website - Patagonia Trekking

## Overview

This is the frontend website for **Patagonia Trek**, an outdoor adventure tourism company based in Ushuaia, Tierra del Fuego. The site showcases trekking activities, destinations, and booking capabilities for guided excursions in Patagonia.

Built with **Next.js 16** (App Router), **React 19**, **Tailwind CSS 4**, and **shadcn/ui** (new-york style). The site is bilingual (Spanish/English) and deployed on Vercel.

## Tech Stack

| Technology       | Version  | Purpose                        |
|------------------|----------|--------------------------------|
| Next.js          | 16.0.10  | Framework (App Router, RSC)    |
| React            | 19.2.0   | UI library                     |
| Tailwind CSS     | 4.1.9    | Utility-first CSS              |
| shadcn/ui        | new-york | Component library (Radix-based)|
| TypeScript       | 5.x      | Type safety                    |
| Lucide React     | 0.454.0  | Icon library                   |
| next-themes      | 0.4.6    | Dark/light mode support        |
| Vercel Analytics | latest   | Production analytics           |
| Recharts         | 2.15.4   | Chart components               |
| Zod              | 3.25.76  | Schema validation              |
| React Hook Form  | 7.60.0   | Form management                |

## Project Structure

```
adventure-website/
├── app/
│   ├── globals.css              # Global styles, CSS custom properties, theme
│   ├── layout.tsx               # Root layout (fonts, metadata, providers)
│   ├── page.tsx                 # Homepage
│   ├── actividades/page.tsx     # Activities listing
│   ├── calendario/page.tsx      # Calendar view
│   ├── contacto/page.tsx        # Contact page
│   ├── nosotros/page.tsx        # About us
│   ├── reservar/page.tsx        # Booking page
│   ├── trekkings/
│   │   ├── page.tsx             # Trekkings listing
│   │   └── [id]/page.tsx        # Dynamic trekking detail
│   └── lugares/                 # Location-specific landing pages
│       ├── cerro-guanaco/
│       ├── glaciar-ojo-del-albino/
│       ├── glaciar-vinciguerra/
│       ├── laguna-de-los-tempanos/
│       ├── laguna-esmeralda/
│       ├── valle-de-andorra/
│       └── valle-tierra-mayor/
├── components/
│   ├── ui/                      # shadcn/ui primitives (30+ components)
│   ├── navigation.tsx           # Fixed top navbar with mobile menu
│   ├── hero-section.tsx         # Full-screen hero with background image
│   ├── top-experiences.tsx      # Featured experiences section
│   ├── destinations-section.tsx # Horizontal scrolling destinations
│   ├── testimonials-section.tsx # Customer testimonials
│   ├── benefits-section.tsx     # Value propositions
│   ├── cta-section.tsx          # Call to action
│   ├── footer.tsx               # Site footer with links, contact, newsletter
│   ├── about-content.tsx        # About page content
│   ├── actividades-view.tsx     # Activities page view
│   ├── calendar-view.tsx        # Calendar page view
│   ├── contact-form.tsx         # Contact form component
│   ├── image-gallery-lightbox.tsx # Lightbox for image galleries
│   ├── lugar-landing.tsx        # Reusable location landing template
│   ├── reservar-view.tsx        # Booking form view
│   ├── scroll-to-top.tsx        # Auto scroll-to-top on navigation
│   ├── theme-provider.tsx       # next-themes wrapper
│   ├── trekking-detail.tsx      # Trekking detail page component
│   └── trekkings-list.tsx       # Trekkings listing component
├── contexts/
│   └── language-context.tsx     # i18n context (ES/EN toggle)
├── hooks/
│   ├── use-mobile.ts            # Mobile breakpoint detection
│   └── use-toast.ts             # Toast notification hook
├── lib/
│   ├── data.ts                  # Static data (activities, trekkings, events)
│   ├── types.ts                 # Shared TypeScript interfaces
│   ├── utils.ts                 # cn() utility (clsx + tailwind-merge)
│   └── whatsapp.ts              # WhatsApp link generator
└── components.json              # shadcn/ui configuration
```

## Theming and Design System

### CSS Custom Properties

The design system is defined in `app/globals.css` using CSS custom properties with the **oklch** color space. The theme uses earthy, natural tones appropriate for an outdoor adventure brand.

#### Light Theme (`:root`)

```css
:root {
  --background: oklch(0.96 0.015 80);       /* Warm off-white with slight yellow tint */
  --foreground: oklch(0.25 0.02 140);       /* Dark green-tinted text */
  --primary: oklch(0.42 0.08 155);          /* Deep forest green */
  --primary-foreground: oklch(0.99 0.01 85);
  --secondary: oklch(0.3 0.05 240);         /* Deep blue */
  --accent: oklch(0.85 0.04 75);            /* Warm sand/beige accent */
  --muted: oklch(0.94 0.01 85);
  --border: oklch(0.88 0.01 85);
  --radius: 0.5rem;
}
```

#### Dark Theme (`.dark`)

```css
.dark {
  --background: oklch(0.17 0.025 145);      /* Dark green-tinted background */
  --foreground: oklch(0.95 0.01 85);
  --primary: oklch(0.5 0.1 155);            /* Brighter forest green */
  --secondary: oklch(0.35 0.06 240);
  --accent: oklch(0.25 0.03 140);
  --border: oklch(0.25 0.02 140);
}
```

### Tailwind CSS 4 Integration

The theme bridges CSS variables to Tailwind via the `@theme inline` block in `globals.css`:

```css
@theme inline {
  --font-sans: "Montserrat", "Geist", "Geist Fallback", sans-serif;
  --font-mono: "Geist Mono", "Geist Mono Fallback";
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  /* ... all semantic color tokens mapped */
}
```

Dark mode is activated via a CSS custom variant:

```css
@custom-variant dark (&:is(.dark *));
```

### Typography

Two Google Fonts are loaded in `app/layout.tsx`:

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

The body receives both font variables: `${montserrat.variable} ${lato.variable} font-sans antialiased`.

## Internationalization (i18n)

The site supports Spanish (default) and English via a custom React context.

### Language Context

Defined in `contexts/language-context.tsx`:

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
const { t, language } = useLanguage()

// Inline translations
<h1>{t("Explorá Tierra del Fuego", "Explore Tierra del Fuego")}</h1>

// Conditional logic
const navItems = language === "es"
  ? [{ label: "Actividades", href: "/actividades" }]
  : [{ label: "Activities", href: "/actividades" }]
```

The `LanguageProvider` wraps the app in `layout.tsx`. Language toggle is available in the navigation bar via a Globe icon button.

## Data Layer

### Types (`lib/types.ts`)

Core interfaces used across the application:

```typescript
interface Activity {
  id: string
  title: string
  cover_image: string
  price_from: number
  currency: string
  difficulty: Difficulty          // "Facil" | "Moderado" | "Avanzado"
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

### Static Data (`lib/data.ts`)

All activity, trekking, and calendar event data is stored as static TypeScript constants (`ACTIVITIES`, etc.) in `lib/data.ts`. Data is not fetched from an API at runtime; it is bundled at build time.

## Key Components

### Navigation (`components/navigation.tsx`)

Fixed top navigation bar with:
- Logo linking to home
- Desktop nav links (Actividades, Quienes Somos, Contacto via WhatsApp)
- Language toggle (Globe icon)
- Responsive mobile hamburger menu
- Background blur effect: `bg-background/95 backdrop-blur-sm`

### Hero Section (`components/hero-section.tsx`)

Full-viewport hero with:
- Background image with gradient overlay
- Diagonal clip-path bottom edge: `clipPath: "polygon(0 0, 100% 0, 100% 95%, 0 100%)"`
- Season badge, heading, description, CTA button
- Responsive padding adjustments

### Homepage (`app/page.tsx`)

Assembles sections in order:

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

## Utilities

### `cn()` Helper (`lib/utils.ts`)

Standard shadcn/ui class merging utility:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### WhatsApp Integration (`lib/whatsapp.ts`)

Generates WhatsApp contact links with a preset Spanish message:

```typescript
export function createWhatsAppHref(customMessage?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || "549XXXXXXXXX"
  const message = customMessage || "Hola! Estoy interesado en una actividad..."
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
```

Set the `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` environment variable for production.

## Development

### Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Variables

| Variable                             | Description                    | Required |
|--------------------------------------|--------------------------------|----------|
| `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER`| WhatsApp phone number          | No       |

### Adding shadcn/ui Components

The project uses shadcn/ui with the `new-york` style and `@/components/ui` alias:

```bash
npx shadcn@latest add <component-name>
```

Configuration is in `components.json`. Over 30 UI primitives are already installed (button, card, dialog, carousel, form, toast, tabs, etc.).

### Adding New Location Pages

Location landing pages follow a pattern under `app/lugares/`. Each uses the `LugarLanding` component:

1. Create `app/lugares/<slug>/page.tsx`
2. Import and render `LugarLanding` with location-specific props
3. Add the destination to `DestinationsSection` data array

### Adding New Activities

1. Add a new entry to the `ACTIVITIES` array in `lib/data.ts`
2. Ensure the `Activity` interface in `lib/types.ts` covers all needed fields
3. Add gallery images to `public/` directory
4. Optionally add a `calendarioSlug` to link to calendar events
