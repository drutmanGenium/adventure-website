import type { Metadata } from "next"
import { LugarLanding, type LugarData } from "@/components/lugar-landing"

export const metadata: Metadata = {
  title: "Cerro Guanaco en Tierra del Fuego | Parque Nacional Ushuaia",
  description:
    "El Cerro Guanaco es una cumbre en el Parque Nacional Tierra del Fuego con vistas panorámicas al Canal Beagle. Conocé su ubicación, características y por qué es referencia del paisaje fueguino.",
  alternates: { canonical: "/lugares/cerro-guanaco" },
  openGraph: {
    title: "Cerro Guanaco en Tierra del Fuego | Parque Nacional Ushuaia",
    description:
      "El Cerro Guanaco es una cumbre en el Parque Nacional Tierra del Fuego con vistas panorámicas al Canal Beagle. Conocé su ubicación, características y por qué es referencia del paisaje fueguino.",
    url: "/lugares/cerro-guanaco",
    images: [
      {
        url: "/ushuaia-martial-glacier-mountain-view.jpg",
        alt: "Cerro Guanaco en Tierra del Fuego con vista al Canal Beagle",
      },
    ],
  },
}

const data: LugarData = {
  slug: "cerro-guanaco",
  calendarSlug: "cerro-guanaco",
  metaTitle: "Cerro Guanaco en Tierra del Fuego | Parque Nacional Ushuaia",
  metaDescription:
    "El Cerro Guanaco es una cumbre en el Parque Nacional Tierra del Fuego con vistas panorámicas al Canal Beagle. Conocé su ubicación, características y por qué es referencia del paisaje fueguino.",

  title: "Cerro Guanaco – Trekking en Ushuaia",
  heroSubtitle: "Vista panorámica del Canal Beagle desde 970 metros dentro del Parque Nacional.",
  heroIntro:
    "El Cerro Guanaco es una cumbre de los Andes Fueguinos ubicada dentro del Parque Nacional Tierra del Fuego. Con 970 metros de altura, ofrece una de las vistas panorámicas más amplias del Canal Beagle, los bosques fueguinos y las islas del extremo sur de Argentina desde un punto accesible a pie.",
  heroImage: "/ushuaia-martial-glacier-mountain-view.jpg",
  heroImageAlt: "Cerro Guanaco en Tierra del Fuego con vista al Canal Beagle",

  geo: { latitude: -54.8312, longitude: -68.5231 },

  ubicacion: (
    <>
      <p>
        El Cerro Guanaco se encuentra dentro del Parque Nacional Tierra del Fuego, al oeste de Ushuaia. El acceso al sendero de ascenso parte desde el sector Lago Roca del parque, aproximadamente a 22 km de la ciudad por la Ruta Nacional 3. La entrada al parque nacional requiere el pago de la tarifa de acceso establecida por la Administración de Parques Nacionales.
      </p>
      <p>
        La cumbre se ubica en la divisoria de aguas entre la cuenca del Canal Beagle y las cuencas interiores del parque. Desde arriba, la perspectiva abarca el lago Roca, el Canal Beagle, las islas chilenas del archipiélago del Cabo de Hornos y las cadenas montañosas que se extienden hacia el oeste.
      </p>
    </>
  ),

  caracteristicas: (
    <ul className="space-y-3">
      {[
        { label: "Altitud", text: "970 metros sobre el nivel del mar. La cumbre es una de las más accesibles a pie dentro del Parque Nacional Tierra del Fuego." },
        { label: "Ecosistema", text: "Transición desde el bosque subantártico de lenga en las cotas bajas hasta la vegetación de altura y la roca expuesta cerca de la cumbre. El límite superior del bosque (treeline) es visible durante el ascenso." },
        { label: "Origen geológico", text: "Parte de la cordillera de los Andes Fueguinos, con rocas de origen sedimentario y metamórfico deformadas durante la orogenia andina del Cretácico y el Cenozoico." },
        { label: "Tipo de paisaje", text: "Cumbre de montaña subantártica con bosque en la base, zona de transición arbustiva y roca expuesta en la cresta. Panorámica de 360° desde la cumbre sobre el Canal Beagle y los Andes Fueguinos." },
        { label: "Contexto climático", text: "El viento en la cumbre puede ser muy intenso. Las condiciones cambian con rapidez y la neblina puede reducir la visibilidad. La nieve es posible en cualquier mes del año en las cotas superiores." },
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
        El Cerro Guanaco forma parte del Parque Nacional Tierra del Fuego, la única área protegida de Argentina con costas en el Canal Beagle. Su cumbre es uno de los puntos más elevados accesibles a pie dentro del parque y ofrece una perspectiva única sobre la geografía del extremo sur del continente.
      </p>
      <p>
        Desde el punto de vista ecológico, el cerro es parte del corredor boscoso que conecta el parque nacional con las áreas protegidas de Chile al oeste. La continuidad del bosque de lenga en esta zona es fundamental para la biodiversidad de la región.
      </p>
      <p>
        La visibilidad desde la cumbre del Cerro Guanaco hacia el Canal Beagle y las islas del sur lo convierte en un punto de referencia geográfica de primer orden para comprender la dimensión real del archipiélago fueguino. La escala de lo que se ve desde arriba modifica la percepción del territorio que se tiene desde la ciudad.
      </p>
    </>
  ),

  popularidad: (
    <>
      <p>
        El Cerro Guanaco es uno de los destinos de mayor interés para quienes visitan el Parque Nacional Tierra del Fuego y buscan una experiencia más activa que las caminatas de fondo de lago. La posibilidad de alcanzar una cumbre real, dentro de un parque nacional, en una jornada de un día, lo posiciona como referencia entre los trekkings de Ushuaia.
      </p>
      <p>
        Las vistas desde la cumbre son las más amplias que se pueden obtener en trekking de un día en la región. El Canal Beagle, las islas chilenas, el lago Roca y los bosques del parque forman un panorama que concentra lo más característico del paisaje de Tierra del Fuego.
      </p>
      <p>
        La dificultad moderada a avanzada del ascenso, combinada con el marco del parque nacional, lo convierte en un destino adecuado para viajeros con experiencia básica en trekking que quieren una experiencia de mayor exigencia que las rutas de llano.
      </p>
    </>
  ),

  galleryImages: Array.from({ length: 8 }, (_, i) => ({
    src: `/images/lugares/cerro-guanaco/${i + 1}.jpg`,
    alt: `Cerro Guanaco en Tierra del Fuego con vista al Canal Beagle - foto ${i + 1}`,
  })),

  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345!2d-68.5231!3d-54.8312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDQ5JzUyLjMiUyA2OMKwMzEnMjMuMiJX!5e0!3m2!1ses!2sar!4v1234567890",

  faqs: [
    {
      q: "¿Hay que pagar entrada para subir al Cerro Guanaco?",
      a: "Sí. El Cerro Guanaco está dentro del Parque Nacional Tierra del Fuego y el acceso requiere el pago de la tarifa de ingreso al parque, que administra la Administración de Parques Nacionales de Argentina.",
    },
    {
      q: "¿Qué se ve desde la cumbre?",
      a: "Desde la cumbre del Cerro Guanaco se obtiene una vista panorámica del Canal Beagle, el lago Roca, las islas del archipiélago al sur, los bosques del parque nacional y las cadenas montañosas que se extienden hacia Chile y hacia el interior de la isla.",
    },
    {
      q: "¿Se puede subir todo el año?",
      a: "El sendero está disponible durante la mayor parte del año, aunque en invierno las condiciones de nieve y hielo requieren mayor preparación. La temporada de mayor accesibilidad es el verano austral, entre noviembre y marzo.",
    },
  ],
}

export default function Page() {
  return <LugarLanding data={data} />
}
