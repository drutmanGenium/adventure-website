import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/register-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Crear Cuenta — Patagonia Trekking",
  description: "Creá tu cuenta en Patagonia Trekking para reservar tus próximas aventuras en la Patagonia.",
}

export default function RegistroPage() {
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
