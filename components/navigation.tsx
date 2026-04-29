"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Globe, User, LogOut, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { createWhatsAppHref } from "@/lib/whatsapp"
import { safeAvatarSrc } from "@/lib/avatar"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [authError, setAuthError] = useState("")
  const [authLoading, setAuthLoading] = useState(false)

  // Auth form fields
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const { language, toggleLanguage, t } = useLanguage()
  const { user, logout } = useAuth()

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

  function getUserInitials() {
    if (!user) return ""
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  }

  function openAuth(mode: "login" | "register") {
    setAuthMode(mode)
    setAuthError("")
    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")
    setShowAuthDialog(true)
  }

  async function handleAuthSubmit(e: React.FormEvent) {
    e.preventDefault()
    setAuthError("")
    setAuthLoading(true)

    // Dynamic import to avoid issues with SSR
    const { useAuth: getAuth } = await import("@/contexts/auth-context")
    // We already have access to auth context via the hook, but we need login/register
    // Let's use the auth context directly
  }

  return (
    <>
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

              {/* Auth: Avatar or Login Button */}
              {user ? (
                <UserAvatarMenu user={user} logout={logout} t={t} />
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openAuth("login")}
                  className="ml-2"
                >
                  <User className="h-4 w-4 mr-2" />
                  {t("Ingresar", "Sign In")}
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              {user ? (
                <UserAvatarMenu user={user} logout={logout} t={t} />
              ) : (
                <Button variant="ghost" size="icon" onClick={() => openAuth("login")}>
                  <User className="h-5 w-5" />
                </Button>
              )}
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
              {user && (
                <Link
                  href="/perfil"
                  className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t("Mi Perfil", "My Profile")}
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Dialog */}
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        mode={authMode}
        setMode={setAuthMode}
        t={t}
      />
    </>
  )
}

// ─── User Avatar Menu Component ──────────────────────────────────────────────

function UserAvatarMenu({
  user,
  logout,
  t,
}: {
  user: { firstName: string; lastName: string; avatarUrl: string | null }
  logout: () => Promise<void>
  t: (es: string, en: string) => string
}) {
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  // Sanitize avatar URL at render time. `safeAvatarSrc` rejects anything that
  // is not an http(s) URL or an allowlisted base64 image data URL, blocking
  // payloads like `data:text/html,<script>...</script>` even if they were
  // somehow persisted server-side.
  const safeAvatar = safeAvatarSrc(user.avatarUrl)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
          <Avatar className="h-9 w-9">
            {safeAvatar ? (
              <AvatarImage src={safeAvatar} alt={`${user.firstName} ${user.lastName}`} />
            ) : null}
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/perfil" className="cursor-pointer">
            <Camera className="mr-2 h-4 w-4" />
            {t("Mi Perfil", "My Profile")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t("Cerrar sesión", "Sign Out")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── Auth Dialog Component ───────────────────────────────────────────────────

function AuthDialog({
  open,
  onOpenChange,
  mode,
  setMode,
  t,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "login" | "register"
  setMode: (mode: "login" | "register") => void
  t: (es: string, en: string) => string
}) {
  const { login, register } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  function resetForm() {
    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")
    setError("")
  }

  function switchMode(newMode: "login" | "register") {
    resetForm()
    setMode(newMode)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (mode === "login") {
        const result = await login({ email, password })
        if (result.success) {
          resetForm()
          onOpenChange(false)
        } else {
          setError(result.error || "Error")
        }
      } else {
        const result = await register({ firstName, lastName, email, password })
        if (result.success) {
          resetForm()
          onOpenChange(false)
        } else {
          setError(result.error || "Error")
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) resetForm(); onOpenChange(val) }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "login"
              ? t("Iniciar Sesión", "Sign In")
              : t("Crear Cuenta", "Create Account")}
          </DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? t(
                  "Ingresá tus datos para acceder a tu cuenta",
                  "Enter your credentials to access your account"
                )
              : t(
                  "Completá tus datos para crear una cuenta nueva",
                  "Fill in your details to create a new account"
                )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="auth-firstName">{t("Nombre", "First Name")}</Label>
                <Input
                  id="auth-firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="Juan"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-lastName">{t("Apellido", "Last Name")}</Label>
                <Input
                  id="auth-lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Perez"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="auth-email">{t("Email", "Email")}</Label>
            <Input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="juan@ejemplo.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="auth-password">{t("Contraseña", "Password")}</Label>
            <Input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder={t("Mínimo 6 caracteres", "At least 6 characters")}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? t("Cargando...", "Loading...")
                : mode === "login"
                  ? t("Ingresar", "Sign In")
                  : t("Crear Cuenta", "Create Account")}
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-full text-sm"
              onClick={() => switchMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login"
                ? t("¿No tenés cuenta? Crear una", "Don't have an account? Create one")
                : t("¿Ya tenés cuenta? Ingresá", "Already have an account? Sign in")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
