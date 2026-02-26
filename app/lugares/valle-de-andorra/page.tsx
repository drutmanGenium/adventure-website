import type { Metadata } from "next"
import { LugarLanding, type LugarData } from "@/components/lugar-landing"

export const metadata: Metadata = {
  title: "Valle de Andorra en Tierra del Fuego | Ushuaia",
  description:
    "El Valle de Andorra es un valle boscoso en los alrededores de Ushuaia, Tierra del Fuego. Conocé su ubicación, ecosistema y características naturales.",
  alternates: { canonical: "/lugares/valle-de-andorra" },
  openGraph: {
    title: "Valle de Andorra en Tierra del Fuego | Ushuaia",
    description:
      "El Valle de Andorra es un valle boscoso en los alrededores de Ushuaia, Tierra del Fuego. Conocé su ubicación, ecosistema y características naturales.",
    url: "/lugares/valle-de-andorra",
    images: [
      {
        url: "/andorra-valley-ushuaia-forest-trails-streams.jpg",
        alt: "Valle de Andorra en Tierra del Fuego con bosque de lenga y arroyo",
      },
    ],
  },
}

const data: LugarData = {
  slug: "valle-de-andorra",
  calendarSlug: "valle-de-andorra",
  metaTitle: "Valle de Andorra en Tierra del Fuego | Ushuaia",
  metaDescription:
    "El Valle de Andorra es un valle boscoso en los alrededores de Ushuaia, Tierra del Fuego. Conocé su ubicación, ecosistema y características naturales.",

  title: "Valle de Andorra – Trekking en Ushuaia",
  heroSubtitle: "Bosque de lenga cerrado, arroyo constante y silencio a minutos de la ciudad.",
  heroIntro:
    "El Valle de Andorra es un valle boscoso ubicado en la periferia norte de Ushuaia, Tierra del Fuego. Atravesado por el arroyo Andorra, el valle conserva uno de los bosques de lenga en mejor estado de los alrededores de la ciudad, con senderos poco transitados que discurren entre árboles, rocas cubiertas de musgo y cursos de agua permanentes.",
  heroImage: "/andorra-valley-ushuaia-forest-trails-streams.jpg",
  heroImageAlt: "Valle de Andorra en Tierra del Fuego con bosque de lenga y arroyo",

  geo: { latitude: -54.7652, longitude: -68.2834 },

  ubicacion: (
    <>
      <p>
        El Valle de Andorra se encuentra al norte de Ushuaia, en la vertiente sur de los Andes Fueguinos, a unos 7 km del centro de la ciudad. El acceso se realiza por la Ruta J y caminos internos que llevan al área de inicio de los senderos. El valle está encuadrado por cerros de mediana altura cubiertos de bosque y desemboca hacia la zona urbana de Ushuaia.
      </p>
      <p>
        El arroyo Andorra, que da nombre al valle, nace en las cotas altas de los cerros circundantes y recorre el fondo del valle antes de confluir con el sistema hídrico que abastece a la ciudad. El valle forma parte de la cuenca del Canal Beagle.
      </p>
    </>
  ),

  caracteristicas: (
    <ul className="space-y-3">
      {[
        { label: "Ecosistema", text: "Bosque subantártico de lenga (Nothofagus pumilio) y ñire (Nothofagus antarctica), con presencia de musgos, líquenes y vegetación de sotobosque. Las zonas húmedas presentan turberas de pequeña escala." },
        { label: "Origen geológico", text: "Valle de origen glaciar con posterior remodelado fluvial. El fondo del valle fue ocupado por un glaciar de menor tamaño durante el Pleistoceno y luego modificado por la acción del arroyo Andorra." },
        { label: "Hidrología", text: "El arroyo Andorra es el elemento hídrico central del valle. Sus cruces definen parte del recorrido de los senderos y aportan variedad al paisaje del bosque." },
        { label: "Tipo de paisaje", text: "Bosque cerrado con dosel bajo, raíces expuestas, troncos caídos y presencia constante de humedad. El suelo es esponjoso y rico en materia orgánica." },
        { label: "Contexto climático", text: "El bosque genera un microclima más húmedo y protegido del viento respecto a los valles abiertos de la región. Las temperaturas son algo más estables que en las zonas expuestas." },
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          <span><strong className="text-foreground">{item.label}:</strong> {item.text}</span>
        </li>
      ))}
    </ul>
  ),

  importancia: (
    <>
      <p>
        El Valle de Andorra forma parte de la reserva forestal que rodea Ushuaia. El bosque de lenga del valle actúa como regulador del ciclo hídrico local, retiene suelos en las laderas y constituye hábitat para diversas especies de aves y pequeños mamíferos.
      </p>
      <p>
        Su proximidad a la ciudad lo convierte en un área de interés para la conservación urbana. La presión del crecimiento de Ushuaia sobre los bordes del bosque hace que zonas como el Valle de Andorra sean relevantes para el mantenimiento de los servicios ecosistémicos en el área metropolitana.
      </p>
      <p>
        El bosque del valle es también representativo del ecotono entre el bosque fueguino y la zona altoandina, con una transición visible a medida que se asciende por las laderas desde el fondo del valle hacia las cotas superiores.
      </p>
    </>
  ),

  popularidad: (
    <>
      <p>
        El Valle de Andorra recibe menos visitantes que los destinos más conocidos de Ushuaia, lo que genera condiciones de mayor tranquilidad en el sendero. Para quienes priorizan el silencio y el contacto con el bosque por encima de las vistas de postal, el valle ofrece una experiencia diferenciada.
      </p>
      <p>
        Su cercanía a la ciudad lo hace accesible sin necesidad de trasladarse largas distancias, lo que resulta conveniente para quienes tienen tiempo limitado o buscan una actividad complementaria dentro de un itinerario de varios días en Ushuaia.
      </p>
      <p>
        El bosque fueguino en estado relativamente prístino, con raíces, musgos y la presencia constante del arroyo, ofrece un tipo de inmersión en la naturaleza diferente al de los trekkings de montaña. Esa diferencia de tono es lo que define la identidad del Valle de Andorra como destino.
      </p>
    </>
  ),

  galleryImages: Array.from({ length: 8 }, (_, i) => ({
    src: `/images/lugares/valle-de-andorra/${i + 1}.jpg`,
    alt: `Valle de Andorra en Tierra del Fuego - foto ${i + 1}`,
  })),

  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345!2d-68.2834!3d-54.7652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDQ1JzU0LjciUyA2OMKwMTcnMDAuMiJX!5e0!3m2!1ses!2sar!4v1234567890",

  faqs: [
    {
      q: "¿El Valle de Andorra tiene senderos marcados?",
      a: "Sí. Existen senderos señalizados que recorren el valle siguiendo el arroyo y adentrándose en el bosque. Las condiciones del sendero pueden variar según la época del año y las precipitaciones recientes.",
    },
    {
      q: "¿Es diferente al resto de los senderos de Ushuaia?",
      a: "Sí. A diferencia de rutas como Laguna Esmeralda o el Glaciar Vinciguerra, el Valle de Andorra no tiene un 'destino' final de impacto visual fuerte. El valor del recorrido está en el bosque mismo, en el arroyo y en la calidad del silencio.",
    },
    {
      q: "¿Hay fauna en el valle?",
      a: "Es habitual encontrar diversas especies de aves del bosque fueguino, como el chucao y el hued-hued. El zorro fueguino aparece con cierta frecuencia en zonas menos transitadas del valle.",
    },
  ],
}

export default function Page() {
  return <LugarLanding data={data} />
}
