/**
 * WhatsApp contact utility
 * Uses environment variable WHATSAPP_CONTACT_NUMBER if available
 * Falls back to placeholder if not set
 */

const DEFAULT_PHONE = "549XXXXXXXXX"
const PRESET_MESSAGE = "Hola! Estoy interesado en una actividad en Ushuaia y quisiera más información."

export function getWhatsAppLink(customMessage?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || DEFAULT_PHONE
  const message = customMessage || PRESET_MESSAGE
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

export function createWhatsAppHref(customMessage?: string): string {
  return getWhatsAppLink(customMessage)
}
