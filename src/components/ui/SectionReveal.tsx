"use client";

import { useRef, type ReactNode, type Ref } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  y?: number;
  duration?: number;
  delay?: number;
}

/**
 * Envoltorio reutilizable: revela su contenido con un fade + translate suave
 * cuando entra al viewport, usando GSAP ScrollTrigger. Elección deliberada de
 * mantener la coreografía de escena en GSAP, dejando Framer Motion para
 * interacciones puntuales de componentes (ver README, "Estrategia de
 * animación").
 */
export default function SectionReveal({
  children,
  className = "",
  as = "section",
  y = 48,
  duration = 1.1,
  delay = 0,
}: SectionRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;

      if (prefersReduced) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ref.current,
        { opacity: 0, y, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: ref, dependencies: [prefersReduced] }
  );

  const Tag = as;

  return (
    <Tag ref={ref as Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
