Quiero que construyas un WIREFRAME FUNCIONAL MOBILE FIRST para una web app responsive de ticketing llamada Vibra.

IMPORTANTE:

Esta etapa NO corresponde al diseño UI final.

El objetivo es construir y validar:

- arquitectura;
- navegación;
- jerarquía;
- interacción;
- User Flow;
- funcionalidades;
- comportamiento de componentes;
- selección de entradas;
- selección de sectores;
- selección de asientos;
- identificación;
- checkout;
- acceso posterior a las entradas.

NO diseñes todavía la identidad visual final.

NO utilizar:
- fotografías reales;
- gradients decorativos;
- ilustraciones;
- sombras sofisticadas;
- animaciones decorativas;
- estilos visuales finales;
- marketing visual;
- branding complejo.

Trabajar como WIREFRAME DE MEDIA FIDELIDAD FUNCIONAL.

Utilizar:
- escala de grises;
- bordes simples;
- placeholders;
- tipografía neutra;
- iconografía funcional;
- jerarquía clara;
- componentes reutilizables.

Puede utilizarse un único color auxiliar para indicar:
- selección;
- estados activos;
- elementos interactivos.

La prioridad absoluta es UX + interacción + funcionalidad.

==================================================
01. ROL
==================================================

Trabaja como:

- Senior UX Designer
- Senior Product Designer
- Interaction Designer
- Information Architect

No diseñes simplemente pantallas.

Construye un SISTEMA DE TICKETING capaz de adaptarse a diferentes configuraciones de eventos.

Pregunta constantemente:

¿Qué necesita saber el usuario ahora?

¿Qué decisión debe tomar?

¿Qué información puede esperar?

¿Qué información debe permanecer visible?

¿Cómo reducimos carga cognitiva?

¿Cómo evitamos pasos innecesarios?

==================================================
02. PRINCIPIO CENTRAL
==================================================

Toda la experiencia debe seguir:

"Reducir complejidad sin reducir posibilidades."

Principios:

1. Mobile First.
2. Progressive Disclosure.
3. Menor fricción.
4. Una entidad, múltiples opciones.
5. Información antes que decoración.
6. Evolucionar patrones conocidos antes que reemplazarlos.

==================================================
03. CONTEXTO DE USO
==================================================

La información disponible durante el proyecto indicaba que la gran mayoría de las compras de usuarios finales ocurría desde smartphones.

Por eso NO diseñes una página desktop comprimida.

Diseña una experiencia realmente pensada para:

- pantalla pequeña;
- interacción táctil;
- lectura rápida;
- decisiones secuenciales;
- controles accesibles;
- poca información simultánea.

Touch targets mínimos aproximados: 44px.

Evitar:
- tablas;
- navegación excesiva;
- grandes cantidades de información simultánea;
- controles pequeños;
- mapas imposibles de manipular;
- formularios demasiado largos.

==================================================
04. MODELO DE PRODUCTO
==================================================

Vibra NO debe tratar:

evento + fecha + ciudad

como eventos completamente independientes cuando pertenecen a la misma experiencia.

Modelo conceptual:

EVENTO
↓
FECHAS / UBICACIONES
↓
ENTRADAS

Ejemplo:

Festival / Tour
→ Santiago — 15 octubre
→ Concepción — 18 octubre
→ Puerto Montt — 22 octubre

El evento es la entidad principal.

Fecha y ubicación son variantes seleccionables.

==================================================
05. ARQUITECTURA PRINCIPAL
==================================================

La web app debe contemplar:

VIBRA

INICIO / DESCUBRIMIENTO
- Descubrir
- Eventos
- Categorías
- Buscar
- Resultados

EVENTO
- Información
- Fechas
- Ciudades / recintos
- Precios
- Comprar

COMPRA
- Selección
- Identificación
- Resumen
- Pago
- Confirmación

MI CUENTA
- Mis entradas
- Mis compras
- Datos personales

AYUDA
- Centro de ayuda
- Preguntas frecuentes
- Contacto

INFORMACIÓN LEGAL
- Términos y condiciones
- Política de venta
- Política de privacidad

La experiencia completa para PRODUCTORES queda fuera de este wireframe B2C.

Puede existir únicamente un acceso secundario "Vende con nosotros" si resulta necesario para respetar la arquitectura.

NO diseñar dashboard B2B en esta etapa.

==================================================
06. USER FLOW PRINCIPAL
==================================================

El objetivo principal es:

"Encontrar y comprar una entrada."

El User Flow tiene tres macroetapas:

01 DESCUBRIMIENTO
02 SELECCIÓN
03 CHECKOUT

Flujo:

INICIO
↓
DESCUBRIR
↓
EVENTO
↓
FECHA / UBICACIÓN
↓
SELECCIÓN DE ENTRADA

Desde aquí el sistema debe soportar CUATRO modalidades.

==================================================
07. MODALIDAD A — ENTRADA GENERAL
==================================================

Flujo:

Evento
→ Fecha/ubicación si corresponde
→ Entrada general
→ Cantidad
→ Continuar

Diseñar selector de cantidad simple.

Ejemplo:

Entrada general
$XX.XXX

[-] 2 [+]

Mostrar disponibilidad solamente si corresponde.

CTA:

Continuar

==================================================
08. MODALIDAD B — POR SECTOR
==================================================

Flujo:

Evento
→ Sector
→ Cantidad
→ Continuar

Mostrar sectores disponibles.

Cada sector debe comunicar como mínimo:

- nombre;
- precio;
- disponibilidad/estado cuando corresponda.

Ejemplo:

CANCHA
Desde $XX.XXX
Disponible

PLATEA
Desde $XX.XXX
Disponible

VIP
Desde $XX.XXX
Pocas disponibles

Después:

Sector seleccionado
→ Cantidad
→ Continuar

NO utilizar mapa de asientos si el evento solamente vende por sector.

==================================================
09. MODALIDAD C — ASIENTO NUMERADO
==================================================

Esta interacción es CRÍTICA.

Problema detectado:

Algunas localidades podían contener cientos de asientos.

Mostrar todos simultáneamente genera una carga cognitiva especialmente alta en mobile.

NO mostrar inmediatamente cientos de asientos.

Aplicar Progressive Disclosure.

Flujo:

RECINTO
↓
SECTOR / LOCALIDAD
↓
SUBZONA
↓
ASIENTO

Ejemplo:

PLATEA BAJA
↓
Subzona A
Subzona B
Subzona C

Las subzonas pertenecientes a una misma localidad deben mantener una relación visual clara.

Después de seleccionar una subzona:

mostrar únicamente los asientos pertenecientes a esa subzona.

Ejemplo conceptual:

Sector completo:
~300 asientos.

Subzona:
~100 asientos.

El objetivo NO es reducir las opciones.

El objetivo es reducir cuántas opciones debe procesar el usuario simultáneamente.

==================================================
10. MAPA DE ASIENTOS MOBILE
==================================================

Crear un mapa funcional simplificado.

Debe permitir:

- visualizar escenario;
- comprender orientación;
- distinguir asientos disponibles;
- distinguir ocupados;
- distinguir seleccionados;
- seleccionar/deseleccionar asiento;
- seleccionar varios asientos;
- visualizar número del asiento;
- conocer sector/subzona;
- conocer precio.

NO priorizar realismo visual.

Priorizar usabilidad.

Cuando se seleccione un asiento:

mostrar inmediatamente:

Asiento seleccionado
Sector
Fila
Número
Precio

Si se seleccionan varios:

mostrar resumen persistente:

2 entradas seleccionadas
$XX.XXX

[Continuar]

El usuario no debe perder contexto de lo seleccionado.

==================================================
11. MODALIDAD D — ENTRADA NOMINATIVA
==================================================

Flujo:

Evento
→ Tipo/Sector
→ Cantidad
→ Datos asistentes
→ Continuar

Ejemplo:

3 entradas seleccionadas.

NO mostrar tres formularios enormes simultáneamente.

Aplicar Progressive Disclosure.

Mostrar:

DATOS DE ASISTENTES

✓ Asistente 1
Datos completos

○ Asistente 2
Agregar datos →

○ Asistente 3
Agregar datos →

Al seleccionar un asistente:

abrir su formulario.

Campos solamente necesarios.

Después de guardar:

volver al listado.

No permitir continuar hasta completar los datos obligatorios.

Mostrar progreso:

2 de 3 asistentes completados.

==================================================
12. IDENTIFICACIÓN
==================================================

Después de completar cualquiera de las cuatro modalidades, las rutas deben CONVERGER.

Mostrar:

"¿Cómo quieres continuar?"

Opción A:

INICIAR SESIÓN

Opción B:

COMPRA RÁPIDA

La compra rápida debe utilizar principalmente:

Correo electrónico

Explicar brevemente:

"Usaremos este correo para enviarte la confirmación y tus entradas."

NO obligar a crear una cuenta antes de pagar.

IMPORTANTE:

Esta compra rápida es una hipótesis de diseño que estamos explorando.

==================================================
13. CHECKOUT COMÚN
==================================================

Después de identificación:

RESUMEN
↓
PAGO
↓
CONFIRMACIÓN
↓
MI ENTRADA

El checkout debe ser común independientemente de la modalidad de entrada.

==================================================
14. RESUMEN
==================================================

Crear pantalla de resumen clara.

Mostrar:

EVENTO
Nombre

FECHA
Día / hora

RECINTO
Nombre

ENTRADAS
Cantidad

Si corresponde:
Sector

Si corresponde:
Subzona

Si corresponde:
Fila / asiento

Si corresponde:
Asistentes

PRECIO
Subtotal
Cargos
Total

El TOTAL debe tener alta jerarquía.

Permitir editar selección antes de pagar.

CTA:

Continuar al pago

==================================================
15. PAGO
==================================================

Crear wireframe funcional de pago.

NO implementar integración bancaria real.

Mostrar placeholder funcional para:

Medio de pago

Resumen compacto

Total

CTA:

Pagar $XX.XXX

No inventar medios de pago específicos si no son necesarios para validar UX.

==================================================
16. CONFIRMACIÓN
==================================================

Después de simular pago exitoso:

Mostrar:

"¡Compra confirmada!"

Evento
Fecha
Recinto
Entradas
Número de orden ficticio

CTA principal:

"Ver mis entradas"

CTA secundario:

"Volver al inicio"

==================================================
17. MI ENTRADA
==================================================

Crear ticket digital funcional.

Mostrar:

Nombre evento
Fecha
Hora
Recinto
Sector
Fila/asiento cuando corresponda
Titular cuando corresponda

QR PLACEHOLDER

Estado:

Entrada válida

Acciones:

Ver detalles
Descargar entrada

No implementar Wallet todavía.

Wallet pertenece a oportunidades futuras.

==================================================
18. DESCUBRIMIENTO / HOME
==================================================

La Home debe permitir descubrir eventos sin generar ruido.

NO utilizar un diseño editorial final.

Estamos validando estructura.

Incluir:

Header mobile

Logo placeholder "Vibra"

Buscar

Categorías

Eventos destacados

Próximos eventos

Eventos por categoría

Cada card debe tener información mínima:

Placeholder imagen
Categoría
Evento
Fecha o rango
Ubicación
Precio desde
CTA

==================================================
19. EVENTOS CON MÚLTIPLES FECHAS
==================================================

NO duplicar tarjetas por ciudad.

Ejemplo:

UNA CARD:

KISS
End of the Road

10 fechas

Desde $XX.XXX

[Ver fechas]

Al entrar:

EVENTO
↓
FECHAS Y UBICACIONES

Santiago
15 octubre
Recinto

Concepción
18 octubre
Recinto

Puerto Montt
22 octubre
Recinto

Usuario selecciona una.

Luego:

Comprar entradas.

==================================================
20. BÚSQUEDA
==================================================

Crear búsqueda funcional.

Permitir buscar por:

- evento;
- artista;
- recinto.

Mostrar resultados.

Agregar filtros básicos únicamente si aportan valor:

Categoría
Fecha
Ciudad

No sobrecargar filtros mobile.

Usar drawer/bottom sheet cuando sea apropiado.

==================================================
21. DETALLE DEL EVENTO
==================================================

Debe priorizar información necesaria para decidir.

Orden aproximado:

Evento
Categoría
Fecha(s)
Recinto
Precio desde
Disponibilidad
Descripción breve
Información relevante
CTA Comprar entradas

Si tiene múltiples fechas:

CTA:

"Ver fechas y entradas"

El CTA de compra debe permanecer fácilmente accesible.

==================================================
22. NAVEGACIÓN MOBILE
==================================================

Diseñar navegación simple.

Priorizar:

Inicio
Buscar / Explorar
Mis entradas
Cuenta

Ayuda y legal pueden vivir en menú secundario.

NO colocar toda la arquitectura en navegación principal.

La arquitectura de información representa el sistema completo, no necesariamente el menú.

==================================================
23. MI CUENTA
==================================================

Crear versión funcional básica.

MI CUENTA

Mis entradas
Mis compras
Datos personales
Cerrar sesión

MIS ENTRADAS

Próximas
Pasadas

Cada ticket:

Evento
Fecha
Recinto
Estado

CTA:

Ver entrada

==================================================
24. AYUDA
==================================================

Crear:

Centro de ayuda

Preguntas frecuentes

Contacto

Puede ser una estructura funcional simple.

No desarrollar contenido exhaustivo.

==================================================
25. LEGAL
==================================================

Crear acceso secundario a:

Términos y condiciones
Política de venta
Política de privacidad

No generar textos legales extensos.

Usar contenido placeholder claramente identificado.

==================================================
26. ESTADOS IMPORTANTES
==================================================

Aunque no debemos convertir esto en un flowchart técnico, el prototipo sí debe contemplar algunos estados UX esenciales:

Loading

Empty state

Sin resultados

Sold out / agotado

Asiento disponible

Asiento ocupado

Asiento seleccionado

Error básico de formulario

Pago simulado exitoso

NO construir todavía todos los edge cases posibles.

==================================================
27. DATOS FICTICIOS
==================================================

Usar eventos y usuarios completamente ficticios.

NO utilizar marcas reales.

NO utilizar Ticketpro.

NO utilizar información confidencial.

Los precios pueden ser ficticios en CLP.

==================================================
28. COMPONENTES FUNCIONALES
==================================================

Construir componentes reutilizables para:

Header
Navigation
Search
Filter
Category chip
Event Card
Date Selector
Venue Selector
Sector Selector
Subzone Selector
Seat
Seat Map
Quantity Selector
Ticket Type
Attendee
Input
Button
Bottom Sheet
Modal
Order Summary
Digital Ticket
Feedback states

NO invertir tiempo todavía en styling sofisticado.

==================================================
29. INTERACCIÓN
==================================================

Este wireframe debe ser NAVEGABLE.

No quiero solamente pantallas estáticas.

Las interacciones principales deben funcionar.

Como mínimo debe poder probarse:

TASK 01
Encontrar un evento y comprar 2 entradas generales.

TASK 02
Encontrar un evento y comprar 2 entradas de un sector.

TASK 03
Encontrar un evento numerado:
→ elegir sector
→ elegir subzona
→ seleccionar 2 asientos
→ comprar.

TASK 04
Comprar 3 entradas nominativas:
→ seleccionar cantidad
→ completar asistentes
→ continuar.

TASK 05
Completar una compra mediante Compra rápida.

TASK 06
Después de comprar:
→ acceder a Mi entrada.

==================================================
30. PROTOTIPO / NAVEGACIÓN
==================================================

Todos los CTA relevantes deben navegar.

No crear botones decorativos sin comportamiento cuando formen parte del flujo principal.

Debe ser posible recorrer:

HOME
→ EVENTO
→ SELECCIÓN
→ IDENTIFICACIÓN
→ RESUMEN
→ PAGO
→ CONFIRMACIÓN
→ ENTRADA

También:

HOME
→ BUSCAR
→ RESULTADOS
→ EVENTO

Y:

HOME
→ MI CUENTA
→ MIS ENTRADAS
→ ENTRADA

==================================================
31. NO DISEÑAR DESKTOP TODAVÍA
==================================================

IMPORTANTE.

En esta primera etapa generar únicamente MOBILE.

Viewport de referencia aproximado:

390px.

El sistema debe estar preparado estructuralmente para ser responsive, pero NO diseñar todavía layouts desktop.

Primero debemos validar la lógica Mobile First.

Posteriormente adaptaremos ESTE MISMO SISTEMA a desktop.

==================================================
32. NO HACER TODAVÍA
==================================================

NO aplicar identidad visual final de Vibra.

NO crear high fidelity UI.

NO usar la paleta final.

NO crear animaciones decorativas.

NO implementar Wallet.

NO implementar GPS.

NO implementar recomendaciones.

NO implementar dashboard productor.

NO inventar funcionalidades.

NO crear cuatro checkouts diferentes.

NO duplicar eventos por ciudad.

NO mostrar cientos de asientos simultáneamente.

NO obligar al usuario a registrarse antes de comprar.

NO construir desktop.

NO optimizar visualmente antes de resolver la interacción.

==================================================
33. RESULTADO ESPERADO
==================================================

El resultado debe sentirse como un prototipo funcional de MEDIA FIDELIDAD creado para evaluar arquitectura, interacción y flujo.

Debe permitir que un UX Designer pueda realizar posteriormente pruebas de usabilidad sobre:

- descubrimiento;
- eventos multifecha;
- entrada general;
- selección por sector;
- selección de asiento;
- progressive disclosure;
- entrada nominativa;
- compra rápida;
- checkout;
- recuperación de entrada.

Priorizar siempre:

CLARIDAD
↓
INTERACCIÓN
↓
CONSISTENCIA
↓
FUNCIONALIDAD

por encima de estética.

Antes de finalizar revisa cada pantalla preguntando:

"¿Esta pantalla ayuda al usuario a tomar la siguiente decisión necesaria?"

Si la respuesta es no, simplifícala.