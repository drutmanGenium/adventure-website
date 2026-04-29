import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Iniciar Sesión — Patagonia Trekking",
  description: "Iniciá sesión en tu cuenta de Patagonia Trekking para gestionar tus reservas y aventuras.",
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
