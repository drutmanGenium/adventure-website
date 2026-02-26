import type { Metadata } from "next"
import { LugarLanding, type LugarData } from "@/components/lugar-landing"

export const metadata: Metadata = {
  title: "Valle Tierra Mayor en Tierra del Fuego | Ushuaia",
  description:
    "El Valle Tierra Mayor es un valle glaciar amplio en Ushuaia, Tierra del Fuego, con turberas, ríos y vistas a los Andes Fueguinos. Información geográfica y ecológica del lugar.",
  alternates: { canonical: "/lugares/valle-tierra-mayor" },
  openGraph: {
    title: "Valle Tierra Mayor en Tierra del Fuego | Ushuaia",
    description:
      "El Valle Tierra Mayor es un valle glaciar amplio en Ushuaia, Tierra del Fuego, con turberas, ríos y vistas a los Andes Fueguinos. Información geográfica y ecológica del lugar.",
    url: "/lugares/valle-tierra-mayor",
    images: [
      {
        url: "/tierra-mayor-valley-ushuaia-peatlands-mountains.jpg",
        alt: "Valle Tierra Mayor en Tierra del Fuego con turberas y montañas",
      },
    ],
  },
}

const data: LugarData = {
  slug: "valle-tierra-mayor",
  calendarSlug: "valle-tierra-mayor",
  metaTitle: "Valle Tierra Mayor en Tierra del Fuego | Ushuaia",
  metaDescription:
    "El Valle Tierra Mayor es un valle glaciar amplio en Ushuaia, Tierra del Fuego, con turberas, ríos y vistas a los Andes Fueguinos. Información geográfica y ecológica del lugar.",

  title: "Valle Tierra Mayor – Trekking en Ushuaia",
  heroSubtitle: "Un gran valle glaciar con turberas, ríos y montañas en todas las direcciones.",
  heroIntro:
    "El Valle Tierra Mayor es uno de los grandes valles glaciares de Tierra del Fuego, ubicado a unos 25 km de Ushuaia. Su paisaje abierto, dominado por turberas, ríos y cadenas montañosas en todas las direcciones, lo distingue del resto de los destinos naturales de la región por su escala horizontal y su carácter contemplativo.",
  heroImage: "/tierra-mayor-valley-ushuaia-peatlands-mountains.jpg",
  heroImageAlt: "Valle Tierra Mayor en Tierra del Fuego con turberas y montañas",

  geo: { latitude: -54.7215, longitude: -68.0987 },

  ubicacion: (
    <>
      <p>
        El Valle Tierra Mayor se extiende al noreste de Ushuaia, a lo largo del río Olivia, siguiendo la Ruta Nacional 3. El acceso principal se realiza en vehículo hasta el área recreativa del valle, a aproximadamente 25 km de la ciudad. El valle está flanqueado por las cadenas montañosas de los Andes Fueguinos y forma parte de la cuenca hidrográfica del Canal Beagle.
      </p>
      <p>
        El territorio del valle fue modelado por el avance y retroceso de los glaciares durante el Pleistoceno, lo que explica su morfología plana con paredes montañosas abruptas en los bordes. La altitud del fondo del valle ronda los 200 metros sobre el nivel del mar.
      </p>
    </>
  ),

  caracteristicas: (
    <ul className="space-y-3">
      {[
        { label: "Ecosistema", text: "Turberas de Sphagnum, mallines húmedos, bosque de lenga en los bordes del valle y estepa fueguina en sectores más secos." },
        { label: "Origen geológico", text: "Valle de origen glaciar excavado durante el Pleistoceno. El fondo plano y las laderas abruptas son características típicas de los valles en U formados por glaciares de valle." },
        { label: "Hidrología", text: "El río Olivia atraviesa el valle con un recorrido sinuoso, típico de los ríos en planicie de inundación. Es uno de los afluentes principales del sistema hídrico de Ushuaia." },
        { label: "Tipo de paisaje", text: "Paisaje abierto de planicie fluvioglaciar con turberas y vegetación de baja altura. Contrasta con los valles más encajonados de la región por su amplitud horizontal." },
        { label: "Fauna", text: "El valle es hábitat de diversas especies de aves acuáticas como cauquenes, patos y bandurrias. El zorro fueguino (Lycalopex culpaeus lycoides) está presente en la zona." },
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
        Las turberas del Valle Tierra Mayor son uno de los ecosistemas de mayor importancia ecológica de Tierra del Fuego. Los turbales de Sphagnum actúan como sumideros de carbono, almacenan agua y regulan el flujo hídrico hacia los ríos y arroyos de la cuenca. Su preservación es relevante tanto a escala local como en el contexto del cambio climático global.
      </p>
      <p>
        El valle tiene también importancia como corredor de biodiversidad. Su extensión y la variedad de hábitats que concentra —agua, turbera, bosque marginal, planicie abierta— lo convierten en un área con alta diversidad de aves y mamíferos en relación a su tamaño.
      </p>
      <p>
        Desde el punto de vista histórico, el valle fue territorio de los pueblos originarios Selknam que habitaron la isla. Sus planicies accesibles lo convirtieron en zona de tránsito y campamento estacional durante siglos antes de la colonización europea.
      </p>
    </>
  ),

  popularidad: (
    <>
      <p>
        El Valle Tierra Mayor ofrece un tipo de paisaje poco común entre los destinos naturales de Ushuaia: horizontes abiertos y cielos amplios, en contraposición a los valles encajonados y los bosques cerrados que predominan en la región. Esa apertura es lo que atrae a quienes buscan una experiencia diferente a la del trekking de montaña.
      </p>
      <p>
        La accesibilidad por ruta lo convierte en un destino adecuado para distintos perfiles de visitantes. El invierno lo transforma en un área de actividades en la nieve —esquí de fondo, trineos, raquetas— lo que amplía su frecuentación durante todo el año.
      </p>
      <p>
        La posibilidad de observar fauna silvestre en su entorno natural, especialmente aves, suma un componente de interés para quienes buscan una experiencia más contemplativa y menos orientada al esfuerzo físico.
      </p>
    </>
  ),

  galleryImages: Array.from({ length: 8 }, (_, i) => ({
    src: `/images/lugares/valle-tierra-mayor/${i + 1}.jpg`,
    alt: `Valle Tierra Mayor en Tierra del Fuego - foto ${i + 1}`,
  })),

  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345!2d-68.0987!3d-54.7215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDQzJzE3LjQiUyA2OMKwMDUnNTUuMyJX!5e0!3m2!1ses!2sar!4v1234567890",

  faqs: [
    {
      q: "¿Por qué el valle es tan plano?",
      a: "La morfología plana es característica de los valles en U formados por glaciares. El hielo erosiona el fondo y las paredes del valle de forma diferente a los ríos, produciendo ese perfil amplio y recto que distingue los valles glaciares de los fluviales.",
    },
    {
      q: "¿Qué son las turberas que se ven en el valle?",
      a: "Son ecosistemas formados por la acumulación de musgo Sphagnum muerto que no se descompone completamente por las condiciones de acidez y baja temperatura. Las turberas de Tierra del Fuego son parte de los humedales subantárticos más extensos del hemisferio sur.",
    },
    {
      q: "¿Se puede visitar en invierno?",
      a: "Sí. En invierno el valle es un área de actividades en la nieve: esquí de fondo, trineos y raquetas de nieve. Las condiciones de acceso son buenas ya que la ruta principal está pavimentada.",
    },
  ],
}

export default function Page() {
  return <LugarLanding data={data} />
}
