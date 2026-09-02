"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { audioAssets } from "@/lib/content";

interface AudioContextValue {
  isMuted: boolean;
  hasStarted: boolean;
  toggleMute: () => void;
  playSealBreak: () => void;
  startMainTheme: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

/**
 * Los archivos de audio referenciados en `lib/content.ts` (audioAssets) aún
 * no existen en /public/audio. Cada intento de reproducción se protege con
 * `.catch()` para que la experiencia nunca se rompa por un archivo faltante
 * o por las políticas de autoplay del navegador.
 */
export default function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const mainThemeRef = useRef<HTMLAudioElement | null>(null);
  const sealBreakRef = useRef<HTMLAudioElement | null>(null);

  const ensureMainTheme = useCallback(() => {
    if (!mainThemeRef.current && typeof window !== "undefined") {
      const audio = new Audio(audioAssets.mainTheme);
      audio.loop = true;
      audio.volume = 0.4;
      mainThemeRef.current = audio;
    }
    return mainThemeRef.current;
  }, []);

  const ensureSealBreak = useCallback(() => {
    if (!sealBreakRef.current && typeof window !== "undefined") {
      const audio = new Audio(audioAssets.sealBreak);
      audio.volume = 0.8;
      sealBreakRef.current = audio;
    }
    return sealBreakRef.current;
  }, []);

  const playSealBreak = useCallback(() => {
    const audio = ensureSealBreak();
    if (!audio || isMuted) return;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Archivo aún no disponible o autoplay bloqueado: se ignora en silencio.
    });
  }, [ensureSealBreak, isMuted]);

  const startMainTheme = useCallback(() => {
    setHasStarted(true);
    const audio = ensureMainTheme();
    if (!audio || isMuted) return;
    audio.play().catch(() => {
      // Archivo aún no disponible o autoplay bloqueado: se ignora en silencio.
    });
  }, [ensureMainTheme, isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (mainThemeRef.current) {
        if (next) {
          mainThemeRef.current.pause();
        } else {
          mainThemeRef.current.play().catch(() => {});
        }
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ isMuted, hasStarted, toggleMute, playSealBreak, startMainTheme }),
    [isMuted, hasStarted, toggleMute, playSealBreak, startMainTheme]
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
