"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export function LoginForm() {
  const router = useRouter()
  const { login, register } = useAuth()
  const { t } = useLanguage()
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      if (isRegister) {
        const result = await register(formData)
        if (result.error) {
          setError(result.error)
          return
        }
      } else {
        const result = await login(formData.email, formData.password)
        if (result.error) {
          setError(result.error)
          return
        }
      }
      router.push("/")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isRegister ? t("Crear cuenta", "Create account") : t("Iniciar sesión", "Log in")}
          </CardTitle>
          <CardDescription>
            {isRegister
              ? t("Completá tus datos para registrarte", "Fill in your details to register")
              : t("Ingresá tus credenciales para continuar", "Enter your credentials to continue")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    {t("Nombre", "First name")}
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder={t("Juan", "John")}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    {t("Apellido", "Last name")}
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder={t("Pérez", "Doe")}
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                {t("Contraseña", "Password")}
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="••••••"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting
                ? t("Cargando...", "Loading...")
                : isRegister
                  ? t("Registrarse", "Register")
                  : t("Ingresar", "Log in")}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => { setIsRegister(!isRegister); setError("") }}
              className="text-sm text-blue-600 hover:underline"
            >
              {isRegister
                ? t("¿Ya tenés cuenta? Iniciá sesión", "Already have an account? Log in")
                : t("¿No tenés cuenta? Registrate", "Don't have an account? Register")}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
