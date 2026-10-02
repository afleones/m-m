"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { finalMessage } from "@/lib/content";

export default function FinalMessage() {
  return (
    <section
      id="gracias"
      className="bg-corrugated relative flex min-h-screen flex-col items-center justify-end overflow-hidden px-6 pt-16 pb-8 sm:pb-12"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div className="photo-fade-soft relative aspect-[1024/1536] h-full max-h-[82vh] w-auto max-w-[94vw]">
          <Image
            src={finalMessage.image}
            alt={finalMessage.photoLabel}
            fill
            sizes="(max-width: 768px) 94vw, 680px"
            className="object-cover opacity-90"
            priority
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="relative z-10 flex max-w-xl flex-col items-center gap-6 text-center sm:gap-8"
      >
        <p className="font-serif text-2xl italic leading-relaxed text-navy sm:text-3xl">
          {finalMessage.text}
        </p>
        <span className="font-signature text-4xl text-envelope-deep sm:text-5xl">
          {finalMessage.signature}
        </span>
      </motion.div>
    </section>
  );
}
