import type { Metadata } from "next"
import { LugarLanding, type LugarData } from "@/components/lugar-landing"

export const metadata: Metadata = {
  title: "Glaciar Ojo del Albino en Tierra del Fuego | Ushuaia",
  description:
    "El Glaciar Ojo del Albino es un glaciar de alta montaña en los Andes Fueguinos, Ushuaia. Conocé su ubicación, características geológicas y su relevancia en Tierra del Fuego.",
  alternates: { canonical: "/lugares/glaciar-ojo-del-albino" },
  openGraph: {
    title: "Glaciar Ojo del Albino en Tierra del Fuego | Ushuaia",
    description:
      "El Glaciar Ojo del Albino es un glaciar de alta montaña en los Andes Fueguinos, Ushuaia. Conocé su ubicación, características geológicas y su relevancia en Tierra del Fuego.",
    url: "/lugares/glaciar-ojo-del-albino",
    images: [
      {
        url: "/ojo-del-albino-glacier-ushuaia-mountain-peaks.jpg",
        alt: "Glaciar Ojo del Albino en Tierra del Fuego vista desde el acceso",
      },
    ],
  },
}

const data: LugarData = {
  slug: "glaciar-ojo-del-albino",
  calendarSlug: "ojo-del-albino",
  metaTitle: "Glaciar Ojo del Albino en Tierra del Fuego | Ushuaia",
  metaDescription:
    "El Glaciar Ojo del Albino es un glaciar de alta montaña en los Andes Fueguinos, Ushuaia. Conocé su ubicación, características geológicas y su relevancia en Tierra del Fuego.",

  title: "Ojo del Albino – Trekking en Ushuaia",
  heroSubtitle: "Un glaciar de alta montaña en los Andes Fueguinos, para quienes buscan el límite.",
  heroIntro:
    "El Glaciar Ojo del Albino es uno de los glaciares más altos y menos frecuentados de los Andes Fueguinos. Ubicado en una cuenca de alta montaña al sur de Ushuaia, el glaciar ocupa un circo glaciar de difícil acceso que le otorga una escala y un aislamiento poco comunes en los destinos naturales de la región.",
  heroImage: "/ojo-del-albino-glacier-ushuaia-mountain-peaks.jpg",
  heroImageAlt: "Glaciar Ojo del Albino en Tierra del Fuego vista desde el acceso",

  geo: { latitude: -54.8521, longitude: -68.2189 },

  ubicacion: (
    <>
      <p>
        El Glaciar Ojo del Albino se encuentra en la Cordillera de los Andes Fueguinos, al sur de Ushuaia, dentro de la zona de amortiguación del Parque Nacional Tierra del Fuego. El acceso se realiza por un sendero de montaña que parte desde las afueras de la ciudad y asciende de forma sostenida hasta la cuenca glaciar.
      </p>
      <p>
        El glaciar se ubica a una altitud de aproximadamente 1.100 a 1.300 metros sobre el nivel del mar, encuadrado por cumbres que superan los 1.400 metros. La cuenca donde se asienta es un circo glaciar —una depresión semicircular formada por la erosión del hielo— que le da al lugar su morfología característica.
      </p>
    </>
  ),

  caracteristicas: (
    <ul className="space-y-3">
      {[
        { label: "Ecosistema", text: "Zona de transición entre el bosque subantártico de lenga en las cotas bajas y la vegetación de alta montaña, con roca expuesta y nieve en las cotas superiores." },
        { label: "Origen geológico", text: "Glaciar de circo enclavado en una cuenca excavada por erosión glaciar durante el Pleistoceno. El circo es una de las formas erosivas glaciares más representativas de los Andes Fueguinos." },
        { label: "Tipo de glaciar", text: "Glaciar templado de alta montaña, con un frente activo que presenta crevasses y bloques de hielo. Las condiciones del frente varían según la época del año." },
        { label: "Tipo de paisaje", text: "Alta montaña subantártica con combinación de bosque en las cotas bajas, roca glaciar expuesta, nieve estacional y hielo vivo en la cuenca superior." },
        { label: "Contexto climático", text: "Condiciones de alta montaña: viento fuerte, temperatura bajo cero posible en cualquier mes, nieve estacional y heladas nocturnas frecuentes incluso en verano." },
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
        El Ojo del Albino es uno de los glaciares de los Andes Fueguinos que conserva un estado más prístino debido a la dificultad de acceso. Su menor frecuentación lo convierte en un referente del estado natural de los glaciares de la región, relativamente menos afectado por el impacto del turismo masivo.
      </p>
      <p>
        Desde el punto de vista geomorfológico, el circo glaciar del Ojo del Albino es un ejemplo claro de las formas erosivas que dominaron el paisaje de Tierra del Fuego durante las glaciaciones del Cuaternario. Observar ese paisaje desde adentro permite comprender la escala de los procesos que moldearon el territorio.
      </p>
      <p>
        Su importancia ecológica está también vinculada al rol del glaciar como reservorio de agua dulce y como hábitat de organismos adaptados a condiciones extremas de temperatura y altitud.
      </p>
    </>
  ),

  popularidad: (
    <>
      <p>
        El Glaciar Ojo del Albino atrae a quienes buscan una experiencia de montaña más exigente y menos transitada que otros destinos de Ushuaia. La dificultad del acceso funciona como filtro natural: quienes llegan han hecho un esfuerzo real para estar ahí, y eso tiene un impacto en la calidad de la experiencia.
      </p>
      <p>
        Las vistas panorámicas que se obtienen durante el ascenso —sobre los valles, los canales del Beagle y las cadenas montañosas circundantes— son de las más amplias que se pueden alcanzar en trekking de un día en Ushuaia. Eso lo convierte en un destino de referencia para los viajeros con mayor experiencia en montaña.
      </p>
      <p>
        La combinación de glaciar activo, paisaje de alta montaña y aislamiento relativo lo posiciona como una de las experiencias más completas disponibles en Tierra del Fuego para quienes están en condiciones físicas de realizarlo.
      </p>
    </>
  ),

  galleryImages: Array.from({ length: 8 }, (_, i) => ({
    src: `/images/lugares/ojo-del-albino/${i + 1}.jpg`,
    alt: `Glaciar Ojo del Albino en Tierra del Fuego - foto ${i + 1}`,
  })),

  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345!2d-68.2189!3d-54.8521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDUxJzA3LjYiUyA2OMKwMTMnMDguMCJX!5e0!3m2!1ses!2sar!4v1234567890",

  faqs: [
    {
      q: "¿Por qué se llama Ojo del Albino?",
      a: "El nombre hace referencia a la apariencia visual del glaciar visto desde cierta distancia: el circo glaciar, de color blanquecino, encuadrado en la roca oscura de la montaña, recuerda la forma de un ojo. El término 'albino' alude al color blanco del hielo.",
    },
    {
      q: "¿Está dentro del Parque Nacional Tierra del Fuego?",
      a: "El acceso al glaciar transita por los límites del área de protección del parque y sus zonas de amortiguación. Las condiciones de acceso pueden variar según la regulación vigente en cada temporada.",
    },
    {
      q: "¿Es el glaciar más alto de Ushuaia?",
      a: "No es necesariamente el más alto, pero sí uno de los que se encuentran en una cuenca de mayor altitud entre los accesibles a pie desde la ciudad. Eso explica las condiciones más extremas respecto a otros glaciares de la región.",
    },
  ],
}

export default function Page() {
  return <LugarLanding data={data} />
}
