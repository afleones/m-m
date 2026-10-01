"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { finalMessage } from "@/lib/content";

export default function FinalMessage() {
  return (
    <section
      id="gracias"
      className="bg-corrugated relative flex min-h-screen items-end justify-center overflow-hidden px-6 pt-24 pb-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={finalMessage.image}
          alt={finalMessage.photoLabel}
          fill
          className="object-contain object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kraft-deep/30 via-transparent to-kraft-deep/50" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="relative flex max-w-xl flex-col items-center gap-8 pb-4 text-center sm:pb-8"
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
