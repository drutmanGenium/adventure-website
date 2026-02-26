import type { Metadata } from "next"
import { LugarLanding, type LugarData } from "@/components/lugar-landing"

export const metadata: Metadata = {
  title: "Glaciar Vinciguerra en Tierra del Fuego | Ushuaia",
  description:
    "El Glaciar Vinciguerra es un glaciar de montaña accesible desde Ushuaia, Tierra del Fuego. Conocé su ubicación, características geológicas e importancia en la región.",
  alternates: { canonical: "/lugares/glaciar-vinciguerra" },
  openGraph: {
    title: "Glaciar Vinciguerra en Tierra del Fuego | Ushuaia",
    description:
      "El Glaciar Vinciguerra es un glaciar de montaña accesible desde Ushuaia, Tierra del Fuego. Conocé su ubicación, características geológicas e importancia en la región.",
    url: "/lugares/glaciar-vinciguerra",
    images: [
      {
        url: "/vinciguerra-glacier-ushuaia-iceberg-lagoon.jpg",
        alt: "Glaciar Vinciguerra en Tierra del Fuego con laguna glaciar",
      },
    ],
  },
}

const data: LugarData = {
  slug: "glaciar-vinciguerra",
  calendarSlug: "vinciguerra",
  metaTitle: "Glaciar Vinciguerra en Tierra del Fuego | Ushuaia",
  metaDescription:
    "El Glaciar Vinciguerra es un glaciar de montaña accesible desde Ushuaia, Tierra del Fuego. Conocé su ubicación, características geológicas e importancia en la región.",

  title: "Glaciar Vinciguerra – Trekking en Ushuaia",
  heroSubtitle: "Un glaciar de montaña accesible a pie, con icebergs flotando en la Laguna de los Témpanos.",
  heroIntro:
    "El Glaciar Vinciguerra es uno de los glaciares de montaña más accesibles de Tierra del Fuego. Ubicado en los Andes Fueguinos, al norte de Ushuaia, el glaciar alimenta la Laguna de los Témpanos, un espejo de agua donde flotan fragmentos de hielo desprendidos del frente glaciar.",
  heroImage: "/vinciguerra-glacier-ushuaia-iceberg-lagoon.jpg",
  heroImageAlt: "Glaciar Vinciguerra en Tierra del Fuego con laguna glaciar",

  geo: { latitude: -54.7445, longitude: -68.3012 },

  ubicacion: (
    <>
      <p>
        El Glaciar Vinciguerra se encuentra en la vertiente sur de los Andes Fueguinos, a unos 14 km de la ciudad de Ushuaia en línea recta. El acceso se realiza por un sendero que parte desde el interior de la ciudad misma, lo que lo convierte en uno de los pocos glaciares del mundo que puede alcanzarse a pie desde un centro urbano.
      </p>
      <p>
        El glaciar ocupa una cuenca de alta montaña a una altitud de aproximadamente 900 metros sobre el nivel del mar, encuadrado por cerros que superan los 1.200 metros. El frente del glaciar desemboca en la Laguna de los Témpanos, que se encuentra a unos 700 metros de altitud.
      </p>
    </>
  ),

  caracteristicas: (
    <ul className="space-y-3">
      {[
        { label: "Ecosistema", text: "Transición entre bosque subantártico de lenga, turbales de altura y zona periglaciar con vegetación dispersa." },
        { label: "Origen geológico", text: "Glaciar de circo y de valle formado durante el último avance glaciar del Pleistoceno. Actualmente en proceso de retroceso." },
        { label: "Laguna asociada", text: "La Laguna de los Témpanos recibe los fragmentos de hielo que se desprenden del frente del glaciar, generando un paisaje singular con icebergs de pequeña escala." },
        { label: "Tipo de paisaje", text: "Combinación de bosque fueguino, humedales de altura, roca expuesta y frente glaciar con laguna proglacial." },
        { label: "Contexto climático", text: "Las condiciones cambian con la altitud. En las cotas altas el viento es constante y las temperaturas bajas. La nieve es posible en cualquier mes del año por encima de los 800 metros." },
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
        El Glaciar Vinciguerra es uno de los indicadores más visibles del cambio climático en Tierra del Fuego. Su retroceso ha sido documentado durante las últimas décadas y su evolución es monitoreada como referencia del estado de los glaciares en la región subantártica.
      </p>
      <p>
        Desde el punto de vista hídrico, el deshielo del glaciar alimenta los cursos de agua que abastecen parcialmente a Ushuaia. La preservación del glaciar está vinculada directamente a la disponibilidad de agua dulce en la ciudad.
      </p>
      <p>
        En términos de identidad paisajística, el Glaciar Vinciguerra representa la dimensión vertical de Tierra del Fuego: la posibilidad de ascender desde el nivel del mar hasta la alta montaña en una sola jornada. Esa proximidad entre ciudad, bosque y hielo es característica de Ushuaia y difícil de encontrar en otros lugares del mundo.
      </p>
    </>
  ),

  popularidad: (
    <>
      <p>
        El Glaciar Vinciguerra es uno de los pocos glaciares del planeta que puede visitarse en una excursión de un día desde una ciudad. Esa condición lo hace atractivo para viajeros que buscan una experiencia de montaña real sin necesidad de logística de varios días.
      </p>
      <p>
        La diversidad de ambientes durante el recorrido —ciudad, bosque, turbera, roca, hielo— ofrece una experiencia geográfica completa. Quienes suben al glaciar tienen la posibilidad de observar en pocas horas una secuencia de ecosistemas que en otras regiones requeriría varios días de viaje.
      </p>
      <p>
        La Laguna de los Témpanos, con sus pequeños icebergs flotantes, es un elemento visual poco habitual en trekkings de un día y contribuye significativamente al atractivo del lugar.
      </p>
    </>
  ),

  galleryImages: Array.from({ length: 8 }, (_, i) => ({
    src: `/images/lugares/glaciar-vinciguerra/${i + 1}.jpg`,
    alt: `Glaciar Vinciguerra en Tierra del Fuego - foto ${i + 1}`,
  })),

  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345!2d-68.3012!3d-54.7445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDQ0JzQwLjIiUyA2OMKwMTgnMDQuMyJX!5e0!3m2!1ses!2sar!4v1234567890",

  faqs: [
    {
      q: "¿El Glaciar Vinciguerra está retrocediendo?",
      a: "Sí. Como la mayoría de los glaciares del hemisferio sur, el Vinciguerra ha mostrado un retroceso sostenido durante las últimas décadas. Las fotografías comparativas de distintos años muestran una reducción notable en la extensión del frente glaciar.",
    },
    {
      q: "¿Qué es la Laguna de los Témpanos?",
      a: "Es una laguna proglacial ubicada al pie del frente del Glaciar Vinciguerra. Recibe su nombre por los fragmentos de hielo que se desprenden del glaciar y flotan en el agua. Es parte del mismo recorrido y se visita al llegar al glaciar.",
    },
    {
      q: "¿Desde qué parte de Ushuaia sale el sendero?",
      a: "El sendero parte desde el barrio Glaciar, en la parte alta de Ushuaia. Es uno de los pocos accesos a un glaciar que comienza dentro del ejido urbano de una ciudad.",
    },
  ],
}

export default function Page() {
  return <LugarLanding data={data} />
}
