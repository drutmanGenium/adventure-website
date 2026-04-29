"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError(t("Las contraseñas no coinciden", "Passwords do not match"))
      return
    }

    if (formData.password.length < 6) {
      setError(t("La contraseña debe tener al menos 6 caracteres", "Password must be at least 6 characters"))
      return
    }

    setIsSubmitting(true)

    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    })

    if (result.success) {
      router.push("/")
    } else {
      setError(result.error || t("Error al crear la cuenta", "Registration error"))
    }

    setIsSubmitting(false)
  }

  return (
    <section className="py-20 px-4 min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            {t("Únite", "Join Us")}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t("Crear Cuenta", "Create Account")}
          </h1>
          <p className="text-muted-foreground">
            {t("Registrate para reservar tu próxima aventura", "Sign up to book your next adventure")}
          </p>
        </div>

        <Card className="p-8 border-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("Nombre", "First Name")} *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Juan"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("Apellido", "Last Name")} *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Pérez"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("Email", "Email")} *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="juan@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("Contraseña", "Password")} *</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("Mínimo 6 caracteres", "Minimum 6 characters")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("Confirmar Contraseña", "Confirm Password")} *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground"
              disabled={isSubmitting}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              {isSubmitting
                ? t("Creando cuenta...", "Creating account...")
                : t("Crear Cuenta", "Create Account")}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {t("¿Ya tenés cuenta?", "Already have an account?")}{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              {t("Iniciar sesión", "Sign in")}
            </Link>
          </div>
        </Card>
      </div>
    </section>
  )
}
