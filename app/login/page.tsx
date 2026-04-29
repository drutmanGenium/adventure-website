import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"

export const metadata = {
  title: "Iniciar Sesión — Patagonia Trekking",
  description: "Ingresá a tu cuenta para gestionar tus reservas.",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <LoginForm />
      </div>
      <Footer />
    </main>
  )
}
