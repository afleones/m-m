import type { FianceInfo, LoveStoryMilestone, VenueInfo } from "@/types";

/**
 * Fuente única de contenido para toda la invitación.
 * Todo lo marcado como TODO debe reemplazarse con la información real
 * antes de publicar el sitio.
 */

export const couple = {
  brideFirstName: "Maira",
  groomFirstName: "Marcos",
  monogram: "M & M",
  fullNames: "Marcos & Maira",
};

// TODO: reemplazar con la fecha y hora real de la boda (ISO 8601, zona horaria local del evento)
export const WEDDING_DATE_ISO = "2027-06-12T17:00:00-05:00";

export const heroContent = {
  eyebrow: "¡Nos casamos!",
  title: "Marcos & Maira",
  dateDisplay: "12 de junio de 2027", // TODO: fecha real formateada
  photoLabel: "Fotografía principal de Marcos y Maira",
  // TODO: reemplazar por una foto real de la pareja
  image: "/images/stock/hero-principal.jpg",
};

export const letterContent = {
  verse: {
    text: "El amor todo lo sufre, todo lo cree, todo lo espera, todo lo soporta.",
    reference: "1 Corintios 13:7",
  },
  lines: [
    "Hay historias que comienzan por casualidad...",
    "Y otras que estaban destinadas a encontrarse.",
  ],
  signature: "Marcos & Maira",
};

// TODO: confirmar nombres reales de los padres
export const parentsBlessing = {
  blessingLine: "Con nuestro amor, la bendición de Dios y la de nuestros padres.",
  groomParents: ["Luis Alberto Santodomingo", "Yadira Olivar"],
  brideParents: ["Gustavo Navarro", "Luz Marina Claro"],
  invitationLine: "Tenemos el honor de invitarte a celebrar nuestra boda.",
};

// TODO: reemplazar las imágenes de stock por fotos reales de la pareja
export const loveStory: LoveStoryMilestone[] = [
  {
    id: "primer-encuentro",
    title: "Primer encuentro",
    date: "TODO: fecha", // TODO
    text: "Dos caminos que, sin saberlo, ya se dirigían al mismo lugar.",
    photoLabel: "Fotografía del primer encuentro de Marcos y Maira",
    image: "/images/stock/historia-encuentro.jpg",
  },
  {
    id: "primer-viaje",
    title: "Primer viaje",
    date: "TODO: fecha",
    text: "Descubrimos que el mundo es más bonito cuando se recorre en compañía.",
    photoLabel: "Fotografía del primer viaje juntos",
    image: "/images/stock/historia-viaje.jpg",
  },
  {
    id: "primer-te-amo",
    title: "Primer 'te amo'",
    date: "TODO: fecha",
    text: "Una frase pequeña que cambió el rumbo de nuestra historia.",
    photoLabel: "Fotografía de un momento íntimo de la pareja",
    image: "/images/stock/historia-teamo.jpg",
  },
  {
    id: "propuesta",
    title: "La propuesta",
    date: "TODO: fecha",
    text: "Una pregunta, un sí, y la certeza de que queríamos el resto de la vida juntos.",
    photoLabel: "Fotografía del momento de la propuesta de matrimonio",
    image: "/images/stock/historia-propuesta.jpg",
  },
  {
    id: "boda",
    title: "La boda",
    date: "TODO: fecha",
    text: "Y hoy, celebramos el capítulo que estábamos escribiendo desde el principio.",
    photoLabel: "Fotografía de la pareja vestida para su boda",
    image: "/images/stock/historia-boda.jpg",
  },
];

// TODO: confirmar lugar, dirección, fecha y hora reales de la ceremonia
export const ceremony: VenueInfo = {
  name: "Iglesia Nuestra Señora del Rosario", // TODO
  address: "Calle 10 # 5-20, Ciudad", // TODO
  date: "12 de junio de 2027",
  time: "5:00 p.m.",
  mapsQuery: "Iglesia Nuestra Señora del Rosario, Ciudad", // TODO
};

// TODO: confirmar lugar, dirección, fecha y hora reales de la recepción
export const reception: VenueInfo = {
  name: "Salón de Eventos Villa Real", // TODO
  address: "Km 3 Vía Principal, Ciudad", // TODO
  date: "12 de junio de 2027",
  time: "7:00 p.m.",
  mapsQuery: "Salón de Eventos Villa Real, Ciudad", // TODO
};

export const gifts = {
  title: "Regalo",
  closing: "Lluvia de Sobres",
};

// TODO: reemplazar por una foto real de la pareja vestida de blanco
export const dressCodeImage = "/images/stock/vestimenta-pareja.jpg";

export const rsvp = {
  deadline: "2 de junio de 2027", // TODO: confirmar fecha límite real
  closing: "¡Te esperamos!",
};

// TODO: reemplazar con los números de WhatsApp reales (formato internacional, sin '+', ej: 573001234567)
export const fiances: FianceInfo[] = [
  {
    name: "Maira",
    role: "novia",
    phone: "573000000000", // TODO
    message: "¡Hola! Maira, Gracias por la invitación. Confirmo asistencia a tu Boda.",
  },
  {
    name: "Marcos",
    role: "novio",
    phone: "573000000001", // TODO
    message: "¡Hola! Marcos, Gracias por la invitación. Confirmo asistencia a tu Boda.",
  },
];

export const finalMessage = {
  text: "Gracias por acompañarnos en este capítulo de nuestra historia.",
  signature: "Marcos & Maira",
  photoLabel: "La mejor fotografía de la pareja, para el cierre de la experiencia",
  // TODO: reemplazar por una foto real de la pareja
  image: "/images/stock/final-mensaje.jpg",
};

// TODO: reemplazar por archivos de audio reales en /public/audio
export const audioAssets = {
  ambient: "/audio/ambient.mp3",
  sealBreak: "/audio/seal-break.mp3",
  mainTheme: "/audio/main-theme.mp3",
};
