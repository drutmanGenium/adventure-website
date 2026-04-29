"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { createWhatsAppHref } from "@/lib/whatsapp"
import { AvatarUpload } from "@/components/avatar-upload"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const handleAvatarChange = useCallback((avatarData: string | null, mimeType: string | null) => {
    if (avatarData && mimeType) {
      const dataUrl = `data:${mimeType};base64,${avatarData}`
      setAvatarUrl(dataUrl)
    } else {
      setAvatarUrl(null)
    }
  }, [])

  const navItems =
    language === "es"
      ? [
          { label: "Actividades", href: "/actividades" },
          { label: "Quiénes Somos", href: "/nosotros" },
          { label: "Contacto", href: createWhatsAppHref(), isExternal: true },
        ]
      : [
          { label: "Activities", href: "/actividades" },
          { label: "About Us", href: "/nosotros" },
          { label: "Contact", href: createWhatsAppHref(), isExternal: true },
        ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-red-500 hover:text-red-600 transition-colors">
              {language === "es" ? "Patagonia Trek" : "Patagonia Trek"}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-blue-600 hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )
            ))}
            <Button variant="ghost" size="icon" onClick={toggleLanguage} className="ml-auto">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Change language</span>
            </Button>
            <AvatarUpload
              currentAvatarUrl={avatarUrl}
              onAvatarChange={handleAvatarChange}
              size="sm"
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <AvatarUpload
              currentAvatarUrl={avatarUrl}
              onAvatarChange={handleAvatarChange}
              size="sm"
            />
            <Button variant="ghost" size="icon" onClick={toggleLanguage}>
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              item.isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}