import type { ReactNode } from "react";
import SectionReveal from "@/components/ui/SectionReveal";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { buildMapsLink } from "@/lib/maps";
import type { VenueInfo } from "@/types";

interface VenueCardProps {
  id: string;
  eyebrow: string;
  icon: ReactNode;
  venue: VenueInfo;
  actionLabel: string;
}

export default function VenueCard({
  id,
  eyebrow,
  icon,
  venue,
  actionLabel,
}: VenueCardProps) {
  return (
    <section
      id={id}
      className="bg-corrugated relative flex items-center justify-center px-6 py-24 sm:py-32"
    >
      <SectionReveal className="w-full max-w-md" as="div">
        <Card className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
            {icon}
          </div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </p>
          <h3 className="mt-3 font-serif text-2xl text-navy sm:text-3xl">
            {venue.name}
          </h3>
          <p className="mt-2 font-serif text-navy/70">{venue.address}</p>
          <p className="mt-4 font-sans text-sm uppercase tracking-[0.2em] text-navy/60">
            {venue.date} · {venue.time}
          </p>
          {venue.note && (
            <p className="mt-3 font-serif text-sm italic text-navy/50">
              {venue.note}
            </p>
          )}
          <Button
            as="a"
            href={buildMapsLink(venue.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="mt-8"
          >
            {actionLabel}
          </Button>
        </Card>
      </SectionReveal>
    </section>
  );
}
