"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AudioProvider from "@/components/ui/AudioProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: prefersReduced ? 0.1 : 1.2,
      smoothWheel: !prefersReduced,
      touchMultiplier: 1.2,
    });
    // Lenis solo puede construirse en el cliente, y se guarda en estado (no
    // en un ref) a propósito: los efectos de los hijos (p. ej. IntroGate)
    // corren antes que el de este padre, así que necesitan re-renderizar
    // cuando useLenis() pasa de null a la instancia real.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      <AudioProvider>{children}</AudioProvider>
    </LenisContext.Provider>
  );
}
