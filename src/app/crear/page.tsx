"use client";

import { useState, useId, useCallback, useEffect } from "react";
import Button from "@/components/ui/Button";

/** Link base fijo — no se pide al usuario. */
const BASE_URL = "https://marcosymaira.love";

/** Genera el link personalizado según nombres y cupo. */
function buildLink(names: string, cupo: string): string {
  const trimmedNames = names.trim();
  const cupoNum = parseInt(cupo, 10);
  const effectiveCupo = Number.isFinite(cupoNum) && cupoNum >= 1 ? cupoNum : 2;

  const params = new URLSearchParams();
  if (trimmedNames) params.set("invitados", trimmedNames);
  params.set("cupo", String(effectiveCupo));

  return `${BASE_URL}/?${params.toString()}`;
}

interface GeneratedLink {
  id: number;
  label: string;
  url: string;
}

let idCounter = 0;

export default function CrearPage() {
  const namesId = useId();
  const cupoId = useId();

  const [names, setNames] = useState("");
  const [cupo, setCupo] = useState("2");
  const [generatedLink, setGeneratedLink] = useState<string>(() => buildLink("", "2"));
  const [history, setHistory] = useState<GeneratedLink[]>([]);
  const [copiedId, setCopiedId] = useState<number | "current" | null>(null);

  /* Actualización en vivo del link mientras se escribe */
  useEffect(() => {
    setGeneratedLink(buildLink(names, cupo));
  }, [names, cupo]);

  const handleGenerate = useCallback(() => {
    const url = buildLink(names, cupo);
    setGeneratedLink(url);

    const trimmed = names.trim();
    const label = trimmed || "Invitados genéricos";
    idCounter += 1;
    setHistory((prev) => [{ id: idCounter, label, url }, ...prev]);
  }, [names, cupo]);

  const copyToClipboard = useCallback(
    async (text: string, id: number | "current") => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch {
        /* fallback silencioso */
      }
    },
    [],
  );

  const openWhatsApp = useCallback((url: string) => {
    const message = `Te invitamos a nuestro matrimonio 💍\n${url}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <main className="min-h-screen bg-corrugated px-4 py-10 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <header className="mx-auto mb-10 max-w-lg text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-envelope-deep/80">
          Marcos &amp; Maira
        </p>
        <h1 className="font-script mt-1 text-4xl text-envelope-deep sm:text-5xl">
          Generador de invitaciones
        </h1>
        <p className="mt-3 font-serif text-base text-navy/70 italic">
          Crea un link personalizado para cada invitado.
        </p>
      </header>

      {/* Tarjeta principal */}
      <section className="mx-auto max-w-lg">
        <div className="rounded-2xl border border-envelope-deep/20 bg-ivory shadow-[0_8px_40px_-12px_rgba(30,41,59,0.35)] px-6 py-8 sm:px-8">
          {/* Campos del formulario */}
          <div className="flex flex-col gap-6">
            {/* Nombres */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={namesId}
                className="font-sans text-sm font-semibold text-navy"
              >
                Nombres de los invitados
                <span className="ml-1 font-normal text-navy/50">
                  (opcional)
                </span>
              </label>
              <input
                id={namesId}
                type="text"
                placeholder="Ej: Rey Barvilampiño y Maira Se Va"
                value={names}
                onChange={(e) => setNames(e.target.value)}
                className="w-full rounded-lg border border-envelope-deep/30 bg-ivory-deep px-4 py-3.5 font-serif text-lg text-navy placeholder-navy/35 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
            </div>

            {/* Cupo */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={cupoId}
                className="font-sans text-sm font-semibold text-navy"
              >
                Cupo
                <span className="ml-1 font-normal text-navy/50">
                  (personas, mínimo 1)
                </span>
              </label>
              <input
                id={cupoId}
                type="number"
                min={1}
                step={1}
                placeholder="2"
                value={cupo}
                onChange={(e) => setCupo(e.target.value)}
                className="w-full rounded-lg border border-envelope-deep/30 bg-ivory-deep px-4 py-3.5 font-serif text-lg text-navy placeholder-navy/35 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
            </div>
          </div>

          {/* Botón "Generar link" + guardar en historial */}
          <div className="mt-7 flex justify-center">
            <Button
              variant="primary"
              onClick={handleGenerate}
              id="btn-generar"
              aria-label="Generar link y guardar en el historial"
            >
              Generar link
            </Button>
          </div>

          {/* Separador decorativo */}
          <div className="my-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-envelope-deep/20" />
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-navy/40">
              Link generado
            </span>
            <span className="h-px flex-1 bg-envelope-deep/20" />
          </div>

          {/* Recuadro del link */}
          <div className="rounded-xl border border-gold/50 bg-kraft/40 px-4 py-4">
            <p
              className="break-all font-sans text-base font-medium text-navy leading-relaxed"
              aria-live="polite"
              aria-label="Link generado"
            >
              {generatedLink}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              className="flex-1"
              id="btn-copiar"
              onClick={() => copyToClipboard(generatedLink, "current")}
              aria-label="Copiar link al portapapeles"
            >
              {copiedId === "current" ? "¡Copiado! ✓" : "Copiar link"}
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              id="btn-whatsapp"
              onClick={() => openWhatsApp(generatedLink)}
              aria-label="Enviar link por WhatsApp"
            >
              WhatsApp 💬
            </Button>
          </div>
        </div>

        {/* Historial de la sesión */}
        {history.length > 0 && (
          <section aria-label="Links generados en esta sesión" className="mt-10">
            <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-navy/60">
              Generados en esta sesión
            </h2>
            <ul className="flex flex-col gap-3">
              {history.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl border border-envelope-deep/20 bg-ivory px-4 py-4 shadow-sm"
                >
                  <p className="mb-1 font-sans text-xs font-semibold text-envelope-deep">
                    {item.label}
                  </p>
                  <p className="mb-3 break-all font-sans text-xs text-navy/60 leading-relaxed">
                    {item.url}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      id={`btn-copiar-${item.id}`}
                      onClick={() => copyToClipboard(item.url, item.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.15em] text-navy transition-all duration-200 hover:bg-gold/10 active:scale-[0.97]"
                      aria-label={`Copiar link de ${item.label}`}
                    >
                      {copiedId === item.id ? "¡Copiado! ✓" : "Copiar"}
                    </button>
                    <button
                      type="button"
                      id={`btn-wa-${item.id}`}
                      onClick={() => openWhatsApp(item.url)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.15em] text-ivory transition-all duration-200 hover:bg-navy-deep active:scale-[0.97]"
                      aria-label={`Enviar link de ${item.label} por WhatsApp`}
                    >
                      WhatsApp 💬
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}
