"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { gifts } from "@/lib/content";

const floatingEnvelopes = [
  { left: "12%", size: 44, delay: 0, duration: 7 },
  { left: "78%", size: 36, delay: 1.2, duration: 8.5 },
  { left: "45%", size: 52, delay: 0.6, duration: 6.5 },
  { left: "25%", size: 30, delay: 2, duration: 9 },
  { left: "62%", size: 40, delay: 1.6, duration: 7.5 },
];

function EnvelopeIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 48 34"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="46"
        height="32"
        rx="2"
        stroke="#6E93C7"
        strokeWidth="1.2"
        fill="#FAF7F2"
      />
      <path
        d="M2 2l22 18L46 2"
        stroke="#6E93C7"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

export default function Gifts() {
  return (
    <section
      id="regalos"
      className="section-card-shadow bg-corrugated relative overflow-hidden px-6 py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {floatingEnvelopes.map((envelope, index) => (
          <motion.div
            key={index}
            className="absolute top-full"
            style={{ left: envelope.left }}
            animate={{ y: [0, -520], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: envelope.duration,
              delay: envelope.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <EnvelopeIcon size={envelope.size} />
          </motion.div>
        ))}
      </div>

      <SectionReveal className="relative mx-auto max-w-xl text-center" as="div">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-navy/60">
          Regalos
        </p>
        <h2 className="mt-4 font-serif text-3xl italic text-navy sm:text-4xl">
          {gifts.title}
        </h2>
        <p className="mt-5 font-serif text-lg text-navy/70">
          {gifts.subtitle}
        </p>
      </SectionReveal>
    </section>
  );
}
