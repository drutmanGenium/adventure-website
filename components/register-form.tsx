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
import { UserPlus, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export function RegisterForm() {
  const { register } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("El nombre es obligatorio.", "First name is required.")
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t("El apellido es obligatorio.", "Last name is required.")
    }

    if (!formData.email.trim()) {
      newErrors.email = t("El email es obligatorio.", "Email is required.")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("Ingresá un email válido.", "Enter a valid email.")
    }

    if (!formData.password) {
      newErrors.password = t("La contraseña es obligatoria.", "Password is required.")
    } else if (formData.password.length < 6) {
      newErrors.password = t(
        "La contraseña debe tener al menos 6 caracteres.",
        "Password must be at least 6 characters."
      )
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t(
        "Confirmá tu contraseña.",
        "Please confirm your password."
      )
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t(
        "Las contraseñas no coinciden.",
        "Passwords do not match."
      )
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setGeneralError("")

    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone || undefined,
    })

    if (result.success) {
      router.push("/")
    } else {
      setGeneralError(result.error || t("Error al crear la cuenta", "Registration failed"))
    }

    setIsSubmitting(false)
  }

  return (
    <section className="py-20 px-4 min-h-screen bg-background">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            {t("Registro", "Register")}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t("Creá tu cuenta", "Create your account")}
          </h1>
          <p className="text-muted-foreground">
            {t(
              "Registrate para reservar tu próxima aventura",
              "Sign up to book your next adventure"
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("Nombre", "First name")} *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Juan"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">{t("Apellido", "Last name")} *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Pérez"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>

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
              <Label htmlFor="phone">{t("Teléfono", "Phone")}</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+54 9 11 2345-6789"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
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
                  autoComplete="new-password"
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
              <p className="text-xs text-muted-foreground">
                {t("Mínimo 6 caracteres", "At least 6 characters")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("Confirmar contraseña", "Confirm password")} *
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showConfirmPassword
                      ? t("Ocultar contraseña", "Hide password")
                      : t("Mostrar contraseña", "Show password")}
                  </span>
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                t("Creando cuenta...", "Creating account...")
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  {t("Crear cuenta", "Create account")}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {t("¿Ya tenés cuenta?", "Already have an account?")}{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              {t("Iniciá sesión", "Sign in")}
            </Link>
          </div>
        </Card>
      </div>
    </section>
  )
}
