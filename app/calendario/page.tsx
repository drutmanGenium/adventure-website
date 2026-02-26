import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CalendarView } from "@/components/calendar-view"
import { Suspense } from "react"

export default function CalendarPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Suspense>
          <CalendarView />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
