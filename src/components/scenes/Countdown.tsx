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

const weddingDate = new Date(WEDDING_DATE_ISO);
const monthLabel = weddingDate.toLocaleDateString("es-ES", { month: "long" });
const weekdayLabel = weddingDate.toLocaleDateString("es-ES", {
  weekday: "long",
});
const dayLabel = weddingDate.getDate();
const yearLabel = weddingDate.getFullYear();

export default function Countdown() {
  const countdown = useCountdown(WEDDING_DATE_ISO);

  return (
    <section
      id="cuenta-regresiva"
      className="bg-corrugated relative overflow-hidden px-6 py-20 text-center sm:py-28"
    >
      <GoldParticles density={35} color="#5f85bf" />

      <SectionReveal className="relative mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col items-center gap-4">
          <p className="font-serif text-4xl uppercase italic text-navy sm:text-6xl">
            {monthLabel}
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-navy/30 sm:w-16" />
              <span className="font-sans text-sm uppercase tracking-[0.3em] text-navy sm:text-base">
                {weekdayLabel}
              </span>
            </div>
            <span className="font-signature text-7xl text-envelope-deep sm:text-8xl">
              {dayLabel}
            </span>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-navy/30 sm:w-16" />
              <span className="font-sans text-sm uppercase tracking-[0.3em] text-navy sm:text-base">
                {yearLabel}
              </span>
            </div>
          </div>
        </div>

        <p className="font-sans text-xs uppercase tracking-[0.35em] text-navy/60">
          {countdown.isPast ? "Hoy celebramos" : "Faltan"}
        </p>
        <h2 className="mt-4 font-serif text-3xl italic text-navy sm:text-4xl">
          Cada segundo nos acerca al sí
        </h2>

        <div
          aria-live="polite"
          className="mt-10 grid grid-cols-4 gap-2 sm:gap-10"
        >
          {UNITS.map((unit) => (
            <div key={unit.key} className="flex flex-col items-center gap-2">
              <div className="font-serif text-3xl tabular-nums text-envelope-deep sm:text-6xl">
                <DigitFlip value={countdown[unit.key]} />
              </div>
              <span className="font-sans text-[8px] uppercase tracking-[0.1em] text-navy/50 sm:text-[10px] sm:tracking-[0.3em]">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
