# Adventure Website - Technical Documentation

## Overview

This is a **Next.js 16** tourism website for a Patagonia trekking company based in Ushuaia, Tierra del Fuego. The site showcases outdoor adventure activities (trekkings, glacier hikes, mountain expeditions) and supports bilingual content in Spanish and English. It uses the App Router, React 19, Tailwind CSS v4, and shadcn/ui components (New York style).

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Framework      | Next.js 16.0.10 (App Router)        |
| Runtime        | React 19.2.0, React DOM 19.2.0      |
| Styling        | Tailwind CSS 4.1.x + tw-animate-css |
| UI Components  | shadcn/ui (New York style)          |
| Icons          | Lucide React                         |
| Forms          | React Hook Form + Zod               |
| Charts         | Recharts 2.15.x                     |
| Analytics      | Vercel Analytics                     |
| Fonts          | Montserrat (headings), Lato (body)  |
| Language       | TypeScript 5                         |

## Project Structure

```
adventure-website/
  app/
    globals.css              # Theme variables and Tailwind config
    layout.tsx               # Root layout with fonts and providers
    page.tsx                 # Homepage
    actividades/page.tsx     # Activities listing page
    calendario/page.tsx      # Calendar view page
    contacto/page.tsx        # Contact page
    nosotros/page.tsx        # About us page
    reservar/page.tsx        # Booking page
    trekkings/
      page.tsx               # Trekkings listing
      [id]/page.tsx          # Dynamic trekking detail page
    lugares/                 # Location-specific landing pages
      cerro-guanaco/page.tsx
      glaciar-ojo-del-albino/page.tsx
      glaciar-vinciguerra/page.tsx
      laguna-de-los-tempanos/page.tsx
      laguna-esmeralda/page.tsx
      valle-de-andorra/page.tsx
      valle-tierra-mayor/page.tsx
  components/
    navigation.tsx           # Fixed top navbar with mobile menu
    hero-section.tsx         # Homepage hero with background image
    top-experiences.tsx      # Featured activities carousel
    destinations-section.tsx # Destination cards with horizontal scroll
    testimonials-section.tsx # Customer testimonials
    benefits-section.tsx     # Company benefits/features
    cta-section.tsx          # Call-to-action section
    footer.tsx               # Site footer (uses --secondary color)
    about-content.tsx        # About us page content
    actividades-view.tsx     # Activities grid/list view
    calendar-view.tsx        # Calendar-based activity browser
    contact-form.tsx         # Contact form component
    reservar-view.tsx        # Booking form view
    trekking-detail.tsx      # Individual trekking detail view
    trekkings-list.tsx       # Trekkings listing component
    lugar-landing.tsx        # Reusable location landing page
    image-gallery-lightbox.tsx # Image gallery with lightbox
    scroll-to-top.tsx        # Scroll restoration on navigation
    theme-provider.tsx       # Theme context (next-themes)
    ui/                      # shadcn/ui primitives (~40 components)
  lib/
    data.ts                  # Static data: activities, trekkings, events
    types.ts                 # Shared TypeScript interfaces
    utils.ts                 # cn() utility (clsx + tailwind-merge)
    whatsapp.ts              # WhatsApp link generator
  hooks/
    use-mobile.ts            # Mobile breakpoint detection hook
    use-toast.ts             # Toast notification hook
  contexts/
    language-context.tsx     # i18n context (ES/EN toggle)
```

## Theming and Design Tokens

All colors are defined as CSS custom properties using the **OKLCH** color space in `app/globals.css`. The theme supports both light and dark modes via the `.dark` class variant.

### Color Variables (Light Mode - `:root`)

```css
:root {
  --background: oklch(0.98 0.008 85);
  --foreground: oklch(0.25 0.02 140);
  --primary: oklch(0.42 0.08 155);           /* Forest green */
  --primary-foreground: oklch(0.99 0.01 85);
  --secondary: oklch(0.25 0.06 155);         /* Dark green (footer bg) */
  --secondary-foreground: oklch(0.99 0.01 85);
  --accent: oklch(0.85 0.04 75);             /* Warm earth tone */
  --muted: oklch(0.94 0.01 85);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.88 0.01 85);
  --ring: oklch(0.42 0.08 155);
  --radius: 0.5rem;
}
```

### Color Variables (Dark Mode - `.dark`)

```css
.dark {
  --background: oklch(0.15 0.02 140);
  --foreground: oklch(0.95 0.01 85);
  --primary: oklch(0.5 0.1 155);
  --secondary: oklch(0.30 0.07 155);         /* Dark green (footer bg, dark mode) */
  --secondary-foreground: oklch(0.99 0.01 85);
  --accent: oklch(0.25 0.03 140);
  --border: oklch(0.25 0.02 140);
}
```

### Color Palette Notes

The theme uses earthy, natural tones centered on green hues (OKLCH hue ~155) that reflect the Patagonian outdoor adventure brand:

- **Primary** (hue 155): Forest green used for buttons, links, interactive elements, and the CTA section background
- **Secondary** (hue 155): Darker green used as the **footer background color**. Both light and dark mode variants share the same green hue (155) for visual consistency
- **Accent** (hue 75): Warm earth tone for hover states and highlights
- **Chart colors**: Mix of greens, blues, and earth tones for data visualization

The `@theme inline` block maps CSS variables to Tailwind utility classes, enabling usage like `bg-primary`, `text-secondary-foreground`, `border-border`, etc.

### Tailwind CSS v4 Configuration

The project uses Tailwind CSS v4 with PostCSS. Configuration is done entirely in CSS via `@theme inline` blocks rather than a `tailwind.config.js` file:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: "Montserrat", "Geist", "Geist Fallback", sans-serif;
  --font-mono: "Geist Mono", "Geist Mono Fallback";
  --color-background: var(--background);
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  /* ... all color mappings ... */
  --radius-lg: var(--radius);
}
```

Custom utilities are defined in `@layer utilities`:

```css
@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

## Component Architecture

### Page Layout Pattern

Every page follows a consistent layout pattern with `Navigation` at the top and `Footer` at the bottom:

```tsx
// Example: app/trekkings/[id]/page.tsx
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrekkingDetail } from "@/components/trekking-detail"
import { Suspense } from "react"

export default async function TrekkingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Suspense>
          <TrekkingDetail id={id} />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
```

### Footer Component

The footer uses `bg-secondary text-secondary-foreground` for its background color, which maps to the `--secondary` CSS variable. Changing the footer color requires updating the `--secondary` variable in `app/globals.css` for both light and dark mode:

```tsx
// components/footer.tsx
export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About, Quick Links, Contact, Newsletter columns */}
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-sm opacity-70">
          <p>&copy; {new Date().getFullYear()} Patagonia Trek. ...</p>
        </div>
      </div>
    </footer>
  )
}
```

**Important**: The `--secondary` variable is also used by the shadcn/ui `Button` component's `variant="secondary"`, so changes to `--secondary` affect all secondary-styled buttons across the site (e.g., the CTA section's "Ver Actividades" button).

### Navigation Component

The `Navigation` component renders a fixed top navbar with responsive mobile hamburger menu:

```tsx
// components/navigation.tsx
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Desktop: logo + nav links + language toggle */}
      {/* Mobile: logo + language toggle + hamburger */}
    </nav>
  )
}
```

## Internationalization (i18n)

The site supports Spanish (default) and English via a custom context provider. The `LanguageProvider` wraps the entire app in the root layout.

### Usage Pattern

Components access translations via the `useLanguage` hook:

```tsx
import { useLanguage } from "@/contexts/language-context"

export function MyComponent() {
  const { t, language, toggleLanguage } = useLanguage()

  return (
    <h1>{t("Texto en Español", "Text in English")}</h1>
  )
}
```

The `t()` function takes two arguments: Spanish text first, English text second. The `language` value is either `"es"` or `"en"`, and `toggleLanguage` switches between them.

## Data Layer

All activity data is stored as static TypeScript arrays in `lib/data.ts`. There is no backend API integration on the frontend; all data is hardcoded.

### Key Types (`lib/types.ts`)

```typescript
export type Difficulty = "Fácil" | "Moderado" | "Avanzado"

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
  type: "Trekking" | "Campamento" | "Montañismo"
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
```

## WhatsApp Integration

Contact links throughout the site use WhatsApp deep links generated by `lib/whatsapp.ts`:

```typescript
const DEFAULT_PHONE = "549XXXXXXXXX"
const PRESET_MESSAGE = "Hola! Estoy interesado en una actividad en Ushuaia..."

export function createWhatsAppHref(customMessage?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || DEFAULT_PHONE
  const message = customMessage || PRESET_MESSAGE
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
```

Set `NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER` in the environment to configure the contact phone number.

## shadcn/ui Configuration

The project uses shadcn/ui with the **New York** style variant. Configuration is in `components.json`:

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "app/globals.css",
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

The `cn()` utility in `lib/utils.ts` merges Tailwind classes:

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Development

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Conventions

1. **Client components**: Most page-level components are client components (`"use client"`) because they use the `useLanguage` hook for i18n. Route pages themselves are server components that compose client components.
2. **Max width**: Content sections use `max-w-7xl mx-auto` for consistent page width.
3. **Color system**: Always use CSS variable-based Tailwind classes (`bg-primary`, `text-secondary-foreground`) rather than hardcoded color values. To change a color site-wide, update the variable in `globals.css`.
4. **Responsive design**: Mobile-first with `md:` breakpoint for desktop layouts. Navigation switches to hamburger menu on mobile.
5. **Image handling**: Images are served from the `/public` directory and referenced by absolute path in `src` attributes.
6. **Font loading**: Google Fonts (Montserrat, Lato) are loaded via `next/font/google` with CSS variable strategy for Tailwind integration.
