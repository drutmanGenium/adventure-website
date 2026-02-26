"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Search, X, ChevronDown, Users, Calendar, MapPin, Clock, TrendingUp } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

// ─── Types ────────────────────────────────────────────────────────────────────

export type Category =
  | "Todas"
  | "Laguna Esmeralda"
  | "Glaciar Vinciguerra"
  | "Ojo del Albino"
  | "Valle Tierra Mayor"
  | "Valle de Andorra"

export interface Activity {
  id: string
  title: string
  cover_image: string
  price_from: number
  currency: string
  difficulty: "Fácil" | "Moderado" | "Avanzado"
  duration: string
  category: Category
  availability_dates: string[] // ISO date strings
  capacity_remaining: number
  rating?: number
  reviews_count?: number
  popular?: boolean
  location: string
  calendarioSlug?: string
  galleryImages?: { src: string; alt: string }[]
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const ACTIVITIES: Activity[] = [
  {
    id: "laguna-esmeralda-express",
    title: "Laguna Esmeralda, Visita Express",
    cover_image: "/laguna-esmeralda-emerald-lake-ushuaia-forest-trail.jpg",
    price_from: 45,
    currency: "USD",
    difficulty: "Fácil",
    duration: "4 hs",
    category: "Laguna Esmeralda",
    availability_dates: ["2026-11-08", "2026-11-15", "2026-11-22", "2026-12-06", "2026-12-13"],
    capacity_remaining: 8,
    rating: 4.97,
    reviews_count: 124,
    popular: true,
    location: "Ushuaia",
    calendarioSlug: "laguna-esmeralda-visita-express",
    galleryImages: [
      { src: "/laguna-esmeralda-emerald-lake-ushuaia-forest-trail.jpg", alt: "Laguna Esmeralda - Vista principal" },
      { src: "/laguna-esmeralda-ushuaia-emerald-lake-mountains.jpg", alt: "Montañas alrededor de Laguna Esmeralda" },
      { src: "/placeholder.jpg", alt: "Sendero hacia Laguna Esmeralda" },
      { src: "/placeholder.jpg", alt: "Bosque de Tierra del Fuego" },
      { src: "/placeholder.jpg", alt: "Flora local" },
    ],
  },
  {
    id: "laguna-esmeralda-sunset",
    title: "Laguna Esmeralda Sunset",
    cover_image: "/laguna-esmeralda-ushuaia-emerald-lake-mountains.jpg",
    price_from: 55,
    currency: "USD",
    difficulty: "Fácil",
    duration: "5 hs",
    category: "Trekking",
    availability_dates: ["2026-11-09", "2026-11-16", "2026-11-23", "2026-12-07"],
    capacity_remaining: 6,
    rating: 4.94,
    reviews_count: 87,
    popular: true,
    location: "Ushuaia",
    calendarioSlug: "laguna-esmeralda-sunset",
    galleryImages: [
      { src: "/laguna-esmeralda-ushuaia-emerald-lake-mountains.jpg", alt: "Atardecer en Laguna Esmeralda" },
      { src: "/placeholder.jpg", alt: "Vista al atardecer" },
      { src: "/placeholder.jpg", alt: "Reflejo en la laguna" },
      { src: "/placeholder.jpg", alt: "Montañas al atardecer" },
    ],
  },
  {
    id: "glaciar-vinciguerra",
    title: "Glaciar Vinciguerra y Laguna de los Témpanos",
    cover_image: "/vinciguerra-glacier-ushuaia-iceberg-lagoon.jpg",
    price_from: 75,
    currency: "USD",
    difficulty: "Moderado",
    duration: "8 hs",
    category: "Trekking",
    availability_dates: ["2026-11-12", "2026-11-19", "2026-12-03", "2026-12-10"],
    capacity_remaining: 10,
    rating: 4.91,
    reviews_count: 63,
    location: "Ushuaia",
    calendarioSlug: "glaciar-vinciguerra",
    galleryImages: [
      { src: "/vinciguerra-glacier-ushuaia-iceberg-lagoon.jpg", alt: "Glaciar Vinciguerra" },
      { src: "/placeholder.jpg", alt: "Laguna de los Témpanos" },
      { src: "/placeholder.jpg", alt: "Témpanos de hielo" },
      { src: "/placeholder.jpg", alt: "Vista del glaciar" },
      { src: "/placeholder.jpg", alt: "Paisaje glaciar" },
    ],
  },
  {
    id: "ojo-del-albino",
    title: "Ojo del Albino — Ice Trekking",
    cover_image: "/ojo-del-albino-glacier-ushuaia-mountain-peaks.jpg",
    price_from: 95,
    currency: "USD",
    difficulty: "Avanzado",
    duration: "9 hs",
    category: "Trekking",
    availability_dates: ["2026-11-14", "2026-11-28", "2026-12-05", "2026-12-19"],
    capacity_remaining: 4,
    rating: 4.99,
    reviews_count: 42,
    popular: true,
    location: "Ushuaia",
    calendarioSlug: "ojo-del-albino",
    galleryImages: [
      { src: "/ojo-del-albino-glacier-ushuaia-mountain-peaks.jpg", alt: "Glaciar Ojo del Albino" },
      { src: "/placeholder.jpg", alt: "Cumbre de montaña" },
      { src: "/placeholder.jpg", alt: "Vista panorámica" },
      { src: "/placeholder.jpg", alt: "Hielo y nieve" },
      { src: "/placeholder.jpg", alt: "Paisaje de alta montaña" },
    ],
  },
  {
    id: "campamento-vinciguerra",
    title: "Campamento Vinciguerra — Noche en la montaña",
    cover_image: "/patagonia-sunset-campfire-hikers-silhouette-mounta.jpg",
    price_from: 140,
    currency: "USD",
    difficulty: "Avanzado",
    duration: "2 días",
    category: "Trekking",
    availability_dates: ["2026-11-21", "2026-12-12", "2027-01-09"],
    capacity_remaining: 6,
    rating: 5.0,
    reviews_count: 18,
    popular: true,
    location: "Ushuaia",
    calendarioSlug: "campamento-vinciguerra",
    galleryImages: [
      { src: "/patagonia-sunset-campfire-hikers-silhouette-mounta.jpg", alt: "Atardecer en campamento" },
      { src: "/placeholder.jpg", alt: "Fogata en la montaña" },
      { src: "/placeholder.jpg", alt: "Estrellas australes" },
      { src: "/placeholder.jpg", alt: "Campamento nocturno" },
      { src: "/placeholder.jpg", alt: "Vista matinal" },
    ],
  },
  {
    id: "parque-nacional-tierra-del-fuego",
    title: "Parque Nacional Tierra del Fuego",
    cover_image: "/tierra-mayor-valley-ushuaia-peatlands-mountains.jpg",
    price_from: 35,
    currency: "USD",
    difficulty: "Fácil",
    duration: "3 hs",
    category: "Parque Nacional",
    availability_dates: ["2026-11-07", "2026-11-10", "2026-11-14", "2026-11-17", "2026-11-21"],
    capacity_remaining: 15,
    rating: 4.85,
    reviews_count: 210,
    location: "Ushuaia",
    galleryImages: [
      { src: "/tierra-mayor-valley-ushuaia-peatlands-mountains.jpg", alt: "Valle Tierra Mayor" },
      { src: "/placeholder.jpg", alt: "Turberas de Tierra del Fuego" },
      { src: "/placeholder.jpg", alt: "Senderos del parque" },
      { src: "/placeholder.jpg", alt: "Flora local" },
    ],
  },
  {
    id: "canal-beagle-navegacion",
    title: "Navegación por el Canal Beagle",
    cover_image: "/lago-argentino-patagonia-crystal-blue-water.jpg",
    price_from: 60,
    currency: "USD",
    difficulty: "Fácil",
    duration: "3.5 hs",
    category: "Navegación / Canal Beagle",
    availability_dates: ["2026-11-08", "2026-11-11", "2026-11-15", "2026-11-18", "2026-11-22"],
    capacity_remaining: 20,
    rating: 4.88,
    reviews_count: 176,
    popular: true,
    location: "Ushuaia",
    galleryImages: [
      { src: "/lago-argentino-patagonia-crystal-blue-water.jpg", alt: "Canal Beagle" },
      { src: "/placeholder.jpg", alt: "Navegación en canal" },
      { src: "/placeholder.jpg", alt: "Fauna marina" },
      { src: "/placeholder.jpg", alt: "Islas del canal" },
      { src: "/placeholder.jpg", alt: "Vistas del Beagle" },
    ],
  },
  {
    id: "city-tour-ushuaia",
    title: "City Tour Ushuaia — La ciudad del fin del mundo",
    cover_image: "/group-trekking-mountain-hiking-ushuaia-patagonia.jpg",
    price_from: 25,
    currency: "USD",
    difficulty: "Fácil",
    duration: "2.5 hs",
    category: "City tour",
    availability_dates: ["2026-11-08", "2026-11-09", "2026-11-10", "2026-11-15", "2026-11-16"],
    capacity_remaining: 25,
    rating: 4.78,
    reviews_count: 295,
    location: "Ushuaia",
    galleryImages: [
      { src: "/group-trekking-mountain-hiking-ushuaia-patagonia.jpg", alt: "Vistas de Ushuaia" },
      { src: "/placeholder.jpg", alt: "Centro de la ciudad" },
      { src: "/placeholder.jpg", alt: "Monumento del fin del mundo" },
      { src: "/placeholder.jpg", alt: "Puerto de Ushuaia" },
    ],
  },
]

const CATEGORIES: { label: string; value: Category | "all" }[] = [
  { label: "Ver todas", value: "all" },
  { label: "Laguna Esmeralda", value: "Laguna Esmeralda" },
  { label: "Glaciar Vinciguerra", value: "Glaciar Vinciguerra" },
  { label: "Ojo del Albino", value: "Ojo del Albino" },
  { label: "Valle Tierra Mayor", value: "Valle Tierra Mayor" },
  { label: "Valle de Andorra", value: "Valle de Andorra" },
]

// ─── Date helpers ─────────────────────────────────────────────────────────────

function isoToDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function dateToIso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function formatDisplayDate(iso: string) {
  const d = isoToDate(iso)
  return d.toLocaleDateString("es-AR", { day: "numeric", month: "short" })
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

// ─── Mini calendar ────────────────────────────────────────────────────────────

function MiniCalendar({
  startDate,
  endDate,
  onSelect,
}: {
  startDate: string | null
  endDate: string | null
  onSelect: (start: string, end: string | null) => void
}) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [hoverDate, setHoverDate] = useState<string | null>(null)

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const monthName = new Date(viewYear, viewMonth).toLocaleDateString("es-AR", { month: "long", year: "numeric" })

  const handleDayClick = (day: number) => {
    const iso = dateToIso(new Date(viewYear, viewMonth, day))
    if (!startDate || (startDate && endDate)) {
      onSelect(iso, null)
    } else {
      if (iso < startDate) onSelect(iso, startDate)
      else onSelect(startDate, iso)
    }
  }

  const isInRange = (iso: string) => {
    const effectiveEnd = endDate ?? hoverDate
    if (!startDate || !effectiveEnd) return false
    const [s, e] = startDate <= effectiveEnd ? [startDate, effectiveEnd] : [effectiveEnd, startDate]
    return iso > s && iso < e
  }

  const isSelected = (iso: string) =>
    iso === startDate || iso === endDate

  return (
    <div className="w-72 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1 hover:bg-muted rounded-full transition-colors">
          <ChevronDown className="h-4 w-4 rotate-90" />
        </button>
        <span className="font-semibold text-sm capitalize">{monthName}</span>
        <button onClick={nextMonth} className="p-1 hover:bg-muted rounded-full transition-colors">
          <ChevronDown className="h-4 w-4 -rotate-90" />
        </button>
      </div>
      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {["Do","Lu","Ma","Mi","Ju","Vi","Sa"].map(d => (
          <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">{d}</div>
        ))}
      </div>
      {/* Days */}
      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const iso = dateToIso(new Date(viewYear, viewMonth, day))
          const selected = isSelected(iso)
          const inRange = isInRange(iso)
          const isPast = isoToDate(iso) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
          return (
            <button
              key={day}
              disabled={isPast}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => startDate && !endDate && setHoverDate(iso)}
              onMouseLeave={() => setHoverDate(null)}
              className={`
                h-8 w-8 mx-auto flex items-center justify-center text-sm rounded-full transition-colors
                ${isPast ? "text-muted-foreground/40 cursor-not-allowed" : "hover:bg-muted cursor-pointer"}
                ${selected ? "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" : ""}
                ${inRange && !selected ? "bg-primary/15 rounded-none" : ""}
              `}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Search Bar ───────────────────────────────────────────────────────────────

interface SearchBarProps {
  category: Category | "all"
  setCategory: (c: Category | "all") => void
  startDate: string | null
  endDate: string | null
  setDates: (s: string | null, e: string | null) => void
  guests: number
  setGuests: (n: number) => void
  hasFilters: boolean
  onClear: () => void
}

function SearchBar({
  category, setCategory,
  startDate, endDate, setDates,
  guests, setGuests,
  hasFilters, onClear,
}: SearchBarProps) {
  const [openPanel, setOpenPanel] = useState<"where" | "when" | "who" | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenPanel(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const wherLabel = (category === "all" || category === "Todas") ? "¿Qué actividad?" : category
  const whenLabel = startDate
    ? endDate && endDate !== startDate
      ? `${formatDisplayDate(startDate)} – ${formatDisplayDate(endDate)}`
      : formatDisplayDate(startDate)
    : "¿Cuándo?"
  const whoLabel = guests > 1 ? `${guests} personas` : "1 persona"

  const toggle = (panel: "where" | "when" | "who") =>
    setOpenPanel(prev => (prev === panel ? null : panel))

  return (
    <div ref={barRef} className="relative">
      {/* Bar */}
      <div className="flex items-stretch bg-card border border-border rounded-full shadow-md hover:shadow-lg transition-shadow divide-x divide-border">
        {/* Where */}
        <button
          onClick={() => toggle("where")}
          className={`flex flex-col items-start px-6 py-3 rounded-l-full hover:bg-muted/60 transition-colors min-w-0 flex-1 ${openPanel === "where" ? "bg-muted/60" : ""}`}
        >
          <span className="text-xs font-semibold text-foreground">Actividad</span>
          <span className="text-sm text-muted-foreground truncate max-w-[160px]">{wherLabel}</span>
        </button>

        {/* When */}
        <button
          onClick={() => toggle("when")}
          className={`flex flex-col items-start px-6 py-3 hover:bg-muted/60 transition-colors min-w-0 flex-1 ${openPanel === "when" ? "bg-muted/60" : ""}`}
        >
          <span className="text-xs font-semibold text-foreground">Fecha</span>
          <span className="text-sm text-muted-foreground truncate">{whenLabel}</span>
        </button>

        {/* Who */}
        <button
          onClick={() => toggle("who")}
          className={`flex flex-col items-start px-6 py-3 hover:bg-muted/60 transition-colors min-w-0 flex-1 ${openPanel === "who" ? "bg-muted/60" : ""}`}
        >
          <span className="text-xs font-semibold text-foreground">Personas</span>
          <span className="text-sm text-muted-foreground">{whoLabel}</span>
        </button>

        {/* Search button */}
        <div className="flex items-center px-3 pr-2">
          <button
            className="bg-primary text-primary-foreground rounded-full p-3 hover:bg-primary/90 transition-colors"
            aria-label="Buscar actividades"
            onClick={() => setOpenPanel(null)}
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <div className="flex justify-center mt-2">
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Where dropdown */}
      {openPanel === "where" && (
        <div className="absolute top-[calc(100%+12px)] left-0 bg-card border border-border rounded-3xl shadow-xl z-50 p-4 w-72">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Actividad
          </p>
          <div className="flex flex-col gap-1">
            {CATEGORIES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => { setCategory(value); setOpenPanel(null) }}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${category === value
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-foreground"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* When dropdown */}
      {openPanel === "when" && (
        <div className="absolute top-[calc(100%+12px)] left-[calc(33%-20px)] bg-card border border-border rounded-3xl shadow-xl z-50">
          <MiniCalendar
            startDate={startDate}
            endDate={endDate}
            onSelect={(s, e) => setDates(s, e)}
          />
          {(startDate || endDate) && (
            <div className="px-4 pb-4 flex gap-2">
              <button
                onClick={() => setDates(null, null)}
                className="flex-1 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors"
              >
                Borrar
              </button>
              <button
                onClick={() => setOpenPanel(null)}
                className="flex-1 py-2 text-sm bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
              >
                Aplicar
              </button>
            </div>
          )}
        </div>
      )}

      {/* Who dropdown */}
      {openPanel === "who" && (
        <div className="absolute top-[calc(100%+12px)] right-16 bg-card border border-border rounded-3xl shadow-xl z-50 p-5 w-64">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">Personas</p>
              <p className="text-xs text-muted-foreground">¿Cuántos van?</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-lg font-light disabled:opacity-30"
                disabled={guests <= 1}
              >
                −
              </button>
              <span className="font-semibold w-4 text-center">{guests}</span>
              <button
                onClick={() => setGuests(guests + 1)}
                className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-lg font-light"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Activity Card ────────────────────────────────────────────────────────────

function ActivityCard({ activity }: { activity: Activity }) {
  const router = useRouter()

  const nextDate = activity.availability_dates
    .filter(d => d >= dateToIso(new Date()))
    .sort()[0]

  // Build the target URL: /trekkings/<id>?from=actividades&date=<earliest>
  const earliestDate = activity.availability_dates
    .filter(d => d >= dateToIso(new Date()))
    .sort()[0] ?? null

  const targetUrl = `/trekkings/${activity.id}${earliestDate ? `?from=actividades&date=${earliestDate}` : "?from=actividades"}`

  return (
    <article
      className="group cursor-pointer"
      onClick={() => router.push(targetUrl)}
    >
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-3 bg-muted">
        <img
          src={activity.cover_image}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        {activity.popular && (
          <div className="absolute top-3 left-3 bg-white/95 text-foreground text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            Popular
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-0.5">
        {/* Title row */}
        <h3 className="font-semibold text-foreground leading-snug line-clamp-2">
          {activity.title}
        </h3>

        {/* Metadata line */}
        <p className="text-sm text-muted-foreground">
          {activity.location} · {activity.duration} · {activity.difficulty}
        </p>

        {/* Price */}
        <p className="text-sm pt-1">
          <span className="font-semibold text-foreground">{activity.currency} {activity.price_from}</span>
          <span className="text-muted-foreground"> / persona</span>
        </p>
      </div>
    </article>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold mb-2">Sin resultados</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        No hay actividades disponibles con esos filtros. Probá ajustando la búsqueda.
      </p>
      <button
        onClick={onClear}
        className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
      >
        Limpiar filtros
      </button>
    </div>
  )
}

// ─── Main view ────────────────────────────────────────────────────────────────

// Maps the URL ?actividad=<slug> values coming from top-experiences cards
// to the Category values used by the filter.
const SLUG_TO_CATEGORY: Record<string, Category> = {
  "laguna-esmeralda-visita-express": "Laguna Esmeralda",
  "laguna-esmeralda-sunset":         "Laguna Esmeralda",
  "glaciar-vinciguerra":             "Glaciar Vinciguerra",
  "ojo-del-albino":                  "Ojo del Albino",
}

export function ActividadesView() {
  const searchParams = useSearchParams()

  const initialCategory: Category | "all" = (() => {
    const slug = searchParams.get("actividad")
    if (slug && slug in SLUG_TO_CATEGORY) return SLUG_TO_CATEGORY[slug]
    return "all"
  })()

  const [category, setCategory] = useState<Category | "all">(initialCategory)
  const [startDate, setStartDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>(null)
  const [guests, setGuests] = useState(1)

  const setDates = (s: string | null, e: string | null) => {
    setStartDate(s)
    setEndDate(e)
  }

  const hasFilters =
    category !== "all" || startDate !== null || guests > 1

  const clearFilters = () => {
    setCategory("all")
    setStartDate(null)
    setEndDate(null)
    setGuests(1)
  }

  const filtered = useMemo(() => {
    return ACTIVITIES.filter(a => {
      // Category filter
      if (category !== "all" && a.category !== category) return false

      // Date filter
      if (startDate) {
        const rangeEnd = endDate ?? startDate
        const hasDate = a.availability_dates.some(d => d >= startDate && d <= rangeEnd)
        if (!hasDate) return false
      }

      // Guests filter
      if (a.capacity_remaining < guests) return false

      return true
    })
  }, [category, startDate, endDate, guests])

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky search bar header */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <SearchBar
            category={category}
            setCategory={setCategory}
            startDate={startDate}
            endDate={endDate}
            setDates={setDates}
            guests={guests}
            setGuests={setGuests}
            hasFilters={hasFilters}
            onClear={clearFilters}
          />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} {filtered.length === 1 ? "actividad disponible" : "actividades disponibles"}
        </p>

        {filtered.length === 0 ? (
          <EmptyState onClear={clearFilters} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {filtered.map(a => (
              <ActivityCard key={a.id} activity={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
