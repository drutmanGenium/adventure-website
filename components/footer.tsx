"use client"

import Link from "next/link"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { createWhatsAppHref } from "@/lib/whatsapp"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Patagonia Trek</h3>
            <p className="text-sm opacity-80 mb-4">
              {t(
                "Explorá la Patagonia con guías expertos y grupos reducidos",
                "Explore Patagonia with expert guides and small groups",
              )}
            </p>
            <div>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("Enlaces Rápidos", "Quick Links")}</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  {t("Inicio", "Home")}
                </Link>
              </li>
              <li>
                <Link href="/actividades" className="hover:text-primary transition-colors">
                  {t("Actividades", "Activities")}
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-primary transition-colors">
                  {t("Quiénes Somos", "About Us")}
                </Link>
              </li>
              <li>
                <a 
                  href={createWhatsAppHref()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {t("Contacto", "Contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("Contacto", "Contact")}</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@patagoniatrek.com" className="hover:text-primary transition-colors">
                  info@patagoniatrek.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+542902491234" className="hover:text-primary transition-colors">
                  +54 2902 49-1234
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Av. San Martín 123
                  <br />
                  Ushuaia, Tierra del Fuego
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">{t("Newsletter", "Newsletter")}</h4>
            <p className="text-sm opacity-80 mb-4">
              {t("Recibí novedades y ofertas especiales", "Receive news and special offers")}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t("Tu email", "Your email")}
                className="px-3 py-2 rounded bg-white/10 border border-white/20 flex-grow text-sm"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors text-sm font-medium">
                {t("Enviar", "Send")}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm opacity-70">
          <p>
            &copy; {new Date().getFullYear()} Patagonia Trek.{" "}
            {t("Todos los derechos reservados", "All rights reserved")}.
          </p>
        </div>
      </div>
    </footer>
  )
}
