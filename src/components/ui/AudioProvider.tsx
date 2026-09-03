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

const VOLUME_STEP = 0.1;
const DEFAULT_VOLUME = 1;

interface AudioContextValue {
  hasStarted: boolean;
  isPlaying: boolean;
  volume: number;
  playSealBreak: () => void;
  startMainTheme: () => void;
  togglePlay: () => void;
  restart: () => void;
  increaseVolume: () => void;
  decreaseVolume: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

/**
 * Los archivos de audio referenciados en `lib/content.ts` (audioAssets) aún
 * no existen en /public/audio. Cada intento de reproducción se protege con
 * `.catch()` para que la experiencia nunca se rompa por un archivo faltante
 * o por las políticas de autoplay del navegador.
 */
export default function AudioProvider({ children }: { children: ReactNode }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  const mainThemeRef = useRef<HTMLAudioElement | null>(null);
  const sealBreakRef = useRef<HTMLAudioElement | null>(null);

  const ensureMainTheme = useCallback(() => {
    if (!mainThemeRef.current && typeof window !== "undefined") {
      const audio = new Audio(audioAssets.mainTheme);
      audio.loop = true;
      audio.volume = DEFAULT_VOLUME;
      audio.addEventListener("play", () => setIsPlaying(true));
      audio.addEventListener("pause", () => setIsPlaying(false));
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
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Archivo aún no disponible o autoplay bloqueado: se ignora en silencio.
    });
  }, [ensureSealBreak]);

  const startMainTheme = useCallback(() => {
    setHasStarted(true);
    const audio = ensureMainTheme();
    if (!audio) return;
    audio.play().catch(() => {
      // Archivo aún no disponible o autoplay bloqueado: se ignora en silencio.
    });
  }, [ensureMainTheme]);

  const togglePlay = useCallback(() => {
    const audio = ensureMainTheme();
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [ensureMainTheme]);

  const restart = useCallback(() => {
    const audio = mainThemeRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  const applyVolume = useCallback((next: number) => {
    const clamped = Math.min(1, Math.max(0, next));
    setVolume(clamped);
    if (mainThemeRef.current) {
      mainThemeRef.current.volume = clamped;
    }
    return clamped;
  }, []);

  const increaseVolume = useCallback(() => {
    applyVolume(volume + VOLUME_STEP);
  }, [applyVolume, volume]);

  const decreaseVolume = useCallback(() => {
    applyVolume(volume - VOLUME_STEP);
  }, [applyVolume, volume]);

  const value = useMemo(
    () => ({
      hasStarted,
      isPlaying,
      volume,
      playSealBreak,
      startMainTheme,
      togglePlay,
      restart,
      increaseVolume,
      decreaseVolume,
    }),
    [
      hasStarted,
      isPlaying,
      volume,
      playSealBreak,
      startMainTheme,
      togglePlay,
      restart,
      increaseVolume,
      decreaseVolume,
    ]
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
