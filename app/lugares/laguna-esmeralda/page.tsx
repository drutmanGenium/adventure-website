import type { Metadata } from "next"
import { LugarLanding, type LugarData } from "@/components/lugar-landing"

export const metadata: Metadata = {
  title: "Laguna Esmeralda en Tierra del Fuego | Ushuaia",
  description:
    "Laguna Esmeralda es una laguna glaciar en Ushuaia, Tierra del Fuego. Conocé su ubicación, características naturales y por qué es el destino más visitado de la región.",
  alternates: { canonical: "/lugares/laguna-esmeralda" },
  openGraph: {
    title: "Laguna Esmeralda en Tierra del Fuego | Ushuaia",
    description:
      "Laguna Esmeralda es una laguna glaciar en Ushuaia, Tierra del Fuego. Conocé su ubicación, características naturales y por qué es el destino más visitado de la región.",
    url: "/lugares/laguna-esmeralda",
    images: [
      {
        url: "/laguna-esmeralda-ushuaia-emerald-lake-mountains.jpg",
        alt: "Laguna Esmeralda en Tierra del Fuego vista panorámica",
      },
    ],
  },
}

const data: LugarData = {
  slug: "laguna-esmeralda",
  calendarSlug: "laguna-esmeralda",
  metaTitle: "Laguna Esmeralda en Tierra del Fuego | Ushuaia",
  metaDescription:
    "Laguna Esmeralda es una laguna glaciar en Ushuaia, Tierra del Fuego. Conocé su ubicación, características naturales y por qué es el destino más visitado de la región.",

  title: "Laguna Esmeralda – Trekking en Ushuaia",
  heroSubtitle: "Una laguna glaciar de color esmeralda rodeada de montañas fueguinas.",
  heroIntro:
    "Laguna Esmeralda es una laguna de origen glaciar ubicada en el interior de Tierra del Fuego, a pocos kilómetros de Ushuaia. Su color verde intenso, producto de las partículas en suspensión provenientes del deshielo, la convierte en uno de los paisajes más reconocibles del extremo sur de Argentina.",
  heroImage: "/laguna-esmeralda-ushuaia-emerald-lake-mountains.jpg",
  heroImageAlt: "Laguna Esmeralda en Tierra del Fuego vista panorámica",

  geo: { latitude: -54.7883, longitude: -68.2456 },

  ubicacion: (
    <>
      <p>
        Laguna Esmeralda se encuentra en el sector norte de la Cordillera de los Andes Fueguinos, dentro del área natural protegida que rodea Ushuaia. El acceso al lugar parte desde la Ruta Nacional 3, a aproximadamente 20 km de la ciudad, y el recorrido se realiza íntegramente a pie a través de un sendero que atraviesa el bosque de lenga y los turbales característicos de Tierra del Fuego.
      </p>
      <p>
        El valle donde se asienta la laguna está encuadrado por cerros que superan los 1.000 metros de altura, formando una cuenca natural que retiene el agua del deshielo. La laguna se sitúa a una altitud de aproximadamente 550 metros sobre el nivel del mar.
      </p>
    </>
  ),

  caracteristicas: (
    <ul className="space-y-3">
      {[
        { label: "Ecosistema", text: "Bosque subantártico de lenga (Nothofagus pumilio), con zonas de turberas y mallines húmedos." },
        { label: "Origen geológico", text: "Laguna de origen glaciar formada por la acumulación de agua de deshielo en una cubeta excavada por el avance y retroceso de glaciares durante el Pleistoceno." },
        { label: "Color del agua", text: "Verde esmeralda a turquesa, según la luz y la época del año, causado por la presencia de partículas de roca molida glaciar (harina glaciar) en suspensión." },
        { label: "Tipo de paisaje", text: "Valle glaciar con combinación de bosque denso, áreas abiertas de turba y espejo de agua rodeado de montaña." },
        { label: "Contexto climático", text: "Clima subantártico oceánico: temperaturas bajas durante todo el año, precipitaciones frecuentes, viento moderado a fuerte y alta variabilidad diaria." },
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
        Laguna Esmeralda representa uno de los ejemplos más accesibles del paisaje glaciar de Tierra del Fuego. La posibilidad de llegar a una laguna de origen glaciar en una jornada de caminata, sin equipamiento técnico, la convierte en un punto de referencia para comprender la geología y el ecosistema de la región.
      </p>
      <p>
        Desde el punto de vista ecológico, el humedal que rodea la laguna cumple una función de regulación hídrica importante en el ciclo del agua local. Los turbales actúan como esponjas naturales, filtrando y almacenando agua. Este tipo de ecosistema es particularmente frágil y su preservación depende del comportamiento de los visitantes en el sendero.
      </p>
      <p>
        En términos de identidad geográfica, la laguna es uno de los íconos visuales de Ushuaia. Su imagen aparece frecuentemente en la comunicación turística de la ciudad y de Tierra del Fuego, y es reconocida internacionalmente como representación del paisaje del fin del mundo.
      </p>
    </>
  ),

  popularidad: (
    <>
      <p>
        La combinación de accesibilidad y espectacularidad explica la popularidad de Laguna Esmeralda. El recorrido no requiere experiencia técnica en montañismo ni condición física de alto rendimiento, lo que lo pone al alcance de un rango amplio de visitantes: desde viajeros jóvenes hasta personas mayores con buen estado general.
      </p>
      <p>
        La distancia desde Ushuaia es corta en comparación con otros destinos naturales de la región, lo que facilita la logística. El paisaje varía considerablemente a lo largo del recorrido —bosque, turbera, valle abierto, laguna— lo que genera una experiencia visualmente rica sin necesidad de comprometer muchas horas o días.
      </p>
      <p>
        Laguna Esmeralda es también uno de los primeros destinos recomendados por guías locales y agencias para quienes visitan Ushuaia por primera vez. Funciona como introducción al ecosistema fueguino y a la experiencia de caminata en Tierra del Fuego.
      </p>
    </>
  ),

  galleryImages: Array.from({ length: 8 }, (_, i) => ({
    src: `/images/lugares/laguna-esmeralda/${i + 1}.jpg`,
    alt: `Laguna Esmeralda en Tierra del Fuego vista panorámica - foto ${i + 1}`,
  })),

  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345!2d-68.2456!3d-54.7883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDQ3JzE4LjAiUyA2OMKwMTQnNDQuMiJX!5e0!3m2!1ses!2sar!4v1234567890",

  faqs: [
    {
      q: "¿Por qué el agua de Laguna Esmeralda tiene ese color verde?",
      a: "El color es producto de la harina glaciar: partículas muy finas de roca molida por el movimiento del glaciar que quedan en suspensión en el agua. Reflejan la luz de forma particular, generando ese tono verde o turquesa característico.",
    },
    {
      q: "¿Laguna Esmeralda está dentro de un parque nacional?",
      a: "No está dentro del Parque Nacional Tierra del Fuego, pero se encuentra en una zona de protección ambiental en las cercanías de Ushuaia. El sendero es de acceso libre, aunque el cuidado del ecosistema depende del comportamiento de cada visitante.",
    },
    {
      q: "¿En qué época del año es mejor visitarla?",
      a: "El acceso es posible durante la mayor parte del año. El verano austral (noviembre a marzo) ofrece más horas de luz y temperaturas más amables. El otoño (abril) suma colores rojizos y amarillos en el bosque de lenga. En invierno el sendero puede tener nieve.",
    },
    {
      q: "¿Cuánta distancia hay desde Ushuaia?",
      a: "El punto de inicio del sendero está a unos 20 km de Ushuaia por la Ruta Nacional 3. Desde ahí, el recorrido a pie tiene aproximadamente 10 km de ida y vuelta.",
    },
  ],
}

export default function Page() {
  return <LugarLanding data={data} />
}
