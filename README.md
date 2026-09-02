# Marcos & Maira — Invitación Digital de Boda

Experiencia web inmersiva y cinematográfica de invitación de boda, construida con Next.js (App Router), TailwindCSS v4, GSAP/ScrollTrigger, Framer Motion y Lenis. Este documento reúne la arquitectura, el mapa de experiencia, la estrategia de animación, el flujo de usuario, los assets pendientes y el plan de implementación.

## 1. Antes de publicar — checklist de `TODO`

Todo el contenido real vive en **`src/lib/content.ts`**. Busca `TODO` en ese archivo para encontrar cada dato pendiente:

| Dato | Dónde |
| --- | --- |
| Fecha y hora reales de la boda | `WEDDING_DATE_ISO` |
| Fecha mostrada en el hero | `heroContent.dateDisplay` |
| Fechas de cada hito de la historia de amor | `loveStory[].date` |
| Lugar, dirección, fecha y hora de la ceremonia | `ceremony` |
| Lugar, dirección, fecha y hora de la recepción | `reception` |
| Confirmación del código de vestimenta | `dressCode.formality` |
| Números de WhatsApp de Marcos y Maira | `fiances[].phone` (formato internacional sin `+`, ej. `573001234567`) |

Además:

- **Fotos**: todas las fotografías se muestran hoy como marcadores elegantes (`components/ui/PhotoFrame.tsx`, gradiente + monograma). Ver la sección 9 para los prompts de generación de imágenes por cada foto necesaria, o sustituir directamente por `<Image>` de `next/image` cuando existan las fotos reales.
- **Audio**: ver `public/audio/README.md`. El sistema ya está conectado (sello rompiéndose + música principal + botón de silencio); solo falta colocar los `.mp3` reales.

## 2. Arquitectura

Next.js 16 App Router + TypeScript + Tailwind v4 (config CSS-first vía `@theme` en `globals.css`, sin `tailwind.config.ts`). Una sola ruta (`/`) que compone toda la experiencia como una página de scroll único.

```
src/
  app/
    layout.tsx        # fuentes (next/font/google), metadata, providers globales
    page.tsx           # orquesta la secuencia completa de 12 escenas
    globals.css         # tokens de color/tipografía Tailwind v4, reduced-motion, Lenis
  components/
    scenes/            # una escena del brief = un componente
      Preloader.tsx
      Envelope.tsx
      Letter.tsx
      IntroGate.tsx     # orquesta Preloader → Envelope → Letter y bloquea el scroll
      LoveStory.tsx
      HeroWeAreMarrying.tsx
      Countdown.tsx
      VenueCard.tsx     # tarjeta reutilizada por Ceremony y Reception
      Ceremony.tsx
      Reception.tsx
      DressCode.tsx
      Gifts.tsx
      RSVP.tsx
      FinalMessage.tsx
    ui/                # primitivas compartidas
      SmoothScrollProvider.tsx  # Lenis + puente a GSAP ScrollTrigger, expone useLenis()
      AudioProvider.tsx          # contexto de audio (tema, SFX, mute), expone useAudio()
      AudioController.tsx        # botón flotante de silenciar/activar
      SectionReveal.tsx          # wrapper de reveal por scroll (GSAP ScrollTrigger)
      GoldParticles.tsx           # partículas doradas en canvas
      LottiePlayer.tsx            # punto de integración para Lottie real (con fallback)
      PhotoFrame.tsx               # marcador visual de fotografía pendiente
      Button.tsx / Card.tsx
  lib/
    content.ts          # única fuente de verdad para todo el copy y los datos del evento
    whatsapp.ts          # construye enlaces wa.me con mensaje precargado
    maps.ts               # construye enlaces de búsqueda de Google Maps
    useCountdown.ts        # hook de cuenta regresiva en tiempo real
    useReducedMotion.ts     # hook de prefers-reduced-motion
  types/
    index.ts             # tipos compartidos (hitos, venues, novios)
```

## 3. Mapa de experiencia (Escenas 1–12 del brief)

```
Preloader ("M & M")
   ↓ (tap o automático)
Sobre cerrado ── tap ──▶ Sello se rompe + suena SFX + inicia tema principal
   ↓
Carta emerge, texto aparece palabra por palabra
   ↓ (tap "Continuar")
   ═══════ a partir de aquí, scroll libre ═══════
Historia de amor (5 postcards con parallax)
   ↓ scroll
"Nos Casamos" (hero a pantalla completa + fecha)
   ↓ scroll
Cuenta regresiva en vivo (D · H · M · S)
   ↓ scroll
Ceremonia (tarjeta + "Ver ubicación")
   ↓ scroll
Recepción (tarjeta + "Cómo llegar")
   ↓ scroll
Código de vestimenta (Hombres / Mujeres)
   ↓ scroll
Regalos (sobres flotando + mensaje)
   ↓ scroll
Confirmación de asistencia (tarjetas Novia / Novio → WhatsApp)
   ↓ scroll
Mensaje final + firma
```

Preloader → Sobre → Carta se muestran como overlays a pantalla completa que **bloquean el scroll** (`IntroGate.tsx`, usando `lenis.stop()`/`lenis.start()`); el resto de escenas viven en flujo normal de documento para que `ScrollTrigger` pueda medirlas correctamente desde el montaje.

## 4. Wireframe por escena

- **Preloader**: fondo `navy-deep` a pantalla completa, partículas doradas de fondo, monograma "M & M" centrado.
- **Sobre**: centrado sobre fondo oscuro, sello de cera circular con "M&M", texto de instrucción debajo.
- **Carta**: fondo marfil, texto centrado en dos líneas + firma en Great Vibes, botón "Continuar" al terminar la animación.
- **Historia de amor**: título centrado arriba; debajo, 5 filas alternando foto/texto izquierda-derecha (columna única en mobile).
- **Nos Casamos**: foto de fondo a pantalla completa con overlay oscuro; eyebrow + título gigante + fecha centrados.
- **Cuenta regresiva**: fondo `navy-deep`, título centrado, grid de 4 columnas (2 en mobile) con dígitos grandes y etiquetas.
- **Ceremonia / Recepción**: tarjeta centrada de ancho máximo `max-w-md`, ícono + nombre + dirección + fecha/hora + botón.
- **Código de vestimenta**: título centrado arriba, 2 columnas (apiladas en mobile) con ícono + lista de ítems.
- **Regalos**: fondo `navy`, sobres animados flotando de fondo, texto centrado al frente.
- **Confirmación**: título centrado, 2 tarjetas lado a lado (apiladas en mobile) con avatar circular + nombre + botón WhatsApp.
- **Mensaje final**: foto de fondo a pantalla completa con overlay, texto de cierre + firma centrados.

## 5. Estrategia de animación

División deliberada de responsabilidades para no duplicar motores de animación:

- **Lenis** (`SmoothScrollProvider.tsx`): único motor de scroll de toda la página, sincronizado con `gsap.ticker` y `ScrollTrigger.update`.
- **GSAP + ScrollTrigger** (`@gsap/react`, `useGSAP`): coreografía **a nivel de escena** — reveals de texto/foto al entrar en viewport (`SectionReveal`), parallax de las postcards de la historia de amor, timeline del Preloader, reveal escalonado palabra por palabra de la Carta.
- **Framer Motion**: interacción **a nivel de componente** — apertura del sobre (spring físico), `AnimatePresence` entre Preloader/Sobre/Carta, dígitos de la cuenta regresiva (flip), hover/tap de las tarjetas de RSVP, loop de sobres flotando en Regalos.
- **Lottie** (`lottie-react` vía `LottiePlayer.tsx`): punto de integración listo para animaciones reales; mientras no exista el JSON, cae automáticamente al efecto de partículas en canvas (`GoldParticles`) sin romper nada.
- Todo respeta `prefers-reduced-motion` (`useReducedMotion.ts`): las animaciones no esenciales se recortan o se omiten.

## 6. Flujo de usuario

1. El usuario abre el enlace → ve el Preloader (o lo salta con un tap).
2. Ve el sobre cerrado y toca para abrirlo → sonido + música + animación de apertura.
3. Lee la carta con el mensaje de bienvenida → toca "Continuar".
4. Se libera el scroll: recorre la historia de amor, el hero "Nos Casamos", la cuenta regresiva, ceremonia, recepción, código de vestimenta y regalos.
5. Llega a Confirmación de asistencia → toca la tarjeta de Marcos o Maira → se abre WhatsApp con un mensaje precargado.
6. Termina en el mensaje final de agradecimiento.
7. En cualquier momento después de abrir el sobre, puede silenciar/activar la música con el botón flotante inferior derecho.

## 7. Assets necesarios

**Fotografías** (hoy reemplazadas por `PhotoFrame`, ver sección 9 para prompts de IA):

- 1 foto hero horizontal (Escena 5, "Nos Casamos")
- 5 fotos de la historia de amor (primer encuentro, primer viaje, primer "te amo", propuesta, boda)
- 1 foto/avatar de Maira y 1 de Marcos (Escena 11, RSVP)
- 1 foto final de la pareja (Escena 12)

**Audio** (ver `public/audio/README.md`): `seal-break.mp3`, `main-theme.mp3`, `ambient.mp3` (opcional).

**Opcional — Lottie**: JSON de animación de partículas doradas o de sello de cera para reemplazar el efecto en canvas, colocado en `public/lottie/*.json` y referenciado desde `LottiePlayer`.

## 8. Prompts para generar las imágenes complementarias (IA)

Estilo base a repetir en cada prompt para mantener consistencia visual: *"editorial wedding photography, warm golden-hour light, soft film grain, elegant and timeless mood, ivory and gold color palette, shallow depth of field, shot on 50mm lens"*.

1. **Hero ("Nos Casamos")**: "Wide editorial photo of a couple embracing outdoors at golden hour, elegant wedding attire, warm backlight, romantic and cinematic, ivory and gold tones."
2. **Primer encuentro**: "Candid photo of a couple meeting for the first time at a café, warm natural light, genuine smiles, soft focus background."
3. **Primer viaje**: "Couple laughing together while traveling, scenic outdoor backdrop, casual elegant clothing, golden hour light."
4. **Primer 'te amo'**: "Intimate close-up portrait of a couple in a tender embrace at sunset, soft warm tones, romantic atmosphere."
5. **Propuesta**: "Emotional moment of a marriage proposal outdoors, one partner kneeling, soft golden light, candid editorial style."
6. **Boda**: "Bride and groom portrait in wedding attire, soft romantic lighting, elegant and timeless, ivory and gold palette."
7. **Avatar Maira**: "Elegant portrait of a bride, soft natural light, warm tones, editorial wedding photography style."
8. **Avatar Marcos**: "Elegant portrait of a groom in a dark formal suit, soft natural light, warm tones, editorial wedding photography style."
9. **Mensaje final**: "Wide romantic photo of a couple walking away hand in hand at golden hour, cinematic wedding photography, warm and timeless."

## 9. Plan de implementación (pasos ejecutados)

1. Scaffold de Next.js (TypeScript, Tailwind, App Router) con `pnpm create next-app`.
2. Instalación de `gsap`, `@gsap/react`, `framer-motion`, `lenis`, `lottie-react`.
3. Configuración de fuentes (`next/font/google`) y tokens de color/tipografía en `globals.css` (Tailwind v4, CSS-first).
4. Capa de datos (`lib/content.ts`) con todos los `TODO` centralizados.
5. Utilidades y hooks compartidos (`whatsapp.ts`, `maps.ts`, `useCountdown.ts`, `useReducedMotion.ts`).
6. Primitivas de UI compartidas (`SmoothScrollProvider`, `AudioProvider`, `GoldParticles`, `SectionReveal`, `PhotoFrame`, `Button`, `Card`, `AudioController`, `LottiePlayer`).
7. Las 12 escenas, siguiendo la división de responsabilidades GSAP/Framer Motion descrita arriba.
8. Ensamblado de `app/page.tsx` y `app/layout.tsx`.
9. Verificación: `pnpm build` (type-check + compilación) y `pnpm lint` limpios; `pnpm dev` para smoke-test manual.

## Scripts

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build
pnpm start
pnpm lint
```
