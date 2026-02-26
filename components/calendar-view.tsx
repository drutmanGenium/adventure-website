"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Clock, Users, ChevronRight, X } from "lucide-react"
import Link from "next/link"
import { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

// ─── Difficulty icons (neutral SVG, no color) ───────────────────────────────

const WalkingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0">
    {/* head */}
    <circle cx="12" cy="4" r="1.5" />
    {/* torso */}
    <path d="M12 5.5 L11 10" />
    {/* left arm swinging forward */}
    <path d="M11 7.5 L8.5 10" />
    {/* right arm swinging back */}
    <path d="M11 7.5 L13.5 9.5" />
    {/* left leg forward */}
    <path d="M11 10 L9 14 L7.5 18" />
    {/* right leg back */}
    <path d="M11 10 L13 13.5 L14.5 17" />
  </svg>
)

const HikingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0">
    <circle cx="12" cy="4" r="1.5" />
    <path d="M6 20l3-6 2 3 3-8 2 5" />
    <path d="M8 14l-2 6" />
    <path d="M5 11l3-3 2 2" />
    <line x1="16" y1="8" x2="19" y2="14" />
  </svg>
)

const ClimbingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 flex-shrink-0">
    <circle cx="14" cy="4" r="1.5" />
    <path d="M4 20l4-5 2 2 4-10" />
    <path d="M8 15l-2 5" />
    <path d="M11 7l3-1 2 4" />
    <path d="M17 7l2 6" />
    <path d="M3 13l5-2" />
  </svg>
)

const DIFFICULTY_CONFIG: Record<string, { label: string; icon: React.FC }> = {
  Fácil:    { label: "Fácil",    icon: WalkingIcon },
  Moderado: { label: "Moderado", icon: HikingIcon },
  Avanzado: { label: "Avanzado", icon: ClimbingIcon },
}

// ─── Data ────────────────────────────────────────────────────────────────────

const calendarEvents = [
  // Noviembre 2026
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2026-11-07", month: "Noviembre", year: 2026, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 6  },
  { id: "glaciar-martial",       title: "Glaciar Martial",                 date: "2026-11-08", month: "Noviembre", year: 2026, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "Medio día",groupSize: "2-8", price: "$15.000",  spotsLeft: 8  },
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2026-11-14", month: "Noviembre", year: 2026, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 5  },
  { id: "ojo-del-albino",        title: "Glaciar Ojo del Albino",          date: "2026-11-15", month: "Noviembre", year: 2026, difficulty: "Moderado", location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-6", price: "$45.000",  spotsLeft: 4  },
  { id: "vinciguerra",           title: "Glaciar Vinciguerra y Laguna Azul",date: "2026-11-21",month: "Noviembre", year: 2026, difficulty: "Avanzado", location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-6", price: "$65.000",  spotsLeft: 3  },
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2026-11-22", month: "Noviembre", year: 2026, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 8  },
  { id: "glaciar-martial",       title: "Glaciar Martial",                 date: "2026-11-23", month: "Noviembre", year: 2026, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "Medio día",groupSize: "2-8", price: "$15.000",  spotsLeft: 7  },
  { id: "ojo-del-albino",        title: "Glaciar Ojo del Albino",          date: "2026-11-28", month: "Noviembre", year: 2026, difficulty: "Moderado", location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-6", price: "$45.000",  spotsLeft: 5  },
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2026-11-29", month: "Noviembre", year: 2026, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 2  },
  // Diciembre 2026
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2026-12-05", month: "Diciembre", year: 2026, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 8  },
  { id: "glaciar-martial",       title: "Glaciar Martial",                 date: "2026-12-06", month: "Diciembre", year: 2026, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "Medio día",groupSize: "2-8", price: "$15.000",  spotsLeft: 6  },
  { id: "ojo-del-albino",        title: "Glaciar Ojo del Albino",          date: "2026-12-07", month: "Diciembre", year: 2026, difficulty: "Moderado", location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-6", price: "$45.000",  spotsLeft: 4  },
  { id: "vinciguerra",           title: "Glaciar Vinciguerra y Laguna Azul",date: "2026-12-12",month: "Diciembre", year: 2026, difficulty: "Avanzado", location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-6", price: "$65.000",  spotsLeft: 3  },
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2026-12-13", month: "Diciembre", year: 2026, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 10 },
  { id: "campamento-vinciguerra",title: "Campamento Vinciguerra",          date: "2026-12-14", month: "Diciembre", year: 2026, difficulty: "Avanzado", location: "Ushuaia, Tierra del Fuego", duration: "2 días",   groupSize: "2-6", price: "$130.000", spotsLeft: 4  },
  { id: "glaciar-martial",       title: "Glaciar Martial",                 date: "2026-12-19", month: "Diciembre", year: 2026, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "Medio día",groupSize: "2-8", price: "$15.000",  spotsLeft: 8  },
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2026-12-20", month: "Diciembre", year: 2026, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 5  },
  { id: "ojo-del-albino",        title: "Glaciar Ojo del Albino",          date: "2026-12-21", month: "Diciembre", year: 2026, difficulty: "Moderado", location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-6", price: "$45.000",  spotsLeft: 3  },
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2026-12-27", month: "Diciembre", year: 2026, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 12 },
  { id: "vinciguerra",           title: "Glaciar Vinciguerra y Laguna Azul",date: "2026-12-28",month: "Diciembre", year: 2026, difficulty: "Avanzado", location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-6", price: "$65.000",  spotsLeft: 2  },
  // Enero 2027
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2027-01-03", month: "Enero",     year: 2027, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 8  },
  { id: "glaciar-martial",       title: "Glaciar Martial",                 date: "2027-01-04", month: "Enero",     year: 2027, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "Medio día",groupSize: "2-8", price: "$15.000",  spotsLeft: 7  },
  { id: "ojo-del-albino",        title: "Glaciar Ojo del Albino",          date: "2027-01-10", month: "Enero",     year: 2027, difficulty: "Moderado", location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-6", price: "$45.000",  spotsLeft: 5  },
  { id: "vinciguerra",           title: "Glaciar Vinciguerra y Laguna Azul",date: "2027-01-11",month: "Enero",     year: 2027, difficulty: "Avanzado", location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-6", price: "$65.000",  spotsLeft: 4  },
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2027-01-17", month: "Enero",     year: 2027, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 6  },
  { id: "campamento-vinciguerra",title: "Campamento Vinciguerra",          date: "2027-01-18", month: "Enero",     year: 2027, difficulty: "Avanzado", location: "Ushuaia, Tierra del Fuego", duration: "2 días",   groupSize: "2-6", price: "$130.000", spotsLeft: 3  },
  { id: "glaciar-martial",       title: "Glaciar Martial",                 date: "2027-01-24", month: "Enero",     year: 2027, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "Medio día",groupSize: "2-8", price: "$15.000",  spotsLeft: 8  },
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2027-01-25", month: "Enero",     year: 2027, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 2  },
  // Febrero 2027
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2027-02-07", month: "Febrero",   year: 2027, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 8  },
  { id: "glaciar-martial",       title: "Glaciar Martial",                 date: "2027-02-08", month: "Febrero",   year: 2027, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "Medio día",groupSize: "2-8", price: "$15.000",  spotsLeft: 6  },
  { id: "ojo-del-albino",        title: "Glaciar Ojo del Albino",          date: "2027-02-14", month: "Febrero",   year: 2027, difficulty: "Moderado", location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-6", price: "$45.000",  spotsLeft: 4  },
  { id: "vinciguerra",           title: "Glaciar Vinciguerra y Laguna Azul",date: "2027-02-15",month: "Febrero",   year: 2027, difficulty: "Avanzado", location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-6", price: "$65.000",  spotsLeft: 3  },
  { id: "laguna-esmeralda",      title: "Laguna Esmeralda",                date: "2027-02-21", month: "Febrero",   year: 2027, difficulty: "Fácil",    location: "Ushuaia, Tierra del Fuego", duration: "1 día",    groupSize: "2-8", price: "$35.000",  spotsLeft: 7  },
  { id: "campamento-vinciguerra",title: "Campamento Vinciguerra",          date: "2027-02-22", month: "Febrero",   year: 2027, difficulty: "Avanzado", location: "Ushuaia, Tierra del Fuego", duration: "2 días",   groupSize: "2-6", price: "$130.000", spotsLeft: 2  },
]

const DEFAULT_MONTH = "Noviembre"
const DEFAULT_YEAR  = 2026
const ALL_MONTHS_KEY = "Todos|0"

// Slug → title mapping derived from calendarEvents
const SLUG_TO_TITLE: Record<string, string> = {}
calendarEvents.forEach((e) => { SLUG_TO_TITLE[e.id] = e.title })

// Title → slug mapping (reverse)
const TITLE_TO_SLUG: Record<string, string> = {}
calendarEvents.forEach((e) => { TITLE_TO_SLUG[e.title] = e.id })

// ─── Component ───────────────────────────────────────────────────────────────

export function CalendarView() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Resolve initial state from URL query params
  const initialActivity = useMemo(() => {
    const slug = searchParams.get("actividad")
    if (slug && SLUG_TO_TITLE[slug]) return SLUG_TO_TITLE[slug]
    return "Todas"
  }, [searchParams])

  // When coming from a deep-link, show all months so user sees all dates for that activity
  const initialMonthYear = useMemo(() => {
    const slug = searchParams.get("actividad")
    if (slug && SLUG_TO_TITLE[slug]) return ALL_MONTHS_KEY
    return `${DEFAULT_MONTH}|${DEFAULT_YEAR}`
  }, [searchParams])

  const [selectedMonthYear, setSelectedMonthYear] = useState(initialMonthYear)
  const [selectedActivity,  setSelectedActivity]  = useState(initialActivity)
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [activityResetMsg, setActivityResetMsg] = useState(false)

  const isAllMonths   = selectedMonthYear === ALL_MONTHS_KEY
  const selectedMonth = selectedMonthYear.split("|")[0]
  const selectedYear  = Number(selectedMonthYear.split("|")[1])

  // All distinct month/year combos that have events, in chronological order
  const availableMonthYears = useMemo(() => {
    const seen = new Set<string>()
    return calendarEvents
      .map((e) => ({ key: `${e.month}|${e.year}`, month: e.month, year: e.year, date: new Date(e.date) }))
      .filter((e) => { if (seen.has(e.key)) return false; seen.add(e.key); return true })
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }, [])

  // Activities available in the selected month (or all), with counts
  const activitiesInMonth = useMemo(() => {
    const counts: Record<string, number> = {}
    calendarEvents
      .filter((e) => isAllMonths || (e.month === selectedMonth && e.year === selectedYear))
      .forEach((e) => { counts[e.title] = (counts[e.title] || 0) + 1 })
    return counts
  }, [isAllMonths, selectedMonth, selectedYear])

  // If selected activity not in new month → auto-reset
  const resolvedActivity = activitiesInMonth[selectedActivity] !== undefined
    ? selectedActivity
    : "Todas"

  const handleMonthChange = (value: string) => {
    if (value === ALL_MONTHS_KEY) {
      // "Todos los meses" - keep activity if it exists globally
      const allTitles = calendarEvents.map((e) => e.title)
      if (selectedActivity !== "Todas" && !allTitles.includes(selectedActivity)) {
        setSelectedActivity("Todas")
        setActivityResetMsg(true)
        setTimeout(() => setActivityResetMsg(false), 4000)
      }
    } else {
      const [newMonth, newYear] = value.split("|")
      const available = calendarEvents
        .filter((e) => e.month === newMonth && e.year === Number(newYear))
        .map((e) => e.title)
      if (selectedActivity !== "Todas" && !available.includes(selectedActivity)) {
        setSelectedActivity("Todas")
        setActivityResetMsg(true)
        setTimeout(() => setActivityResetMsg(false), 4000)
      }
    }
    setSelectedMonthYear(value)
  }

  const handleActivityChange = (value: string) => {
    setSelectedActivity(value)
    setActivityResetMsg(false)
  }

  const toggleDifficulty = (diff: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    )
  }

  const clearFilters = () => {
    setSelectedMonthYear(`${DEFAULT_MONTH}|${DEFAULT_YEAR}`)
    setSelectedActivity("Todas")
    setSelectedDifficulties([])
    setActivityResetMsg(false)
    // Remove query params from URL
    router.replace("/calendario", { scroll: false })
  }

  const hasActiveFilters =
    selectedMonthYear !== `${DEFAULT_MONTH}|${DEFAULT_YEAR}` ||
    selectedActivity !== "Todas" ||
    selectedDifficulties.length > 0 ||
    isAllMonths

  const filteredEvents = useMemo(() => {
    return calendarEvents
      .filter((e) => isAllMonths || (e.month === selectedMonth && e.year === selectedYear))
      .filter((e) => resolvedActivity === "Todas" || e.title === resolvedActivity)
      .filter((e) => selectedDifficulties.length === 0 || selectedDifficulties.includes(e.difficulty))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [isAllMonths, selectedMonth, selectedYear, resolvedActivity, selectedDifficulties])

  const summaryActivity = resolvedActivity === "Todas" ? "Todas las actividades" : resolvedActivity
  const summaryDifficulty = selectedDifficulties.length > 0
    ? `Dificultad: ${selectedDifficulties.join(", ")}`
    : "Dificultad: Todas"

  // ─── Select base classes
  const selectClass =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors appearance-none cursor-pointer"

  return (
    <section className="py-20 px-4 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Próximas Salidas</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Calendario de Expediciones</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
            Elegí la fecha que mejor se adapte a tus planes
          </p>
        </div>

        {/* Filter Panel */}
        <div className="bg-card border rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-semibold text-foreground">Elegir salidas</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Row 1 — Mes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Mes
              </label>
              <div className="relative">
                <select
                  value={selectedMonthYear}
                  onChange={(e) => handleMonthChange(e.target.value)}
                  className={selectClass}
                >
                  <option value={ALL_MONTHS_KEY}>Todos los meses</option>
                  {availableMonthYears.map(({ key, month, year }) => (
                    <option key={key} value={key}>
                      {month} {year}
                    </option>
                  ))}
                </select>
                <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 rotate-90 text-muted-foreground" />
              </div>
            </div>

            {/* Row 2 — Actividad (dependent) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {"Lugar\n"}
              </label>
              <div className="relative">
                <select
                  value={resolvedActivity}
                  onChange={(e) => handleActivityChange(e.target.value)}
                  className={selectClass}
                >
                  <option value="Todas">Todas</option>
                  {Object.entries(activitiesInMonth).map(([title, count]) => (
                    <option key={title} value={title}>
                      {title} ({count})
                    </option>
                  ))}
                </select>
                <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 rotate-90 text-muted-foreground" />
              </div>
              {activityResetMsg && (
                <p className="text-xs text-muted-foreground italic">
                  No hay salidas de esa actividad en el mes seleccionado.
                </p>
              )}
            </div>

            {/* Row 3 — Dificultad (segmented, persistent) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Dificultad
              </label>
              <div className="flex rounded-lg border border-input overflow-hidden bg-background divide-x divide-border h-[38px]">
                {Object.entries(DIFFICULTY_CONFIG).map(([key, { label, icon: Icon }]) => {
                  const active = selectedDifficulties.includes(key)
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleDifficulty(key)}
                      title={label}
                      className={`flex flex-1 items-center justify-center gap-1.5 px-2 text-xs font-medium transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon />
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Event Cards */}
        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredEvents.map((event, index) => {
              const dateObj  = new Date(event.date + "T12:00:00")
              const dayNum   = dateObj.getDate()
              const monthShort = dateObj.toLocaleDateString("es", { month: "short" }).toUpperCase().replace(".", "")
              const lowSpots = event.spotsLeft <= 3
              const DiffIcon = DIFFICULTY_CONFIG[event.difficulty]?.icon

              return (
                <Card
                  key={`${event.id}-${event.date}-${index}`}
                  className="p-5 hover:shadow-md transition-all border hover:border-primary/40 rounded-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                    {/* Date block */}
                    <div className="flex-shrink-0 w-16 h-16 bg-primary/8 rounded-xl flex flex-col items-center justify-center border border-primary/20">
                      <span className="text-[10px] font-bold text-primary tracking-wider">{monthShort}</span>
                      <span className="text-2xl font-bold text-primary leading-none">{dayNum}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="text-lg font-bold leading-tight">{event.title}</h3>
                        {DiffIcon && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border border-border bg-muted text-foreground/70">
                            <DiffIcon />
                            {event.difficulty}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-primary/70" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-primary/70" />
                          {event.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-primary/70" />
                          {event.groupSize} personas
                        </span>
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Desde</p>
                        <p className="text-xl font-bold text-foreground leading-tight">{event.price}</p>
                      </div>
                      <p className={`text-xs font-medium ${lowSpots ? "text-rose-500" : "text-primary"}`}>
                        {lowSpots
                          ? `¡Solo ${event.spotsLeft} lugares!`
                          : `${event.spotsLeft} lugares disponibles`}
                      </p>
                      <Link href={`/trekkings/${event.id}`}>
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap mt-1">
                          Reservar
                          <ChevronRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>

                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-medium mb-1">No hay salidas disponibles con estos filtros.</p>
            <button onClick={clearFilters} className="text-sm text-primary hover:underline">
              Limpiar filtros
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
