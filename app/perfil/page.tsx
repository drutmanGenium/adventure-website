import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProfileView } from "@/components/profile-view"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mi Perfil | Patagonia Trek",
  description: "Gestioná tu perfil y avatar de usuario en Patagonia Trek",
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ProfileView />
      </div>
      <Footer />
    </main>
  )
}
