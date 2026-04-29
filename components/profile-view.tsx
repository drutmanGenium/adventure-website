"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Camera, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

function getAvatarUrl(avatarUrl: string | null): string | undefined {
  if (!avatarUrl) return undefined
  if (avatarUrl.startsWith("http")) return avatarUrl
  return `${API_URL}${avatarUrl}`
}

export function ProfileView() {
  const { user, token, updateAvatar, logout } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")

  if (!user) {
    router.push("/login")
    return null
  }

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      setError(t("Tipo de imagen no permitido. Usa JPEG, PNG, WebP o GIF", "Image type not allowed. Use JPEG, PNG, WebP or GIF"))
      return
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError(t("La imagen no debe superar los 2MB", "Image must be under 2MB"))
      return
    }

    setError("")
    setIsUploading(true)

    try {
      const reader = new FileReader()
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1]

        const res = await fetch(`${API_URL}/api/upload/avatar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            image: base64,
            mimeType: file.type,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.error || t("Error al subir la imagen", "Error uploading image"))
          return
        }

        updateAvatar(data.avatarUrl)
      }
      reader.readAsDataURL(file)
    } catch {
      setError(t("Error de conexión con el servidor", "Server connection error"))
    } finally {
      setIsUploading(false)
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveAvatar = async () => {
    setError("")
    try {
      const res = await fetch(`${API_URL}/api/auth/avatar`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        updateAvatar("")
      }
    } catch {
      setError(t("Error de conexión con el servidor", "Server connection error"))
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("Mi Perfil", "My Profile")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Avatar section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <Avatar className="h-32 w-32">
                <AvatarImage src={getAvatarUrl(user.avatarUrl)} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback className="bg-red-500 text-white text-3xl font-bold">{initials}</AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="h-8 w-8 text-white" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleFileSelect}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Camera className="mr-2 h-4 w-4" />
                {isUploading
                  ? t("Subiendo...", "Uploading...")
                  : t("Cambiar avatar", "Change avatar")}
              </Button>
              {user.avatarUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveAvatar}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t("Eliminar", "Remove")}
                </Button>
              )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          {/* User info */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t("Nombre", "First name")}</p>
                <p className="font-medium">{user.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("Apellido", "Last name")}</p>
                <p className="font-medium">{user.lastName}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("Miembro desde", "Member since")}</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Logout */}
          <div className="pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => { logout(); router.push("/") }}
              className="text-red-600 hover:text-red-700"
            >
              {t("Cerrar sesión", "Log out")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
