"use client";

import { motion } from "framer-motion";
import PhotoFrame from "@/components/ui/PhotoFrame";
import Button from "@/components/ui/Button";
import SectionReveal from "@/components/ui/SectionReveal";
import { fiances } from "@/lib/content";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function RSVP() {
  return (
    <section
      id="confirmacion"
      className="section-card-shadow bg-corrugated relative px-6 py-28 sm:py-36"
    >
      <SectionReveal className="mx-auto max-w-2xl text-center" as="div">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-navy/60">
          Confirmación de asistencia
        </p>
        <h2 className="mt-4 font-serif text-3xl italic text-navy sm:text-4xl">
          Nos encantaría contar contigo
        </h2>
      </SectionReveal>

      <div className="mx-auto mt-16 grid max-w-2xl gap-8 sm:grid-cols-2">
        {fiances.map((fiance, index) => (
          <motion.div
            key={fiance.role}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="flex flex-col items-center gap-5 rounded-lg border border-gold/30 bg-white/70 px-6 py-10 text-center shadow-[0_20px_60px_-30px_rgba(30,41,59,0.4)]"
          >
            <PhotoFrame
              label={fiance.photoLabel}
              aspect="square"
              rounded="full"
              className="w-32"
            />
            <h3 className="font-serif text-2xl text-navy">{fiance.name}</h3>
            <Button
              as="a"
              href={buildWhatsAppLink(fiance.phone, fiance.message)}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Confirmar con {fiance.role === "novia" ? "la novia" : "el novio"}
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
