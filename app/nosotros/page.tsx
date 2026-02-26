import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about-content"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <AboutContent />
      </div>
      <Footer />
    </main>
  )
}
