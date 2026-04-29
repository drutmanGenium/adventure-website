"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Globe, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { createWhatsAppHref } from "@/lib/whatsapp"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

function getAvatarUrl(avatarUrl: string | null): string | undefined {
  if (!avatarUrl) return undefined
  if (avatarUrl.startsWith("http")) return avatarUrl
  return `${API_URL}${avatarUrl}`
}

function UserAvatar({ className }: { className?: string }) {
  const { user } = useAuth()
  if (!user) return null

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()

  return (
    <Avatar className={className}>
      <AvatarImage src={getAvatarUrl(user.avatarUrl)} alt={`${user.firstName} ${user.lastName}`} />
      <AvatarFallback className="bg-red-500 text-white text-xs font-bold">{initials}</AvatarFallback>
    </Avatar>
  )
}

function UserMenu() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
          <UserAvatar className="h-9 w-9" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/perfil" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            {t("Mi Perfil", "My Profile")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          {t("Cerrar sesión", "Log out")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  const { user, isLoading } = useAuth()

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
            {!isLoading && (
              user ? (
                <UserMenu />
              ) : (
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    {t("Ingresar", "Log in")}
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {!isLoading && user && <UserMenu />}
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
            {!isLoading && !user && (
              <Link
                href="/login"
                className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-primary hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t("Ingresar", "Log in")}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
