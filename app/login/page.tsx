"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogIn, AlertCircle, Clock } from "lucide-react"
import { apiPost, RateLimitError } from "@/lib/api"

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [rateLimitInfo, setRateLimitInfo] = useState<{ message: string; retryAfter: number } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
    setRateLimitInfo(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setRateLimitInfo(null)
    setLoading(true)

    try {
      await apiPost("/api/auth/login", formData)
      // Redirect o success handling
    } catch (err) {
      if (err instanceof RateLimitError) {
        setRateLimitInfo({
          message: err.message,
          retryAfter: err.retryAfter,
        })
      } else if (err && typeof err === "object" && "error" in err) {
        setError((err as { error: string }).error)
      } else {
        setError("Error de conexión. Intenta de nuevo.")
      }
    } finally {
      setLoading(false)
    }
  }

  const formatRetryTime = (seconds: number) => {
    if (seconds >= 60) {
      const minutes = Math.ceil(seconds / 60)
      return `${minutes} minuto${minutes > 1 ? "s" : ""}`
    }
    return `${seconds} segundo${seconds > 1 ? "s" : ""}`
  }

  return (
    <section className="py-20 px-4 min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Acceso</Badge>
          <h1 className="text-3xl font-bold mb-2">Iniciar Sesión</h1>
          <p className="text-muted-foreground">Accedé a tu cuenta para gestionar tus reservas</p>
        </div>

        <Card className="p-8 border-2">
          {rateLimitInfo && (
            <Alert variant="destructive" className="mb-6">
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <p className="font-medium">{rateLimitInfo.message}</p>
                <p className="text-xs mt-1">
                  Podrás intentar de nuevo en {formatRetryTime(rateLimitInfo.retryAfter)}.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="juan@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={!!rateLimitInfo}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Tu contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={!!rateLimitInfo}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground"
              disabled={loading || !!rateLimitInfo}
            >
              <LogIn className="mr-2 h-5 w-5" />
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿No tenés cuenta?{" "}
            <Link href="/registro" className="text-primary hover:underline font-medium">
              Registrate
            </Link>
          </p>
        </Card>
      </div>
    </section>
  )
}
