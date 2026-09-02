"use client";

import { useEffect, useState } from "react";
import { Lottie } from "lottie-react";
import GoldParticles from "@/components/ui/GoldParticles";

interface LottiePlayerProps {
  /** Ruta a un JSON de Lottie en /public (ej: "/lottie/particles.json"). */
  src: string;
  className?: string;
  loop?: boolean;
}

/**
 * Punto de integración para animaciones Lottie reales. Mientras no exista un
 * archivo en `src`, cae automáticamente al efecto de partículas en canvas
 * (GoldParticles) para que ninguna escena dependa de un asset ausente.
 */
export default function LottiePlayer({
  src,
  className = "",
  loop = true,
}: LottiePlayerProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error("Lottie asset not found");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (failed || !animationData) {
    return <GoldParticles className={className} />;
  }

  return <Lottie src={animationData} loop={loop} autoplay className={className} />;
}
