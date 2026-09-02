# Audio pendiente

Esta carpeta debe contener, con exactamente estos nombres, los archivos referenzados en `src/lib/content.ts` (`audioAssets`):

- `ambient.mp3` — *(no usado activamente aún, reservado para un loop ambiental previo a la apertura del sobre si se desea)*
- `seal-break.mp3` — efecto de sello de cera rompiéndose, se reproduce al tocar el sobre (Escena 2)
- `main-theme.mp3` — música principal de la experiencia, empieza en loop al abrir el sobre

Mientras estos archivos no existan, `AudioProvider` intenta reproducirlos igual pero atrapa el error de carga/autoplay en silencio: la experiencia nunca se rompe por su ausencia. Basta con colocar los archivos reales con estos nombres exactos para que el audio empiece a funcionar, sin tocar código.
