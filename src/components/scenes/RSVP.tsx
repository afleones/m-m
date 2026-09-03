"use client";

import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import { fiances, rsvp } from "@/lib/content";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const actionImages: Record<string, string> = {
  novia: "/images/con_la_novia.png",
  novio: "/images/con_el_novio.png",
};

export default function RSVP() {
  return (
    <section
      id="confirmacion"
      className="bg-corrugated relative px-6 py-16 sm:py-20"
    >
      <SectionReveal className="mx-auto max-w-2xl text-center" as="div">
        <Image
          src="/images/confirmacion_asistencia.png"
          alt="Confirmación de Asistencia"
          width={2017}
          height={780}
          className="mx-auto h-auto w-full"
        />
        <p className="-mt-2 font-serif text-lg text-navy sm:text-xl">
          Hasta el {rsvp.deadline}
        </p>
      </SectionReveal>

      <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-4 sm:max-w-xl sm:gap-8">
        {fiances.map((fiance) => (
          <a
            key={fiance.role}
            href={buildWhatsAppLink(fiance.phone, fiance.message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Confirmar con ${fiance.role === "novia" ? "la novia" : "el novio"}`}
            className="transition-transform hover:scale-105 active:scale-95"
          >
            <Image
              src={actionImages[fiance.role]}
              alt={`Con ${fiance.role === "novia" ? "la Novia" : "el Novio"}`}
              width={1536}
              height={1024}
              className="h-auto w-full"
            />
          </a>
        ))}
      </div>

      <p className="mt-8 text-center font-signature text-5xl text-envelope-deep sm:text-6xl">
        {rsvp.closing}
      </p>
    </section>
  );
}
