# Contexto del proyecto

## Qué es esto

Portafolio profesional de **Jennifer Muñoz**, UX/UI & Product Designer. Sitio web estático (sin frameworks ni build tools) que presenta su perfil, proceso de trabajo, habilidades y case studies de proyectos de diseño de producto.

## Stack técnico

- **HTML5 + CSS3 + JavaScript vanilla.** Sin React, Vue, ni ningún framework. Sin bundler ni paso de build: los archivos se sirven tal cual.
- **Despliegue:** GitHub → Netlify. El repo se llama `Portafolio-Jennifer-Mu-oz`, es público, y Netlify hace deploy automático desde la rama `main`.
- **Flujo de trabajo de Jennifer:** administra el repo con **GitHub Desktop** (no usa terminal/git por línea de comandos). Cuando se le entregan archivos nuevos o modificados, ella los reemplaza en su carpeta local y hace commit/push desde GitHub Desktop.
- **Formulario de contacto:** usa Netlify Forms (envío por AJAX), no requiere backend propio.

## Estructura de páginas

### `index.html` — página principal
Contiene, en este orden:

1. **Header/nav** — fijo, con estado de scroll, menú móvil, toggle de tema claro/oscuro.
2. **`#inicio` — Hero.** Título "Diseño de productos que resuelven problemas reales", eyebrow "UX / Product Designer", tags (UX/Product Design · UI · Desarrollo web · IA), CTAs "Ver proyectos" y "Descargar CV" (descarga el CV actualizado desde `assets/cv-jennifer-munoz.pdf`), estadísticas animadas (2+ años, 10+ proyectos, "UX/UI + Frontend" como enfoque), y una tarjeta visual decorativa tipo skeleton-UI con tags flotantes ("Design System", "User Research").
3. **`#proyectos` — Grilla de proyectos.** 4 tarjetas, cada una enlaza a su propia página de detalle:
   - **Proyecto 1** — "Vibra" (tags: UX/UI Design, Ticketing) — con el logotipo real de Vibra como imagen de tarjeta.
   - **Proyecto 2** — "Sistema de diseño para plataforma financiera" (tags: Product Design, Fintech).
   - **Proyecto 3** — "Medical 360" (tags: UX / Product Design · Salud) — con imagen hero real responsive.
   - **Proyecto 4** — "Landing page para startup de viajes" (tags: Branding, SaaS).
4. **`#sobre-mi` — Sobre mí**, incluye un modal de certificaciones (`#cert-modal`).
5. **`#proceso` — Proceso de trabajo.** 5 etapas: Descubrir, Definir, Diseñar, Validar, Iterar.
6. **`#ia-proceso` — IA aplicada al proceso de diseño y desarrollo.**
7. **`#habilidades` — Habilidades**, en 4 categorías: UX Research, Product Design, UI/Design Systems, Development & AI (más una subsección de IA aplicada).
8. **`#recomendaciones` — Recomendaciones**, con dos modales de detalle (`#rec-1`, `#rec-2`).
9. **`#contacto` — Formulario de contacto** (Netlify Forms).
10. **Footer.**

### `proyectos/proyecto-N.html` — páginas de detalle (case studies)

Cada proyecto tiene su propia página de detalle, con una estructura común de secciones tipo case study (contexto, problema, research, decisiones, iteraciones, prototipo, validación, etc.) montada sobre el mismo sistema de componentes (`css/project-detail.css`).

**Estado real de contenido por proyecto (a la fecha):**

| Proyecto | Contenido | Modo oscuro | Tema propio (`proyecto-N-theme.css`) |
|---|---|---|---|
| `proyecto-1.html` (Proyecto Vibra) | **~65% estructural** — case study de product design con marca ficticia propia; ver resumen abajo | Sí | `css/proyecto-1-theme.css` |
| `proyecto-2.html` | Placeholder / en construcción | No | No existe |
| `proyecto-3.html` (Medical 360) | **Completo** — Fase 1 (MVP 2023) + Fase 2 (evolución del producto, research 2026 en curso) | Sí | `css/proyecto-3-theme.css` |
| `proyecto-4.html` | Placeholder / en construcción | No | No existe |

**Medical 360 (`proyecto-3.html`) y Proyecto Vibra (`proyecto-1.html`) son hoy los dos case studies con contenido real**, y sirven de referencia/plantilla para cómo construir `proyecto-2.html` y `proyecto-4.html` cuando tengan contenido: cada uno necesitará su propio archivo `proyecto-N-theme.css` (paleta, tipografía y gradiente propios) siguiendo el mismo patrón de tokens `--pd-*`, más su versión en modo oscuro.

#### Proyecto Vibra (`proyecto-1.html`) — resumen de contenido
- **Qué es:** case study de product design basado en un proyecto real de una plataforma de venta de entradas (ticketing), cuya identidad **no puede revelarse** por confidencialidad. Para poder mostrar el proceso completo sin exponer la empresa original, el proyecto se presenta bajo una marca ficticia propia: **Vibra** ("Encuentra algo que te mueva."), con paleta, tipografía y tono completamente distintos del resto del portafolio.
- **Regla de confidencialidad (crítica, no debe romperse en futuras ediciones):** nunca se menciona el nombre de la empresa original, no se usan sus logos/capturas/colores de marca reales, y no se muestran cifras o métricas que no hayan sido confirmadas por Jennifer. La página incluye una nota de confidencialidad explícita (sección `#confidencialidad`) y evita cualquier comparación literal "antes/después" con pantallas reales — donde el hallazgo lo requiere (duplicación de eventos por fecha/ciudad), se usa un **diagrama conceptual** de la reestructuración de información, aclarado como tal, en vez de una captura.
- **Alcance de esta primera versión (~60–70% estructural, tal como pidió Jennifer):** las secciones con contenido disponible están completas y con copy real — hero, contexto, nota de confidencialidad, mi rol, el giro del proyecto, research con 5 hallazgos, síntesis, How Might We, principios de diseño y usuarios del ecosistema. Las secciones que dependen de material futuro (Proto Persona, Journey Map, Arquitectura de Información, User Flow definitivo, Wireframes, Design System con capturas reales, Solución final con UI real, showcase responsive, prototipo navegable, KPIs) quedan **construidas como estructura con placeholders explícitos en el código**, listos para reemplazarse cuando exista el contenido — nunca con datos inventados.
- **Sección "00 · Identidad visual" (primera de la página, antes de "Volver a proyectos"):** a pedido explícito de Jennifer, ya no muestra el kicker/título "Vibra"/cita de marca/párrafo descriptivo que tenía originalmente — hoy es un espacio de imagen con el logotipo real de Vibra (`assets/img/proyecto-1-identidad.png`), con el mismo rol que ocupa la imagen del hero en Medical 360. El marco (`.vibra-identity-media`) respeta la proporción exacta del archivo (2:1) en todos los anchos para no recortar nunca el isotipo/wordmark. El botón "Volver a proyectos" vive ahora en una barra fija propia (`.vibra-back-bar`) que es lo primero que se ve al entrar y se mantiene visible durante todo el scroll, igual que el patrón de Medical 360. La paleta de marca (swatches) y el specimen tipográfico que antes estaban en esta sección se retiraron temporalmente — se incorporarán más adelante a una futura sección de Design System de Vibra.
- **Los 5 hallazgos de research:** (1) el contexto de uso es mobile-first, sin cifra inventada; (2) la identificación (RUT) interrumpe el impulso de compra — se reordena el flujo, no se elimina el dato; (3) un mismo evento se repetía por cada fecha/ciudad en el catálogo — se unifica, con fecha/ciudad como filtros internos; (4) **hallazgo con prominencia visual especial**: un mapa de ~300 asientos es ilegible en mobile, resuelto agrupando en subzonas de ~100 asientos con código de color (jerarquía Recinto → Localidad → Subzona → Asiento, principio "Progressive Disclosure"); (5) modernizar sin desorientar a usuarios recurrentes ("Evolución antes que disrupción").
- **KPIs de la sección de Validación:** están explícitamente marcados como **"KPIs propuestos"**, con una nota que aclara que son métricas para una futura fase de validación, no resultados medidos — nunca se muestran como datos reales.
- **Componentes configurables para contenido futuro:** el bloque de Wireframes usa un componente `FigmaEmbed` (`.pd-figma-embed`, atributo `data-figma-url`) y el de Prototipo Final usa `PrototypeCTA` (`.pd-prototype-cta`, atributo `data-prototype-url`) — ambos muestran hoy su estado de placeholder porque esos atributos están vacíos; para activarlos en el futuro basta con escribir la URL real de Figma Make / del prototipo navegable en el atributo correspondiente, sin tocar el JS (`js/script.js` los detecta automáticamente).
- **Siguiente proyecto:** el CTA final de Vibra enlaza a Medical 360 (`proyecto-3.html`).
- **Tarjeta en la home (`index.html`):** usa el mismo logotipo (`assets/img/proyecto-1-identidad.png`) como imagen de la tarjeta, con `object-fit: contain` sobre fondo Tinta Noche propio (`.project-card__media--1.project-card__media--img`, override en `css/style.css`) para no recortar el logo — a diferencia de la tarjeta de Medical 360, que sí puede recortar una foto real con `object-fit: cover`. Título "Vibra", tags "UX/UI Design" y "Ticketing", y descripción que resume el proyecto (ticketing real anonimizado bajo la marca ficticia, selector de asientos y checkout simplificados).
- **`assets/img/proyecto-1-identidad.png` está recortado al contenido real del logo** (proporción ~4:1, igual que el marco que lo muestra), no al lienzo completo que entregó Jennifer originalmente (2:1, con mucho margen vacío alrededor) — así el logo llena el marco de borde a borde en el hero y en la tarjeta de la home, igual de "lleno" visualmente que la foto de Medical 360, en vez de verse chico y rodeado de espacio vacío. Si Jennifer entrega una versión nueva del archivo, hay que recortarla de la misma forma (bounding box del contenido + un margen chico) antes de reemplazarlo.

#### Medical 360 — resumen de contenido
- **Navegación fija de etapas:** `proyecto-3.html` incluye un bloque fijo bajo el header durante toda la navegación, con el botón "Volver a proyectos" y la etiqueta "Selecciona etapa del proyecto" sobre los botones de etapa. Los enlaces apuntan a `#etapa-1` (Etapa 1 — MVP · 2023) y `#segunda-etapa` (Etapa 2 — Evolución · 2026). La etapa activa se marca en azul mediante `.is-active` y la otra queda en blanco; `js/script.js` actualiza ese estado al hacer clic y al hacer scroll.
- **Portada responsive de Medical 360:** el home y el hero del proyecto 3 usan `assets/img/proyecto-3-hero.png` para desktop/tablet y `assets/img/proyecto-3-hero-mobile.png` para mobile mediante `<picture>`. La imagen horizontal corresponde a `Frame 4.png` y la cuadrada a `medical.png`, ambas entregadas por Jennifer.
- **Imágenes en modo oscuro:** las capturas y portadas reales de Medical 360 conservan fondo blanco dentro de sus marcos (`.project-hero__media--img` y `.pd-visual-frame--img`) para integrarse visualmente con el fondo blanco propio de los assets.
- **Wireframes completos:** las imágenes de baja, media y alta fidelidad usan `.pd-visual-frame--wireframe`, un marco cuadrado con `object-fit: contain`, para evitar recortes y mostrar la captura completa en modo claro, oscuro y mobile.
- **Marco del UI Kit:** la captura `proyecto-3-ui-kit.png` usa `.pd-visual-frame--ui-kit` con fondo `#F2F2F7`, tomado del lienzo del propio asset, para integrarse mejor en claro y oscuro.
- **Resumen inicial visible para reclutadores:** el hero muestra casi de inmediato Rol, Duración, Responsabilidades y Herramientas. El campo Equipo se omite por decisión de contenido. Herramientas visibles: Figma, FigJam, Figma Make, Google Workspace, Claude, Codex y ChatGPT.
- **Fase 1 (2023 — MVP):** historia completa del proyecto original, optimizada como caso UX/Product para recruiters: contexto, problema, research, evidencia, insights, oportunidades + priorización, MVP, arquitectura, diseño, prototipo, validación, iteraciones, resultado y aprendizajes. Quedó numerada de 02 a 17; "Oportunidades" y "Priorización" se fusionaron en una sola sección para reducir fragmentación.
- **Fuentes y evidencia de Fase 1:** el dato externo visible queda como una sola métrica protagonista de 99,1% y la nota "fuente SUBTEL/Cadem · 2023."; el año ya no compite como segunda tarjeta estadística. La encuesta propia se identifica solo como "Encuesta propia · 18 participantes · 2023" y las métricas de validación como "Testing de usuarios · proyecto original 2023", sin notas internas visibles en la interfaz.
- **Última ronda de ajustes de Fase 1:** se afinó el benchmark 2023 de RedSalud para hablar de disponibilidad y alcance limitados dentro del escenario analizado; se reformuló la motivación de Andrea desde controles frecuentes y gestión del tiempo; el Insight 03 quedó contextualizado como conclusión de referentes analizados; y "Decisiones de diseño" ahora abre con "Separar especialidades y procedimientos" como decisión UX respaldada por card sorting, dejando el ícono propio en cuarto lugar.
- **Fase 2 (2026 — Evolución del producto, EN CURSO):** nueva etapa de research que retoma el proyecto después del MVP para explorar una evolución hacia una plataforma más amplia (más allá de solo agendamiento). La narrativa fue compactada para recruiters: punto de partida, por qué se retoma, desk research, hallazgos, benchmark + matriz fusionados, insights del benchmark, opportunity gap, exploración preliminar de producto, visión, modelo conceptual, ecosistema, hipótesis + research questions fusionadas y research plan + cierre de hipótesis a evidencia. Queda numerada de "Fase 2 · 01" a "Fase 2 · 13" dentro de `proyecto-3.html`, inmediatamente después de la sección 17 de Fase 1.
- **Fusiones de Fase 2:** "Benchmark competitivo" y "Matriz de benchmark" ahora son una sola sección (`fase2-benchmark`); "Hipótesis" y "Research Questions" se integran en `fase2-hipotesis`; "Research Plan" y "De la hipótesis a la evidencia" se integran en `fase2-research-plan`. Los IDs eliminados son `fase2-matriz`, `fase2-research-questions` y `fase2-cierre`.
- **Regla de evidencia:** todo el contenido de Fase 2 está etiquetado explícitamente según su nivel de certeza — **Validado**, **Desk Research**, **Hipótesis**, **Oportunidad** o **Visión futura** — para no presentar como confirmado algo que todavía no se ha investigado con usuarios reales. Fase 2 llega hasta el punto de "necesitamos hablar con usuarios" y se detiene ahí a propósito: no incluye arquitectura final, flujos finales, wireframes, prototipo ni conclusiones de entrevistas/encuestas, porque esa investigación aún no se ha realizado.

## Contacto real del sitio
El formulario de `#contacto` en `index.html` usa Netlify Forms; no hay backend adicional que mantener.

## CV descargable
El botón "Descargar CV" del hero de `index.html` apunta a `assets/cv-jennifer-munoz.pdf`. El archivo fue reemplazado por el CV actualizado enviado por Jennifer, manteniendo el mismo nombre para no cambiar enlaces ni lógica del sitio.

## Flujo de entrega de cambios
1. Los archivos se editan/generan en el entorno de trabajo de Claude.
2. Se entregan a Jennifer como archivos descargables.
3. Ella los guarda en su carpeta local del repo (`Portafolio-Jennifer-Mu-oz`), reemplazando los archivos existentes.
4. Hace commit y push desde **GitHub Desktop**.
5. Netlify detecta el push a `main` y despliega automáticamente — no requiere ningún paso manual adicional de su parte.

## Pendientes conocidos (a la fecha de este documento)
- `proyecto-2.html` y `proyecto-4.html` siguen sin contenido real, sin modo oscuro y sin archivo de tema propio.
- Proyecto Vibra (`proyecto-1.html`) tiene varias secciones intencionalmente en placeholder (Proto Persona, Journey Map, Arquitectura de Información, User Flow definitivo, Wireframes/Figma Make, capturas del Design System, UI final, showcase responsive con pantallas reales, prototipo navegable) — se deben completar con contenido real a medida que exista, sin inventar datos mientras tanto.
- Fase 2 de Medical 360 está diseñada para crecer: cuando exista research real con usuarios (encuestas/entrevistas), esos resultados deben conectarse explícitamente a las hipótesis H1–H5 ya planteadas, continuando la numeración después de "Fase 2 · 13".
- En Fase 1 de Medical 360 no se debe inventar el número de usuarios testeados si Jennifer no lo confirma; las métricas existentes se presentan como resultados del testing original sin agregar muestra nueva. En "Resultado del MVP", el dato protagonista es "9/10 completaron la reserva médica sin dificultad".
- Confirmar que todos los cambios recientes efectivamente llegaron a GitHub/Netlify (el flujo depende de que Jennifer haga el push desde GitHub Desktop).

## Cambios recientes de contenido

Ajustes de copy realizados en la sesión de agosto 2026, orientados a posicionar mejor a Jennifer como Product Designer y a evitar compromisos métricos innecesarios:

- **Hero (`index.html`):** eyebrow "UX / PRODUCT DESIGNER" en mayúsculas, título "Diseño de productos que resuelven problemas reales" y nuevo subtítulo ("Conecto necesidades de usuarios, objetivos de negocio y tecnología para transformarlos en experiencias digitales claras, viables y centradas en las personas."). Etiquetas: UX Research · Product Design · UI · Tecnología + IA.
- **`#proyectos`:** el lead de la sección ya no habla de "resultados medibles" ("Una muestra de proyectos donde investigación, diseño y producto se conectan para resolver problemas reales."). La card de Medical 360 usó un solo tag "UX / Product Design · Salud" y una descripción nueva ("Evolución de un MVP de agendamiento médico hacia una experiencia de salud más continua...").
- **`#sobre-mi`:** el lead ya no repite el cargo ("Me especializo en comprender problemas complejos..."), seguido de un segundo párrafo de menor jerarquía (`.about__extended`) con la experiencia ("Mi experiencia abarca research, arquitectura de información, prototipado, UI, testing, QA y acompañamiento a usuarios."). La descripción del puesto en Prosys se amplió para reflejar todo el alcance (levantamiento, UX Research, arquitectura, UX/UI, prototipado, validación, QA y handoff).
- **`#habilidades`:** el título "Caja de herramientas" fue reemplazado por "Habilidades y competencias", y se eliminó la etiqueta "IA" de la card Product Design (ya queda cubierta en la categoría Development & AI).
- **`#proceso`:** la descripción de la etapa "Validar" dejó de usar "cada solución" ("Valido las principales decisiones mediante testing con usuarios...").
- **`#contacto`:** el lead ahora habla de disponibilidad para "oportunidades en UX / Product Design y proyectos donde pueda conectar research, diseño y tecnología" (se quitó la pregunta "¿Hablamos de tu proyecto?" del párrafo; el título de la sección la conserva).
- **Medical 360 (`proyecto-3.html`):** la cita de la user persona cambió a "Quiero poder agendar mis horas médicas de forma rápida y sin tener que llamar.", con la etiqueta "frase representativa del perfil" (en minúscula, menor jerarquía) ubicada **arriba** de la cita, vía la clase nueva `.pd-persona__quote-label`.
