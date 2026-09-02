"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface WaxSealProps {
  isOpening: boolean;
}

/**
 * Sello de cera real (public/images/sello.png, procesado a
 * public/images/sello-transparent.png para quitarle el fondo blanco) que se
 * "rompe" en dos mitades desiguales + fragmentos siguiendo una grieta en
 * zigzag, como un sello de cera de vela real al partirse.
 */

const SEAL_SRC = "/images/sello-transparent.png";

// Grieta en zigzag que reparte la imagen completa en dos mitades.
const LEFT_HALF_CLIP =
  "polygon(50% 2%, 35% 7%, 20% 17%, 9% 32%, 4% 48%, 7% 64%, 18% 80%, 33% 92%, 50% 97%, 45% 80%, 56% 65%, 44% 50%, 54% 35%, 46% 20%)";

const RIGHT_HALF_CLIP =
  "polygon(50% 2%, 46% 20%, 54% 35%, 44% 50%, 56% 65%, 45% 80%, 50% 97%, 65% 93%, 80% 82%, 90% 66%, 94% 50%, 92% 35%, 82% 18%, 68% 6%)";

const crumbs = [
  { top: "18%", left: "62%", size: 7, x: 26, y: -8, rotate: 40, delay: 0.05 },
  { top: "70%", left: "30%", size: 6, x: -22, y: 20, rotate: -35, delay: 0.12 },
  { top: "58%", left: "78%", size: 5, x: 30, y: 18, rotate: 60, delay: 0.02 },
  { top: "20%", left: "22%", size: 6, x: -28, y: -6, rotate: -50, delay: 0.16 },
  { top: "85%", left: "58%", size: 4, x: 14, y: 26, rotate: 20, delay: 0.09 },
];

export default function WaxSeal({ isOpening }: WaxSealProps) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-30 h-24 w-24 -translate-x-1/2 -translate-y-1/2 sm:h-32 sm:w-32"
      animate={isOpening ? { scale: [1, 1.1, 0.92, 1] } : { scale: 1 }}
      transition={{ duration: 0.32, ease: "easeInOut" }}
    >
      {/* Fragmentos que saltan al romperse */}
      {crumbs.map((crumb, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full"
          style={{
            top: crumb.top,
            left: crumb.left,
            width: crumb.size,
            height: crumb.size,
            background:
              "radial-gradient(circle at 35% 30%, #cfe0f2, #4a6fa5 75%)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.35)",
          }}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
          animate={
            isOpening
              ? {
                  opacity: [0, 1, 0],
                  x: crumb.x,
                  y: crumb.y,
                  rotate: crumb.rotate,
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 0.7,
            delay: 0.15 + crumb.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Mitad izquierda */}
      <motion.div
        className="absolute inset-0 drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]"
        style={{ clipPath: LEFT_HALF_CLIP }}
        initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        animate={
          isOpening
            ? { x: -20, y: 14, rotate: -38, opacity: 0 }
            : { x: 0, y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 0.75, delay: isOpening ? 0.18 : 0, ease: "easeIn" }}
      >
        <Image src={SEAL_SRC} alt="" fill sizes="128px" className="object-contain" priority />
      </motion.div>

      {/* Mitad derecha */}
      <motion.div
        className="absolute inset-0 drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]"
        style={{ clipPath: RIGHT_HALF_CLIP }}
        initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        animate={
          isOpening
            ? { x: 20, y: 16, rotate: 38, opacity: 0 }
            : { x: 0, y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 0.75, delay: isOpening ? 0.18 : 0, ease: "easeIn" }}
      >
        <Image src={SEAL_SRC} alt="" fill sizes="128px" className="object-contain" priority />
      </motion.div>
    </motion.div>
  );
}
