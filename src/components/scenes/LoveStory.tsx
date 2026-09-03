"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  couple,
  heroContent,
  letterContent,
  loveStory,
  parentsBlessing,
} from "@/lib/content";
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
function FloralPhotoCard({ label, image }: { label: string; image: string }) {
  return (
    <div className="relative w-full">
      <div className="photo-fade relative aspect-3/4 w-full overflow-hidden rounded-lg">
        <Image src={image} alt={label} fill className="object-cover" />
      </div>

      <div
        className="photo-fade pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[80px] sm:-translate-y-[150px] md:-translate-y-[150px] lg:-translate-y-[300px]"
        style={{
          width: "calc(100% + 3rem)",
          // Ancho a todo el ancho de pantalla (como al principio). El alto
          // se recorta aparte (ver aspectRatio abajo): las flores del archivo
          // están concentradas en la mitad inferior, así que object-position
          // "bottom" muestra ese ramo y recorta el espacio vacío de arriba,
          // reduciendo el alto total sin achicar las flores en sí. photo-fade
          // difumina ese recorte para que no se note como un corte recto.
          aspectRatio: "1774 / 550",
        }}
      >
        <Image
          src="/images/borde_inferior.png"
          alt=""
          fill
          className="object-cover object-bottom"
        />
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
      className="bg-corrugated relative overflow-hidden px-6 pt-24"
    >
      {/* pt-24 en la section: reserva espacio fijo arriba para que el
          reproductor de audio (fixed, top-4, ~44px de alto) nunca tape la
          cita, sin importar cuánto contenido tenga el bloque centrado de abajo. */}
      <div className="mx-auto flex min-h-[88vh] max-w-xl flex-col items-center justify-center gap-1 pb-24 text-center sm:min-h-[85vh] sm:pb-32">
        <p className="font-serif text-2xl italic leading-relaxed text-navy/70 sm:text-3xl">
          &ldquo;{letterContent.verse.text}&rdquo;
        </p>
        <span className="font-sans text-sm uppercase tracking-[0.25em] text-gold sm:text-base">
          {letterContent.verse.reference}
        </span>

        <div className="relative h-100 w-100">
          <Image
            src="/images/logo.png"
            alt={`Monograma de ${couple.fullNames}`}
            fill
            sizes="400px"
            className="object-contain"
            priority
          />
        </div>

        <p className="font-signature text-5xl text-envelope-deep sm:text-6xl">
          ¡Nos casamos!
        </p>
      </div>

      <div className="pb-28 sm:pb-36">
        {/* mt-16: espacio mínimo garantizado antes de la foto, para que las
            flores que suben (translate -35% sobre el borde superior) tengan
            aire y no tapen el texto del bloque anterior en ventanas bajas,
            donde ese bloque casi llena su min-h-[88vh]/[85vh]. */}
        <div className="mb-24 mt-16 sm:mt-20">
          <FloralPhotoCard label={heroContent.photoLabel} image={heroContent.image} />
        </div>

        <div className="mx-auto mb-24 max-w-2xl text-center">
          <p className="font-serif text-2xl italic leading-relaxed text-navy/80 sm:text-3xl">
            {parentsBlessing.blessingLine}
          </p>

          <div className="mx-auto mt-10 flex max-w-lg flex-col justify-center gap-8 sm:flex-row sm:gap-20">
            <p className="font-serif text-xl leading-relaxed text-navy sm:text-2xl">
              {parentsBlessing.groomParents[0]}
              <br />& {parentsBlessing.groomParents[1]}
            </p>
            <p className="font-serif text-xl leading-relaxed text-navy sm:text-2xl">
              {parentsBlessing.brideParents[0]} &
              <br />
              {parentsBlessing.brideParents[1]}
            </p>
          </div>

          <p className="mt-10 font-serif text-2xl italic leading-relaxed text-navy/80 sm:text-3xl">
            {parentsBlessing.invitationLine}
          </p>

          <div className="mx-auto mt-6 w-full max-w-md sm:max-w-2xl">
            <Image
              src="/images/marcosymaira.png"
              alt={couple.fullNames}
              width={2203}
              height={714}
              className="h-auto w-full"
            />
          </div>
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
                  <div className="photo-fade relative aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={milestone.image}
                      alt={milestone.photoLabel}
                      fill
                      className="object-cover"
                    />
                  </div>
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
