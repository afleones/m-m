"use client";

import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import { dressCodeImage } from "@/lib/content";

export default function DressCode() {
  return (
    <section
      id="vestimenta"
      className="bg-corrugated relative px-6 py-28 sm:py-36"
    >
      <SectionReveal className="mx-auto w-full max-w-sm sm:max-w-md" as="div">
        <Image
          src="/images/codigo_vestimenta.png"
          alt="Código de vestimenta: será blanco tanto para hombres como para mujeres. Mujeres: vestido largo y hermoso, como siempre. Hombres: traje elegante, camisa de manga larga, muy guapo."
          width={1024}
          height={1536}
          className="h-auto w-full"
        />
      </SectionReveal>

      <SectionReveal className="mx-auto mt-12 w-full max-w-sm sm:max-w-md" as="div">
        <Image
          src={dressCodeImage}
          alt="Pareja vestida de blanco, acorde al código de vestimenta"
          width={1600}
          height={2405}
          className="photo-fade h-auto w-full rounded-lg"
        />
      </SectionReveal>
    </section>
  );
}
