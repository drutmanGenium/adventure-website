import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/register-form"

export const metadata = {
  title: "Crear Cuenta — Patagonia Trekking",
  description: "Creá tu cuenta para reservar experiencias únicas de trekking en Patagonia.",
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <RegisterForm />
      </div>
      <Footer />
    </main>
  )
}
