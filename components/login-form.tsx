"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export function LoginForm() {
  const { login } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
    if (generalError) setGeneralError("")
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = t("El email es obligatorio.", "Email is required.")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("Ingresá un email válido.", "Enter a valid email.")
    }

    if (!formData.password) {
      newErrors.password = t("La contraseña es obligatoria.", "Password is required.")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setGeneralError("")

    const result = await login(formData.email, formData.password)

    if (result.success) {
      router.push("/")
    } else {
      setGeneralError(result.error || t("Error al iniciar sesión", "Login failed"))
    }

    setIsSubmitting(false)
  }

  return (
    <section className="py-20 px-4 min-h-screen bg-background">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            {t("Acceso", "Login")}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t("Iniciá sesión", "Sign in")}
          </h1>
          <p className="text-muted-foreground">
            {t(
              "Accedé a tu cuenta para gestionar tus reservas",
              "Access your account to manage your bookings"
            )}
          </p>
        </div>

        <Card className="p-8 border-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {generalError && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                {generalError}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="juan@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("Contraseña", "Password")} *</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? t("Ocultar contraseña", "Hide password") : t("Mostrar contraseña", "Show password")}
                  </span>
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                t("Iniciando sesión...", "Signing in...")
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  {t("Iniciar sesión", "Sign in")}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {t("¿No tenés cuenta?", "Don't have an account?")}{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              {t("Registrate", "Sign up")}
            </Link>
          </div>
        </Card>
      </div>
    </section>
  )
}
