"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/ui/AudioProvider";

export default function AudioController() {
  const { isMuted, hasStarted, toggleMute } = useAudio();

  return (
    <AnimatePresence>
      {hasStarted && (
        <motion.button
          type="button"
          onClick={toggleMute}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          aria-label={
            isMuted ? "Activar música de la invitación" : "Silenciar música"
          }
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-navy/90 text-gold shadow-lg backdrop-blur-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9v6h4l5 5V4L7 9H3z"
              />
              <path strokeLinecap="round" d="M16 9l5 6M21 9l-5 6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9v6h4l5 5V4L7 9H3z"
              />
              <path
                strokeLinecap="round"
                d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12"
              />
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
