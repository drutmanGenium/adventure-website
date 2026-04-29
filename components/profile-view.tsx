"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Trash2, Upload, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"

export function ProfileView() {
  const { t } = useLanguage()
  const { user, isLoading, updateAvatar, removeAvatar } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Redirect to home if not logged in
  if (!isLoading && !user) {
    router.push("/")
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">{t("Cargando...", "Loading...")}</p>
      </div>
    )
  }

  if (!user) return null

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()

  function handleFileSelect() {
    fileInputRef.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError(t("Por favor seleccioná una imagen válida", "Please select a valid image"))
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError(t("La imagen no puede superar los 2MB", "Image must be under 2MB"))
      return
    }

    setError("")
    setSuccess("")
    setUploading(true)

    try {
      // Read file as base64 data URL
      const dataUrl = await readFileAsDataUrl(file)

      const result = await updateAvatar(dataUrl)
      if (result.success) {
        setSuccess(t("Avatar actualizado correctamente", "Avatar updated successfully"))
      } else {
        setError(result.error || t("Error al actualizar avatar", "Error updating avatar"))
      }
    } catch {
      setError(t("Error al procesar la imagen", "Error processing image"))
    } finally {
      setUploading(false)
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  async function handleRemoveAvatar() {
    setError("")
    setSuccess("")
    setUploading(true)

    try {
      const result = await removeAvatar()
      if (result.success) {
        setSuccess(t("Avatar eliminado", "Avatar removed"))
      } else {
        setError(result.error || t("Error al eliminar avatar", "Error removing avatar"))
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t("Mi Perfil", "My Profile")}</h1>

      {/* Avatar Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            {t("Avatar", "Avatar")}
          </CardTitle>
          <CardDescription>
            {t(
              "Subí una foto de perfil. Se mostrará en la barra de navegación y tu perfil.",
              "Upload a profile photo. It will be displayed in the navigation bar and your profile."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar preview */}
            <Avatar className="h-28 w-28 border-4 border-muted">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
              ) : null}
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Upload controls */}
            <div className="flex flex-col gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />

              <Button
                onClick={handleFileSelect}
                disabled={uploading}
                variant="outline"
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                {uploading
                  ? t("Subiendo...", "Uploading...")
                  : user.avatarUrl
                    ? t("Cambiar imagen", "Change image")
                    : t("Subir imagen", "Upload image")}
              </Button>

              {user.avatarUrl && (
                <Button
                  onClick={handleRemoveAvatar}
                  disabled={uploading}
                  variant="ghost"
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  {t("Eliminar avatar", "Remove avatar")}
                </Button>
              )}

              <p className="text-xs text-muted-foreground">
                {t(
                  "JPG, PNG, WebP o GIF. Máximo 2MB.",
                  "JPG, PNG, WebP or GIF. Max 2MB."
                )}
              </p>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-destructive">{error}</p>
          )}
          {success && (
            <p className="mt-4 text-sm text-green-600">{success}</p>
          )}
        </CardContent>
      </Card>

      {/* User Info Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {t("Información Personal", "Personal Information")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t("Nombre", "First Name")}</p>
                <p className="font-medium">{user.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("Apellido", "Last Name")}</p>
                <p className="font-medium">{user.lastName}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("Email", "Email")}</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("Miembro desde", "Member since")}</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString(
                  t("es-AR", "en-US"),
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result)
      } else {
        reject(new Error("Failed to read file"))
      }
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
