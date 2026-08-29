# Sistema de diseño

## Filosofía general: dos capas

El sitio usa **dos capas de tokens** que conviven:

1. **Capa global (`css/style.css`)** — variables `--color-*`, `--gradient-*`, `--shadow-*`, tipografía, radios, breakpoints. Rige la home (`index.html`), el header y el footer en todas las páginas, y sirve de base a toda página nueva.
2. **Capa de detalle de proyecto (`css/project-detail.css` + `css/proyecto-N-theme.css`)** — estructura de layout compartida (`project-detail.css`) más una paleta y tipografía **propias de cada proyecto** (`proyecto-N-theme.css`), sobre variables `--pd-*`. Esto permite que cada case study tenga identidad visual propia (por ejemplo, Medical 360 usa azul/naranjo, no la paleta violeta/coral de la home) sin tocar el CSS estructural compartido.

Hoy solo existe un archivo de tema: `css/proyecto-3-theme.css` (Medical 360). Cuando se agregue contenido real a los proyectos 1, 2 y 4, cada uno necesita su propio `proyecto-N-theme.css` siguiendo el mismo patrón.

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
- Header/nav fijo con estado de scroll y menú móvil.
- Hero, tarjetas de proyecto, secciones de proceso/habilidades/recomendaciones, formulario de contacto — todos construidos sobre los mismos tokens de color/tipografía/radio.
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
- `.pd-persona__trait` — rasgos de persona/usuario.
- `.pd-visual-frame` (+ `--img` con `object-fit:contain` y padding, o `--fill` con `object-fit:cover` sin padding) — marcos para incrustar fotos reales del proyecto.
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

### `css/proyecto-3-theme.css` (Medical 360) — paleta real
- Azul primario `#007AFF`, naranjo de acento/CTA `#F7941D`, celeste suave `#CEE0F8`, base blanca.
- Gradiente propio azul → naranjo para el hero y el CTA final.
- Tipografía: system font stack (`-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, ...`) — **pendiente de confirmación real por parte de Jennifer**; hoy cae a Segoe UI/Roboto según sistema operativo porque SF Pro Display es una fuente propietaria de Apple que no se puede alojar en la web.
- Modo oscuro propio: fondo azul marino (`#0A1B33`/`#0E2440`/`#12294B`), celeste brillante (`#5EC8FF`) para todo lo que en claro usa `--pd-accent`, texto blanco/casi blanco. Incluye ajustes puntuales de contraste donde `--pd-accent` se usa como fondo sólido (el texto pasa a oscuro sobre esos fondos claros: badge de etapa, encabezado de tabla de heurísticas, botón del CTA final).
- Colores propios de las etiquetas de evidencia de Fase 2 (`--pd-tag-validado`, `--pd-tag-desk`, `--pd-tag-hipotesis`, `--pd-tag-oportunidad`, `--pd-tag-vision`), con variantes más claras/saturadas en modo oscuro para mantener contraste AA sobre el fondo azul marino.

## Estado de adopción del sistema de theming por proyecto
Solo **Medical 360** tiene hoy tema propio, modo oscuro y contenido real. `proyecto-1.html`, `proyecto-2.html` y `proyecto-4.html` siguen usando contenido placeholder, sin `proyecto-N-theme.css` propio y sin modo oscuro — al construirlos, deben seguir el mismo patrón de dos capas descrito arriba (estructura compartida de `project-detail.css` + tema propio con su propia paleta, tipografía, gradiente y bloque `[data-theme="dark"]`).

## Accesibilidad
- Contraste mínimo AA en texto y componentes, verificado tanto en modo claro como oscuro.
- Jerarquía semántica de encabezados y HTML semántico en toda página.
- Navegación por teclado y estados de foco visibles (`:focus-visible`).
- Textos alternativos en imágenes reales.
- Tamaños de toque adecuados en elementos interactivos en mobile.
- El sistema respeta `prefers-reduced-motion` de forma global (una sola regla en `style.css` cubre todo el sitio, incluidos componentes agregados después).
- **Regla de "nunca solo color":** cualquier indicador de estado o nivel de certeza (por ejemplo, las etiquetas de evidencia de Fase 2 o los símbolos ✓/◐/? de la matriz de benchmark) siempre combina ícono + color + texto explícito, nunca depende solo del color para transmitir información.

## Responsive
- Tablas se convierten en scroll horizontal controlado (`.pd-matrix`) en vez de comprimirse ilegiblemente.
- Diagramas jerárquicos pasan de 3 columnas a 1 columna apilada en mobile (`max-width: 800px`, mismo punto de quiebre que `.pd-triad`).
- Líneas de tiempo (`.pd-roadmap`) son verticales por diseño, tanto en desktop como en mobile.
- Los botones (`.btn`) usan `white-space: nowrap` por diseño en el sitio general; dentro de páginas de detalle de proyecto esto se sobreescribe en el breakpoint de 600px (`.project-detail .btn { white-space: normal; text-align: center; }`) para que un CTA con texto largo no fuerce scroll horizontal.
