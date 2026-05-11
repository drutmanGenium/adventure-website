"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Heart, Award, Shield, Users, Mountain, Compass } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function AboutContent() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Heart,
      title: t("Pasión por la Naturaleza", "Passion for Nature"),
      description: t("Amamos la Patagonia y queremos compartir su belleza preservándola para futuras generaciones.", "We love Patagonia and want to share its beauty while preserving it for future generations."),
    },
    {
      icon: Shield,
      title: t("Seguridad Primero", "Safety First"),
      description: t("Guías certificados, equipamiento de primera calidad y protocolos estrictos en cada expedición.", "Certified guides, top-quality equipment, and strict safety protocols on every expedition."),
    },
    {
      icon: Users,
      title: t("Grupos Reducidos", "Small Groups"),
      description: t("Experiencias íntimas con grupos pequeños para una atención personalizada y menor impacto ambiental.", "Intimate experiences with small groups for personalized attention and less environmental impact."),
    },
    {
      icon: Award,
      title: t("Experiencia Comprobada", "Proven Experience"),
      description: t("Más de 10 años guiando expediciones en la Patagonia con cientos de clientes satisfechos.", "Over 10 years guiding expeditions in Patagonia with hundreds of satisfied clients."),
    },
  ]

  const team = [
    {
      name: "Martín Roca",
      role: t("Fundador & Guía Principal", "Founder & Lead Guide"),
      description: t("15 años de experiencia en trekking de alta montaña. Certificado AAGM.", "15 years of high-altitude trekking experience. AAGM certified."),
      image: "/placeholder.svg?key=vr3i7",
    },
    {
      name: "Laura Fernández",
      role: t("Guía de Naturaleza", "Nature Guide"),
      description: t("Bióloga especializada en ecosistemas patagónicos. 8 años de experiencia.", "Biologist specializing in Patagonian ecosystems. 8 years of experience."),
      image: "/placeholder.svg?key=39n4b",
    },
    {
      name: "Diego Torres",
      role: t("Guía de Glaciares", "Glacier Guide"),
      description: t("Especialista en trekking sobre hielo. Rescatista certificado.", "Ice trekking specialist. Certified rescuer."),
      image: "/placeholder.svg?key=w05yg",
    },
    {
      name: "Ana Gutiérrez",
      role: t("Coordinadora de Expediciones", "Expedition Coordinator"),
      description: t("Organiza cada detalle para que tu experiencia sea inolvidable.", "Organizes every detail to make your experience unforgettable."),
      image: "/placeholder.svg?key=m7vsu",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img src="/patagonia-mountain-team-hiking.jpg" alt="Nuestro equipo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Badge className="mb-4 bg-primary/90 text-primary-foreground">{t("Quiénes Somos", "About Us")}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
              {t("Conectando personas con la naturaleza", "Connecting people with nature")}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl text-pretty">
              {t("Somos un equipo apasionado por la Patagonia y comprometidos con el turismo sustentable", "We are a team passionate about Patagonia and committed to sustainable tourism")}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Mountain className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">{t("Nuestra Historia", "Our Story")}</h2>
          </div>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              {t("Patagonia Trek nació en 2014 del sueño de Martín Roca, un guía de montaña apasionado por compartir la belleza de la Patagonia con viajeros de todo el mundo. Lo que comenzó con pequeñas expediciones al Fitz Roy se ha convertido en una empresa que organiza trekkings por toda la región.", "Patagonia Trek was born in 2014 from the dream of Martín Roca, a mountain guide passionate about sharing the beauty of Patagonia with travelers from around the world. What began with small expeditions to Fitz Roy has grown into a company organizing treks across the entire region.")}
            </p>
            <p>
              {t("Creemos que la mejor forma de conocer un lugar es caminándolo. Cada sendero tiene una historia, cada montaña guarda secretos, y cada laguna refleja la inmensidad del paisaje patagónico. Nuestra misión es guiarte por estos lugares con seguridad, respeto por el medio ambiente y la calidez que nos caracteriza.", "We believe the best way to know a place is by walking it. Every trail has a story, every mountain holds secrets, and every lagoon reflects the vastness of the Patagonian landscape. Our mission is to guide you through these places with safety, respect for the environment, and the warmth that defines us.")}
            </p>
            <p>
              {t("Trabajamos con grupos reducidos para ofrecer experiencias auténticas y personalizadas. Nuestros guías no solo conocen las rutas, sino también la flora, fauna, historia y geología de cada rincón que visitamos.", "We work with small groups to offer authentic, personalized experiences. Our guides don't just know the trails — they also know the flora, fauna, history, and geology of every corner we visit.")}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <Compass className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">{t("Nuestros Valores", "Our Values")}</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {t("Los principios que guían cada una de nuestras expediciones", "The principles that guide every one of our expeditions")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all border-2 hover:border-primary/50"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("Nuestro Equipo", "Our Team")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {t("Guías profesionales certificados con años de experiencia en la Patagonia", "Certified professional guides with years of experience in Patagonia")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-primary/50"
              >
                <div className="relative h-64">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">10+</p>
              <p className="text-lg opacity-90">{t("Años de experiencia", "Years of experience")}</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">2,500+</p>
              <p className="text-lg opacity-90">{t("Clientes felices", "Happy clients")}</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">15+</p>
              <p className="text-lg opacity-90">{t("Rutas diferentes", "Different routes")}</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">100%</p>
              <p className="text-lg opacity-90">{t("Seguridad garantizada", "Guaranteed safety")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
