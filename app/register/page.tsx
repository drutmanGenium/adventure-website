import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/register-form"

export const metadata = {
  title: "Crear Cuenta — Patagonia Trekking",
  description: "Registrate para reservar tu próxima aventura en Patagonia.",
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <RegisterForm />
      </div>
      <Footer />
    </main>
  )
}
