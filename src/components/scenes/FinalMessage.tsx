"use client";

import { motion } from "framer-motion";
import PhotoFrame from "@/components/ui/PhotoFrame";
import { finalMessage } from "@/lib/content";

export default function FinalMessage() {
  return (
    <section
      id="gracias"
      className="bg-corrugated relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <PhotoFrame
          label={finalMessage.photoLabel}
          aspect="landscape"
          variant="light"
          rounded="none"
          showCaption={false}
          className="h-full w-full opacity-60"
        />
        <div className="bg-gradient-to-b from-kraft-deep/60 via-kraft-deep/40 to-kraft-deep absolute inset-0" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="relative flex max-w-xl flex-col items-center gap-8 text-center"
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
