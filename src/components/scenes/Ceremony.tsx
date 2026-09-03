import VenueCard from "@/components/scenes/VenueCard";
import { ceremony } from "@/lib/content";

export default function Ceremony() {
  return (
    <VenueCard
      id="ceremonia"
      eyebrow="Ceremonia"
      venue={ceremony}
      actionLabel="Cómo llegar"
      actionImage="/images/boton_ubicacion.png"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v4M8 21V11a4 4 0 018 0v10M5 21h14M9 7h6"
          />
        </svg>
      }
    />
  );
}
