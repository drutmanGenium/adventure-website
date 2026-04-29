import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"

export const metadata = {
  title: "Iniciar sesión — Patagonia Trekking",
  description: "Iniciá sesión en tu cuenta de Patagonia Trekking para gestionar tus reservas.",
}

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
