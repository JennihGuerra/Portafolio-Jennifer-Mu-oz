# Sistema de diseño

## Filosofía general: dos capas

El sitio usa **dos capas de tokens** que conviven:

1. **Capa global (`css/style.css`)** — variables `--color-*`, `--gradient-*`, `--shadow-*`, tipografía, radios, breakpoints. Rige la home (`index.html`), el header y el footer en todas las páginas, y sirve de base a toda página nueva.
2. **Capa de detalle de proyecto (`css/project-detail.css` + `css/proyecto-N-theme.css`)** — estructura de layout compartida (`project-detail.css`) más una paleta y tipografía **propias de cada proyecto** (`proyecto-N-theme.css`), sobre variables `--pd-*`. Esto permite que cada case study tenga identidad visual propia (por ejemplo, Medical 360 usa azul/naranjo, no la paleta violeta/coral de la home) sin tocar el CSS estructural compartido.

Hoy existen dos archivos de tema: `css/proyecto-3-theme.css` (Medical 360) y `css/proyecto-1-theme.css` (Proyecto Vibra). Cuando se agregue contenido real a los proyectos 2 y 4, cada uno necesita su propio `proyecto-N-theme.css` siguiendo el mismo patrón.

## Tokens globales (`css/style.css`)

### Color — modo claro (`:root`)
- `--color-bg: #FFFFFF`
- `--color-bg-alt: #FDF6F2`
- `--color-surface: #FFFFFF`
- `--color-border: rgba(46,0,71,0.10)`
- `--color-text-primary: #2E0047`
- `--color-text-body: #5B4A66`
- `--color-text-secondary: #F27457`
- `--color-text-on-accent: #FFFFFF`
- `--color-secondary: #F2884B`
- `--color-tertiary: #F26666`
- `--gradient-accent: linear-gradient(135deg, #F27457 0%, #F2884B 50%, #F26666 100%)`
- `--gradient-hero`
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-glow`

### Color — modo oscuro (`[data-theme="dark"]`)
Redefine el mismo set de variables: fondo `#150019`, texto primario `#F6ECFB`, y así sucesivamente para el resto de tokens. El toggle de tema (botón del header) alterna `data-theme="dark"` en `<html>` y persiste la elección en `localStorage` (clave `jm-portfolio-theme`), vía `js/script.js`.

### Tipografía
- `--font-body: 'Roboto', ...`
- `--font-display: 'Aldrich', 'Roboto', sans-serif`

### Radios y layout
- `--radius: 16px`
- `--radius-lg: 24px`
- `--radius-sm: 10px`
- `--radius-pill: 999px`
- `--container-w: 1200px`
- `--section-py: clamp(72px, 10vw, 140px)`

### Movimiento
- `--ease: cubic-bezier(0.16, 1, 0.3, 1)`
- `--transition: 0.35s var(--ease)`
- **`prefers-reduced-motion: reduce`** está resuelto a nivel global, arriba del todo de `style.css`: neutraliza automáticamente todas las animaciones/transiciones CSS del sitio (incluidas las que se agreguen después) y fuerza `scroll-behavior: auto`. No es necesario repetir esta protección en cada componente nuevo.

### Breakpoints usados en todo el sitio
`1080px`, `960px`, `860px`, `600px` — este último es el punto de quiebre "mobile" usado de forma consistente para apilar/simplificar layouts.

### Componentes globales
- **Botones (`.btn`):** sistema con variantes `--primary`, `--ghost`, `--sm`, `--block`. Por diseño usan `white-space: nowrap`; en páginas de detalle de proyecto esto se sobreescribe en mobile cuando el texto del botón es largo (ver más abajo).
- **Botón "Descargar CV":** en el hero de `index.html` conserva la variante visual `.btn--ghost`; el cambio de CV se resuelve reemplazando `assets/cv-jennifer-munoz.pdf`, sin modificar estilos ni comportamiento.
- Header/nav fijo con estado de scroll y menú móvil.
- Hero, tarjetas de proyecto, secciones de proceso/habilidades/recomendaciones, formulario de contacto — todos construidos sobre los mismos tokens de color/tipografía/radio.
- **`.about__extended`** — segundo párrafo de "Sobre mí" con jerarquía menor que `.about__lead` (tipografía más pequeña y color atenuado), usado para complementar el lead sin repetir el cargo.
- **Tarjeta de proyecto con imagen real que no admite crop (`.project-card__media--N.project-card__media--img`):** el patrón compartido (`.project-card__media--img picture/img { width/height:100% }`) no resuelve bien el alto dentro de `.project-card__media` (que es `display:grid; place-items:center`) — el porcentaje de alto queda indefinido y el `overflow:hidden` del contenedor termina recortando la imagen igual que `object-fit:cover`, aunque se pida `contain`. La tarjeta de Vibra (`--1`) lo resuelve con una regla propia que posiciona `picture`/`img` en `position:absolute; inset:0` (en vez de depender del alto porcentual del grid) más `object-fit:contain` y fondo propio (Tinta Noche) para el letterbox. Reutilizar este mismo patrón si otra tarjeta futura necesita mostrar un logo/isotipo sin recortarlo (a diferencia de una foto/captura, que sí puede usar `cover` como la tarjeta de Medical 360).
- **Iconografía:** Material Symbols Outlined en todo el sitio.

### Sistema de animación (`js/script.js`)
- **Scroll-reveal:** atributo `[data-animate]` + clase `.in-view`, disparado por `IntersectionObserver` (threshold 0.15, rootMargin `'0px 0px -60px 0px'`), de una sola vez (se deja de observar el elemento tras activarse). `data-animate-delay` (valores 1–4) escalona la entrada de elementos vecinos.
- **Contadores animados:** `animateCount()` vía `requestAnimationFrame` + easing `easeOutExpo`, disparado por `IntersectionObserver` (threshold 0.4). Soporta `data-count-decimals` para formato numérico en locale chileno (`toLocaleString('es-CL', ...)`).
- Ambos sistemas respetan `prefers-reduced-motion` (heredado de la regla global de `style.css`).
- Además: modal de recomendaciones, formulario de contacto con envío AJAX a Netlify Forms.

## Capa de detalle de proyecto

### `css/project-detail.css`
CSS estructural **compartido por todas las páginas de proyecto**, construido enteramente sobre variables `--pd-*` (nunca colores hardcodeados), para que cada tema (`proyecto-N-theme.css`) pueda redefinir la apariencia completa sin tocar esta hoja.

Tokens `--pd-*` esperados de cada tema: `--pd-bg`, `--pd-bg-alt`, `--pd-surface`, `--pd-border`, `--pd-text-primary`, `--pd-text-body`, `--pd-text-muted`, `--pd-accent`, `--pd-accent-2`, `--pd-on-accent`, `--pd-gradient`, `--pd-font-display`, `--pd-font-body`.

**Librería de componentes reutilizables** (usada primero en Medical 360, pensada para reutilizarse en los próximos proyectos):
- `.project-case-controls` + `.project-stage-nav` / `.project-stage-link` — controles fijos de navegación del proyecto. En Medical 360 el bloque queda fijo bajo el header durante toda la navegación, incluye el botón "Volver a proyectos" y luego la etiqueta "Selecciona etapa del proyecto" sobre los accesos a Etapa 1 (MVP 2023) y Etapa 2 (Evolución 2026). La etapa seleccionada usa `.is-active` y se pinta azul; la etapa no seleccionada queda en blanco.
- `.project-card__media--img picture` y `.project-hero__media--responsive picture` — patrón de imagen responsive usado en Medical 360: portada horizontal para desktop/tablet y portada cuadrada para mobile, manteniendo `object-fit: cover` en cards y el encuadre propio del hero.
- `.project-detail__meta` — resumen inicial del caso, ubicado en el hero para lectura rápida de reclutadores. En Medical 360 muestra Rol, Duración, Responsabilidades y Herramientas; Equipo se omite. Usa una grilla de 4 columnas en desktop y 1 columna en mobile para que listas largas como herramientas no se compriman.
- `.project-stage-badge` — badge de etapa del proyecto; queda disponible como componente heredado para proyectos que no necesiten navegación por etapas.
- `.pd-flow` — diagrama de flujo simple.
- `.pd-triad` — grilla de 3 columnas para contrastar 3 dimensiones (ej. Mercado/Tecnología/Producto).
- `.pd-iteration` — componente "antes/después" de dos paneles; se ha reutilizado para varios contrastes no cronológicos además de iteraciones de diseño (pregunta 2023 vs. 2026, mercado-resuelve vs. queremos-investigar, app vs. plataforma).
- `.pd-context-strip`, `.pd-research-question`, `.pd-validation-note`, `.pd-research-close` — bloques de síntesis para Fase 2: resumen rápido del antes del MVP, pregunta central de diseño, aclaración de hipótesis no validadas y cierre hacia evidencia primaria.
- `.pd-source-note` — nota breve para declarar origen de datos externos o propios. En Medical 360 se usa para separar dato oficial SUBTEL/Cadem 2023, encuesta propia 2023 y testing original, evitando que el recruiter confunda evidencia externa, encuesta propia y hallazgos de validación.
- `.pd-note` — texto pequeño en cursiva para aclaraciones metodológicas.
- `.pd-methods` — grilla de áreas de investigación.
- `.pd-insight-grid` — grilla de hallazgos/hipótesis (auto-fit).
- `.pd-insight--structured` — variante de insight con dos niveles de lectura: evidencia observada e implicación de diseño. Se incorporó en Fase 1 de Medical 360 para hacer más escaneable la relación research → decisión de producto.
- `.pd-facts-grid`, `.pd-chip` — tarjetas de datos puntuales / etiquetas sueltas.
- `.pd-decisions` / `.pd-decision` — lista de decisiones de diseño con justificación.
- `.pd-quote` — cita destacada.
- `.pd-benchmark__list` — lista dentro de comparaciones.
- `.pd-benchmark__cols--compact` — variante de benchmark en tres columnas compactas: fortaleza, limitación observada e implicación. En mobile colapsa a una columna.
- `.pd-heuristics` — tabla de heurísticas de usabilidad.
- `.pd-iteration__tag--pending` — etiqueta para distinguir mejoras priorizadas pero no implementadas dentro de iteraciones, evitando presentar pendientes como cambios ya realizados.
- `.pd-result-metric` — bloque de resultado destacado para métricas reales de testing. En Medical 360 se usa para mostrar `9/10` como dato protagonista del MVP, con label "Resultado de testing · 2023" y sin agregar KPIs no documentados.
- `.pd-persona__trait` — rasgos de persona/usuario.
- `.pd-persona__quote-label` — etiqueta de menor jerarquía ubicada sobre la cita de la persona (`.pd-persona__quote`) en Medical 360: muestra "frase representativa del perfil" en minúscula y color atenuado (`--pd-text-muted`).
- `.pd-visual-frame` (+ `--img` con `object-fit:contain` y padding, o `--fill` con `object-fit:cover` sin padding) — marcos para incrustar fotos reales del proyecto.
- `.pd-visual-frame--wireframe` — variante cuadrada para wireframes/capturas que deben verse completas. Usa fondo blanco y `object-fit: contain`; en Medical 360 reemplaza `--fill` en baja/media/alta fidelidad para evitar recortes en modo claro y oscuro.
- `.pd-visual-frame--ui-kit` — variante específica para la captura del UI Kit de Medical 360. Usa fondo `#F2F2F7`, tomado del lienzo de la imagen, para que el marco parezca parte del asset en modo claro y oscuro.
- En Medical 360, `.project-hero__media--img` y `.pd-visual-frame--img` mantienen fondo blanco también en modo oscuro, para que las capturas con fondo blanco no queden cortadas por franjas azul oscuro.
- `.pd-list` — listas simples (ej. preguntas de investigación).
- `.pd-steps` / `.pd-step` — chips de metodología/etapas.

**Componentes nuevos, agregados para Fase 2 de Medical 360** (reutilizables para cualquier proyecto que necesite documentar evidencia por nivel de certeza, diagramas jerárquicos, comparativas de benchmark o una línea de tiempo de research):
- **`.pd-evidence-tag`** (+ modificadores `--validado`, `--desk`, `--hipotesis`, `--oportunidad`, `--vision`) — etiqueta de nivel de evidencia. Siempre combina ícono + color + texto explícito (nunca solo color), para cumplir contraste AA y no depender del color como único diferenciador. `.pd-evidence-row` agrupa varias en fila.
- **`.pd-chapter`** — banda de apertura de capítulo (borde superior degradado + fondo levemente teñido con el color de acento), con `.pd-chapter__evolution` / `.pd-chapter__year` (+ `--now`) para marcar una progresión temporal (ej. 2023 → 2026).
- **`.pd-exploration-marker`** — bloque separador para marcar que las secciones de visión, modelo conceptual y ecosistema son exploración preliminar derivada de research secundario, no solución validada.
- **`.pd-hypothesis-list` / `.pd-hypothesis`** — lista de hipótesis integrada con preguntas de investigación asociadas. En Medical 360 reemplaza la separación anterior entre "Hipótesis" y "Research Questions", manteniendo H1–H5 y diferenciando validación con pacientes vs. validación futura con prestadores/factibilidad técnica.
- **`.pd-hierarchy`** — diagrama jerárquico genérico: nodo central (`.pd-hierarchy__node`, con variante `--outline`) + flecha (`.pd-hierarchy__drop`) + hasta 3 tarjetas rama (`.pd-hierarchy__branches` / `.pd-hierarchy__branch`, en grilla que colapsa a 1 columna en mobile). Reutilizado tanto para un diagrama de modelo de producto como para un diagrama de ecosistema/integraciones.
- **`.pd-matrix`** — tabla comparativa (ej. benchmark competitivo), con el mismo estilo visual que `.pd-heuristics`, envuelta en un contenedor `overflow-x:auto` para scroll horizontal controlado en mobile en vez de comprimir la tabla. Incluye `.pd-matrix__legend` para explicar los símbolos usados.
- **`.pd-roadmap`** — línea de tiempo vertical de investigación, agrupada por fase (`.pd-roadmap__phase`), con ítems en 3 estados visuales (`--done`, `--active`, `--future`) y un punto pulsante en el ítem activo (animación neutralizada automáticamente por la regla global de `prefers-reduced-motion`).
- **`.pd-sr-only`** — utilidad de accesibilidad para texto visible solo a lectores de pantalla (usada, por ejemplo, para dar una etiqueta textual a los íconos ✓/◐/? de `.pd-matrix`).

**Componentes nuevos, agregados para Proyecto Vibra** (reutilizables para cualquier case study futuro de tipo "marca + producto", no exclusivos de Vibra):
- **`.pd-hero-tags` / `.pd-hero-tag`** — fila de tags en el hero (categorías del proyecto), pensada para heroes con fondo oscuro/de marca.
- **`.pd-confidential`** — nota de confidencialidad: caja compacta con ícono, texto en cursiva atenuado, para declarar de forma subtil qué fue modificado por confidencialidad sin interrumpir la lectura del case study.
- **`.pd-decision__grid--2`** — variante de 2 columnas de `.pd-decision__grid` (que por defecto es de 3), para cuando una decisión solo necesita dos campos (ej. "Contenido futuro" / "Problema relacionado").
- **`.pd-figma-embed`** ("FigmaEmbed") — bloque configurable para el bloque de Wireframes. Mientras el atributo `data-figma-url` esté vacío, muestra un estado placeholder (`.pd-figma-embed__placeholder`, "Wireframe interactivo próximamente"); al escribir la URL real ahí, `js/script.js` (sección 13) revela automáticamente `.pd-figma-embed__frame` (el marco tipo navegador) y oculta el placeholder — no requiere tocar el JS. Ese script solo maneja mostrar/ocultar el frame; el `<iframe>` que trae por defecto dentro de `.pd-figma-embed__frame` en `project-detail.css` es **opcional** — en Vibra no se usa (ver nota abajo), en su lugar el frame contiene una `<img>` normal, que el JS ignora sin problema (solo busca un `iframe` para asignarle `src`; si no lo encuentra, no hace nada, y el resto de su lógica — mostrar el frame, ocultar el placeholder — sigue funcionando igual). El botón "Abrir wireframe" (`.pd-figma-embed__cta a`) siempre hay que activarlo a mano en el HTML (quitar `aria-disabled`, poner el `href` real), el script no lo toca.
  - **Por qué Vibra usa una imagen y no el iframe en vivo:** se probó primero embebido en vivo (con el prototipo real corriendo dentro del iframe) y funcionaba, pero se abandonó por un problema real, no cosmético: los navegadores bloquean por seguridad cargar apps compiladas como "módulo de JavaScript" (`type="module"`, el formato de salida de Vite/React) cuando la página se abre como archivo local (`file://`) en vez de sevida por un servidor — es decir, cada vez que Jennifer quisiera revisar el sitio abriendo el HTML directo (su forma habitual de revisar cambios antes de hacer push), esa sección se habría visto en blanco. Además, un iframe en vivo exigía debilitar `X-Frame-Options` en `netlify.toml`, aunque fuera de forma acotada. La solución fue más simple y más robusta: una imagen estática de vista previa dentro del mismo marco, más un botón que navega (misma pestaña) hasta la build real del prototipo, con su propio link de regreso — cero dependencias de protocolo, cero cambios a `netlify.toml`. **En Vibra este componente ya está activo** desde septiembre 2026 (ver el proceso de build más abajo) — es el primer uso real de este componente en el sitio.
- **`.pd-prototype-cta`** ("PrototypeCTA") — CTA de cierre para el prototipo navegable final. Mientras `data-prototype-url` esté vacío, el botón queda deshabilitado (`aria-disabled="true"`, "Prototipo en desarrollo"); al escribir la URL real, `js/script.js` activa el enlace (`target="_blank"`) automáticamente.
- **`.project-hero__media--device`** ("DeviceMockup") — variante angosta de `.project-hero__media` con proporción de teléfono (aspect-ratio 9/18, max-width 300px, centrada), para heroes que todavía no tienen una captura real del producto.
- **`.pd-kpi-grid` / `.pd-kpi-card`** ("KpiCard") — grilla de métricas *propuestas* (no resultados medidos). Se usa siempre junto a `.pd-validation-note` con el disclaimer explícito de que son KPIs propuestos para una futura fase de validación.
- **`.pd-swatch-row` / `.pd-swatch-row__item`** — fila de swatch de color + nombre + hex, para mostrar una paleta de marca con leyenda visible (nunca solo el color, para no depender del color como único portador de significado). Hoy vive fuera de la página (se reincorporará más adelante a una futura sección de Design System de Vibra); no se usa en `proyecto-1.html` por ahora.
- **`.vibra-back-bar`** — barra fija propia de Vibra con el botón "Volver a proyectos", equivalente en rol a `.project-case-controls` de Medical 360 pero sin navegación por etapas (Vibra es un case study de una sola fase). Es el primer elemento dentro de `<main>`, con `position: fixed; top: 76px` (justo debajo del header sitewide) y `z-index: 90`, así queda visible durante todo el scroll de la página. Fondo fijo en Tinta Noche semitransparente con blur, independiente del theme toggle.
- **`.vibra-swatch`** (agregado en la segunda reestructuración de septiembre 2026, sección Design System) — círculo de color sólido de 22px, usado como primer hijo de `.pd-chip` en vez del ícono Material Symbols habitual, para mostrar los HEX reales de la paleta Vibra (Violeta Pulso, Coral Vivo, Lima Eléctrica, Cian Ritmo, Tinta Noche, Nube Clara) con su nombre y código debajo. `.vibra-swatch--light` agrega un borde de 1px (`var(--pd-border)`) para que Nube Clara (`#F7F6FB`, casi blanco) no se pierda visualmente contra el fondo de la tarjeta. No depende del theme toggle — los HEX son fijos de marca, se ven iguales en claro y oscuro.

**Reescritura de septiembre 2026 (Benchmark funcional + Cuatro modalidades de compra):** las dos secciones nuevas de esta ronda **no necesitaron componentes CSS nuevos** — se construyeron combinando componentes ya existentes de `project-detail.css`: `.pd-benchmark` / `.pd-benchmark__card` (una tarjeta por plataforma analizada, con `.pd-evidence-tag--desk` para "Competidor directo" y `.pd-evidence-tag--vision` para el referente Cinépolis), `.pd-matrix` (la matriz comparativa de 10 criterios), `.pd-decisions--compact` (las 4 conclusiones numeradas del benchmark) y `.pd-flow` (los 4 diagramas de flujo de modalidades de compra, hasta 8 pasos cada uno, con wrap automático a columna en mobile vía el breakpoint ya existente del componente). Los únicos ajustes de CSS que hizo falta escribir fueron los dos de layout descritos arriba (`.pd-triad`, `.pd-evidence-tag`), ambos en `proyecto-1-theme.css`.

- **`.vibra-ia-diagram`** (agregado después de la reescritura, cuando Jennifer entregó el diagrama real de arquitectura de información; el nombre quedó de esa primera vez pero **se reutiliza tal cual para cualquier diagrama ancho de la página**, ya se usa también en User Flow) — marco para una imagen ancha con `overflow-x:auto`, misma estrategia que `.pd-matrix` pero para una imagen en vez de una tabla: `padding:20px; border-radius:18px; border:1px solid var(--pd-border); background:var(--pd-surface); box-shadow:var(--shadow-md);` en el contenedor, y `width:1800px; max-width:none; height:auto;` fijo en el `img` interior (funciona con cualquier imagen ancha de fondo transparente — el ancho fijo de 1800px es independiente de la resolución nativa de cada imagen, `height:auto` respeta su proporción real; con la de arquitectura, 3600×930px nativos, se ve a 2x de densidad, y con la de user flow, 3200×749px nativos, a ~1.8x — ambas nítidas en pantallas retina, y ambas obligan scroll horizontal en vez de comprimirse hasta volverse ilegibles). Usada hoy por `proyecto-1-arquitectura.png` (export del tablero FigJam de arquitectura) y `proyecto-1-userflow.png` (export del tablero FigJam de user flow), ambas con fondo transparente y comprimidas con pngquant. El patrón completo alrededor de esta clase (para reutilizar tal cual ante un tercer diagrama ancho): un `<p class="pd-note">` en negrita como título corto arriba, opcionalmente un `<p class="pd-lead">` de contexto, el `.vibra-ia-diagram` con la imagen, y un `<p class="pd-note">` en cursiva (estilo por defecto del componente) como pie de imagen abajo, con atribución a la fuente si corresponde (p. ej. "— Figjam"). Si se necesita este mismo patrón en otro proyecto (`proyecto-N-theme.css`), conviene copiar la clase con un nombre neutro en vez de depender del nombre "ia" heredado de Vibra.

**Wireframe navegable de Vibra — proceso de build (septiembre 2026):** el archivo que Jennifer entrega (carpeta `assets/wireframe - vibra/` en su repo local) es el proyecto **fuente** de Figma Make: Vite + React 19 + TypeScript + Tailwind v4, no un sitio estático — no se puede enlazar directamente, requiere compilarse.

  **Por qué el build es "classic script" y no el ES-module estándar de Vite (esto costó dos vueltas, documentarlo bien):** la primera versión entregada usaba la salida por defecto de `vite build` (`<script type="module">`). Funcionaba perfecto una vez desplegado en Netlify, pero Jennifer revisa cambios abriendo `proyecto-1.html` directo con doble clic (protocolo `file://`, sin servidor) — y los navegadores **bloquean por política de seguridad** cargar `type="module"` bajo `file://`, sin excepción y sin relación con si la ruta está bien escrita (se confirmó aislando el problema: mismo error abriendo el prototipo solo, con rutas relativas y absolutas). Ni el enfoque de "legacy build" (`@vitejs/plugin-legacy`, el patrón module/nomodule) sirve acá — un navegador que sabe interpretar `type="module"` (cualquier Chrome/Edge/Firefox moderno) ignora el script `nomodule` igual, así que el fallback nunca se activa. La solución fue configurar Rollup para emitir un bundle **IIFE autocontenido** (`build.rollupOptions.output.format: 'iife'`, `inlineDynamicImports: true`, `assetFileNames`/`entryFileNames` fijos) en vez de un módulo ES — un `<script>` clásico, sin restricciones de protocolo. Esto se configura **solo en la copia de trabajo** (`vite.config.ts` dentro del entorno de Claude, nunca en la carpeta fuente `assets/wireframe - vibra/` de Jennifer). Dos ajustes finos necesarios además del cambio de formato:
  - Vite sigue escribiendo `type="module"` y `crossorigin` en el HTML aunque el bundle ya no sea un módulo (no sabe que se cambió el formato de salida) — hay que quitar esos atributos a mano en post-build.
  - Sin `type="module"` el script deja de diferirse automáticamente hasta que el DOM esté listo — sin agregar `defer`, el script se ejecuta antes de que exista `<div id="root">` y React tira `Minified React error #299` (target container no es un elemento DOM). Se agrega `defer` al `<script>` en el post-build para restaurar ese mismo comportamiento.
  - `FIGMA_PUBLIC_URL` se fija en `.` (rutas relativas: `./assets/wireframe.js`) en vez de `/assets/prototipo-vibra` (ruta absoluta desde la raíz). Bajo `file://` una ruta que empieza con `/` se resuelve contra la raíz del sistema de archivos, no contra la carpeta del sitio — rompía la carga de los bundles incluso ya con el bundle en formato IIFE. Una ruta relativa funciona igual de bien sirviendo desde Netlify (se resuelve relativa a la URL del propio `index.html`) y además funciona abriendo el archivo directo — no hay ninguna desventaja a cambiar esto.

  Pasos completos (repetir todos ante cualquier actualización del wireframe):
  1. **Build:** `FIGMA_PUBLIC_URL="." pnpm run build`, con el `vite.config.ts` de la copia de trabajo ya parcheado como se explica arriba (formato IIFE, rutas relativas, nombres de archivo fijos `assets/wireframe.js` / `assets/wireframe.css`).
  2. **Post-build (script `postbuild.py`, guardado junto al proyecto fuente en el entorno de trabajo — no se sube al repo de Jennifer):** (a) quita `type="module"` y `crossorigin` de los tags `<script>`/`<link>` y agrega `defer` al script (ver los dos ajustes finos arriba); (b) inyecta un botón fijo "← Volver al proyecto" (arriba a la izquierda, `position:fixed`, con el mismo estilo Tinta Noche que `.vibra-back-bar`) que enlaza a `../../proyectos/proyecto-1.html#wireframes`. **Detalle importante de esta inyección:** la propia app (`PreviewFrame.tsx`, el toggle "Escritorio/Móvil") carga su propio `index.html` una segunda vez dentro de un iframe interno (con `?embed=1`) para simular el marco del dispositivo — por eso el botón inyectado se envuelve en `if (window.self !== window.top) return;`, si no fuera así aparecería **duplicado en pantalla** (una vez en la página real, otra dentro de ese iframe interno de la propia app). Esto se detectó y corrigió durante la verificación visual antes de entregar — no quitar ese guard.
  3. El resultado (`dist/`: `index.html`, `robots.txt`, `assets/wireframe.js`, `assets/wireframe.css`) se publica tal cual en `assets/prototipo-vibra/` — nombre distinto al de la carpeta fuente porque esta última tiene espacios, no válidos en una URL. Nombres de archivo fijos (no hasheados) a propósito: sin esto, cada actualización dejaría los archivos de la build anterior dando vueltas sin usarse en `assets/prototipo-vibra/assets/`, porque no hay un paso de borrado automático en el flujo de Jennifer.
  4. También se sobrescribió el `<title>` genérico ("Figma Make App") a "Vibra — Wireframe navegable" agregando `"title"` a `.figma/make/site.json` **solo en la copia usada para compilar** (el archivo original de Jennifer en su carpeta fuente no se tocó).
  5. **Vista previa estática:** además del build, se generó con Playwright un screenshot limpio de la pantalla de inicio (ocultando el toggle "Escritorio/Móvil" y el botón de regreso antes de capturar, para que la imagen muestre solo el producto), comprimido con pngquant y guardado como `assets/img/proyecto-1-wireframe-preview.png` — es la imagen que se ve dentro del marco en `proyecto-1.html`. Si la pantalla de inicio del wireframe cambia visualmente, hay que regenerar este screenshot con el mismo método.

  **Cómo se integra en `proyecto-1.html`:** el bloque `.pd-figma-embed` muestra esa imagen estática dentro de `.pd-figma-embed__frame` (ver nota en `.pd-figma-embed` arriba sobre por qué es una imagen y no un iframe en vivo), y el botón "Explorar wireframe" navega —en la misma pestaña, sin `target="_blank"`— a `../assets/prototipo-vibra/index.html`. El prototipo abierto trae su propio botón de regreso (paso 2 arriba), así que el usuario siempre puede volver al case study sin usar el botón "atrás" del navegador. **Desde la segunda reestructuración de septiembre 2026,** este bloque vive en su propia sección (`id="wireframe-funcional"`, "18 · Prototipo / Wireframe funcional" — antes compartía la sección "Wireframes" con el contenido estático agrupado por objetivo, que ahora es una sección aparte y protegida). El botón "← Volver al proyecto" inyectado en el build (paso 2 arriba) se actualizó en consecuencia, de `#wireframes` a `#wireframe-funcional`, para que el regreso caiga exactamente en la sección del embed.

  El build completo se verificó con Playwright antes de entregarlo cada vez, **incluyendo explícitamente abrir los archivos directo por `file://`** (no solo servidos por HTTP, que es donde había funcionado engañosamente bien en las primeras dos vueltas): carga sin errores de consola propios de la app, navegación entre pantallas (Inicio/Legal/Ayuda/mapa de asientos/checkout) funcionando, ida y vuelta real entre `proyecto-1.html` y el prototipo probada de punta a punta abriendo el archivo directo, sin overflow horizontal nuevo, y viéndose bien en modo claro/oscuro/mobile. **No se necesita ninguna excepción en `netlify.toml`** con este enfoque (se probó y se descartó una versión con iframe en vivo que sí la requería — ver nota en `.pd-figma-embed` arriba); el archivo quedó sin modificar. **Lección para cualquier futuro proyecto con un prototipo React/Vite similar:** verificar siempre con `file://` desde el principio, no asumir que "funciona servido por HTTP" es suficiente — Jennifer revisa su sitio abriendo el archivo directo, no con un servidor local.

### `css/proyecto-1-theme.css` (Proyecto Vibra) — paleta real
- Marca ficticia creada para proteger la confidencialidad del proyecto original (ver `docs/contexto.md`). Paleta fija: Violeta Pulso `#6C3BFF` (acento principal), Coral Vivo `#FF4D6D`, Lima Eléctrica `#C7F464`, Cian Ritmo `#31D7E8`, Tinta Noche `#171523`, Nube Clara `#F7F6FB`.
- Tipografía: **Plus Jakarta Sans** (Google Fonts) para `--pd-font-display` y `--pd-font-body` — deliberadamente distinta de Aldrich/Roboto del resto del sitio, cargada solo en `proyecto-1.html`. Desde la reescritura de septiembre 2026, el Design System de Vibra también declara **DM Mono** como tipografía auxiliar (cargada junto a Plus Jakarta Sans en el `<head>` de `proyecto-1.html`), reservada para datos/etiquetas técnicas puntuales — no reemplaza a Plus Jakarta Sans como tipografía principal.
- **Ajustes de layout específicos de esta página** (no tocan `project-detail.css` compartido, solo se aplican donde se cargue `proyecto-1-theme.css`, es decir únicamente en `proyecto-1.html`): `.pd-triad { grid-template-columns: repeat(3, minmax(0, 1fr)); }` evita que la grilla de 3 columnas se desborde en tablet cuando el contenido de alguna tarjeta es más largo de lo habitual (bug clásico de CSS Grid con `1fr` + `min-width:auto` por defecto); `.pd-evidence-tag { min-width:0; max-width:100%; white-space:normal; text-align:left; }` permite que una etiqueta de evidencia con texto largo (ej. la de Cinépolis) se ajuste a varias líneas en vez de cortarse en el borde de la pantalla en mobile. Si se reutiliza `.pd-triad` o `.pd-evidence-tag` con texto largo en un futuro proyecto, conviene llevar este mismo ajuste a ese `proyecto-N-theme.css` (o, si el problema se repite en varios proyectos, evaluar subirlo a `project-detail.css`).
- Gradiente de marca: Violeta Pulso → Coral Vivo, reservado para CTA y acentos de alto impacto.
- **El hero de Vibra es siempre Tinta Noche**, en modo claro y oscuro del sitio por igual — es una decisión de marca, no del theme toggle. Se logra con el modificador `.vibra-hero` sobre `.project-hero`.
- **Banda "00 · Identidad visual" (`.vibra-brand-band`, primera sección de la página):** también fija en Tinta Noche, sin depender del theme toggle. Es la única sección que necesita el `padding-top` completo (`calc(76px + 116px)`) para despejar el header fijo y `.vibra-back-bar`, con un respiro adicional para que la imagen no quede pegada al borde inferior de esa barra; el `.vibra-hero` que la sigue inmediatamente comparte el mismo fondo sin separador visual, así que solo lleva un respiro interno corto (`padding-top: 32px`) en vez de repetir esa reserva. Hoy esta banda muestra el logotipo real de Vibra (`.vibra-identity-media`, imagen `assets/img/proyecto-1-identidad.png`) — el mismo rol que cumple la imagen del hero en Medical 360. El marco usa el mismo tamaño que `.project-hero__media--responsive` de Medical 360 (`aspect-ratio: 4/1` en desktop, `1/1` en mobile ≤600px) para mantener armonía visual entre proyectos, con `object-fit: contain` para no recortar nunca el isotipo/wordmark del logo (a diferencia de una foto, un logo no admite crop). El kicker, el título "Vibra", la cita de marca y el párrafo descriptivo que iban antes en esta banda se retiraron a pedido explícito.
- Modo oscuro propio: fondo casi-Tinta-Noche (`#171523`/`#1D1A2E`/`#211E33`), lila claro (`#B79CFF`) para todo lo que en claro usa `--pd-accent` (mejor contraste sobre fondo muy oscuro que el violeta de marca). El degradado de marca se mantiene igual en ambos modos.
- Colores propios de las etiquetas de evidencia (`--pd-tag-*`), usados de forma deliberadamente conservadora en Vibra: se evita "validado" salvo que corresponda a research real, y se prioriza "hipótesis"/"oportunidad" para todo lo no confirmado (Proto Persona, KPIs propuestos, oportunidad B2B del panel Productor).

### `css/proyecto-3-theme.css` (Medical 360) — paleta real
- Azul primario `#007AFF`, naranjo de acento/CTA `#F7941D`, celeste suave `#CEE0F8`, base blanca.
- Gradiente propio azul → naranjo para el hero y el CTA final.
- Tipografía: system font stack (`-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, ...`) — **pendiente de confirmación real por parte de Jennifer**; hoy cae a Segoe UI/Roboto según sistema operativo porque SF Pro Display es una fuente propietaria de Apple que no se puede alojar en la web.
- Modo oscuro propio: fondo azul marino (`#0A1B33`/`#0E2440`/`#12294B`), celeste brillante (`#5EC8FF`) para todo lo que en claro usa `--pd-accent`, texto blanco/casi blanco. Incluye ajustes puntuales de contraste donde `--pd-accent` se usa como fondo sólido (el texto pasa a oscuro sobre esos fondos claros: badge de etapa, encabezado de tabla de heurísticas, botón del CTA final).
- Colores propios de las etiquetas de evidencia de Fase 2 (`--pd-tag-validado`, `--pd-tag-desk`, `--pd-tag-hipotesis`, `--pd-tag-oportunidad`, `--pd-tag-vision`), con variantes más claras/saturadas en modo oscuro para mantener contraste AA sobre el fondo azul marino.

## Estado de adopción del sistema de theming por proyecto
**Medical 360** y **Proyecto Vibra** tienen hoy tema propio, modo oscuro y contenido real (parcial en el caso de Vibra, con placeholders explícitos donde falta material). `proyecto-2.html` y `proyecto-4.html` siguen usando contenido placeholder, sin `proyecto-N-theme.css` propio y sin modo oscuro — al construirlos, deben seguir el mismo patrón de dos capas descrito arriba (estructura compartida de `project-detail.css` + tema propio con su propia paleta, tipografía, gradiente y bloque `[data-theme="dark"]`).

## Accesibilidad
- Contraste mínimo AA en texto y componentes, verificado tanto en modo claro como oscuro.
- Jerarquía semántica de encabezados y HTML semántico en toda página.
- Navegación por teclado y estados de foco visibles (`:focus-visible`).
- Textos alternativos en imágenes reales.
- Tamaños de toque adecuados en elementos interactivos en mobile.
- El sistema respeta `prefers-reduced-motion` de forma global (una sola regla en `style.css` cubre todo el sitio, incluidos componentes agregados después).
- **Regla de "nunca solo color":** cualquier indicador de estado o nivel de certeza (por ejemplo, las etiquetas de evidencia de Fase 2 o los símbolos ✓/◐/? de la matriz de benchmark) siempre combina ícono + color + texto explícito, nunca depende solo del color para transmitir información.
- En Fase 1 de Medical 360, las decisiones de diseño priorizan lectura UX antes que branding: arquitectura de información, sistema visual, reconocimiento de contenido e identidad. Las notas visibles de fuente deben ser breves y externas al proceso interno de edición.

## Responsive
- Tablas se convierten en scroll horizontal controlado (`.pd-matrix`) en vez de comprimirse ilegiblemente.
- Diagramas jerárquicos pasan de 3 columnas a 1 columna apilada en mobile (`max-width: 800px`, mismo punto de quiebre que `.pd-triad`).
- Líneas de tiempo (`.pd-roadmap`) son verticales por diseño, tanto en desktop como en mobile.
- Los botones (`.btn`) usan `white-space: nowrap` por diseño en el sitio general; dentro de páginas de detalle de proyecto esto se sobreescribe en el breakpoint de 600px (`.project-detail .btn { white-space: normal; text-align: center; }`) para que un CTA con texto largo no fuerce scroll horizontal.
