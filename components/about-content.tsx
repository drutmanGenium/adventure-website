import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Heart, Award, Shield, Users, Mountain, Compass } from "lucide-react"
import { UserAvatar } from "@/components/user-avatar"

const values = [
  {
    icon: Heart,
    title: "Pasión por la Naturaleza",
    description: "Amamos la Patagonia y queremos compartir su belleza preservándola para futuras generaciones.",
  },
  {
    icon: Shield,
    title: "Seguridad Primero",
    description: "Guías certificados, equipamiento de primera calidad y protocolos estrictos en cada expedición.",
  },
  {
    icon: Users,
    title: "Grupos Reducidos",
    description: "Experiencias íntimas con grupos pequeños para una atención personalizada y menor impacto ambiental.",
  },
  {
    icon: Award,
    title: "Experiencia Comprobada",
    description: "Más de 10 años guiando expediciones en la Patagonia con cientos de clientes satisfechos.",
  },
]

const team = [
  {
    name: "Martín Roca",
    role: "Fundador & Guía Principal",
    description: "15 años de experiencia en trekking de alta montaña. Certificado AAGM.",
    image: "/placeholder.svg?key=vr3i7",
  },
  {
    name: "Laura Fernández",
    role: "Guía de Naturaleza",
    description: "Bióloga especializada en ecosistemas patagónicos. 8 años de experiencia.",
    image: "/placeholder.svg?key=39n4b",
  },
  {
    name: "Diego Torres",
    role: "Guía de Glaciares",
    description: "Especialista en trekking sobre hielo. Rescatista certificado.",
    image: "/placeholder.svg?key=w05yg",
  },
  {
    name: "Ana Gutiérrez",
    role: "Coordinadora de Expediciones",
    description: "Organiza cada detalle para que tu experiencia sea inolvidable.",
    image: "/placeholder.svg?key=m7vsu",
  },
]

export function AboutContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img src="/patagonia-mountain-team-hiking.jpg" alt="Nuestro equipo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Badge className="mb-4 bg-primary/90 text-primary-foreground">Quiénes Somos</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
              Conectando personas con la naturaleza
            </h1>
            <p className="text-xl text-white/90 max-w-2xl text-pretty">
              Somos un equipo apasionado por la Patagonia y comprometidos con el turismo sustentable
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Mountain className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Nuestra Historia</h2>
          </div>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Patagonia Trek nació en 2014 del sueño de Martín Roca, un guía de montaña apasionado por compartir la
              belleza de la Patagonia con viajeros de todo el mundo. Lo que comenzó con pequeñas expediciones al Fitz
              Roy se ha convertido en una empresa que organiza trekkings por toda la región.
            </p>
            <p>
              Creemos que la mejor forma de conocer un lugar es caminándolo. Cada sendero tiene una historia, cada
              montaña guarda secretos, y cada laguna refleja la inmensidad del paisaje patagónico. Nuestra misión es
              guiarte por estos lugares con seguridad, respeto por el medio ambiente y la calidez que nos caracteriza.
            </p>
            <p>
              Trabajamos con grupos reducidos para ofrecer experiencias auténticas y personalizadas. Nuestros guías no
              solo conocen las rutas, sino también la flora, fauna, historia y geología de cada rincón que visitamos.
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
              <h2 className="text-3xl font-bold">Nuestros Valores</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Los principios que guían cada una de nuestras expediciones
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
            <h2 className="text-3xl font-bold mb-4">Nuestro Equipo</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Guías profesionales certificados con años de experiencia en la Patagonia
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
                  <div className="absolute -bottom-6 left-6">
                    <UserAvatar
                      src={member.image}
                      name={member.name}
                      size="lg"
                      className="border-4 border-background shadow-md"
                    />
                  </div>
                </div>
                <div className="p-6 pt-10">
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
              <p className="text-lg opacity-90">Años de experiencia</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">2,500+</p>
              <p className="text-lg opacity-90">Clientes felices</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">15+</p>
              <p className="text-lg opacity-90">Rutas diferentes</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">100%</p>
              <p className="text-lg opacity-90">Seguridad garantizada</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
