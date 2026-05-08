"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function ContactForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert(t("¡Gracias por contactarnos! Te responderemos pronto.", "Thank you for contacting us! We'll get back to you soon."))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="py-20 px-4 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">{t("Contacto", "Contact")}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t("Hablemos de tu próxima aventura", "Let's talk about your next adventure")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t(
              "Estamos aquí para responder todas tus preguntas y ayudarte a planificar el trekking perfecto",
              "We're here to answer all your questions and help you plan the perfect trek"
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 border-2">
              <h2 className="text-2xl font-bold mb-6">{t("Información de Contacto", "Contact Information")}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href="mailto:info@patagoniatrek.com" className="text-muted-foreground hover:text-primary">
                      info@patagoniatrek.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{t("Teléfono", "Phone")}</p>
                    <a href="tel:+542902491234" className="text-muted-foreground hover:text-primary">
                      +54 2902 49-1234
                    </a>
                    <br />
                    <a href="tel:+5491123456789" className="text-muted-foreground hover:text-primary">
                      +54 9 11 2345-6789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{t("Oficina", "Office")}</p>
                    <p className="text-muted-foreground">
                      Av. Libertador 123
                      <br />
                      El Calafate, Santa Cruz
                      <br />
                      Argentina (9405)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{t("Horario de Atención", "Business Hours")}</p>
                    <p className="text-muted-foreground">
                      {t("Lunes a Viernes", "Monday to Friday")}: 9:00 - 18:00
                      <br />
                      {t("Sábados", "Saturdays")}: 10:00 - 14:00
                      <br />
                      {t("Domingos: Cerrado", "Sundays: Closed")}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground border-2 border-primary">
              <h3 className="text-xl font-bold mb-3">{t("¿Necesitás ayuda inmediata?", "Need immediate help?")}</h3>
              <p className="mb-4 opacity-90">
                {t(
                  "Nuestro equipo está disponible para consultas urgentes sobre expediciones en curso.",
                  "Our team is available for urgent inquiries about ongoing expeditions."
                )}
              </p>
              <Button variant="secondary" className="w-full" size="lg">
                WhatsApp: +54 9 11 2345-6789
              </Button>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-2">
              <h2 className="text-2xl font-bold mb-6">{t("Envianos un mensaje", "Send us a message")}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("Nombre completo *", "Full name *")}</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={t("Juan Pérez", "John Doe")}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("Email *", "Email *")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t("juan@ejemplo.com", "john@example.com")}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("Teléfono", "Phone")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+54 9 11 2345-6789"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("Asunto *", "Subject *")}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder={t("Consulta sobre Fitz Roy", "Inquiry about Fitz Roy")}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("Mensaje *", "Message *")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t(
                      "Contanos sobre tu experiencia de trekking previa, nivel de fitness, fechas preferidas, y cualquier pregunta que tengas...",
                      "Tell us about your previous trekking experience, fitness level, preferred dates, and any questions you may have..."
                    )}
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto bg-primary text-primary-foreground">
                  <Send className="mr-2 h-5 w-5" />
                  {t("Enviar Mensaje", "Send Message")}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("Preguntas Frecuentes", "Frequently Asked Questions")}</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 border-2">
              <h3 className="font-bold mb-2">{t("¿Cuándo es la mejor época para hacer trekking?", "When is the best time for trekking?")}</h3>
              <p className="text-muted-foreground text-sm">
                {t(
                  "La temporada alta es de noviembre a marzo, con días más largos y clima más estable. Diciembre y enero son los meses más populares.",
                  "The high season runs from November to March, with longer days and more stable weather. December and January are the most popular months."
                )}
              </p>
            </Card>

            <Card className="p-6 border-2">
              <h3 className="font-bold mb-2">{t("¿Qué nivel de fitness necesito?", "What fitness level do I need?")}</h3>
              <p className="text-muted-foreground text-sm">
                {t(
                  "Depende del trekking. Tenemos opciones para todos los niveles, desde caminatas fáciles hasta expediciones avanzadas que requieren buena condición física.",
                  "It depends on the trek. We have options for all levels, from easy walks to advanced expeditions that require good physical condition."
                )}
              </p>
            </Card>

            <Card className="p-6 border-2">
              <h3 className="font-bold mb-2">{t("¿Proveen equipamiento?", "Do you provide equipment?")}</h3>
              <p className="text-muted-foreground text-sm">
                {t(
                  "Sí, incluimos equipamiento técnico (crampones, carpas, etc.). El equipamiento personal como botas y ropa es responsabilidad del participante.",
                  "Yes, we include technical equipment (crampons, tents, etc.). Personal equipment such as boots and clothing is the participant's responsibility."
                )}
              </p>
            </Card>

            <Card className="p-6 border-2">
              <h3 className="font-bold mb-2">{t("¿Puedo hacer un trekking privado?", "Can I book a private trek?")}</h3>
              <p className="text-muted-foreground text-sm">
                {t(
                  "Sí, ofrecemos expediciones privadas para grupos. Contactanos para armar un itinerario personalizado.",
                  "Yes, we offer private expeditions for groups. Contact us to create a personalized itinerary."
                )}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
