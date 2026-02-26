import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ActividadesView } from "@/components/actividades-view"
import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Actividades en Ushuaia | Patagonia Trek",
  description:
    "Explorá todas nuestras actividades en Ushuaia y Tierra del Fuego. Trekkings, city tours, excursiones por el Parque Nacional y navegaciones por el Canal Beagle.",
}

export default function ActividadesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Suspense>
          <ActividadesView />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
