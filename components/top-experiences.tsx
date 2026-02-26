"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

const experiences = [
  {
    title: "Laguna Esmeralda, Visita Express",
    slug: "laguna-esmeralda",
    calendarioSlug: "laguna-esmeralda-visita-express",
    lugarHref: "/lugares/laguna-esmeralda",
    location: "Ushuaia",
    difficulty: "Fácil",
    image: "/laguna-esmeralda-emerald-lake-ushuaia-forest-trail.jpg",
    duration: "4hs",
  },
  {
    title: "Laguna Esmeralda Sunset",
    slug: "laguna-esmeralda",
    calendarioSlug: "laguna-esmeralda-sunset",
    lugarHref: "/lugares/laguna-esmeralda",
    location: "Ushuaia",
    difficulty: "Fácil",
    image: "/laguna-esmeralda-emerald-lake-ushuaia-forest-trail.jpg",
    duration: "5hs",
  },
  {
    title: "Glaciar Vinciguerra",
    slug: "vinciguerra",
    calendarioSlug: "glaciar-vinciguerra",
    lugarHref: "/lugares/glaciar-vinciguerra",
    location: "Ushuaia",
    difficulty: "Moderado",
    image: "/ushuaia-martial-glacier-mountain-view.jpg",
    duration: "8hs",
  },
  {
    title: "Ojo del Albino",
    slug: "ojo-del-albino",
    calendarioSlug: "ojo-del-albino",
    lugarHref: "/lugares/glaciar-ojo-del-albino",
    location: "Ushuaia",
    difficulty: "Avanzado",
    image: "/ushuaia-martial-glacier-mountain-view.jpg",
    duration: "9hs",
  },
]

const difficultyColors = {
  Fácil: "bg-muted text-foreground border border-border",
  Moderado: "bg-muted text-foreground border border-border",
  Avanzado: "bg-muted text-foreground border border-border",
}

const ForestIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-8 w-8 text-primary flex-shrink-0">
    <path d="M20 50V35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 50V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 50V38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 35L14 40L20 40L14 46L26 46L20 40L26 40L20 35Z" fill="currentColor" opacity="0.7" />
    <path d="M32 30L26 36L32 36L26 42L38 42L32 36L38 36L32 30Z" fill="currentColor" opacity="0.7" />
    <path d="M44 38L38 44L44 44L38 50L50 50L44 44L50 44L44 38Z" fill="currentColor" opacity="0.7" />
    <circle cx="18" cy="28" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="35" cy="24" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="46" cy="32" r="2" fill="currentColor" opacity="0.5" />
  </svg>
)

const MountainIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-8 w-8 text-primary flex-shrink-0">
    <path
      d="M8 48L24 20L32 32L40 16L56 48H8Z"
      fill="currentColor"
      opacity="0.3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M16 48L28 28L36 38L48 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M38 18L40 16L42 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="14" r="3" fill="currentColor" opacity="0.6" />
    <path d="M18 14C18 14 16 16 14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const HikersIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-8 w-8 text-primary flex-shrink-0">
    <circle cx="20" cy="16" r="3" fill="currentColor" />
    <path d="M20 19V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 22L15 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 22L25 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 30L16 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 30L24 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 18L26 20L26 26L22 28" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13 26L11 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="44" cy="18" r="3" fill="currentColor" />
    <path d="M44 21V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 24L39 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 24L49 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 32L40 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 32L48 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M46 20L50 22L50 28L46 30" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M51 28L53 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M8 46C8 46 20 44 32 46C44 48 56 46 56 46"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="2 2"
      opacity="0.4"
    />
  </svg>
)

const CompassIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-8 w-8 text-primary flex-shrink-0">
    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" />
    <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <path d="M32 14V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 46V50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M50 32H46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 32H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 26L32 32L38 26L32 38L26 26Z" fill="currentColor" opacity="0.6" />
    <circle cx="32" cy="32" r="2" fill="currentColor" />
    <path d="M32 12L33 14L32 16L31 14L32 12Z" fill="currentColor" />
  </svg>
)

export function TopExperiences() {
  const { t } = useLanguage()
  const router = useRouter()

  const benefits = [
    {
      icon: ForestIcon,
      title: t("Todo Incluido", "All-Inclusive Trips"),
      description: t(
        "Nos ocupamos de todo para que vos solo disfrutes la experiencia: transporte, comidas, alojamiento, guías profesionales, permisos y equipo técnico cuando es necesario.",
        "We take care of everything so you can focus entirely on the experience — transportation, meals, lodging, professional guides, permits, and technical gear when needed.",
      ),
    },
    {
      icon: MountainIcon,
      title: t("Destinos Únicos", "World-Class Destinations"),
      description: t(
        "Explorá algunos de los paisajes más impactantes del mundo: glaciares, montañas, lagos y bosques patagónicos.",
        "Explore some of the world's most breathtaking landscapes — glaciers, mountains, lakes, and Patagonian forests.",
      ),
    },
    {
      icon: HikersIcon,
      title: t("Grupos Reducidos", "Small Groups"),
      description: t(
        "Cada salida se realiza con grupos pequeños, entre 4 y 12 personas, para garantizar una experiencia personalizada y cercana.",
        "Each trek is limited to small groups of 4–12 participants, ensuring a personal and connected experience.",
      ),
    },
    {
      icon: CompassIcon,
      title: t("Los mejores guías", "The Best Guides"),
      description: t(
        "Nuestros guías no solo conocen cada sendero, sino también las historias, la energía y los secretos de la montaña. Su experiencia y pasión transforman cada salida en una aventura única, auténtica e inolvidable.",
        "Our guides don't just know the trails — they know the stories, the energy, and the spirit of the mountains. Their skill and passion turn every journey into a truly unforgettable and genuine adventure.",
      ),
    },
  ]

  return (
    <section
      className="py-20 px-4 bg-background relative"
      style={{
        backgroundImage: `url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fondo%20texturado%202-ZpR3EJ7RMfwRpddcWhlHtIT06GX0Hg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "rgba(78, 107, 80, 0.03)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            {t("Las Mas Destacadas", "Featured Adventures")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance leading-7 tracking-[-0.07em] py-2.5">
            {t("ENCONTRA TU AVENTURA IDEAL", "DISCOVER YOUR IDEAL ADVENTURE")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t(
              "Para quienes les encanta el senderismo y la naturaleza, Patagonia Trek tiene actividades para todos",
              "For people who love to hike and nature, Patagonia Trek has something for everyone",
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
              onClick={() => router.push(`/actividades?actividad=${encodeURIComponent(exp.calendarioSlug)}`)}
              role="button"
              tabIndex={0}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={exp.image || "/placeholder.svg"}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge className={`mb-2 ${difficultyColors[exp.difficulty as keyof typeof difficultyColors]}`}>
                    {exp.difficulty}
                  </Badge>
                  <h3 className="text-2xl font-bold text-white mb-2 text-balance">{exp.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white/90">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                    </div>
                    <button
                      className="px-4 py-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-sm rounded-full text-xs font-medium text-white transition-colors border border-white/40 cursor-pointer shrink-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/actividades?actividad=${encodeURIComponent(exp.calendarioSlug)}`)
                      }}
                    >
                      {t("Ver fechas", "View dates")}
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl border-4 border-primary p-8 md:p-12 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-balance leading-tight tracking-[-0.06em]">
              {t("NUESTROS PILARES PARA UNA EXPERIENCIA EXCEPCIONAL", "OUR PILLARS FOR AN EXCEPTIONAL EXPERIENCE")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="space-y-2">
                <div className="flex flex-col items-center text-center gap-2">
                  <benefit.icon />
                  <h3 className="text-lg font-bold leading-tight">{benefit.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed text-center">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href="/actividades"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded hover:bg-primary/90 transition-colors font-semibold uppercase tracking-wide text-sm"
            >
              {t("Ver Actividades", "View All Activities")}
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
