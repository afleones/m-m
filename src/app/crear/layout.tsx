import type { Metadata } from "next";

/**
 * Metadatos de la ruta /crear.
 * `noindex` evita que buscadores indexen esta herramienta interna.
 */
export const metadata: Metadata = {
  title: "Crear invitación | Marcos & Maira",
  description:
    "Generador interno de links personalizados para la boda de Marcos & Maira.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CrearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
