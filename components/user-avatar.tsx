"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  src?: string | null
  name?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeClasses = {
  xs: "size-6",
  sm: "size-8",
  md: "size-10",
  lg: "size-16",
  xl: "size-24",
}

const iconSizes = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
}

const textSizes = {
  xs: "text-[10px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-lg",
  xl: "text-2xl",
}

export function UserAvatar({ src, name = "", size = "md", className }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {src ? <AvatarImage src={src} alt={name || "Avatar"} /> : null}
      <AvatarFallback className={cn("bg-primary/10 text-primary font-semibold", textSizes[size])}>
        {initials || <User className={iconSizes[size]} />}
      </AvatarFallback>
    </Avatar>
  )
}
