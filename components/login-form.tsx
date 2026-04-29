"use client"

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
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    const result = await login(email, password)
    if (result.success) {
      router.push("/")
    } else {
      setError(result.error || t("Error al iniciar sesión", "Login error"))
    }

    setIsSubmitting(false)
  }

  return (
    <section className="py-20 px-4 min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            {t("Bienvenido", "Welcome")}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t("Iniciar Sesión", "Sign In")}
          </h1>
          <p className="text-muted-foreground">
            {t("Ingresá a tu cuenta para continuar", "Sign in to your account to continue")}
          </p>
        </div>

        <Card className="p-8 border-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t("Email", "Email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="juan@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("Contraseña", "Password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground"
              disabled={isSubmitting}
            >
              <LogIn className="mr-2 h-5 w-5" />
              {isSubmitting
                ? t("Ingresando...", "Signing in...")
                : t("Iniciar Sesión", "Sign In")}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {t("¿No tenés cuenta?", "Don't have an account?")}{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              {t("Crear cuenta", "Create account")}
            </Link>
          </div>
        </Card>
      </div>
    </section>
  )
}
