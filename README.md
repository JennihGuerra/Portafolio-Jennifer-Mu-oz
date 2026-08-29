# Portafolio — Jennifer Muñoz | UX/UI & Product Designer

Portafolio profesional construido con **HTML5, CSS3 y JavaScript Vanilla** (sin frameworks), listo para publicar en **Netlify**.

## Estructura del proyecto

```
├── index.html              # Página principal (Inicio, Sobre mí, Proyectos, Proceso, Habilidades, Contacto)
├── css/
│   └── style.css           # Estilos, variables de color, modo claro/oscuro, responsive
├── js/
│   └── script.js           # Menú móvil, dark mode, scroll suave, animaciones, formulario
├── assets/
│   ├── favicon.svg
│   └── cv-jennifer-munoz.pdf    # CV actualizado, descargable desde el botón del hero
├── proyectos/
│   ├── proyecto-1.html     # Páginas de detalle de cada proyecto (placeholder "en construcción")
│   ├── proyecto-2.html
│   ├── proyecto-3.html
│   └── proyecto-4.html
├── 404.html
└── netlify.toml
```

## Cómo editar el contenido

El texto del sitio está en `index.html`, marcado en español y organizado por secciones con comentarios `<!-- ============ SECCIÓN ============ -->`. El contenido de Inicio, Sobre mí, Proceso, Habilidades y Contacto está tomado directamente del CV de Jennifer (research, arquitectura de información, UI, prototipado, QA, WordPress/Elementor, IA aplicada al diseño, etc.). La sección **Proyectos** sigue siendo placeholder a propósito — cada tarjeta enlaza a `proyectos/proyecto-N.html`, listas para recibir los casos de estudio reales (Portal de nuevos clientes + Back Office, App de inspección en terreno, Plataforma de venta de entradas) cuando estén redactados.

- **Nombre y logo**: clase `.logo` en el header y footer.
- **Foto de "Sobre mí"**: `assets/img/about-photo.jpg`, mostrada dentro de `.about__avatar`. Para cambiarla, reemplaza ese archivo manteniendo el mismo nombre (recorte cuadrado recomendado).
- **Proyectos**: cada tarjeta en `#proyectos` enlaza a `proyectos/proyecto-N.html`. Cuando tengas el caso de estudio completo, reemplaza el contenido de esa página (mantiene el mismo header/footer del sitio).
- **CV**: `assets/cv-jennifer-munoz.pdf` es el CV actualizado de Jennifer, enlazado desde el botón "Descargar CV" del hero. Si se vuelve a actualizar el CV, reemplaza este archivo manteniendo el mismo nombre.
- **Formulario de contacto**: ya está configurado para **Netlify Forms** (atributo `data-netlify="true"`), por lo que funciona sin backend una vez publicado en Netlify. Los mensajes llegan al panel *Forms* de tu sitio en Netlify.

## Modo oscuro

El sitio carga en **modo claro por defecto**. El botón de sol/luna en el header alterna el tema y la preferencia se guarda en `localStorage` del navegador de cada visitante.

## Cambios recientes

Ajustes de copy enfocados en posicionar a Jennifer como Product Designer:

- **Hero:** eyebrow "UX / PRODUCT DESIGNER", nuevo subtítulo ("Conecto necesidades de usuarios, objetivos de negocio y tecnología...") y etiquetas UX Research · Product Design · UI · Tecnología + IA.
- **Proyectos:** lead de la sección reescrito (sin comprometer "resultados medibles"); card de Medical 360 con un solo tag "UX / Product Design · Salud" y descripción nueva.
- **Sobre mí:** lead reescrito en dos párrafos (el segundo usa la clase `.about__extended`, con menor jerarquía); descripción de experiencia en Prosys ampliada.
- **Habilidades:** título ahora "Habilidades y competencias"; se eliminó la etiqueta "IA" de la card Product Design.
- **Proceso:** descripción de la etapa "Validar" reescrita.
- **Contacto:** lead reescrito (disponibilidad para oportunidades UX / Product Design), sin la pregunta final.
- **proyecto-3 (Medical 360):** cita de la user persona actualizada con la etiqueta "frase representativa del perfil" sobre ella (clase `.pd-persona__quote-label`).

Detalle completo en `docs/contexto.md` → *Cambios recientes de contenido*. Las clases nuevas están documentadas en `docs/diseño.md`.

## Publicar en Netlify

**Opción 1 — Arrastrar y soltar:**
1. Entra a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta completa del proyecto.
3. Netlify publica el sitio y te da una URL `https://tu-sitio.netlify.app`.

**Opción 2 — Conectado a Git (recomendado para actualizaciones futuras):**
1. Sube este proyecto a un repositorio (GitHub/GitLab/Bitbucket).
2. En Netlify: *Add new site → Import an existing project* y conecta el repositorio.
3. Build command: (vacío — es un sitio estático). Publish directory: `.`
4. Netlify detecta `netlify.toml` automáticamente.

Después de publicar, activa **Forms** en el panel de Netlify (Site settings → Forms) para empezar a recibir los mensajes del formulario de contacto.

## Próximos pasos sugeridos

- Sustituir las páginas `proyectos/proyecto-N.html` por los casos de estudio completos a medida que los tengas listos — el sistema de diseño (variables CSS, componentes) ya está preparado para que se vean consistentes con el resto del sitio.
- Agregar imágenes reales de los proyectos en `assets/img/` y reemplazar los fondos con degradado por `<img>`.
- Conectar un dominio propio en Netlify (Site settings → Domain management).
