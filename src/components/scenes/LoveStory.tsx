"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhotoFrame from "@/components/ui/PhotoFrame";
import { couple, heroContent, letterContent, loveStory } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Foto principal enmarcada con las tres ilustraciones florales reales
// (public/images/borde_*.png), cada una en su tamaño/proporción real (ver
// `width`/`height`, deben coincidir con las dimensiones reales del archivo
// o Next.js distorsiona la imagen al forzar la proporción declarada). La
// superior es más ANCHA que la propia foto (llega hasta el borde real de la
// pantalla, compensando exactamente el px-6 de la sección) y sube por
// encima de su borde: no queda alineada ni recortada al ancho de la tarjeta,
// sino que "flota" por encima, más grande que el marco, como una guirnalda
// que lo desborda. Izquierda y derecha (volteadas verticalmente) caen sobre
// las esquinas inferiores.
function FloralPhotoCard({ label }: { label: string }) {
  return (
    <div className="relative w-full">
      <PhotoFrame label={label} aspect="portrait" rounded="none" className="w-full" />

      <div
        className="pointer-events-none absolute left-1/2 top-0 z-10 overflow-hidden"
        style={{
          width: "calc(100% + 3rem)",
          // Desplazamiento en px fijos (no %) a propósito: la imagen es muy
          // ancha (aspect 2:1) y en pantallas anchas un % de translateY se
          // vuelve enorme (cientos de px) y termina tapando el texto de la
          // sección anterior. Con px fijos el "asomo" de hojas es el mismo
          // en cualquier ancho, y queda dentro del hueco que reserva mt-16.
          transform: "translate(-50%, -500px)",
        }}
      >
        {/* borde_inferior.png tiene flores tocando los 4 bordes de su propio
            lienzo (sin margen transparente): se renderiza más ancha que este
            contenedor y centrada, para que ese borde "cortado" del archivo
            caiga fuera del área visible y aquí solo se vean flores completas. */}
        <div style={{ width: "130%", marginLeft: "-15%" }}>
          <Image
            src="/images/borde_inferior.png"
            alt=""
            width={1774}
            height={887}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-[42%] max-w-[280px] -translate-x-[10%] translate-y-[6%] -scale-y-100 sm:w-[30%]">
        <Image
          src="/images/borde_izquierdo_fotos.png"
          alt=""
          width={1230}
          height={1278}
          className="h-auto w-full"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 z-10 w-[38%] max-w-[260px] translate-x-[10%] translate-y-[6%] -scale-y-100 sm:w-[26%]">
        <Image
          src="/images/borde_derecho_fotos.png"
          alt=""
          width={1122}
          height={1402}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

export default function LoveStory() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  useGSAP(
    () => {
      if (!rootRef.current || prefersReduced) return;

      const cards = rootRef.current.querySelectorAll<HTMLElement>(
        "[data-postcard]"
      );

      cards.forEach((card) => {
        const photo = card.querySelector<HTMLElement>("[data-postcard-photo]");
        const copy = card.querySelector<HTMLElement>("[data-postcard-copy]");
        if (!photo || !copy) return;

        gsap.fromTo(
          photo,
          { y: 60, rotate: -3, opacity: 0 },
          {
            y: -30,
            rotate: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "bottom 20%",
              scrub: 0.6,
            },
          }
        );

        gsap.fromTo(
          copy,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: rootRef, dependencies: [prefersReduced] }
  );

  return (
    <section
      ref={rootRef}
      id="historia"
      className="bg-corrugated relative overflow-hidden px-6"
    >
      <div className="mx-auto flex min-h-[88vh] max-w-xl flex-col items-center justify-center gap-3 text-center sm:min-h-[85vh]">
        <p className="font-serif text-2xl italic leading-relaxed text-navy/70 sm:text-3xl">
          &ldquo;{letterContent.verse.text}&rdquo;
        </p>
        <span className="font-sans text-sm uppercase tracking-[0.25em] text-gold sm:text-base">
          {letterContent.verse.reference}
        </span>

        <div className="relative my-2 h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80">
          <Image
            src="/images/logo.png"
            alt={`Monograma de ${couple.fullNames}`}
            fill
            sizes="(min-width: 768px) 320px, (min-width: 640px) 288px, 224px"
            className="object-contain"
            priority
          />
        </div>

        <p className="mt-2 font-signature text-5xl text-envelope-deep sm:text-6xl">
          ¡Nos casamos!
        </p>
      </div>

      <div className="pb-28 sm:pb-36">
        {/* mt-16: espacio mínimo garantizado antes de la foto, para que las
            flores que suben (translate -35% sobre el borde superior) tengan
            aire y no tapen el texto del bloque anterior en ventanas bajas,
            donde ese bloque casi llena su min-h-[88vh]/[85vh]. */}
        <div className="mb-24 mt-16 sm:mt-20">
          <FloralPhotoCard label={heroContent.photoLabel} />
        </div>

        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-navy/60">
            Nuestra historia
          </p>
          <h2 className="mt-4 font-serif text-4xl italic text-navy sm:text-5xl">
            Un capítulo escrito a dos voces
          </h2>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col gap-24 sm:gap-32">
          {loveStory.map((milestone, index) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={milestone.id}
                data-postcard
                className={`flex flex-col items-center gap-8 sm:gap-12 ${reversed ? "sm:flex-row-reverse" : "sm:flex-row"
                  }`}
              >
                <div
                  data-postcard-photo
                  className="w-full max-w-xs shrink-0 animate-float-slow"
                >
                  <PhotoFrame label={milestone.photoLabel} aspect="square" />
                </div>
                <div data-postcard-copy className="max-w-md space-y-3 text-center sm:text-left">
                  <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-navy/50">
                    {milestone.date}
                  </span>
                  <h3 className="font-serif text-2xl text-navy sm:text-3xl">
                    {milestone.title}
                  </h3>
                  <p className="font-serif text-base leading-relaxed text-navy/70 sm:text-lg">
                    {milestone.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
