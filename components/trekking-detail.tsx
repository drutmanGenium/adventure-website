"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Clock, Users, Calendar, Mountain, Check, X, Info, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ACTIVITIES, dateToIso } from "@/components/actividades-view"
import { createWhatsAppHref } from "@/lib/whatsapp"
import { ImageGalleryLightbox } from "@/components/image-gallery-lightbox"

const trekkingData: Record<string, any> = {
  "susana-pm": {
    title: "Susana PM",
    location: "Tierra del Fuego",
    difficulty: "Moderado",
    image: "/ushuaia-martial-glacier-mountain-view.jpg",
    duration: "1 día",
    groupSize: "8-12",
    price: "$180.000",
    type: "Trekking",
    description:
      "Trekking vespertino por los senderos más pintorescos de Tierra del Fuego, ideal para disfrutar de las mejores vistas al atardecer.",
    longDescription:
      "La Susana PM es una experiencia única que te permite explorar la naturaleza fueguina durante la tarde, cuando la luz crea un ambiente mágico. Este trekking moderado te llevará por senderos bien marcados con vistas panorámicas del canal Beagle y las montañas circundantes.",
    itinerary: [
      {
        day: "Tarde",
        title: "Trekking Vespertino",
        description:
          "Recogida 14:00. Traslado al inicio del sendero. Trekking de 4 horas por paisajes patagónicos. Merienda en mirador. Retorno a Ushuaia al anochecer.",
      },
    ],
    included: [
      "Guía profesional",
      "Transporte desde/hasta Ushuaia",
      "Merienda y bebidas calientes",
      "Seguro de excursión",
    ],
    notIncluded: ["Equipamiento personal", "Almuerzo", "Propinas"],
    requirements: ["Edad mínima: 10 años", "Nivel de fitness: Moderado", "No se requiere experiencia previa"],
    dates: ["15 Nov 2025", "22 Nov 2025", "29 Nov 2025", "6 Dic 2025"],
  },
  "ojo-albino-pernocte": {
    title: "Ojo del Albino con Pernocte",
    location: "Tierra del Fuego",
    difficulty: "Avanzado",
    image: "/ushuaia-martial-glacier-mountain-view.jpg",
    duration: "2 días",
    groupSize: "6-10",
    price: "$395.000",
    type: "Campamento",
    description: "Expedición con campamento nocturno en uno de los lugares más remotos y hermosos de Tierra del Fuego.",
    longDescription:
      "Una aventura de dos días que combina trekking de alta montaña con la experiencia única de acampar bajo las estrellas australes. El Ojo del Albino es una laguna glaciar de difícil acceso que recompensa con vistas incomparables.",
    itinerary: [
      {
        day: "Día 1",
        title: "Ascenso y Campamento",
        description:
          "Salida 8:00am. Trekking de 6-7 horas hasta el campamento base. Instalación de carpas. Cena caliente. Observación de estrellas.",
      },
      {
        day: "Día 2",
        title: "Exploración y Descenso",
        description:
          "Desayuno. Exploración del Ojo del Albino. Almuerzo. Descenso de 4-5 horas. Regreso a Ushuaia por la tarde.",
      },
    ],
    included: [
      "Guía de montaña certificado",
      "Equipo de camping completo",
      "Todas las comidas",
      "Transporte",
      "Seguro de trekking",
    ],
    notIncluded: ["Equipamiento personal (botas, ropa de abrigo)", "Sleeping bag personal", "Snacks extras"],
    requirements: [
      "Edad mínima: 16 años",
      "Nivel de fitness: Avanzado",
      "Experiencia previa en trekking",
      "Buena condición física",
    ],
    dates: ["20 Nov 2025", "4 Dic 2025", "18 Dic 2025"],
  },
  "laguna-esmeralda-express": {
    title: "Laguna Esmeralda, Visita Express",
    location: "Tierra del Fuego",
    difficulty: "Fácil",
    image: "/laguna-esmeralda-emerald-lake-ushuaia-forest-trail.jpg",
    duration: "1 día",
    groupSize: "8-15",
    price: "$165.000",
    type: "Trekking",
    description:
      "La forma más rápida y eficiente de conocer la famosa Laguna Esmeralda, ideal para viajeros con poco tiempo.",
    longDescription:
      "Esta versión express del clásico trekking a Laguna Esmeralda está diseñada para maximizar tu tiempo. En medio día conocerás uno de los lugares más emblemáticos de Tierra del Fuego sin sacrificar la calidad de la experiencia.",
    itinerary: [
      {
        day: "Mañana",
        title: "Visita Express",
        description:
          "Salida 8:00am. Traslado (30 min). Trekking directo a la laguna (2.5 horas). Tiempo en la laguna (30 min). Retorno rápido (2 horas). Regreso a Ushuaia 14:00.",
      },
    ],
    included: ["Guía profesional", "Transporte", "Snacks y bebidas", "Seguro"],
    notIncluded: ["Almuerzo completo", "Equipamiento personal"],
    requirements: ["Edad mínima: 8 años", "Nivel de fitness: Básico", "Apto para principiantes"],
    dates: ["10 Nov 2025", "17 Nov 2025", "24 Nov 2025", "1 Dic 2025", "8 Dic 2025"],
  },
  "laguna-esmeralda-sunset": {
    title: "Laguna Esmeralda Sunset",
    location: "Tierra del Fuego",
    difficulty: "Fácil",
    image: "/laguna-esmeralda-emerald-lake-ushuaia-forest-trail.jpg",
    duration: "1 día",
    groupSize: "8-12",
    price: "$195.000",
    type: "Trekking",
    description:
      "Experiencia mágica para presenciar el atardecer en la laguna con los colores más espectaculares del día.",
    longDescription:
      "La Laguna Esmeralda cobra una dimensión completamente diferente durante el atardecer. Los colores del cielo patagónico se reflejan en las aguas turquesas creando un espectáculo natural inolvidable. Esta excursión vespertina incluye cena junto a la laguna.",
    itinerary: [
      {
        day: "Tarde/Noche",
        title: "Trekking al Atardecer",
        description:
          "Salida 15:00. Trekking pausado de 3 horas. Llegada antes del atardecer. Cena caliente junto a la laguna. Observación del sunset. Retorno con linternas frontales. Llegada 22:00.",
      },
    ],
    included: ["Guía profesional", "Transporte", "Cena caliente completa", "Linternas frontales", "Seguro"],
    notIncluded: ["Equipamiento personal", "Bebidas alcohólicas"],
    requirements: ["Edad mínima: 10 años", "Nivel de fitness: Básico", "Cómodo caminando en penumbras"],
    dates: ["12 Nov 2025", "19 Nov 2025", "26 Nov 2025", "3 Dic 2025"],
  },
  "torres-rio-chico": {
    title: "Torres del Rio Chico, el TOUR de las Lagunas",
    location: "Tierra del Fuego",
    difficulty: "Avanzado",
    image: "/ushuaia-martial-glacier-mountain-view.jpg",
    duration: "3 días",
    groupSize: "6-10",
    price: "$470.000",
    type: "Campamento",
    description: "La expedición más completa de Tierra del Fuego, recorriendo múltiples lagunas y torres de montaña.",
    longDescription:
      "Esta es la expedición definitiva para aventureros experimentados. Durante tres días explorarás los rincones más remotos y salvajes de Tierra del Fuego, visitando lagunas escondidas, torres de roca y glaciares con dos noches de campamento en alta montaña.",
    itinerary: [
      {
        day: "Día 1",
        title: "Inicio de la Expedición",
        description:
          "Salida temprano. Trekking de 7 horas hasta primer campamento. Cruce de ríos y bosques. Instalación de campamento. Cena.",
      },
      {
        day: "Día 2",
        title: "Tour de Lagunas",
        description:
          "Día completo explorando lagunas glaciares. Ascenso a miradores. Almuerzo de montaña. Segunda noche en campamento alto.",
      },
      {
        day: "Día 3",
        title: "Torres y Descenso",
        description:
          "Visita a las Torres del Río Chico. Descenso de 6 horas. Almuerzo en ruta. Regreso a Ushuaia al atardecer.",
      },
    ],
    included: [
      "Guía experto en alta montaña",
      "Equipo completo de camping",
      "Todas las comidas",
      "Transporte",
      "Seguro especializado",
    ],
    notIncluded: ["Equipamiento personal técnico", "Sleeping bag personal", "Snacks personales"],
    requirements: [
      "Edad mínima: 18 años",
      "Nivel de fitness: Avanzado/Experto",
      "Experiencia previa obligatoria en trekking de múltiples días",
      "Certificado médico requerido",
    ],
    dates: ["25 Nov 2025", "9 Dic 2025", "6 Ene 2026"],
  },
  "ojo-albino-ice-trekking": {
    title: "Ojo del Albino. Ice Trekking",
    location: "Tierra del Fuego",
    difficulty: "Avanzado",
    image: "/ushuaia-martial-glacier-mountain-view.jpg",
    duration: "1 día",
    groupSize: "6-8",
    price: "$250.000",
    type: "Montañismo",
    description: "Trekking técnico sobre hielo con crampones y equipo de montañismo en el glaciar Ojo del Albino.",
    longDescription:
      "Una experiencia de montañismo para aventureros que quieren llevar su trekking al siguiente nivel. Caminarás sobre hielo milenario usando crampones y equipo técnico, explorando grietas glaciares y formaciones de hielo bajo la supervisión de guías certificados en alta montaña.",
    itinerary: [
      {
        day: "Día Completo",
        title: "Ice Trekking Técnico",
        description:
          "Salida 7:00am. Aproximación al glaciar (3 horas). Colocación de equipo técnico. Ice trekking de 4 horas sobre hielo. Almuerzo en el glaciar. Descenso (2.5 horas). Retorno 18:00.",
      },
    ],
    included: [
      "Guía de alta montaña AAGM",
      "Equipo técnico completo (crampones, arnés, casco)",
      "Transporte",
      "Almuerzo de montaña",
      "Seguro especializado",
    ],
    notIncluded: ["Botas de montaña (se pueden alquilar)", "Ropa técnica personal", "Snacks extras"],
    requirements: [
      "Edad mínima: 16 años",
      "Nivel de fitness: Avanzado",
      "Experiencia previa en trekking",
      "Sin vértigo",
      "Certificado médico recomendado",
    ],
    dates: ["18 Nov 2025", "2 Dic 2025", "16 Dic 2025", "30 Dic 2025"],
  },
  "laguna-esmeralda-confort": {
    title: "Laguna Esmeralda, Confort y Aventura",
    location: "Tierra del Fuego",
    difficulty: "Fácil",
    image: "/laguna-esmeralda-emerald-lake-ushuaia-forest-trail.jpg",
    duration: "1 día",
    groupSize: "8-12",
    price: "$190.000",
    type: "Trekking",
    description:
      "La experiencia premium de Laguna Esmeralda con servicios adicionales, almuerzo gourmet y grupo reducido.",
    longDescription:
      "Para quienes buscan combinar aventura con comodidad, esta versión premium del trekking a Laguna Esmeralda incluye un ritmo más pausado, almuerzo gourmet preparado por chef, bebidas premium, grupo reducido y atención personalizada. La forma más cómoda de vivir esta experiencia.",
    itinerary: [
      {
        day: "Día Completo",
        title: "Experiencia Premium",
        description:
          "Recogida 9:00am. Traslado privado. Trekking pausado (3.5 horas) con paradas fotográficas. Almuerzo gourmet junto a la laguna. Tiempo libre. Retorno tranquilo (2.5 horas). Llegada 17:00.",
      },
    ],
    included: [
      "Guía bilingüe especializado",
      "Transporte privado",
      "Almuerzo gourmet y bebidas premium",
      "Kit de trekking (bastones, mochila pequeña)",
      "Seguro premium",
    ],
    notIncluded: ["Equipamiento personal", "Propinas"],
    requirements: [
      "Edad mínima: 8 años",
      "Nivel de fitness: Básico",
      "Ideal para familias",
      "Apto para todas las edades",
    ],
    dates: ["14 Nov 2025", "21 Nov 2025", "28 Nov 2025", "5 Dic 2025", "12 Dic 2025"],
  },
  "glaciar-vinciguerra": {
    title: "Glaciar Vinciguerra y Laguna de los Témpanos",
    location: "Tierra del Fuego",
    difficulty: "Moderado",
    image: "/ushuaia-martial-glacier-mountain-view.jpg",
    duration: "1 día",
    groupSize: "8-12",
    price: "$200.000",
    type: "Trekking",
    description:
      "Ascenso al glaciar Vinciguerra con vistas panorámicas de 360° y la impresionante Laguna de los Témpanos.",
    longDescription:
      "Este trekking te llevará a uno de los miradores más espectaculares de Tierra del Fuego. El ascenso al Glaciar Vinciguerra recompensa con vistas de 360 grados del Canal Beagle, las montañas circundantes y la increíble Laguna de los Témpanos con sus icebergs flotantes.",
    itinerary: [
      {
        day: "Día Completo",
        title: "Ascenso al Glaciar",
        description:
          "Salida 8:00am. Traslado (30 min). Ascenso progresivo de 5 horas a través de bosque andino y zona alpina. Almuerzo con vista al glaciar y la laguna. Tiempo para explorar y fotografiar. Descenso (3 horas). Retorno 18:00.",
      },
    ],
    included: [
      "Guía profesional",
      "Transporte desde/hasta Ushuaia",
      "Almuerzo tipo box lunch mejorado",
      "Bebidas calientes",
      "Bastones de trekking",
      "Seguro de excursión",
    ],
    notIncluded: ["Equipamiento personal (botas, mochila, ropa de abrigo)", "Snacks adicionales", "Propinas"],
    requirements: [
      "Edad mínima: 12 años",
      "Nivel de fitness: Moderado",
      "Experiencia básica en trekking recomendada",
      "Buena condición física",
    ],
    dates: ["16 Nov 2025", "23 Nov 2025", "30 Nov 2025", "7 Dic 2025", "14 Dic 2025", "21 Dic 2025"],
  },
}

// ─── Date helpers (local) ─────────────────────────────────────────────────────

function isoToDisplayDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString("es-AR", { weekday: "short", day: "numeric", month: "short" })
}

export function TrekkingDetail({ id }: { id: string }) {
  const trekking = trekkingData[id]
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get matching ACTIVITIES entry for future dates
  const activityData = useMemo(
    () => ACTIVITIES.find(a => a.id === id),
    [id]
  )

  const today = dateToIso(new Date())

  const futureDates = useMemo(() => {
    if (!activityData) return []
    return activityData.availability_dates.filter(d => d >= today).sort()
  }, [activityData, today])

  // Pre-select from URL ?date param, or earliest upcoming
  const urlDate = searchParams.get("date")
  const initialDate = urlDate && futureDates.includes(urlDate)
    ? urlDate
    : (futureDates[0] ?? null)

  const [selectedDate, setSelectedDate] = useState<string | null>(initialDate)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  if (!trekking) {
    return (
      <div className="py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Actividad no encontrada</h1>
        <Link href="/actividades">
          <Button>Ver Actividades</Button>
        </Link>
      </div>
    )
  }

  const departureId = selectedDate ? `${id}-${selectedDate}` : null
  const reservaUrl = departureId ? `/reservar?departureId=${encodeURIComponent(departureId)}` : "#"

  const difficultyColors = {
    Fácil: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    Moderado: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    Avanzado: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={trekking.image || "/placeholder.svg"} alt={trekking.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Gallery Button */}
        {activityData?.galleryImages && activityData.galleryImages.length > 0 && (
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:shadow-lg hover:scale-105"
            aria-label="View gallery"
            title="Ver galería"
          >
            <ImageIcon className="h-6 w-6" />
          </button>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Link href="/actividades">
              <Button variant="ghost" className="mb-4 text-white hover:text-white hover:bg-white/20">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver a Actividades
              </Button>
            </Link>
            <Badge className={`mb-4 ${difficultyColors[trekking.difficulty as keyof typeof difficultyColors]} border`}>
              {trekking.difficulty}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">{trekking.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{trekking.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{trekking.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Grupo: {trekking.groupSize} personas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Descripción</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">{trekking.description}</p>
              <p className="text-muted-foreground leading-relaxed">{trekking.longDescription}</p>
            </Card>

            {/* Itinerary */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Itinerario</h2>
              <div className="space-y-6">
                {trekking.itinerary.map((day: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mountain className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg mb-1">
                        {day.day}: {day.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* What's Included */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Qué está incluido</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    Incluye
                  </h3>
                  <ul className="space-y-2">
                    {trekking.included.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-red-600">
                    <X className="h-5 w-5" />
                    No Incluye
                  </h3>
                  <ul className="space-y-2">
                    {trekking.notIncluded.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <X className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Requirements */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="h-6 w-6 text-primary" />
                Requisitos
              </h2>
              <ul className="space-y-2">
                {trekking.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Right Column - Fechas disponibles + booking */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              {/* Price */}
              {activityData && (
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Desde</p>
                  <p className="text-3xl font-bold text-foreground">
                    {activityData.currency} {activityData.price_from}
                    <span className="text-base font-normal text-muted-foreground"> / persona</span>
                  </p>
                </div>
              )}

              {/* Fechas disponibles */}
              <div className="mb-6">
                <h2 className="text-base font-semibold mb-3">Fechas disponibles</h2>

                {futureDates.length === 0 ? (
                  <div className="rounded-xl border border-border bg-muted/40 p-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      No hay fechas disponibles por el momento. Consultanos y te avisamos apenas haya nuevas salidas.
                    </p>
                    <a
                      href={createWhatsAppHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
                    >
                      Consultanos →
                    </a>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {futureDates.map((date) => {
                      const isSelected = selectedDate === date
                      const capacity = activityData?.capacity_remaining ?? null
                      return (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-left group ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <Calendar className={`h-4 w-4 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                              <span className={`font-medium text-sm capitalize ${isSelected ? "text-foreground" : "text-foreground"}`}>
                                {isoToDisplayDate(date)}
                              </span>
                            </div>
                            {capacity !== null && (
                              <span className="text-xs text-muted-foreground shrink-0">
                                {capacity} lugares
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* CTA */}
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl group"
                size="lg"
                disabled={!selectedDate}
                onClick={() => selectedDate && router.push(reservaUrl)}
              >
                Continuar a reserva
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="mt-5 pt-5 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  ¿Tenés dudas?{" "}
                  <a 
                    href={createWhatsAppHref()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Contactanos
                  </a>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Gallery Lightbox */}
      {activityData?.galleryImages && (
        <ImageGalleryLightbox
          images={activityData.galleryImages}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}
    </div>
  )
}
