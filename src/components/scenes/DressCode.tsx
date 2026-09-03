"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { dressCode } from "@/lib/content";

const columns = [
  {
    ...dressCode.men,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        className="h-10 w-10"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 4l4 2 4-2 3 4-2 2v10H7V10L5 8l3-4z"
        />
        <path strokeLinecap="round" d="M11 6l1 3 1-3" />
      </svg>
    ),
  },
  {
    ...dressCode.women,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        className="h-10 w-10"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3l3 5-2 1 4 11H7l4-11-2-1 3-5z"
        />
      </svg>
    ),
  },
];

export default function DressCode() {
  return (
    <section
      id="vestimenta"
      className="bg-corrugated relative px-6 py-28 sm:py-36"
    >
      <SectionReveal className="mx-auto max-w-3xl text-center" as="div">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-navy/60">
          {dressCode.title}
        </p>
        <h2 className="mt-4 font-serif text-3xl italic text-navy sm:text-4xl">
          {dressCode.formality}
        </h2>
      </SectionReveal>

      <div className="mx-auto mt-16 grid max-w-3xl gap-8 sm:grid-cols-2 sm:gap-12">
        {columns.map((column) => (
          <motion.div
            key={column.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 rounded-lg border border-gold/25 bg-white/60 px-6 py-10 text-center"
          >
            <span className="text-gold">{column.icon}</span>
            <h3 className="font-serif text-xl text-navy">{column.label}</h3>
            <ul className="space-y-1 font-sans text-sm uppercase tracking-[0.08em] text-navy/60">
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
