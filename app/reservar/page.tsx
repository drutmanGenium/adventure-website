import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ReservarView } from "@/components/reservar-view"

export const metadata = {
  title: "Reservar salida — Patagonia Trekking",
  description: "Completá tu reserva y asegurá tu lugar en la próxima salida.",
}

export default function ReservarPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <Suspense>
          <ReservarView />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
