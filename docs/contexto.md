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
2. **`#inicio` — Hero.** Título "Diseño de productos que resuelven problemas reales", eyebrow "UX / Product Designer", tags (UX/Product Design · UI · Frontend · IA), CTAs "Ver proyectos" y "Descargar CV" (descarga `assets/cv-jennifer-munoz.pdf`), estadísticas animadas (2+ años, 10+ proyectos, "UX/UI + Frontend" como enfoque), y una tarjeta visual decorativa tipo skeleton-UI con tags flotantes ("Design System", "User Research").
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
- **Fase 1 (2023 — MVP):** historia completa del proyecto original: contexto, research, decisiones de diseño, iteraciones, prototipo, validación. 19 secciones (numeradas 02–18 en los kickers "Medical 360 · 0N").
- **Fase 2 (2026 — Evolución del producto, EN CURSO):** nueva etapa de research que retoma el proyecto después del MVP para explorar una evolución hacia una plataforma más amplia (más allá de solo agendamiento). Documenta desk research, benchmark competitivo real (RedSalud, Alemana, Bupa, UC CHRISTUS), hallazgos, hipótesis de producto (H1–H5), preguntas de investigación y el plan de research que sigue en curso. 16 secciones (kickers "Fase 2 · 01" a "Fase 2 · 16"), agregadas dentro del mismo archivo `proyecto-3.html`, inmediatamente después de la sección 18 de Fase 1.
- **Regla de evidencia:** todo el contenido de Fase 2 está etiquetado explícitamente según su nivel de certeza — **Validado**, **Desk Research**, **Hipótesis**, **Oportunidad** o **Visión futura** — para no presentar como confirmado algo que todavía no se ha investigado con usuarios reales. Fase 2 llega hasta el punto de "necesitamos hablar con usuarios" y se detiene ahí a propósito: no incluye arquitectura final, flujos finales, wireframes, prototipo ni conclusiones de entrevistas/encuestas, porque esa investigación aún no se ha realizado.

## Contacto real del sitio
El formulario de `#contacto` en `index.html` usa Netlify Forms; no hay backend adicional que mantener.

## Flujo de entrega de cambios
1. Los archivos se editan/generan en el entorno de trabajo de Claude.
2. Se entregan a Jennifer como archivos descargables.
3. Ella los guarda en su carpeta local del repo (`Portafolio-Jennifer-Mu-oz`), reemplazando los archivos existentes.
4. Hace commit y push desde **GitHub Desktop**.
5. Netlify detecta el push a `main` y despliega automáticamente — no requiere ningún paso manual adicional de su parte.

## Pendientes conocidos (a la fecha de este documento)
- `proyecto-1.html`, `proyecto-2.html` y `proyecto-4.html` siguen sin contenido real, sin modo oscuro y sin archivo de tema propio.
- Fase 2 de Medical 360 está diseñada para crecer: cuando exista research real con usuarios (encuestas/entrevistas), esos resultados deben conectarse explícitamente a las hipótesis H1–H5 ya planteadas, continuando la numeración desde "Fase 2 · 17".
- En Fase 1 de Medical 360, la sección de Validación todavía muestra "—" en "N.º de usuarios testeados" (dato real pendiente de que Jennifer lo confirme).
- Hay un texto de detalle duplicado en la fila "Minimizar el uso de memoria" de la tabla de heurísticas de Medical 360 — identificado pero no corregido, a la espera de que Jennifer decida qué texto debe quedar.
- Confirmar que todos los cambios recientes efectivamente llegaron a GitHub/Netlify (el flujo depende de que Jennifer haga el push desde GitHub Desktop).
