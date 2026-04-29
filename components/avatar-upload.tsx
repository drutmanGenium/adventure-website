"use client"

import { useState, useRef, useCallback } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Camera, Upload, User, Trash2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface AvatarUploadProps {
  currentAvatarUrl?: string | null
  userName?: string
  onAvatarChange: (avatarData: string | null, mimeType: string | null) => void
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "size-10",
  md: "size-16",
  lg: "size-24",
}

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
}

export function AvatarUpload({
  currentAvatarUrl,
  userName = "",
  onAvatarChange,
  size = "md",
}: AvatarUploadProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setError(null)

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
      if (!allowedTypes.includes(file.type)) {
        setError(t("Tipo de archivo no permitido. Usá JPG, PNG, WebP o GIF.", "File type not allowed. Use JPG, PNG, WebP, or GIF."))
        return
      }

      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        setError(t("La imagen no debe superar 2MB.", "Image must be under 2MB."))
        return
      }

      setSelectedFile(file)

      const reader = new FileReader()
      reader.onload = (ev) => {
        setPreview(ev.target?.result as string)
      }
      reader.readAsDataURL(file)
    },
    [t]
  )

  const handleSave = useCallback(() => {
    if (!selectedFile || !preview) return

    // Extract base64 data from the data URL
    const base64Data = preview.split(",")[1]
    onAvatarChange(base64Data, selectedFile.type)
    setOpen(false)
    setPreview(null)
    setSelectedFile(null)
    setError(null)
  }, [selectedFile, preview, onAvatarChange])

  const handleRemove = useCallback(() => {
    onAvatarChange(null, null)
    setOpen(false)
    setPreview(null)
    setSelectedFile(null)
    setError(null)
  }, [onAvatarChange])

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setPreview(null)
      setSelectedFile(null)
      setError(null)
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="relative group cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={t("Cambiar avatar", "Change avatar")}
        >
          <Avatar className={sizeClasses[size]}>
            {currentAvatarUrl ? (
              <AvatarImage src={currentAvatarUrl} alt={userName || t("Avatar de usuario", "User avatar")} />
            ) : null}
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials || <User className={iconSizes[size]} />}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="h-4 w-4 text-white" />
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("Cambiar avatar", "Change avatar")}</DialogTitle>
          <DialogDescription>
            {t(
              "Subí una imagen para tu perfil. Formatos: JPG, PNG, WebP o GIF. Máximo 2MB.",
              "Upload an image for your profile. Formats: JPG, PNG, WebP, or GIF. Max 2MB."
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          {/* Preview */}
          <Avatar className="size-32">
            {preview ? (
              <AvatarImage src={preview} alt={t("Vista previa", "Preview")} />
            ) : currentAvatarUrl ? (
              <AvatarImage src={currentAvatarUrl} alt={userName || t("Avatar actual", "Current avatar")} />
            ) : null}
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
              {initials || <User className="h-12 w-12" />}
            </AvatarFallback>
          </Avatar>

          {/* File input */}
          <div className="w-full space-y-2">
            <Label htmlFor="avatar-file" className="sr-only">
              {t("Seleccionar imagen", "Select image")}
            </Label>
            <Input
              ref={fileInputRef}
              id="avatar-file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileSelect}
              className="cursor-pointer"
            />
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {currentAvatarUrl && (
            <Button type="button" variant="destructive" onClick={handleRemove} className="gap-2">
              <Trash2 className="h-4 w-4" />
              {t("Eliminar", "Remove")}
            </Button>
          )}
          <Button type="button" onClick={handleSave} disabled={!selectedFile} className="gap-2">
            <Upload className="h-4 w-4" />
            {t("Guardar avatar", "Save avatar")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
