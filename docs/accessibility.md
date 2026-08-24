# Accesibilidad — PepEspaña

Este documento recoge los criterios de accesibilidad aplicados y pendientes en **PepEspaña**.

La accesibilidad se considera parte del desarrollo, no una auditoría que únicamente se realiza al final.

---

## 1. Principio general

La interfaz debe poder utilizarse de manera comprensible incluso cuando el usuario:

- no utiliza ratón;
- utiliza teclado;
- utiliza touch;
- utiliza tecnologías asistivas;
- ha reducido las animaciones;
- utiliza una pantalla pequeña;
- tiene dificultades para percibir contraste o movimiento.

---

## 2. Estado actual

Ya existen decisiones relacionadas con accesibilidad:

- HTML semántico;
- `alt` obligatorio en productos;
- `aria-hidden` para determinados elementos decorativos;
- `prefers-reduced-motion`;
- interacción táctil segura;
- Product Cards no dependientes exclusivamente de hover;
- headings estructurados.

La auditoría final sigue pendiente.

---

## 3. HTML semántico

Se priorizan elementos con significado real.

Ejemplos:

```text
main
nav
section
article
a
h1
h2
h3
```

Se evita utilizar `<div>` para todo cuando existe un elemento más apropiado.

---

## 4. Main

La página debe contener un área principal clara.

Actualmente:

```tsx
<main>
```

contiene la estructura principal de la landing.

---

## 5. Navigation

La navegación debe implementarse mediante:

```html
<nav>
```

y enlaces reales.

No se deben sustituir enlaces por `div` con `onClick`.

---

## 6. Links vs buttons

Regla:

```text
navegar
→ <a>

ejecutar acción
→ <button>
```

Un CTA que lleva a `#contacto` es navegación y puede utilizar un enlace.

---

## 7. Headings

Debe existir una jerarquía lógica.

Ejemplo:

```text
H1
└── H2
    └── H3
```

No se elige un heading únicamente por su tamaño visual.

---

## 8. Alt text

Toda imagen informativa necesita una descripción alternativa adecuada.

Ejemplo:

```tsx
alt="Vial de Tesamorelina"
```

---

## 9. Imágenes decorativas

Una imagen o elemento puramente decorativo no debe añadir ruido innecesario a tecnologías asistivas.

Cuando proceda puede utilizar:

```text
aria-hidden="true"
```

o `alt=""`, dependiendo del elemento.

---

## 10. Glows

Los glows, reflejos y gradientes decorativos no deben anunciarse como contenido.

---

## 11. Alt y SEO

El `alt` no se utiliza para introducir palabras clave.

Debe describir la función o contenido visual.

---

## 12. Reduced motion

La aplicación respeta:

```text
prefers-reduced-motion
```

especialmente en `VialVisual`.

---

## 13. useReducedMotion

Motion permite consultar esta preferencia mediante:

```tsx
useReducedMotion()
```

La aplicación utiliza este valor para simplificar comportamiento.

---

## 14. Qué reducir

Cuando reduced motion está activo deben limitarse:

- idle loops;
- pointer parallax;
- rotaciones;
- levitación constante;
- desplazamientos grandes;
- transiciones innecesarias.

---

## 15. Contenido con reduced motion

Desactivar movimiento no debe eliminar contenido.

La página debe mantener:

- información;
- enlaces;
- jerarquía;
- navegación;
- funcionalidad.

---

## 16. Touch

Las interacciones táctiles no deben depender de hover.

El usuario debe poder identificar:

- producto;
- CTA;
- navegación;
- contacto;

sin mover un cursor inexistente.

---

## 17. Scroll táctil

`VialVisual` no debe bloquear el scroll vertical.

La interacción respeta el comportamiento natural del dispositivo.

---

## 18. Pointer tracking

El seguimiento de puntero se limita a dispositivos donde tiene sentido.

No se intenta reproducir artificialmente el mismo efecto mediante touch si perjudica usabilidad.

---

## 19. Focus

Todos los elementos interactivos deben tener un estado de foco visible.

Esto debe verificarse especialmente en:

- navegación;
- CTAs;
- formulario;
- enlaces del footer.

---

## 20. No eliminar outline sin sustituto

No debe utilizarse:

```css
outline: none;
```

sin proporcionar una alternativa visible.

---

## 21. Keyboard

La web debe poder recorrerse mediante:

```text
Tab
Shift + Tab
Enter
Space
```

según corresponda.

---

## 22. Orden de tabulación

El orden del teclado debe seguir la estructura visual y lógica del documento.

No se debe manipular `tabindex` para crear un orden artificial salvo necesidad justificada.

---

## 23. Skip link

Antes de producción se evaluará añadir un enlace:

```text
Saltar al contenido
```

especialmente si la navegación crece.

---

## 24. Contraste

La dirección Dark Biotech utiliza fondo oscuro y texto claro.

Esto no garantiza automáticamente suficiente contraste.

Deben medirse combinaciones reales.

---

## 25. Texto principal

El texto principal utiliza aproximadamente:

```text
#F4F7FA
```

sobre:

```text
#05070B
```

lo que proporciona una separación visual alta.

---

## 26. Texto secundario

El color muted:

```text
#8D99A8
```

debe comprobarse especialmente cuando se utiliza en tamaños pequeños.

---

## 27. Cyan

El color:

```text
#35C2FF
```

se utiliza como acento.

No debe utilizarse como único mecanismo para comunicar estado.

---

## 28. Color no es suficiente

Ejemplo:

```text
error
```

no debe comunicarse únicamente cambiando un borde a rojo.

Debe existir también texto o información equivalente.

---

## 29. Tamaño de texto

Los textos deben mantenerse legibles en mobile.

No se reducirá tipografía únicamente para conseguir que una composición "quepa".

---

## 30. Zoom

La interfaz deberá seguir funcionando con zoom aumentado.

No se deben bloquear capacidades de zoom del navegador.

---

## 31. Responsive

Mobile no debe ser una versión recortada funcionalmente.

Puede simplificar:

- layout;
- motion;
- composición;

pero no eliminar acciones necesarias.

---

## 32. Product Cards

Las cards contienen:

- imagen;
- nombre;
- descripción;
- enlace.

El contenido sigue siendo comprensible sin hover.

---

## 33. Cards no-clickables completas

Actualmente la card completa no se convierte automáticamente en enlace.

Esto evita introducir una gran superficie interactiva ambiguamente si el destino real es únicamente el CTA de contacto.

Si en el futuro existen páginas individuales, se reevaluará.

---

## 34. CTA de producto

Actualmente:

```text
Consultar producto
```

es visible incluso sin hover.

El movimiento de la flecha es decorativo.

---

## 35. aria-hidden

La flecha decorativa puede utilizar:

```tsx
aria-hidden="true"
```

porque el texto ya comunica la acción.

---

## 36. Formularios

La futura sección Contact requerirá atención específica.

Cada campo deberá utilizar un label real.

---

## 37. Placeholder

Un placeholder no sustituye a:

```html
<label>
```

---

## 38. Campos obligatorios

Los campos requeridos deben comunicarse visual y semánticamente.

---

## 39. Errores

Los mensajes de error deben:

- identificar el problema;
- indicar cómo corregirlo;
- estar asociados al campo correspondiente;
- ser comprensibles.

---

## 40. Validación

No debe desaparecer el texto introducido tras un error evitable.

---

## 41. Focus en errores

Cuando el formulario falle se evaluará dirigir correctamente el foco hacia:

- resumen de errores;
- primer campo inválido;

según la implementación final.

---

## 42. Estado de envío

El usuario debe conocer si el formulario está:

```text
enviando
enviado
fallido
```

---

## 43. Botón disabled

Si se desactiva el botón durante envío debe seguir existiendo información de estado.

---

## 44. Loading

Un spinner sin texto puede no ser suficiente.

Se evaluará incluir contenido accesible como:

```text
Enviando...
```

---

## 45. Success

El mensaje de éxito debe ser accesible a tecnologías asistivas.

---

## 46. Antispam

Las soluciones antispam no deben convertir el formulario en una barrera innecesaria.

Se preferirán mecanismos discretos cuando sea posible.

---

## 47. Autocomplete

Los campos de información personal deberán utilizar atributos `autocomplete` apropiados cuando corresponda.

---

## 48. Input types

Ejemplo:

```html
<input type="email">
```

debe utilizarse para email.

Esto mejora validación y teclados móviles.

---

## 49. Language

El documento deberá declarar el idioma adecuado:

```text
es
```

si la versión final es española.

---

## 50. Title

Cada página futura deberá tener un título comprensible.

---

## 51. Anchors

Los anchors internos deben llevar al usuario a una ubicación significativa.

Si existe Navbar fixed, debe comprobarse que el encabezado de destino no quede oculto.

---

## 52. Smooth scroll

El scroll suave no debe imponerse de manera problemática a usuarios que prefieren reduced motion.

---

## 53. Motion decorativo

Las animaciones decorativas no deben exigir una acción del usuario para acceder al contenido.

---

## 54. Auto-play

Actualmente no existe vídeo autoplay.

Si se introduce en el futuro, deberá evaluarse:

- sonido;
- controles;
- movimiento;
- rendimiento;
- reduced motion.

---

## 55. Flashing

No se utilizarán flashes o cambios rápidos de luminancia.

La dirección visual no requiere este tipo de efecto.

---

## 56. Blur

El uso de blur debe mantenerse decorativo y no reducir la legibilidad del contenido.

---

## 57. Text over image

Cuando exista texto sobre fondos complejos deberá preservarse contraste suficiente.

---

## 58. Navbar mobile

La navegación móvil definitiva sigue pendiente.

Si se implementa menú desplegable deberá considerar:

- botón accesible;
- `aria-expanded`;
- foco;
- cierre;
- Escape;
- navegación por teclado.

---

## 59. Menu icon

Un icono de hamburguesa necesita un nombre accesible.

Ejemplo:

```text
Abrir menú
```

---

## 60. Dialog

Si el menú mobile se implementa como overlay/dialog, habrá que gestionar correctamente:

- foco;
- cierre;
- escape;
- background interaction.

---

## 61. Footer

Los enlaces del futuro footer deberán ser identificables y utilizables mediante teclado.

---

## 62. External links

Si algún enlace abre una nueva pestaña se debe decidir conscientemente.

No se utilizará `target="_blank"` por defecto en todo.

---

## 63. Telegram y email

Los futuros accesos a Telegram y correo deberán utilizar textos de enlace claros.

---

## 64. Icon-only buttons

Si aparecen botones únicamente con iconos, necesitarán un nombre accesible.

Ejemplo:

```tsx
aria-label="Abrir Telegram"
```

---

## 65. Semántica de productos

Cada producto se representa mediante:

```html
<article>
```

y utiliza un heading para su nombre.

Esto facilita comprensión estructural.

---

## 66. IDs

Los IDs utilizados para anchors deben ser:

- únicos;
- estables;
- descriptivos.

Ejemplos:

```text
productos
contacto
```

---

## 67. Screen readers

Antes de producción se realizará al menos una revisión básica con tecnología de lectura de pantalla disponible.

---

## 68. DevTools

También se utilizarán herramientas automáticas como apoyo.

Por ejemplo:

- Lighthouse;
- Accessibility Tree;
- axe si se incorpora al flujo.

Ninguna herramienta automática sustituye completamente una revisión manual.

---

## 69. Lighthouse

Una puntuación alta no significa accesibilidad perfecta.

Puede no detectar problemas de:

- redacción;
- orden lógico;
- interacción;
- intención;
- experiencia real.

---

## 70. WCAG

La revisión final tomará como referencia WCAG vigente aplicable al proyecto.

No se afirmará cumplimiento formal de un nivel concreto sin realizar una auditoría suficientemente rigurosa.

---

## 71. No falsas afirmaciones

No se publicará:

```text
100% accesible
WCAG AA compliant
```

si no se ha realizado una validación capaz de respaldarlo.

---

## 72. QA mínimo

Antes del lanzamiento:

- [ ] Tab completo
- [ ] Shift+Tab
- [ ] Enter
- [ ] foco visible
- [ ] touch
- [ ] reduced motion
- [ ] headings
- [ ] landmarks
- [ ] alt
- [ ] contraste
- [ ] zoom
- [ ] mobile
- [ ] errores de formulario
- [ ] mensajes de éxito
- [ ] navegación
- [ ] anchors
- [ ] menú mobile
- [ ] lector de pantalla básico

---

## 73. Estado actual

Implementado parcialmente:

- estructura semántica;
- alt;
- reduced motion;
- touch;
- contenido independiente de hover;
- elementos decorativos excluidos cuando procede.

Pendiente:

- navegación mobile;
- formulario;
- focus completo;
- contrast audit;
- keyboard QA;
- screen reader QA;
- accesibilidad final.

---

## 74. Documentación relacionada

Consultar:

```text
docs/architecture.md
docs/motion.md
docs/assets.md
docs/seo.md
docs/deployment.md
```

Este documento debe evolucionar conforme entren nuevos componentes interactivos.