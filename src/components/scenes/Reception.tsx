import VenueCard from "@/components/scenes/VenueCard";
import { reception } from "@/lib/content";

export default function Reception() {
  return (
    <VenueCard
      id="recepcion"
      eyebrow="Recepción"
      venue={reception}
      actionLabel="Cómo llegar"
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
            d="M4 10l8-6 8 6M6 9v11h12V9M10 20v-6h4v6"
          />
        </svg>
      }
    />
  );
}
