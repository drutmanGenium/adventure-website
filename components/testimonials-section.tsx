"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function TestimonialsSection() {
  const { t, language } = useLanguage()

  const testimonials = [
    {
      name: "María González",
      location: language === "es" ? "Buenos Aires, Argentina" : "Buenos Aires, Argentina",
      rating: 5,
      text:
        language === "es"
          ? "Una experiencia inolvidable en el Fitz Roy. Los guías fueron excepcionales, conocían cada rincón y nos hicieron sentir seguros en todo momento. ¡Volveré sin dudas!"
          : "An unforgettable experience at Fitz Roy. The guides were exceptional, knew every corner and made us feel safe at all times. I will definitely return!",
      trek: "Fitz Roy",
    },
    {
      name: "John Smith",
      location: language === "es" ? "Nueva York, EE.UU." : "New York, USA",
      rating: 5,
      text:
        language === "es"
          ? "El trekking en el Glaciar Perito Moreno superó todas mis expectativas. La organización fue impecable y los paisajes simplemente espectaculares."
          : "The Perito Moreno Glacier trek exceeded all my expectations. The organization was impeccable and the landscapes simply spectacular.",
      trek: "Perito Moreno",
    },
    {
      name: "Ana Silva",
      location: language === "es" ? "Santiago, Chile" : "Santiago, Chile",
      rating: 5,
      text:
        language === "es"
          ? "Perfecto para mi primer trekking en Patagonia. El grupo era pequeño, el ritmo adecuado y aprendí muchísimo sobre la región. Totalmente recomendado."
          : "Perfect for my first trek in Patagonia. The group was small, the pace was right and I learned a lot about the region. Totally recommended.",
      trek: "Laguna Esmeralda",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            {t("Lo que dicen nuestros viajeros", "What our travellers say")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t(
              "Experiencias reales de viajeros que exploraron la Patagonia con nosotros",
              "Real experiences from travelers who explored Patagonia with us",
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/50">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed italic">"{testimonial.text}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                <p className="text-sm text-primary font-medium mt-1">{testimonial.trek}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
