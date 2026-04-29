"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, Globe, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { createWhatsAppHref } from "@/lib/whatsapp"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
    router.push("/")
  }

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
            <Button variant="ghost" size="icon" onClick={toggleLanguage}>
              <Globe className="h-5 w-5" />
              <span className="sr-only">Change language</span>
            </Button>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <User className="h-4 w-4" />
                  <span>{user.firstName}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  {language === "es" ? "Salir" : "Logout"}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    {language === "es" ? "Iniciar sesión" : "Sign in"}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-primary text-primary-foreground">
                    {language === "es" ? "Registrarse" : "Sign up"}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
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
            <div className="border-t border-border mt-2 pt-2">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.firstName} {user.lastName}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-base font-medium text-destructive hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    {language === "es" ? "Cerrar sesión" : "Log out"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-primary hover:bg-accent rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {language === "es" ? "Iniciar sesión" : "Sign in"}
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 text-base font-medium text-primary hover:bg-accent rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {language === "es" ? "Registrarse" : "Sign up"}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}