import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { NotFoundContent } from "@/components/not-found-content"

export default function NotFoundPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <NotFoundContent />
      </div>
      <Footer />
    </main>
  )
}
