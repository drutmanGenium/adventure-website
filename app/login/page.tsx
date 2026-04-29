import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <LoginForm />
      </div>
      <Footer />
    </main>
  )
}
