"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChevronRight } from "lucide-react"
import { useRef, useEffect, useState, useCallback } from "react"
import Script from "next/script"

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface LugarFAQ {
  q: string
  a: string
}

export interface LugarData {
  // Identifiers
  slug: string
  calendarSlug: string | null

  // Meta / SEO
  metaTitle: string       // max 60 chars
  metaDescription: string // 150–160 chars

  // Hero
  title: string           // H1: "[Lugar] – Trekking en Ushuaia"
  heroSubtitle: string    // 1 line, max 140 chars, atmospheric
  heroIntro: string       // 2–3 sentences, moved below hero as "Sobre la experiencia"
  heroImage: string
  heroImageAlt: string

  // Structured data
  geo: {
    latitude: number
    longitude: number
  }

  // Sections (fixed order, variable content)
  ubicacion: React.ReactNode        // ¿Dónde se encuentra?
  caracteristicas: React.ReactNode  // Características naturales (bullets)
  importancia: React.ReactNode      // Importancia dentro de Tierra del Fuego
  popularidad: React.ReactNode      // ¿Por qué es uno de los más visitados?

  // Gallery
  galleryImages: { src: string; alt: string }[]

  // Map
  mapEmbedUrl: string

  // FAQ (2 items for schema, can have more for display)
  faqs: LugarFAQ[]
}

interface Props {
  data: LugarData
}

// ─── Gallery Carousel ─────────────────────────────────────────────────────────

function GalleryCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const scrollStartLeft = useRef(0)

  const loopedImages = [...images, ...images, ...images]

  const startAutoScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    let lastTime = 0
    const step = (time: number) => {
      if (lastTime) {
        const delta = time - lastTime
        el.scrollLeft += 0.5 * (delta / 16.67)
        const singleSetWidth = el.scrollWidth / 3
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth
        }
      }
      lastTime = time
      animationRef.current = requestAnimationFrame(step)
    }
    animationRef.current = requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollLeft = el.scrollWidth / 3
    }
    if (!isPaused && !isDragging) startAutoScroll()
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
  }, [isPaused, isDragging, startAutoScroll])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    dragStartX.current = e.clientX
    scrollStartLeft.current = scrollRef.current?.scrollLeft ?? 0
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    scrollRef.current.scrollLeft = scrollStartLeft.current - (e.clientX - dragStartX.current)
  }
  const handleMouseUp = () => setIsDragging(false)

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setIsDragging(false) }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {loopedImages.map((img, i) => (
          <div key={`${img.src}-${i}`} className="flex-shrink-0 rounded-xl overflow-hidden" style={{ height: "240px" }}>
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-auto max-w-none object-cover pointer-events-none"
              draggable={false}
              onError={(e) => { e.currentTarget.src = "/placeholder.jpg" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function LugarLanding({ data }: Props) {
  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristDestination",
        "name": data.title,
        "description": data.metaDescription,
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": data.geo.latitude,
          "longitude": data.geo.longitude,
        },
        "url": `https://patagoniatrek.com.ar/lugares/${data.slug}`,
        "image": data.heroImage,
        "touristType": "Outdoor trekking",
        "includesAttraction": {
          "@type": "TouristAttraction",
          "name": data.title,
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": data.geo.latitude,
            "longitude": data.geo.longitude,
          },
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": data.faqs.slice(0, 2).map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a },
        })),
      },
    ],
  }

  return (
    <>
      <Script
        id={`jsonld-${data.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main className="min-h-screen bg-background">

        {/* ① Hero */}
        <section className="relative h-[78vh] min-h-[540px] flex items-end">
          <img
            src={data.heroImage}
            alt={data.heroImageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Stronger overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          {/* Fade gradient at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background/30 to-transparent" />

          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance leading-tight mb-4">
              {data.title}
            </h1>
            <p className="text-base md:text-lg text-white/85 max-w-xl text-pretty leading-relaxed mb-8">
              {data.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7 group"
              >
                <Link href="/actividades">
                  Ver próximas salidas
                  <ChevronRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full px-7 backdrop-blur-sm"
              >
                <Link href="/nosotros">
                  Conocer al equipo
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

          {/* ② Sobre la experiencia — was heroIntro, now first content section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 text-balance">
              Sobre la experiencia
            </h2>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              {data.heroIntro}
            </p>
          </section>

          {/* ④ Ubicacion */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 text-balance">
              ¿Dónde se encuentra?
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              {data.ubicacion}
            </div>
          </section>

          {/* ③ Características naturales */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 text-balance">
              Características naturales
            </h2>
            <div className="text-muted-foreground leading-relaxed">
              {data.caracteristicas}
            </div>
          </section>

          {/* ④ Importancia */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 text-balance">
              Importancia dentro de Tierra del Fuego
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              {data.importancia}
            </div>
          </section>

          {/* ⑤ Popularidad */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 text-balance">
              ¿Por qué es uno de los lugares más visitados de Ushuaia?
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              {data.popularidad}
            </div>
          </section>

          {/* ⑥ Gallery */}
          {data.galleryImages.length > 0 && (
            <section>
              <GalleryCarousel images={data.galleryImages} />
            </section>
          )}

          {/* ⑦ Map */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 text-balance">
              Ubicación en el mapa
            </h2>
            <div className="rounded-2xl overflow-hidden border border-border bg-muted" style={{ height: "380px" }}>
              <iframe
                src={data.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa de ${data.title} en Ushuaia, Tierra del Fuego`}
              />
            </div>
          </section>

          {/* FAQ */}
          {data.faqs.length > 0 && (
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-balance">
                Preguntas frecuentes
              </h2>
              <div className="space-y-6">
                {data.faqs.map((faq, i) => (
                  <div key={i} className="border-b border-border pb-6 last:border-0">
                    <h3 className="font-semibold text-base text-foreground mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ⑧ CTA — soft, non-invasive */}
          {data.calendarSlug && (
            <section className="border border-border rounded-2xl px-8 py-12 bg-muted/40">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-balance">
                ¿Querés vivir la experiencia?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl text-pretty leading-relaxed">
                Si estás planificando tu visita a Ushuaia y querés conocer {data.title} con acompañamiento profesional y organización previa, podés reservar tu salida directamente desde nuestra plataforma.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 group"
              >
                <Link href="/actividades">
                  Reservar salida
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </section>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
