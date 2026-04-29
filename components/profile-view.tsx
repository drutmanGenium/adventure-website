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

  // Maximum avatar size in bytes (2 MB). Must match backend enforcement.
  const MAX_AVATAR_BYTES = 2 * 1024 * 1024
  const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const

  // Verify a file's leading bytes match a known image signature (magic bytes).
  // This is defense-in-depth on top of the MIME-type and size checks; client-side
  // checks alone are bypassable, so the backend MUST also validate type, size,
  // and content before storing the file.
  const verifyImageSignature = async (file: File, mimeType: string): Promise<boolean> => {
    const header = new Uint8Array(await file.slice(0, 12).arrayBuffer())
    if (header.length < 4) return false
    const startsWith = (sig: number[]) => sig.every((b, i) => header[i] === b)
    switch (mimeType) {
      case "image/jpeg":
        // FF D8 FF
        return startsWith([0xff, 0xd8, 0xff])
      case "image/png":
        // 89 50 4E 47 0D 0A 1A 0A
        return startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
      case "image/gif":
        // "GIF87a" or "GIF89a"
        return startsWith([0x47, 0x49, 0x46, 0x38]) && (header[4] === 0x37 || header[4] === 0x39) && header[5] === 0x61
      case "image/webp":
        // "RIFF" .... "WEBP"
        return (
          startsWith([0x52, 0x49, 0x46, 0x46]) &&
          header[8] === 0x57 &&
          header[9] === 0x45 &&
          header[10] === 0x42 &&
          header[11] === 0x50
        )
      default:
        return false
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!ALLOWED_AVATAR_TYPES.includes(file.type as (typeof ALLOWED_AVATAR_TYPES)[number])) {
      setError(t("Tipo de imagen no permitido. Usa JPEG, PNG, WebP o GIF", "Image type not allowed. Use JPEG, PNG, WebP or GIF"))
      return
    }

    // Validate file size (2MB). NOTE: client-side size checks are easily bypassed;
    // the backend MUST re-validate this limit before persisting the upload.
    if (file.size > MAX_AVATAR_BYTES) {
      setError(t("La imagen no debe superar los 2MB", "Image must be under 2MB"))
      return
    }

    // Defense-in-depth: verify the file's actual bytes match a known image
    // signature so a renamed/non-image file (or a polyglot) is rejected before
    // we send it. The server MUST still enforce its own content validation.
    const signatureOk = await verifyImageSignature(file, file.type)
    if (!signatureOk) {
      setError(t("Archivo de imagen no válido", "Invalid image file"))
      return
    }

    setError("")
    setIsUploading(true)

    try {
      const reader = new FileReader()
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1]

        // SECURITY: Avatar payloads are sent base64-encoded as JSON for backwards
        // compatibility with the existing backend API. The backend MUST validate
        // (a) the decoded MIME type matches an allowlist, (b) the decoded byte
        // length is within MAX_AVATAR_BYTES (after accounting for base64 inflation),
        // and (c) the decoded bytes parse as a real image. A future improvement is
        // to switch this endpoint to multipart/form-data so streaming size limits
        // can be enforced before the body is fully buffered server-side.
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
