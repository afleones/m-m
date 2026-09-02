"use client";

import { Suspense, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import GoldParticles from "@/components/ui/GoldParticles";
import WaxSeal from "@/components/ui/WaxSeal";
import { useAudio } from "@/components/ui/AudioProvider";
import { couple, heroContent } from "@/lib/content";

interface EnvelopeProps {
  onOpen: () => void;
}

// Rosa estilizada: pétalos radiales superpuestos + botón central, en los
// mismos tonos azules del sobre (en vez de una ilustración acuarelada).
function RoseBloom({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  const petalAngles = [0, 51, 102, 153, 204, 255, 306];
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      {petalAngles.map((a, i) => (
        <path
          key={a}
          d="M0,0 C-9,-5 -9,-15 0,-19 C9,-15 9,-5 0,0 Z"
          transform={`rotate(${a}) translate(0 -2)`}
          fill="var(--color-envelope)"
          fillOpacity={i % 2 ? 0.7 : 0.85}
          stroke="var(--color-envelope-deep)"
          strokeOpacity="0.5"
          strokeWidth="0.8"
        />
      ))}
      <circle r="4" fill="var(--color-envelope-deep)" fillOpacity="0.55" />
    </g>
  );
}

// Ramillete decorativo para las esquinas de la página: tallo + hojas + moras
// pequeñas + una rosa, resuelto en línea y relleno suave del azul del sobre
// en vez de una ilustración acuarelada. `rotate-180` en el contenedor lo
// reorienta para la esquina opuesta sin duplicar el dibujo.
function FloralCorner({ className = "" }: { className?: string }) {
  const leaves = [
    { x: 18, y: 130, r: -35, s: 1.15 },
    { x: 36, y: 102, r: 32, s: 0.95 },
    { x: 28, y: 72, r: -22, s: 0.85 },
  ];
  const berries = [
    { x: 55, y: 44, r: 3.4 },
    { x: 64, y: 53, r: 2.6 },
    { x: 47, y: 55, r: 2.8 },
  ];

  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true" fill="none">
      <path
        d="M14,152 C34,120 22,92 32,64 C40,42 48,30 58,14"
        stroke="var(--color-envelope-deep)"
        strokeOpacity="0.45"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {leaves.map(({ x, y, r, s }, i) => (
        <path
          key={i}
          d="M0,0 C-7,-11 -7,-26 0,-36 C7,-26 7,-11 0,0 Z"
          transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}
          fill="var(--color-envelope-light)"
          fillOpacity="0.75"
          stroke="var(--color-envelope-deep)"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
      ))}
      {berries.map(({ x, y, r }, i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="var(--color-envelope-deep)" fillOpacity="0.6" />
      ))}
      <RoseBloom cx={62} cy={26} scale={1.3} />
    </svg>
  );
}

function SprigOrnament() {
  return (
    <svg viewBox="0 0 32 20" className="h-3 w-6 text-envelope-deep/70" aria-hidden="true" fill="none">
      <path d="M16,18 L16,4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M16,4 C10,4 6,8 4,12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M16,4 C22,4 26,8 28,12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M16,10 C12,10 9,13 7,16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M16,10 C20,10 23,13 25,16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function Divider({ ornament, width = "w-14 sm:w-20" }: { ornament: ReactNode; width?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px bg-envelope-deep/40 ${width}`} />
      {ornament}
      <span className={`h-px bg-envelope-deep/40 ${width}`} />
    </div>
  );
}

// Costuras del sobre: 4 líneas de esquina a esquina que convergen exactamente
// en el centro (50%, 50%), como las dos diagonales completas de un rectángulo
// — así los 4 triángulos quedan simétricos, sin lados más grandes que otros.
const SEAM_TIP_X = 50;
const SEAM_TIP_Y = 50;
const SEAM_STROKE = "rgba(15,23,42,0.22)";

/**
 * Invitación personalizada por enlace: ?invitados=Nombre&cupo=2
 * Se muestra encima de los nombres, antes de "Nos casamos". Sin `invitados`
 * en la URL no se muestra nada (invitación genérica).
 */
function GuestLine() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("invitados")?.trim();

  if (!guestName) return null;

  const seats = Number(searchParams.get("cupo"));
  const hasSeats = Number.isFinite(seats) && seats > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="mb-5 flex flex-col items-center gap-1 text-center"
    >
      <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-envelope-deep/60">
        Esta invitación es para
      </p>
      <p className="font-script text-2xl text-envelope-deep sm:text-3xl">
        {guestName}
      </p>
      {hasSeats && (
        <p className="font-sans text-sm normal-case tracking-normal text-envelope-deep/60">
          Cupo: ({seats}) {seats === 1 ? "Persona" : "Personas"}
        </p>
      )}
    </motion.div>
  );
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const { playSealBreak } = useAudio();

  const handleTap = () => {
    if (isOpening) return;
    setIsOpening(true);
    playSealBreak();
    window.setTimeout(onOpen, 2500);
  };

  return (
    <div className="bg-corrugated fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden px-6">
      <GoldParticles density={26} color="#5f85bf" />

      {/* Ramilletes en las esquinas de la página, apuntando hacia el sobre */}
      <FloralCorner className="pointer-events-none absolute -top-6 -right-8 h-40 w-32 opacity-90 sm:-top-10 sm:-right-12 sm:h-56 sm:w-44" />
      <FloralCorner className="pointer-events-none absolute -bottom-6 -left-8 h-40 w-32 rotate-180 opacity-90 sm:-bottom-10 sm:-left-12 sm:h-56 sm:w-44" />

      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -12 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-6 flex flex-col items-center text-center"
      >
        <Suspense fallback={null}>
          <GuestLine />
        </Suspense>

        <span className="font-signature text-6xl leading-tight text-envelope-deep drop-shadow-[0_2px_10px_rgba(95,133,191,0.35)] sm:text-8xl">
          {couple.fullNames}
        </span>

        <div className="mt-2">
          <Divider ornament={<SprigOrnament />} />
        </div>

        <span className="mt-2 font-sans text-lg font-semibold uppercase tracking-[0.35em] text-envelope-deep sm:text-xl">
          {heroContent.eyebrow}
        </span>
      </motion.div>

      <div
        className="relative"
        style={{ perspective: "1400px" }}
        aria-hidden={isOpening}
      >
        <motion.button
          type="button"
          onClick={handleTap}
          disabled={isOpening}
          aria-label="Toca para abrir la invitación"
          className="group relative block h-60 w-80 cursor-pointer sm:h-[21rem] sm:w-[28rem]"
          whileHover={isOpening ? undefined : { scale: 1.02 }}
          whileTap={isOpening ? undefined : { scale: 0.98 }}
          animate={
            isOpening ? { rotate: [0, -0.6, 0.4, 0] } : { rotate: 0 }
          }
          transition={
            isOpening
              ? { rotate: { duration: 0.7, delay: 1.5, ease: "easeOut" } }
              : undefined
          }
        >
          {/* Cuerpo del sobre */}
          <div className="absolute inset-0 overflow-hidden rounded-sm border border-envelope-deep/30 bg-ivory shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            {/* Solapa izquierda (pliegue estático) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: `polygon(0% 0%, 0% 100%, ${SEAM_TIP_X}% ${SEAM_TIP_Y}%)`,
                background: "linear-gradient(115deg, #ffffff 0%, #f1ead9 100%)",
              }}
            />
            {/* Solapa derecha (pliegue estático) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: `polygon(100% 0%, 100% 100%, ${SEAM_TIP_X}% ${SEAM_TIP_Y}%)`,
                background: "linear-gradient(245deg, #ffffff 0%, #f1ead9 100%)",
              }}
            />
            {/* Solapa inferior (pliegue estático, más oscura: sugiere sombra) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: `polygon(0% 100%, 100% 100%, ${SEAM_TIP_X}% ${SEAM_TIP_Y}%)`,
                background: "linear-gradient(0deg, #e5dac2 0%, #faf7f2 100%)",
              }}
            />
            {/* Costuras: líneas de las 4 esquinas a la punta de la solapa */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="0" y1="0" x2={SEAM_TIP_X} y2={SEAM_TIP_Y} stroke={SEAM_STROKE} strokeWidth="0.6" />
              <line x1="100" y1="0" x2={SEAM_TIP_X} y2={SEAM_TIP_Y} stroke={SEAM_STROKE} strokeWidth="0.6" />
              <line x1="0" y1="100" x2={SEAM_TIP_X} y2={SEAM_TIP_Y} stroke={SEAM_STROKE} strokeWidth="0.6" />
              <line x1="100" y1="100" x2={SEAM_TIP_X} y2={SEAM_TIP_Y} stroke={SEAM_STROKE} strokeWidth="0.6" />
            </svg>
          </div>

          {/* Solapa superior: se abre tras el sello y queda visible, doblada
              hacia atrás (sin backface-hidden, para que no desaparezca a
              mitad de giro). */}
          <motion.div
            className="absolute inset-x-0 top-0 z-10 h-1/2 origin-top"
            style={{ transformStyle: "preserve-3d" }}
            animate={isOpening ? { rotateX: -170 } : { rotateX: 0 }}
            transition={{
              duration: 1.1,
              delay: isOpening ? 0.35 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="h-full w-full border border-envelope-deep/30"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background:
                  "linear-gradient(160deg, #ffffff 0%, #f1ead9 55%, #ffffff 100%)",
              }}
            />
          </motion.div>

          {/* Carta asomando por encima de la solapa ya abierta, con un ligero
              revoloteo de papel */}
          <motion.div
            initial={{ y: 0, opacity: 0, rotate: 0 }}
            animate={
              isOpening
                ? { y: -26, opacity: 1, rotate: [0, -2.5, 1.5, 0] }
                : { y: 0, opacity: 0, rotate: 0 }
            }
            transition={{
              y: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.9 },
              opacity: { duration: 0.5, delay: 0.9 },
              rotate: { duration: 1.1, delay: 0.9, ease: "easeOut" },
            }}
            className="absolute inset-x-8 top-3 z-20 h-40 origin-bottom rounded-sm border border-envelope-deep/20 bg-white shadow-md sm:h-56"
          />

          {/* Sello de cera */}
          <WaxSeal isOpening={isOpening} />
        </motion.button>
      </div>

      <motion.p
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="mt-10 animate-pulse font-sans text-xs uppercase tracking-[0.3em] text-navy/60"
      >
        Toca para abrir nuestra invitación
      </motion.p>
    </div>
  );
}
