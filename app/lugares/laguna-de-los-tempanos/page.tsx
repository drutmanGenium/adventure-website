import type { Metadata } from "next"
import { LugarLanding, type LugarData } from "@/components/lugar-landing"

export const metadata: Metadata = {
  title: "Laguna de los Témpanos en Tierra del Fuego | Ushuaia",
  description:
    "La Laguna de los Témpanos es una laguna proglacial en los Andes Fueguinos, al pie del Glaciar Vinciguerra en Ushuaia. Conocé su origen, características y relevancia en la región.",
  alternates: { canonical: "/lugares/laguna-de-los-tempanos" },
  openGraph: {
    title: "Laguna de los Témpanos en Tierra del Fuego | Ushuaia",
    description:
      "La Laguna de los Témpanos es una laguna proglacial en los Andes Fueguinos, al pie del Glaciar Vinciguerra en Ushuaia. Conocé su origen, características y relevancia en la región.",
    url: "/lugares/laguna-de-los-tempanos",
    images: [
      {
        url: "/vinciguerra-glacier-ushuaia-iceberg-lagoon.jpg",
        alt: "Laguna de los Témpanos en Tierra del Fuego con icebergs flotantes",
      },
    ],
  },
}

const data: LugarData = {
  slug: "laguna-de-los-tempanos",
  calendarSlug: "vinciguerra",
  metaTitle: "Laguna de los Témpanos en Tierra del Fuego | Ushuaia",
  metaDescription:
    "La Laguna de los Témpanos es una laguna proglacial en los Andes Fueguinos, al pie del Glaciar Vinciguerra en Ushuaia. Conocé su origen, características y relevancia en la región.",

  title: "Laguna de los Témpanos – Trekking en Ushuaia",
  heroSubtitle: "Una laguna proglacial con icebergs flotantes al pie del Glaciar Vinciguerra.",
  heroIntro:
    "La Laguna de los Témpanos es una laguna proglacial ubicada al pie del Glaciar Vinciguerra, en los Andes Fueguinos al norte de Ushuaia. Su nombre proviene de los fragmentos de hielo que se desprenden del frente glaciar y flotan en su superficie, generando uno de los paisajes más singulares de Tierra del Fuego.",
  heroImage: "/vinciguerra-glacier-ushuaia-iceberg-lagoon.jpg",
  heroImageAlt: "Laguna de los Témpanos en Tierra del Fuego con icebergs flotantes",

  geo: { latitude: -54.7512, longitude: -68.2978 },

  ubicacion: (
    <>
      <p>
        La Laguna de los Témpanos se encuentra en la Cordillera de los Andes Fueguinos, a unos 14 km de Ushuaia en línea recta. Está ubicada a una altitud de aproximadamente 700 metros sobre el nivel del mar, inmediatamente por debajo del frente del Glaciar Vinciguerra. El acceso se realiza por el mismo sendero que lleva al glaciar, partiendo desde el barrio Glaciar de Ushuaia.
      </p>
      <p>
        La laguna ocupa una cubeta natural formada por la erosión glaciar, en la base del circo que alberga el Glaciar Vinciguerra. Tiene una extensión reducida pero visualmente impactante por la presencia del glaciar como telón de fondo directo.
      </p>
    </>
  ),

  caracteristicas: (
    <ul className="space-y-3">
      {[
        { label: "Tipo de laguna", text: "Laguna proglacial: un cuerpo de agua formado directamente frente al frente de un glaciar activo, alimentado por el deshielo y por los fragmentos de hielo que caen al agua." },
        { label: "Témpanos", text: "Los fragmentos de hielo que flotan en la laguna son desprendimientos del frente del Glaciar Vinciguerra. Su tamaño varía desde bloques pequeños hasta piezas de varios metros cúbicos, según la actividad glaciar de cada temporada." },
        { label: "Color del agua", text: "Azul grisáceo a turquesa, determinado por la harina glaciar en suspensión y por la reflexión de la luz en el hielo del glaciar circundante." },
        { label: "Temperatura del agua", text: "Próxima al punto de fusión del hielo durante todo el año. El agua de fusión glaciar mantiene temperaturas muy bajas independientemente de la estación." },
        { label: "Contexto climático", text: "La laguna se encuentra en zona de alta montaña subantártica. Vientos constantes y temperatura baja son condiciones habituales en el entorno de la laguna." },
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
        La Laguna de los Témpanos es un indicador directo del estado del Glaciar Vinciguerra. La extensión y cantidad de témpanos presentes en la laguna varía en función del ritmo de deshielo y retroceso del frente glaciar. En ese sentido, la laguna actúa como termómetro visual del cambio que está experimentando el glaciar.
      </p>
      <p>
        Desde el punto de vista hídrico, la laguna es parte del sistema de drenaje de alta montaña que aporta agua dulce a los cursos de agua que abastecen a Ushuaia. El volumen de agua que almacena y libera está directamente vinculado al comportamiento del glaciar sobre ella.
      </p>
      <p>
        La presencia de témpanos en una laguna de montaña accesible a pie es una característica muy poco común en el mundo. Eso le otorga a la Laguna de los Témpanos una singularidad geográfica que trasciende el ámbito local y la sitúa como un fenómeno natural de escala global.
      </p>
    </>
  ),

  popularidad: (
    <>
      <p>
        La Laguna de los Témpanos atrae visitantes por la posibilidad de ver icebergs a pocos metros, en el contexto de una jornada de trekking de montaña. La escala del fenómeno —bloques de hielo real flotando frente al glaciar del que se desprendieron— tiene un impacto visual difícil de describir y que pocas personas esperan encontrar en una excursión de un día desde una ciudad.
      </p>
      <p>
        La laguna es el punto final del trekking al Glaciar Vinciguerra y funciona como el destino concreto hacia el que se orienta la jornada. Su visibilidad depende de las condiciones del día y de la temporada: en verano la presencia de témpanos es más abundante; en invierno la laguna puede estar parcialmente congelada.
      </p>
      <p>
        Para los visitantes que buscan documentar su experiencia en Tierra del Fuego fotográficamente, la combinación de glaciar, agua azul y témpanos flotantes ofrece imágenes difícilmente reproducibles en otros destinos del continente.
      </p>
    </>
  ),

  galleryImages: Array.from({ length: 8 }, (_, i) => ({
    src: `/images/lugares/laguna-de-los-tempanos/${i + 1}.jpg`,
    alt: `Laguna de los Témpanos en Tierra del Fuego con icebergs - foto ${i + 1}`,
  })),

  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345!2d-68.2978!3d-54.7512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDQ1JzA0LjMiUyA2OMKwMTcnNTIuMSJX!5e0!3m2!1ses!2sar!4v1234567890",

  faqs: [
    {
      q: "¿Se pueden ver témpanos todo el año?",
      a: "La presencia de témpanos varía según la temporada y el ritmo de deshielo del glaciar. En verano austral (noviembre a marzo) la actividad del frente glaciar es mayor y los desprendimientos son más frecuentes. En invierno la laguna puede estar parcialmente congelada.",
    },
    {
      q: "¿La Laguna de los Témpanos es el mismo lugar que el Glaciar Vinciguerra?",
      a: "Son dos elementos distintos del mismo sistema. El Glaciar Vinciguerra es la masa de hielo; la Laguna de los Témpanos es el cuerpo de agua que se forma frente al glaciar. Se visitan en el mismo recorrido, siendo la laguna el punto al que se llega caminando y el glaciar lo que se observa desde su orilla.",
    },
    {
      q: "¿Se puede tocar el hielo?",
      a: "Los témpanos flotan en el agua y no están directamente accesibles desde la orilla en condiciones normales. El acceso al frente del glaciar depende de las condiciones del terreno y es el guía quien determina hasta dónde es seguro avanzar.",
    },
  ],
}

export default function Page() {
  return <LugarLanding data={data} />
}
