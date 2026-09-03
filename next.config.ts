import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Oculta el indicador de ruta ("N") que Next.js muestra en desarrollo.
  devIndicators: false,
  images: {
    // El valor por defecto de Next.js 16 envía `Content-Disposition: attachment`
    // en las imágenes optimizadas, lo que hace que algunos navegadores las
    // traten como descarga en vez de renderizarlas dentro de un <img>.
    contentDispositionType: "inline",
  },
};

export default nextConfig;
