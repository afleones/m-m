import type { Metadata } from "next";
import IntroGate from "@/components/scenes/IntroGate";
import LoveStory from "@/components/scenes/LoveStory";
import Countdown from "@/components/scenes/Countdown";
import Ceremony from "@/components/scenes/Ceremony";
import Reception from "@/components/scenes/Reception";
import DressCode from "@/components/scenes/DressCode";
import Gifts from "@/components/scenes/Gifts";
import RSVP from "@/components/scenes/RSVP";
import FinalMessage from "@/components/scenes/FinalMessage";
import AudioController from "@/components/ui/AudioController";

const baseDescription =
  "Una invitación digital de boda para Marcos & Maira. Vive con nosotros esta historia de amor.";

// Invitación personalizada: con ?invitados=Nombre en la URL, la descripción
// (usada por buscadores y por la vista previa que arma WhatsApp/redes al
// compartir el link) saluda a ese invitado en vez del texto genérico.
export async function generateMetadata({
  searchParams,
}: PageProps<"/">): Promise<Metadata> {
  const params = await searchParams;
  const guestNameParam = params.invitados;
  const guestName = (
    Array.isArray(guestNameParam) ? guestNameParam[0] : guestNameParam
  )?.trim();

  if (!guestName) {
    return { description: baseDescription };
  }

  const description = `Estimado(a)(s) ${guestName}\n\nCon inmensa alegría y emoción, tenemos el honor de invitarte a celebrar uno de los días más importantes de nuestras vidas. Nos encantaría contar con tu presencia como testigo de nuestros votos y compartir juntos este momento tan especial.\n\nTu compañía hará que esta celebración sea aún más significativa para nosotros.\n\nMarcos & Maira`;

  return {
    description,
    openGraph: { description },
    twitter: { description },
  };
}

export default function Home() {
  return (
    <>
      <IntroGate />
      <main>
        <LoveStory />
        <Countdown />
        <Ceremony />
        <Reception />
        <DressCode />
        <Gifts />
        <RSVP />
        <FinalMessage />
      </main>
      <AudioController />
    </>
  );
}
