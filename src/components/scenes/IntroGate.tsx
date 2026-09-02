"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "@/components/scenes/Envelope";
import Letter from "@/components/scenes/Letter";
import { useLenis } from "@/components/ui/SmoothScrollProvider";

type Stage = "envelope" | "letter" | "done";

/**
 * Orquesta la secuencia inicial (Escenas 1-2): bloquea el scroll de la
 * página hasta que el usuario abre el sobre y termina de leer la carta.
 * A partir de ahí, el resto de la experiencia (Escenas 3-12) se recorre
 * con scroll normal.
 */
export default function IntroGate() {
  const [stage, setStage] = useState<Stage>("envelope");
  const lenis = useLenis();

  useEffect(() => {
    document.documentElement.style.overflow =
      stage === "done" ? "" : "hidden";
    document.body.style.overflow = stage === "done" ? "" : "hidden";

    if (stage === "done") {
      lenis?.start();
    } else {
      lenis?.stop();
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [stage, lenis]);

  useEffect(() => {
    if (stage !== "done" || !lenis) return;

    // Recorrido automático tipo "carrusel vertical": a un ritmo pensado para
    // leer, no para saltar de sección en sección, y sin que el usuario pueda
    // interrumpirlo a medio camino (`lock`). Empieza justo donde queda el
    // scroll al desbloquearse (arriba del todo, en "Nuestra historia") y, al
    // terminar de recorrer toda la página, vuelve a subir hasta la sección
    // de confirmación de asistencia para dejar al usuario justo donde puede
    // actuar.
    let cancelled = false;

    const frame = requestAnimationFrame(() => {
      if (cancelled) return;

      const targetY =
        document.documentElement.scrollHeight - window.innerHeight;
      const pxPerSecond = 90;
      const duration = Math.min(90, Math.max(25, targetY / pxPerSecond));

      lenis.scrollTo(targetY, {
        duration,
        easing: (t: number) => t,
        lock: true,
        onComplete: () => {
          if (cancelled) return;
          const rsvp = document.getElementById("confirmacion");
          if (!rsvp) return;
          lenis.scrollTo(rsvp, {
            duration: 2.5,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            lock: true,
          });
        },
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [stage, lenis]);

  return (
    // Sin `mode="wait"`: la escena saliente y la entrante se superponen para
    // producir un crossfade real en vez de un corte seco entre etapas. Pero
    // como ambas quedan semitransparentes a la vez durante ese cruce, hace
    // falta un fondo opaco propio detrás de las tres etapas (por encima del
    // contenido scrolleable, que siempre está montado debajo) para que no se
    // alcance a ver la página durante la transición; solo se desvanece junto
    // con la Carta al llegar a "done".
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key="intro-backdrop"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-corrugated fixed inset-0 z-[70]"
        />
      )}
      {stage === "envelope" && (
        <motion.div key="envelope" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <Envelope onOpen={() => setStage("letter")} />
        </motion.div>
      )}
      {stage === "letter" && (
        <motion.div
          key="letter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Letter onFinish={() => setStage("done")} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
