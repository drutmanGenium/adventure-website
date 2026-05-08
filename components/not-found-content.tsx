"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mountain, Home, Compass } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export function NotFoundContent() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/dramatic-patagonia-mountain-landscape-with-glacier.jpg"
          alt={t("Paisaje de montañas patagónicas", "Patagonian mountain landscape")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center py-20">
        <div className="inline-flex items-center bg-primary/90 text-primary-foreground px-4 py-2 rounded-full mb-6 backdrop-blur-sm gap-2">
          <Mountain className="h-5 w-5" />
          <span className="font-medium">{t("Sendero no encontrado", "Trail not found")}</span>
        </div>

        <h1 className="text-7xl md:text-9xl font-bold text-white mb-4 tracking-tight">
          404
        </h1>

        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 text-balance leading-tight">
          {t(
            "Parece que te desviaste del sendero",
            "Looks like you wandered off the trail",
          )}
        </h2>

        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
          {t(
            "La página que buscás no existe o fue movida. No te preocupes, te ayudamos a encontrar tu próxima aventura.",
            "The page you're looking for doesn't exist or has been moved. Don't worry, we'll help you find your next adventure.",
          )}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg px-8 group"
            asChild
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              {t("Volver al Inicio", "Back to Home")}
            </Link>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="h-14 text-lg px-8 group"
            asChild
          >
            <Link href="/actividades">
              <Compass className="mr-2 h-5 w-5" />
              {t("Explorar Actividades", "Explore Activities")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
