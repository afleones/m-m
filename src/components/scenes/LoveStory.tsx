"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhotoFrame from "@/components/ui/PhotoFrame";
import { loveStory } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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
      className="section-card-shadow bg-corrugated relative overflow-hidden px-6 py-28 sm:py-36"
    >
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
              className={`flex flex-col items-center gap-8 sm:gap-12 ${
                reversed ? "sm:flex-row-reverse" : "sm:flex-row"
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
    </section>
  );
}
