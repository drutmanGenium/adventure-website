import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ReservarView } from "@/components/reservar-view"
import { ProtectedRoute } from "@/components/protected-route"

export const metadata = {
  title: "Reservar salida — Patagonia Trekking",
  description: "Completá tu reserva y asegurá tu lugar en la próxima salida.",
}

export default function ReservarPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <ProtectedRoute>
          <Suspense>
            <ReservarView />
          </Suspense>
        </ProtectedRoute>
      </div>
      <Footer />
    </main>
  )
}
