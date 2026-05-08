"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, Calendar, ChevronRight } from "lucide-react"
import Link from "next/link"

// ─── Difficulty color map ────────────────────────────────────────────────────

export const difficultyColors: Record<string, string> = {
  "Fácil": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  Moderado: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  Avanzado: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TrekkingCardData {
  id: string
  title: string
  location: string
  difficulty: string
  image: string
  duration: string
  groupSize: string
  nextDate: string
  price: string
  type: string
  description: string
}

interface TrekkingCardProps {
  trekking: TrekkingCardData
}

// ─── Component ───────────────────────────────────────────────────────────────

export function TrekkingCard({ trekking }: TrekkingCardProps) {
  return (
    <Card
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={trekking.image || "/placeholder.svg"}
          alt={trekking.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <Badge className={`${difficultyColors[trekking.difficulty] ?? ""} border`}>
            {trekking.difficulty}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-balance group-hover:text-primary transition-colors">
          {trekking.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 text-pretty line-clamp-2">{trekking.description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{trekking.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{trekking.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>Grupo: {trekking.groupSize} personas</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Próxima: {trekking.nextDate}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Desde</p>
            <p className="text-2xl font-bold text-primary">{trekking.price}</p>
          </div>
          <Link href={`/trekkings/${trekking.id}`}>
            <Button className="group/btn bg-primary text-primary-foreground hover:bg-primary/90">
              Ver más
              <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
