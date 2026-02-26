"use client"

import { useLanguage } from "@/contexts/language-context"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DestinationsSection() {
  const { t, language } = useLanguage()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const destinations = [
    {
      name: language === "es" ? "Laguna Esmeralda" : "Laguna Esmeralda",
      slug: "laguna-esmeralda",
      lugarHref: "/lugares/laguna-esmeralda",
      descriptionES: "Un valle glaciar y una laguna verde esmeralda rodeada de montañas.",
      descriptionEN: "A glacial valley and emerald-green lagoon surrounded by mountains.",
      image: "/laguna-esmeralda-ushuaia-emerald-lake-mountains.jpg",
    },
    {
      name: language === "es" ? "Glaciar Ojo del Albino" : "Ojo del Albino Glacier",
      slug: "ojo-del-albino",
      lugarHref: "/lugares/glaciar-ojo-del-albino",
      descriptionES: "Desafiante travesía hacia un imponente glaciar escondido entre cumbres.",
      descriptionEN: "A demanding trek to a stunning glacier hidden among rugged peaks.",
      image: "/ojo-del-albino-glacier-ushuaia-mountain-peaks.jpg",
    },
    {
      name: language === "es" ? "Glaciar Vinciguerra" : "Vinciguerra Glacier",
      slug: "vinciguerra",
      lugarHref: "/lugares/glaciar-vinciguerra",
      descriptionES: "Bosques, turberas y la impactante laguna de los témpanos al pie del hielo.",
      descriptionEN: "Forests, peat bogs, and the striking Iceberg Lagoon beneath the glacier.",
      image: "/vinciguerra-glacier-ushuaia-iceberg-lagoon.jpg",
    },
    {
      name: language === "es" ? "Valle Tierra Mayor" : "Tierra Mayor Valley",
      slug: null,
      lugarHref: "/lugares/valle-tierra-mayor",
      descriptionES: "Naturaleza abierta, turberas infinitas y el espíritu salvaje de la montaña fueguina.",
      descriptionEN: "Open landscapes, endless peatlands, and the wild spirit of Fuegian mountains.",
      image: "/tierra-mayor-valley-ushuaia-peatlands-mountains.jpg",
    },
    {
      name: language === "es" ? "Valle de Andorra" : "Andorra Valley",
      slug: null,
      lugarHref: "/lugares/valle-de-andorra",
      descriptionES: "Senderos poco transitados entre bosques y arroyos, en el corazón de Ushuaia.",
      descriptionEN: "Quiet trails through forests and streams in the heart of Ushuaia.",
      image: "/andorra-valley-ushuaia-forest-trails-streams.jpg",
    },
  ]

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Hero Section with Background Image and Integrated Carousel */}
      <div className="relative min-h-screen flex flex-col justify-between py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Destinos%20ush%20vinci-N0uEGTGidXne73AHsdpHZ65xcKlFL9.png")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-64 md:pt-96 lg:pt-[28rem] pb-16 md:pb-20 lg:pb-24">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white text-balance uppercase tracking-tight text-center"
            style={{ textShadow: "0 4px 12px rgba(0,0,0,0.7)" }}
          >
            {t("Descubrí Ushuaia y sus paisajes únicos", "Discover Ushuaia and Its Unforgettable Landscapes")}
          </h2>

          {/* Decorative wave element */}
          <div className="flex justify-center mb-6">
            
          </div>

          <p
            className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed text-pretty max-w-3xl mx-auto font-medium text-center"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            {language === "es"
              ? "Cada sendero de Ushuaia revela un mundo diferente: montañas, glaciares y lagunas que cambian de color con la luz del día. Explorá los destinos donde la aventura y la naturaleza se encuentran en su estado más puro."
              : "Every trail in Ushuaia unveils a different world — mountains, glaciers, and lagoons that shift colors with the light. Explore the places where adventure and nature meet in their purest form."}
          </p>
        </div>

        <div className="relative z-10 px-4 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              {/* Navigation buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background shadow-lg hidden md:flex"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background shadow-lg hidden md:flex"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Scrollable container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-2 md:px-12 snap-x snap-mandatory"
              >
                {destinations.map((destination, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[70vw] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] min-w-[240px] group cursor-pointer snap-start"
                    onClick={() => router.push(destination.lugarHref)}
                  >
                    <div className="relative h-[420px] rounded-xl overflow-hidden shadow-2xl">
                      {/* Destination image */}
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-3 text-balance">{destination.name}</h3>
                        <p className="text-sm text-white/90 leading-relaxed text-pretty mb-4">
                          {language === "es" ? destination.descriptionES : destination.descriptionEN}
                        </p>
                        <button
                          className="px-6 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-sm font-medium transition-colors border border-white/40 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(destination.lugarHref)
                          }}
                        >
                          {t("Más información", "Learn more")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
