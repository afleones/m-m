interface PhotoFrameProps {
  label: string;
  className?: string;
  aspect?: "square" | "portrait" | "landscape";
  variant?: "light" | "dark";
  rounded?: "sm" | "full" | "none";
  /** Oculta el monograma/caption interno: úsalo cuando la escena ya pone su propio texto encima (heroes a pantalla completa). */
  showCaption?: boolean;
}

const roundedClass: Record<NonNullable<PhotoFrameProps["rounded"]>, string> = {
  sm: "rounded-sm",
  full: "rounded-full",
  none: "rounded-none",
};

const aspectClass: Record<NonNullable<PhotoFrameProps["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-3/4",
  landscape: "aspect-4/3",
};

/**
 * Marcador visual para una fotografía real que aún no existe. Sustituir por
 * <Image> de next/image cuando se disponga de las fotos definitivas (ver
 * prompts de generación en README.md).
 */
export default function PhotoFrame({
  label,
  className = "",
  aspect = "portrait",
  variant = "light",
  rounded = "sm",
  showCaption = true,
}: PhotoFrameProps) {
  const isDark = variant === "dark";

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden border ${roundedClass[rounded]} ${
        isDark ? "border-gold/40" : "border-gold/30"
      } ${aspectClass[aspect]} ${className}`}
    >
      {/* Ligero "Ken Burns" para dar vida al marcador; se convierte en el
          punto de entrada natural para <Image> cuando exista la foto real. */}
      <div
        className="animate-ken-burns absolute -inset-[6%]"
        style={{
          background: isDark
            ? "linear-gradient(160deg, #1E293B 0%, #0f172a 60%, #6E93C7 140%)"
            : "linear-gradient(160deg, #FAF7F2 0%, #F1EAD9 55%, #6E93C7 150%)",
        }}
      />
      {showCaption && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <span
            className={`font-script text-3xl sm:text-4xl ${
              isDark ? "text-gold-soft" : "text-navy/70"
            }`}
          >
            M &amp; M
          </span>
          <span
            className={`font-sans text-[10px] uppercase tracking-[0.2em] ${
              isDark ? "text-ivory/50" : "text-navy/40"
            }`}
          >
            Foto pendiente
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 border border-white/10" />
    </div>
  );
}
