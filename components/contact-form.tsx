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

export function ContactForm() {
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
    alert("¡Gracias por contactarnos! Te responderemos pronto.")
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
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Contacto</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Hablemos de tu próxima aventura</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Estamos aquí para responder todas tus preguntas y ayudarte a planificar el trekking perfecto
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 border-2">
              <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
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
                    <p className="font-semibold mb-1">Teléfono</p>
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
                    <p className="font-semibold mb-1">Oficina</p>
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
                    <p className="font-semibold mb-1">Horario de Atención</p>
                    <p className="text-muted-foreground">
                      Lunes a Viernes: 9:00 - 18:00
                      <br />
                      Sábados: 10:00 - 14:00
                      <br />
                      Domingos: Cerrado
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground border-2 border-primary">
              <h3 className="text-xl font-bold mb-3">¿Necesitás ayuda inmediata?</h3>
              <p className="mb-4 opacity-90">
                Nuestro equipo está disponible para consultas urgentes sobre expediciones en curso.
              </p>
              <Button variant="secondary" className="w-full" size="lg">
                WhatsApp: +54 9 11 2345-6789
              </Button>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-2">
              <h2 className="text-2xl font-bold mb-6">Envianos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="juan@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
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
                    <Label htmlFor="subject">Asunto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Consulta sobre Fitz Roy"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Contanos sobre tu experiencia de trekking previa, nivel de fitness, fechas preferidas, y cualquier pregunta que tengas..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto bg-primary text-primary-foreground">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Mensaje
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 border-2">
              <h3 className="font-bold mb-2">¿Cuándo es la mejor época para hacer trekking?</h3>
              <p className="text-muted-foreground text-sm">
                La temporada alta es de noviembre a marzo, con días más largos y clima más estable. Diciembre y enero
                son los meses más populares.
              </p>
            </Card>

            <Card className="p-6 border-2">
              <h3 className="font-bold mb-2">¿Qué nivel de fitness necesito?</h3>
              <p className="text-muted-foreground text-sm">
                Depende del trekking. Tenemos opciones para todos los niveles, desde caminatas fáciles hasta
                expediciones avanzadas que requieren buena condición física.
              </p>
            </Card>

            <Card className="p-6 border-2">
              <h3 className="font-bold mb-2">¿Proveen equipamiento?</h3>
              <p className="text-muted-foreground text-sm">
                Sí, incluimos equipamiento técnico (crampones, carpas, etc.). El equipamiento personal como botas y ropa
                es responsabilidad del participante.
              </p>
            </Card>

            <Card className="p-6 border-2">
              <h3 className="font-bold mb-2">¿Puedo hacer un trekking privado?</h3>
              <p className="text-muted-foreground text-sm">
                Sí, ofrecemos expediciones privadas para grupos. Contactanos para armar un itinerario personalizado.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
