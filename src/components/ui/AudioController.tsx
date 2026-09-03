"use client";

import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/ui/AudioProvider";

function ControlButton({
  onClick,
  label,
  active = false,
  children,
}: {
  onClick: () => void;
  label: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-full text-envelope-deep transition-all hover:bg-envelope-deep/10 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-envelope-deep/50 ${
        active ? "bg-envelope-deep/10" : ""
      }`}
    >
      {children}
    </button>
  );
}

// Pequeña flor de cinco pétalos, en el mismo trazo azul del sobre, usada
// como separador floral entre los grupos de controles.
function FloralDivider() {
  return (
    <svg viewBox="0 0 16 16" className="mx-0.5 h-3.5 w-3.5 shrink-0 text-envelope-deep/45" aria-hidden="true" fill="none">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="8"
          cy="4.6"
          rx="1.5"
          ry="2.6"
          fill="currentColor"
          transform={`rotate(${angle} 8 8)`}
        />
      ))}
      <circle cx="8" cy="8" r="1.2" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export default function AudioController() {
  const { hasStarted, isPlaying, volume, togglePlay, restart, increaseVolume, decreaseVolume } =
    useAudio();

  return (
    <AnimatePresence>
      {hasStarted && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-envelope-deep/25 bg-ivory/95 px-2.5 py-1.5 shadow-[0_10px_30px_-10px_rgba(95,133,191,0.5)] backdrop-blur-sm"
        >
          <ControlButton onClick={restart} label="Repetir canción desde el inicio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 13a7.5 7.5 0 1 0 2.6-6.5L4 9" />
            </svg>
          </ControlButton>

          <ControlButton
            onClick={togglePlay}
            label={isPlaying ? "Pausar música" : "Reproducir música"}
            active
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M7 5l12 7-12 7V5z" />
              </svg>
            )}
          </ControlButton>

          <FloralDivider />

          <ControlButton onClick={decreaseVolume} label="Bajar volumen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9v6h4l5 5V4L7 9H3z" />
              <path strokeLinecap="round" d="M16 12h5" />
            </svg>
          </ControlButton>

          <span className="w-8 text-center font-sans text-[10px] tracking-wide text-envelope-deep/70" aria-hidden="true">
            {Math.round(volume * 100)}%
          </span>

          <ControlButton onClick={increaseVolume} label="Subir volumen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9v6h4l5 5V4L7 9H3z" />
              <path strokeLinecap="round" d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" />
            </svg>
          </ControlButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
