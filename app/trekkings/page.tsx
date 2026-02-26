import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrekkingsList } from "@/components/trekkings-list"

export default function TrekkingsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <TrekkingsList />
      </div>
      <Footer />
    </main>
  )
}
