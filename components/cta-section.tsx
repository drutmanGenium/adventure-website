"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { createWhatsAppHref } from "@/lib/whatsapp"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          {t("¿Listo para tu próxima aventura?", "Ready for your next adventure?")}
        </h2>
        <p className="text-xl mb-8 opacity-90 text-pretty">
          {t(
            "Contactanos hoy y empezá a planificar la actividad que siempre soñaste en la Patagonia",
            "Contact us today and start planning the adventure you've always dreamed of in Patagonia",
          )}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Button size="lg" variant="secondary" className="h-14 text-lg px-8 group" asChild>
            <Link href="/actividades">
              {t("Ver Actividades", "View Activities")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <a
            href={createWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-8 rounded-md bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-lg font-medium text-primary-foreground transition-colors"
          >
            {t("Contactanos", "Contact Us")}
          </a>
        </div>
      </div>
    </section>
  )
}
