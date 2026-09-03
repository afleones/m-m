"use client";

import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import { gifts } from "@/lib/content";

export default function Gifts() {
  return (
    <section
      id="regalos"
      className="bg-corrugated relative overflow-hidden px-6 py-28 sm:py-36"
    >
      <SectionReveal className="relative z-10 mx-auto max-w-xl text-center" as="div">
        <Image
          src="/images/regalo.png"
          alt={`${gifts.title} · ${gifts.closing}`}
          width={2172}
          height={724}
          className="mx-auto h-auto w-full"
        />
      </SectionReveal>
    </section>
  );
}
