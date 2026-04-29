import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProfileView } from "@/components/profile-view"

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
