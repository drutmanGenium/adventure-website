import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/register-form"

export const metadata = {
  title: "Crear cuenta — Patagonia Trekking",
  description: "Creá tu cuenta en Patagonia Trekking para reservar tu próxima aventura.",
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
