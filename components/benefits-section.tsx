"use client"
import { useLanguage } from "@/contexts/language-context"

const ForestIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10 text-primary flex-shrink-0 mt-1">
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
  <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10 text-primary flex-shrink-0 mt-1">
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

const CampfireIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10 text-primary flex-shrink-0 mt-1">
    <circle cx="32" cy="40" r="16" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" opacity="0.3" />
    <path
      d="M26 48C26 48 22 44 22 38C22 32 26 28 26 28C26 28 24 32 26 36C28 40 32 40 32 40"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M32 44C32 44 28 42 28 38C28 34 32 30 32 30C32 30 30 32 30 36C30 40 32 40 32 40"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M38 48C38 48 42 44 42 38C42 32 38 28 38 28C38 28 40 32 38 36C36 40 32 40 32 40"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="24" cy="36" r="1.5" fill="currentColor" />
    <circle cx="40" cy="36" r="1.5" fill="currentColor" />
    <circle cx="32" cy="32" r="1.5" fill="currentColor" />
  </svg>
)

const CompassIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10 text-primary flex-shrink-0 mt-1">
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

const HikersIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10 text-primary flex-shrink-0 mt-1">
    {/* First hiker */}
    <circle cx="20" cy="16" r="3" fill="currentColor" />
    <path d="M20 19V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 22L15 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 22L25 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 30L16 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 30L24 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 18L26 20L26 26L22 28" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13 26L11 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

    {/* Second hiker */}
    <circle cx="44" cy="18" r="3" fill="currentColor" />
    <path d="M44 21V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 24L39 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 24L49 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 32L40 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 32L48 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M46 20L50 22L50 28L46 30" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M51 28L53 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

    {/* Trail/ground line */}
    <path
      d="M8 46C8 46 20 44 32 46C44 48 56 46 56 46"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="2 2"
      opacity="0.4"
    />
  </svg>
)

export function BenefitsSection() {
  const { t, language } = useLanguage()

  const benefits = [
    {
      icon: ForestIcon,
      title: t("Todo Incluido", "All-Inclusive Trips"),
      description: t(
        "Nos ocupamos de todo para que vos solo disfrutes la experiencia: transporte, comidas, alojamiento, guías profesionales, permisos y equipo técnico cuando es necesario. Viajás ligero y sin preocupaciones.",
        "We take care of everything so you can focus entirely on the experience — transportation, meals, lodging, professional guides, permits, and technical gear when needed. Travel light and stress-free.",
      ),
    },
    {
      icon: MountainIcon,
      title: t("Destinos Únicos", "World-Class Destinations"),
      description: t(
        "Explorá algunos de los paisajes más impactantes del mundo: glaciares, montañas, lagos y bosques patagónicos. Nuestras rutas están diseñadas para que descubras cada lugar de forma auténtica, en distintas etapas de tu vida.",
        "Explore some of the world's most breathtaking landscapes — glaciers, mountains, lakes, and Patagonian forests. Our routes are designed to let you experience each place authentically, at different moments in your life.",
      ),
    },
    {
      icon: HikersIcon,
      title: t("Grupos Reducidos", "Small Groups"),
      description: t(
        "Cada salida se realiza con grupos pequeños, entre 4 y 12 personas, para garantizar una experiencia personalizada y cercana. Más que un tour, es una aventura compartida con atención en cada detalle.",
        "Each trek is limited to small groups of 4–12 participants, ensuring a personal and connected experience. More than a tour — it's a shared adventure where every detail matters.",
      ),
    },
    {
      icon: CompassIcon,
      title: t("Seguridad ante todo", "Safety First"),
      description: t(
        "La seguridad es nuestra prioridad en cada salida. Todos nuestros guías están certificados en primeros auxilios en zonas remotas y cuentan con amplia experiencia en montaña y clima patagónico. Los equipos se revisan antes de cada travesía, los grupos están siempre comunicados por radio y adaptamos el itinerario según las condiciones del terreno y el clima.",
        "Safety is our top priority on every trip. All our guides are certified in wilderness first aid and have extensive experience with mountain and Patagonian weather conditions. Equipment is checked before each trek, groups remain in radio contact, and itineraries are adjusted as needed to ensure safe and enjoyable adventures.",
      ),
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-12 lg:gap-16 items-start">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance leading-tight text-center tracking-[-0.07em]">
                {t(
                  "UNA EXPERIENCIA MEMORABLE Y SEGURA ES NUESTRA PRIORIDAD",
                  "YOUR SAFETY AND AN UNFORGETTABLE EXPERIENCE IS OUR TOP PRIORITY",
                )}
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {t(
                  "Te compartimos algunos de los pilares fundamentales de cómo operamos y cuidamos cada detalle de tu viaje.",
                  "Below, we share some of the core principles that guide how we operate and ensure every detail of your journey is carefully handled.",
                )}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-start gap-3">
                  <benefit.icon />
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">{benefit.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <a
            href="/actividades"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded hover:bg-primary/90 transition-colors font-semibold uppercase tracking-wide text-sm"
          >
            {t("Ver Actividades", "View All Activities")}
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
