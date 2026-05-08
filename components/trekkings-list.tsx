"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { TrekkingCard } from "@/components/trekking-card"
import type { TrekkingCardData } from "@/components/trekking-card"

const trekkings: TrekkingCardData[] = [
  {
    id: "susana-pm",
    title: "Susana PM",
    location: "Ushuaia",
    difficulty: "Moderado",
    image: "/ushuaia-martial-glacier-mountain-view.jpg",
    duration: "1 día",
    groupSize: "8-12",
    nextDate: "15 Nov 2025",
    price: "$180.000",
    type: "Trekking",
    description: "Trekking vespertino por senderos patagónicos con vistas espectaculares",
  },
  {
    id: "ojo-albino-pernocte",
    title: "Ojo del Albino con Pernocte",
    location: "Ushuaia",
    difficulty: "Avanzado",
    image: "/ushuaia-martial-glacier-mountain-view.jpg",
    duration: "2 días",
    groupSize: "6-10",
    nextDate: "20 Nov 2025",
    price: "$395.000",
    type: "Campamento",
    description: "Experiencia de campamento en las montañas fueguinas con pernocte",
  },
  {
    id: "laguna-esmeralda-express",
    title: "Laguna Esmeralda, Visita Express",
    location: "Ushuaia",
    difficulty: "Fácil",
    image: "/laguna-esmeralda-emerald-lake-ushuaia-forest-trail.jpg",
    duration: "1 día",
    groupSize: "8-15",
    nextDate: "10 Nov 2025",
    price: "$165.000",
    type: "Trekking",
    description: "Recorrido rápido y directo a la famosa laguna turquesa",
  },
  {
    id: "laguna-esmeralda-sunset",
    title: "Laguna Esmeralda Sunset",
    location: "Ushuaia",
    difficulty: "Fácil",
    image: "/laguna-esmeralda-emerald-lake-ushuaia-forest-trail.jpg",
    duration: "1 día",
    groupSize: "8-12",
    nextDate: "12 Nov 2025",
    price: "$195.000",
    type: "Trekking",
    description: "Trekking vespertino para disfrutar del atardecer en la laguna",
  },
  {
    id: "torres-rio-chico",
    title: "Torres del Rio Chico, el TOUR de las Lagunas",
    location: "Ushuaia",
    difficulty: "Avanzado",
    image: "/ushuaia-martial-glacier-mountain-view.jpg",
    duration: "3 días",
    groupSize: "6-10",
    nextDate: "25 Nov 2025",
    price: "$470.000",
    type: "Campamento",
    description: "Expedición completa por múltiples lagunas con campamento",
  },
  {
    id: "ojo-albino-ice-trekking",
    title: "Ojo del Albino. Ice Trekking",
    location: "Ushuaia",
    difficulty: "Avanzado",
    image: "/ushuaia-martial-glacier-mountain-view.jpg",
    duration: "1 día",
    groupSize: "6-8",
    nextDate: "18 Nov 2025",
    price: "$250.000",
    type: "Montañismo",
    description: "Trekking sobre hielo con equipo técnico de montañismo",
  },
  {
    id: "laguna-esmeralda-confort",
    title: "Laguna Esmeralda, Confort y Aventura",
    location: "Ushuaia",
    difficulty: "Fácil",
    image: "/laguna-esmeralda-emerald-lake-ushuaia-forest-trail.jpg",
    duration: "1 día",
    groupSize: "8-12",
    nextDate: "14 Nov 2025",
    price: "$190.000",
    type: "Trekking",
    description: "Experiencia premium con servicios adicionales y comodidades",
  },
  {
    id: "glaciar-vinciguerra",
    title: "Glaciar Vinciguerra y Laguna de los Témpanos",
    location: "Ushuaia",
    difficulty: "Moderado",
    image: "/ushuaia-martial-glacier-mountain-view.jpg",
    duration: "1 día",
    groupSize: "8-12",
    nextDate: "16 Nov 2025",
    price: "$200.000",
    type: "Trekking",
    description: "Ascenso al glaciar Vinciguerra con vistas panorámicas impresionantes",
  },
]

export function TrekkingsList() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null)

  const filteredTrekkings = trekkings.filter((trek) => {
    if (selectedDifficulty && trek.difficulty !== selectedDifficulty) return false
    if (selectedDuration) {
      const days = Number.parseInt(trek.duration)
      if (selectedDuration === "1" && days !== 1) return false
      if (selectedDuration === "2-3" && (days < 2 || days > 3)) return false
      if (selectedDuration === "4+" && days < 4) return false
    }
    return true
  })

  return (
    <section className="py-20 px-4 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Todas las Aventuras</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Nuestros Trekkings</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explorá la Patagonia y Tierra del Fuego con guías expertos
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Filtrar por:</span>
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2 flex-wrap justify-center">
            <Button
              variant={selectedDifficulty === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(null)}
              className="transition-all"
            >
              Todas
            </Button>
            <Button
              variant={selectedDifficulty === "Fácil" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty("Fácil")}
              className="transition-all"
            >
              Fácil
            </Button>
            <Button
              variant={selectedDifficulty === "Moderado" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty("Moderado")}
              className="transition-all"
            >
              Moderado
            </Button>
            <Button
              variant={selectedDifficulty === "Avanzado" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty("Avanzado")}
              className="transition-all"
            >
              Avanzado
            </Button>
          </div>

          {/* Duration Filter */}
          <div className="flex gap-2 flex-wrap justify-center">
            <Button
              variant={selectedDuration === "1" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDuration(selectedDuration === "1" ? null : "1")}
              className="transition-all"
            >
              1 día
            </Button>
            <Button
              variant={selectedDuration === "2-3" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDuration(selectedDuration === "2-3" ? null : "2-3")}
              className="transition-all"
            >
              2-3 días
            </Button>
            <Button
              variant={selectedDuration === "4+" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDuration(selectedDuration === "4+" ? null : "4+")}
              className="transition-all"
            >
              4+ días
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-center text-muted-foreground mb-8">
          Mostrando {filteredTrekkings.length} {filteredTrekkings.length === 1 ? "trekking" : "trekkings"}
        </p>

        {/* Trekkings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrekkings.map((trek) => (
            <TrekkingCard key={trek.id} trekking={trek} />
          ))}
        </div>

        {/* No Results */}
        {filteredTrekkings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">No se encontraron trekkings con estos filtros</p>
            <Button
              onClick={() => {
                setSelectedDifficulty(null)
                setSelectedDuration(null)
              }}
              variant="outline"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
