import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`relative rounded-lg border border-gold/30 bg-white/70 p-8 shadow-[0_20px_60px_-25px_rgba(30,41,59,0.35)] backdrop-blur-sm sm:p-10 ${className}`}
    >
      <div className="pointer-events-none absolute inset-3 rounded-md border border-gold/20" />
      <div className="relative">{children}</div>
    </div>
  );
}
