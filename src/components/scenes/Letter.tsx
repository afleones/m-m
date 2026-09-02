"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { letterContent } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useAudio } from "@/components/ui/AudioProvider";

interface LetterProps {
  onFinish: () => void;
}

const AUTO_ADVANCE_DELAY_MS = 5000;

function splitWords(text: string) {
  return text.split(" ");
}

export default function Letter({ onFinish }: LetterProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [hasEmerged, setHasEmerged] = useState(false);
  const [readyToContinue, setReadyToContinue] = useState(false);
  const prefersReduced = useReducedMotion();
  const { startMainTheme } = useAudio();

  const lines = useMemo(() => letterContent.lines.map(splitWords), []);

  // La hoja termina de "acercarse" y llenar la pantalla: aquí arranca la
  // música principal, sincronizada con el clímax visual de la apertura.
  const handleEmerged = useCallback(() => {
    setHasEmerged(true);
    startMainTheme();
  }, [startMainTheme]);

  useGSAP(
    () => {
      if (!hasEmerged) return;

      const verse = rootRef.current?.querySelector<HTMLElement>(
        "[data-letter-verse]"
      );
      const words = rootRef.current?.querySelectorAll<HTMLElement>(
        "[data-letter-word]"
      );
      const signature = rootRef.current?.querySelector<HTMLElement>(
        "[data-letter-signature]"
      );
      if (!verse || !words || !signature) return;

      if (prefersReduced) {
        gsap.set(verse, { opacity: 1, y: 0 });
        gsap.set(words, { opacity: 1, y: 0 });
        gsap.set(signature, { opacity: 1, y: 0 });
        setReadyToContinue(true);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => setReadyToContinue(true),
      });

      tl.fromTo(
        verse,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
        .fromTo(
          words,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.045,
          },
          "+=0.6"
        )
        .fromTo(
          signature,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "+=0.3"
        );
    },
    { scope: rootRef, dependencies: [hasEmerged, prefersReduced] }
  );

  // Sin botón "Continuar": una vez que termina de leerse la carta, la
  // experiencia avanza sola tras una pausa breve.
  useEffect(() => {
    if (!readyToContinue) return;
    const timeout = setTimeout(onFinish, AUTO_ADVANCE_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [readyToContinue, onFinish]);

  return (
    <motion.div
      ref={rootRef}
      initial={
        prefersReduced
          ? { scale: 1, opacity: 1 }
          : { scale: 0.2, opacity: 0.4 }
      }
      animate={{ scale: 1, opacity: 1 }}
      transition={
        prefersReduced
          ? { duration: 0.2 }
          : { duration: 1, ease: [0.16, 1, 0.3, 1] }
      }
      onAnimationComplete={handleEmerged}
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-ivory px-6 py-16 shadow-2xl"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-10 text-center">
        <div
          data-letter-verse
          className="flex flex-col items-center gap-2 opacity-0"
        >
          <p className="font-serif text-lg italic leading-relaxed text-navy/70 sm:text-xl">
            &ldquo;{letterContent.verse.text}&rdquo;
          </p>
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">
            {letterContent.verse.reference}
          </span>
        </div>

        <div className="space-y-6 font-serif text-2xl leading-relaxed text-navy sm:text-3xl">
          {lines.map((words, lineIndex) => (
            <p key={lineIndex} className="italic">
              {words.map((word, wordIndex) => (
                <Fragment key={`${lineIndex}-${wordIndex}`}>
                  <span
                    data-letter-word
                    className="inline-block opacity-0 will-change-transform"
                  >
                    {word}
                  </span>
                  {wordIndex < words.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </p>
          ))}
        </div>

        <span
          data-letter-signature
          className="inline-block font-signature text-4xl text-gold opacity-0 sm:text-5xl"
        >
          {letterContent.signature}
        </span>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: readyToContinue ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4 flex flex-col items-center gap-3"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-navy/40">
            Continuamos...
          </span>
          <div className="h-px w-24 overflow-hidden bg-navy/10">
            <motion.div
              className="h-full bg-gold"
              initial={{ scaleX: 0 }}
              animate={readyToContinue ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                duration: AUTO_ADVANCE_DELAY_MS / 1000,
                ease: "linear",
              }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
