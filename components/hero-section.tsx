"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mountain } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 95%, 0 100%)",
        }}
      >
        <img
          src="/images/design-mode/laguna-esmeralda-ushuaia_0_202008261257020.png(1).jpeg"
          alt={t("Montañas de Patagonia", "Patagonia Mountains")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center pt-32 md:pt-40 lg:pt-48 pb-32 md:pb-20 lg:pb-24">
        <div className="inline-flex items-center bg-primary/90 text-primary-foreground px-4 py-2 rounded-full mb-6 backdrop-blur-sm gap-2 mt-1">
          <Mountain className="h-5 w-5" />
          <span className="font-medium">{t("Temporada 2026 Abierta", "2026 Season Open")}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance leading-tight">
          {t("Explorá Tierra del Fuego", "Explore Tierra del Fuego")}
          <br />
          {t("con Expertos Locales", "with Local Experts")}
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
          {t(
            "Conocé glaciares milenarios y montañas legendarias del fín del mundo.",
            "Get to know ancient glaciers and legendary mountains from the end of the world.",
          )}
        </p>

        <div className="flex justify-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 group" asChild>
            <Link href="/actividades">
              {t("Ver Actividades", "View Activities")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"></div>
    </section>
  )
}
