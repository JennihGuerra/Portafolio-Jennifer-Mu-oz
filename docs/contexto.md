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
2. **`#inicio` — Hero.** Título "Diseño de productos que resuelven problemas reales", eyebrow "UX / Product Designer", tags (UX/Product Design · UI · Frontend · IA), CTAs "Ver proyectos" y "Descargar CV" (descarga el CV actualizado desde `assets/cv-jennifer-munoz.pdf`), estadísticas animadas (2+ años, 10+ proyectos, "UX/UI + Frontend" como enfoque), y una tarjeta visual decorativa tipo skeleton-UI con tags flotantes ("Design System", "User Research").
3. **`#proyectos` — Grilla de proyectos.** 4 tarjetas, cada una enlaza a su propia página de detalle:
   - **Proyecto 1** — "Rediseño de checkout para app de retail" (tags: UX Research, E-commerce).
   - **Proyecto 2** — "Sistema de diseño para plataforma financiera" (tags: Product Design, Fintech).
   - **Proyecto 3** — "Medical 360" (tags: UI Design, Salud) — con imagen hero real.
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
| `proyecto-1.html` | Placeholder / en construcción | No | No existe |
| `proyecto-2.html` | Placeholder / en construcción | No | No existe |
| `proyecto-3.html` (Medical 360) | **Completo** — Fase 1 (MVP 2023) + Fase 2 (evolución del producto, research 2026 en curso) | Sí | `css/proyecto-3-theme.css` |
| `proyecto-4.html` | Placeholder / en construcción | No | No existe |

**Medical 360 (`proyecto-3.html`) es hoy el único case study terminado**, y sirve de referencia/plantilla para cómo deberían construirse los otros tres cuando se les agregue contenido real: cada uno necesitará su propio archivo `proyecto-N-theme.css` (paleta, tipografía y gradiente propios) siguiendo el mismo patrón de tokens `--pd-*` que usa Medical 360, más su versión en modo oscuro.

#### Medical 360 — resumen de contenido
- **Navegación fija de etapas:** `proyecto-3.html` incluye un bloque fijo bajo el header durante toda la navegación, con el botón "Volver a proyectos" y la etiqueta "Selecciona etapa del proyecto" sobre los botones de etapa. Los enlaces apuntan a `#etapa-1` (Etapa 1 — MVP · 2023) y `#segunda-etapa` (Etapa 2 — Evolución · 2026). La etapa activa se marca en azul mediante `.is-active` y la otra queda en blanco; `js/script.js` actualiza ese estado al hacer clic y al hacer scroll.
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
- `proyecto-1.html`, `proyecto-2.html` y `proyecto-4.html` siguen sin contenido real, sin modo oscuro y sin archivo de tema propio.
- Fase 2 de Medical 360 está diseñada para crecer: cuando exista research real con usuarios (encuestas/entrevistas), esos resultados deben conectarse explícitamente a las hipótesis H1–H5 ya planteadas, continuando la numeración después de "Fase 2 · 13".
- En Fase 1 de Medical 360 no se debe inventar el número de usuarios testeados si Jennifer no lo confirma; las métricas existentes se presentan como resultados del testing original sin agregar muestra nueva. En "Resultado del MVP", el dato protagonista es "9/10 completaron la reserva médica sin dificultad".
- Confirmar que todos los cambios recientes efectivamente llegaron a GitHub/Netlify (el flujo depende de que Jennifer haga el push desde GitHub Desktop).
