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

export const WEDDING_DATE_ISO = "2026-11-14T20:00:00-05:00";

export const heroContent = {
  eyebrow: "¡Nos casamos!",
  title: "Marcos & Maira",
  dateDisplay: "14 de noviembre de 2026",
  photoLabel: "Fotografía principal de Marcos y Maira",
  // TODO: reemplazar por una foto real de la pareja
  image: "/images/stock/1.jpeg",
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
  groomParents: ["Silvia Sánchez", "Edgardo Escorcia"],
  brideParents: ["Laudeth Sequeda", "Omar Sampayo"],
  invitationLine: "Tenemos el honor de invitarte a celebrar nuestra boda.",
};

// TODO: reemplazar las imágenes de stock por fotos reales de la pareja
export const loveStory: LoveStoryMilestone[] = [
  {
    id: "amor-llega",
    title: "El amor llega",
    date: "",
    text: "El amor no se busca; simplemente llega y lo transforma todo.",
    photoLabel: "Fotografía de Marcos y Maira",
    image: "/images/stock/2.jpeg",
  },
  {
    id: "lugar-favorito",
    title: "Tu lugar favorito",
    date: "",
    text: "Amar es encontrar en la otra persona tu lugar favorito del mundo.",
    photoLabel: "Fotografía de Marcos y Maira",
    image: "/images/stock/3.jpeg",
  },
  {
    id: "amor-verdadero",
    title: "Amor verdadero",
    date: "",
    text: "El amor verdadero no es perfecto; es real, profundo e infinito.",
    photoLabel: "Fotografía de Marcos y Maira",
    image: "/images/stock/4.jpeg",
  },
  {
    id: "promesa-eterna",
    title: "Una promesa eterna",
    date: "",
    text: "Casarse es prometer quedarse, incluso cuando todo cambia.",
    photoLabel: "Fotografía de Marcos y Maira",
    image: "/images/stock/5.jpeg",
  },
  {
    id: "decision-mas-bonita",
    title: "La decisión más bonita",
    date: "",
    text: "El matrimonio es la decisión más bonita que dos personas pueden tomar.",
    photoLabel: "Fotografía de Marcos y Maira",
    image: "/images/stock/6.jpeg",
  },
];

export const ceremony: VenueInfo = {
  name: "Lugar de la Ceremonia",
  address: "Cra 12 #117-23, Barrio El Pueblito",
  date: "14 de noviembre de 2026",
  time: "8:00 p.m.",
  mapsQuery: "Cra 12 #117-23 Barrio El Pueblito",
};


export const gifts = {
  title: "Regalo",
  closing: "Lluvia de Sobres",
};

// TODO: reemplazar por una foto real de la pareja vestida de blanco
export const dressCodeImage = "/images/stock/8.jpeg";

export const rsvp = {
  deadline: "2 de junio de 2027", // TODO: confirmar fecha límite real
  closing: "¡Te esperamos!",
};

export const fiances: FianceInfo[] = [
  {
    name: "Maira",
    role: "novia",
    phone: "573112541680",
    message: "¡Hola! Maira, Gracias por la invitación. Confirmo asistencia a tu Boda.",
  },
  {
    name: "Marcos",
    role: "novio",
    phone: "573043288709",
    message: "¡Hola! Marcos, Gracias por la invitación. Confirmo asistencia a tu Boda.",
  },
];

export const finalMessage = {
  text: "Gracias por acompañarnos en este capítulo de nuestra historia.",
  signature: "Marcos & Maira",
  photoLabel: "La mejor fotografía de la pareja, para el cierre de la experiencia",
  // TODO: reemplazar por una foto real de la pareja
  image: "/images/stock/7.jpeg",
};

// TODO: reemplazar por archivos de audio reales en /public/audio
export const audioAssets = {
  ambient: "/audio/ambient.mp3",
  sealBreak: "/audio/seal-break.mp3",
  mainTheme: "/audio/main-theme.mp3",
};
