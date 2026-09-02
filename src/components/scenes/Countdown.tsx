"use client";

import { AnimatePresence, motion } from "framer-motion";
import GoldParticles from "@/components/ui/GoldParticles";
import SectionReveal from "@/components/ui/SectionReveal";
import { WEDDING_DATE_ISO } from "@/lib/content";
import { useCountdown } from "@/lib/useCountdown";

const UNITS: Array<{ key: "days" | "hours" | "minutes" | "seconds"; label: string }> = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
];

function DigitFlip({ value }: { value: number }) {
  const display = value.toString().padStart(2, "0");
  return (
    <span className="relative inline-flex h-[1em] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={display}
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-60%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Countdown() {
  const countdown = useCountdown(WEDDING_DATE_ISO);

  return (
    <section
      id="cuenta-regresiva"
      className="section-card-shadow bg-corrugated relative overflow-hidden px-6 py-28 text-center sm:py-36"
    >
      <GoldParticles density={35} color="#5f85bf" />

      <SectionReveal className="relative mx-auto max-w-3xl">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-navy/60">
          {countdown.isPast ? "Hoy celebramos" : "Faltan"}
        </p>
        <h2 className="mt-4 font-serif text-3xl italic text-navy sm:text-4xl">
          Cada segundo nos acerca al sí
        </h2>

        <div
          aria-live="polite"
          className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-10"
        >
          {UNITS.map((unit) => (
            <div key={unit.key} className="flex flex-col items-center gap-2">
              <div className="font-serif text-5xl tabular-nums text-envelope-deep sm:text-6xl">
                <DigitFlip value={countdown[unit.key]} />
              </div>
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-navy/50">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
