# Motion — PepEspaña

Este documento define la estrategia de movimiento e interacción visual de **PepEspaña**.

El objetivo no es animar toda la interfaz.

El movimiento debe reforzar:

- jerarquía;
- profundidad;
- percepción de calidad;
- continuidad;
- interacción;
- narrativa visual.

---

## 1. Principio general

La regla principal es:

> El movimiento debe tener una función visual o interactiva concreta.

Se evita introducir animaciones únicamente porque sean técnicamente posibles.

---

## 2. Jerarquía de movimiento

La interfaz utiliza diferentes niveles de intensidad.

```text
Hero
→ interacción protagonista

Secciones
→ transición y narrativa

Product Cards
→ microinteracción

Elementos secundarios
→ movimiento mínimo o inexistente
```

Si todos los elementos se animan con la misma intensidad, la interfaz pierde jerarquía.

---

## 3. Tecnología

Las interacciones complejas utilizan:

```text
Motion
```

Import actual:

```tsx
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
```

---

## 4. CSS vs Motion

No todas las animaciones utilizan Motion.

Principio:

```text
interacción simple
→ CSS / Tailwind

interacción compleja
→ Motion
```

Ejemplo simple:

```text
hover de ProductCard
```

puede resolverse con:

- `transform`;
- `transition`;
- `opacity`;
- Tailwind.

Ejemplo complejo:

```text
VialVisual
```

necesita:

- Motion Values;
- Springs;
- valores derivados;
- pointer tracking;
- reduced motion.

---

## 5. Hero

El Hero es actualmente el elemento de mayor intensidad visual.

Su vial debe percibirse como:

- flotante;
- ligero;
- preciso;
- tridimensional dentro de límites controlados;
- integrado en la iluminación de la interfaz.

---

## 6. Asset 2D

El vial actual es una imagen PNG transparente.

No es un modelo 3D real.

Por tanto, el efecto se define como:

```text
2.5D
```

La ilusión de profundidad se consigue mediante pequeñas transformaciones.

---

## 7. Limitación del 2.5D

Una imagen plana no puede revelar ángulos laterales que no existen.

Por ello, los valores de rotación deben mantenerse contenidos.

Un giro excesivo revelaría inmediatamente la naturaleza plana del recurso.

---

## 8. Pointer tracking

En desktop, el vial reacciona al movimiento del puntero.

La posición se normaliza aproximadamente dentro del rango:

```text
-1 → 1
```

para ambos ejes.

Conceptualmente:

```text
cursor
↓
posición dentro del elemento
↓
normalización
↓
Motion Values
↓
springs
↓
transformaciones
```

---

## 9. Springs

Los valores del puntero no se aplican directamente.

Se suavizan mediante springs.

Configuración actual aproximada:

```ts
{
  stiffness: 120,
  damping: 18,
  mass: 0.55,
}
```

El objetivo es evitar una respuesta rígida o mecánica.

---

## 10. Rotate X

La posición vertical del cursor modifica:

```text
rotateX
```

aproximadamente dentro de:

```text
5° → -5°
```

---

## 11. Rotate Y

La posición horizontal modifica:

```text
rotateY
```

aproximadamente dentro de:

```text
-8° → 8°
```

La amplitud se mantiene deliberadamente baja.

---

## 12. Translate X

Existe también un pequeño desplazamiento horizontal aproximado:

```text
-8 px → 8 px
```

---

## 13. Translate Y

La interacción introduce un desplazamiento vertical aproximado:

```text
-5 px → 5 px
```

---

## 14. Perspectiva

El contenedor utiliza perspectiva CSS para que `rotateX` y `rotateY` produzcan profundidad visual.

Valor actual aproximado:

```text
1000px
```

---

## 15. Idle animation

Cuando el usuario no interactúa, el vial mantiene movimiento ambiental.

Actualmente combina:

```text
y
rotateZ
scale
```

con un ciclo suave.

---

## 16. Levitación

La oscilación vertical aproximada utiliza:

```text
0
→ -9 px
→ 0
```

con una duración aproximada de:

```text
6.4 s
```

---

## 17. Micro-rotación

El idle añade una rotación mínima en Z:

```text
-0.7°
→ 0.7°
→ -0.7°
```

No busca simular giro real.

Añade imperfección orgánica al movimiento.

---

## 18. Escala

La escala idle oscila aproximadamente entre:

```text
1
→ 1.012
→ 1
```

---

## 19. Hover

En desktop, el vial puede aumentar ligeramente de escala al pasar el puntero.

Escala aproximada:

```text
1.025
```

La respuesta debe ser sutil.

---

## 20. Highlight dinámico

La imagen incorpora un reflejo ambiental cuya posición responde al puntero.

Conceptualmente:

```text
cursor
↓
highlightX / highlightY
↓
radial-gradient
```

Los valores se mueven aproximadamente entre:

```text
38% → 62%
```

---

## 21. Blend

El reflejo utiliza composición visual mediante:

```text
mix-blend-screen
```

cuando es apropiado.

Debe revisarse en diferentes navegadores durante QA.

---

## 22. Glow ambiental

El Hero utiliza varias capas de glow.

No debe existir un único círculo azul intenso pegado detrás del producto.

La superposición de capas permite conseguir:

- profundidad;
- atmósfera;
- separación del fondo;
- percepción premium.

---

## 23. Glow breathing

El glow incorpora una respiración lenta.

Duración aproximada:

```text
5.8 s
```

El movimiento debe ser apenas perceptible.

---

## 24. Reflexión inferior

Existe una segunda zona de iluminación bajo el vial.

Su función es simular una reflexión ambiental y evitar que el producto parezca suspendido sin relación con el entorno.

---

## 25. Entrada inicial

El vial utiliza una animación de entrada aproximada:

```text
opacity: 0 → 1
scale: 0.94 → 1
y: 24 → 0
```

Duración aproximada:

```text
1.05 s
```

---

## 26. Movimiento táctil

El pointer tracking no debe interferir con el scroll en dispositivos táctiles.

La lógica actual ignora la interacción compleja cuando el dispositivo utiliza touch.

---

## 27. `touch-pan-y`

El contenedor permite explícitamente el desplazamiento vertical táctil.

Esto evita que la interacción visual bloquee el comportamiento natural de la página.

---

## 28. Reduced motion

El componente utiliza:

```tsx
useReducedMotion()
```

Cuando el usuario solicita movimiento reducido deben eliminarse o simplificarse:

- idle loops;
- pointer tracking;
- parallax;
- rotaciones continuas;
- movimientos no esenciales.

---

## 29. Accesibilidad

`prefers-reduced-motion` no es un detalle opcional.

Forma parte de la definición técnica de cada animación relevante.

---

## 30. Product Cards

Las Product Cards utilizan una intensidad menor.

Actualmente reaccionan mediante:

- elevación ligera;
- borde;
- glow;
- escala del vial;
- desplazamiento vertical;
- CTA.

---

## 31. Elevación de card

En hover la card puede subir aproximadamente:

```text
4 px
```

Esto se implementa mediante `transform`.

No modifica el layout de los elementos vecinos.

---

## 32. Vial dentro de card

El vial aumenta ligeramente de escala:

```text
≈ 1.055
```

y sube aproximadamente:

```text
8 px
```

---

## 33. Glow de ProductCard

El glow permanece muy tenue en reposo y gana presencia durante hover.

No debe competir con el Hero.

---

## Quality

Quality utiliza una animación local de scroll deliberadamente más sobria que la escena Hero → Statement.

La sección no participa en `IntroJourney`.

Su propio progreso se calcula mediante:

```text
useScroll
+
useSpring
```

y controla principalmente:

```text
translateX
opacity
scaleX
```

La composición utiliza direcciones opuestas:

```text
contenido editorial
→ entra desde la izquierda

lista de principios
→ entra desde la derecha
```

La opacidad aumenta progresivamente mientras ambos bloques alcanzan su posición final.

El objetivo es mantener continuidad visual con Statement sin repetir su nivel de complejidad cinematográfica.

Cuando `prefers-reduced-motion` está activo, el contenido permanece directamente en su posición normal.

---

## 34. CTA

La flecha del CTA utiliza una pequeña separación visual en hover.

El objetivo es reforzar la percepción de acción sin introducir movimiento exagerado.

---

## 35. Sin idle constante en cards

Actualmente no se considera apropiado mantener los siete productos animándose de forma continua.

Esto generaría:

- ruido;
- pérdida de jerarquía;
- más trabajo de composición;
- potencial coste de rendimiento;
- cansancio visual.

---

## 36. Transform y opacity

Siempre que sea posible, se priorizan:

```text
transform
opacity
```

porque son propiedades adecuadas para animaciones fluidas.

---

## 37. Evitar layout animation accidental

No deben animarse repetidamente propiedades como:

```text
top
left
width
height
margin
```

si pueden sustituirse mediante transformaciones.

---

## 38. Will-change

No se debe aplicar `will-change` indiscriminadamente a todos los elementos.

Puede reservar recursos del navegador innecesariamente.

Solo se utilizará cuando exista una razón medida.

---

## 39. Scroll cinematográfico

La siguiente fase prevista conecta visualmente:

```text
Hero
↓
Products
```

mediante narrativa de scroll.

---

## 39. Narrativa Hero → Statement → Products

La transición cinematográfica ya está implementada.

Hero y Statement forman una única escena mediante:

```text
IntroJourney
```

El progreso global se calcula con:

```text
useScroll
+
useSpring
```

y se comparte entre los componentes participantes.

---

## 40. Timeline compartido

La escena utiliza un único MotionValue como reloj.

Conceptualmente:

```text
smoothProgress
      │
      ├── VialJourney
      │
      └── StatementReveal
```

Esto evita que cada componente mida el scroll independientemente.

La sincronización es determinista: un mismo valor de progreso representa el mismo instante para vial y contenido.

---

## 41. Recorrido del vial

La narrativa aproximada es:

```text
0.00 ─ 0.18
Hero estable

0.18 ─ 0.48
viaje diagonal derecha → izquierda

0.48 ─ 0.66
vial instalado en Statement

0.66 ─ 0.92
salida progresiva

0.92 ─ 1.00
Products queda visualmente limpio
```

Durante el viaje se transforman:

```text
x
y
scale
rotateZ
opacity
```

Estas transformaciones globales viven en `VialJourney`.

Las interacciones internas continúan perteneciendo a `VialVisual`:

```text
pointer tracking
rotateX
rotateY
idle
glow
highlight
```

---

## 42. Entrada sincronizada de Statement

`StatementReveal` utiliza el mismo progreso global que `VialJourney`.

La composición aparece progresivamente mediante:

```text
línea
↓
identificador editorial
↓
heading
↓
párrafo
```

Además del movimiento lateral se utiliza opacidad progresiva.

El contenido no alcanza presencia completa antes de la llegada del vial.

Esto permite que ambos elementos parezcan formar parte de una única coreografía en lugar de dos animaciones independientes.

## 40. Objetivo del handoff

Conceptualmente:

```text
vial Hero
↓
scroll
↓
escala
↓
desplazamiento
↓
rotación controlada
↓
transición visual
↓
Products
```

El objetivo no es realizar teleport literal del DOM si ello complica innecesariamente la arquitectura.

Debe priorizarse la percepción visual.

---

## 41. Scroll y rendimiento

El scroll animation debe evitar ejecutar cálculos costosos por cada frame mediante listeners manuales cuando Motion pueda resolverlo de forma declarativa.

Se evaluarán herramientas como:

```text
useScroll
useTransform
```

cuando llegue esa implementación.

---

## 42. Sticky

Puede evaluarse un tramo sticky si mejora la narrativa.

No debe utilizarse si genera:

- scroll artificial;
- problemas mobile;
- contenido atrapado;
- navegación incómoda.

---

## 43. Mobile scroll motion

La narrativa cinematográfica desktop puede simplificarse considerablemente en mobile.

Ejemplo:

```text
desktop
→ desplazamiento + escala + rotación

mobile
→ fade + translate
```

La experiencia móvil no necesita replicar exactamente todos los efectos desktop.

---

## 44. Breakpoints

Los efectos pueden adaptarse según:

- viewport;
- pointer precision;
- touch;
- reduced motion.

No debe asumirse que únicamente `width` determina la capacidad de interacción del dispositivo.

---

## 45. Motion y SEO

Las animaciones no deben ocultar permanentemente contenido indexable.

El contenido esencial debe existir en la estructura HTML independientemente del efecto visual.

---

## 46. Motion y navegación

Los anchors como:

```text
#productos
#contacto
```

deben seguir funcionando aunque Motion esté deshabilitado.

La animación mejora la experiencia.

No debe convertirse en requisito para navegar.

---

## 47. Motion y JavaScript

Cada Client Component añade responsabilidad al navegador.

Por eso no se convierte toda la landing en Client Component únicamente por utilizar animaciones en una sección.

---

## 48. Frontera cliente

Principio:

```text
Server Component
↓
estructura y contenido

Client Component
↓
interacción necesaria
```

---

## 49. No Three.js actualmente

Three.js no se utiliza porque el asset actual no es un modelo 3D.

Añadir un motor WebGL para rotar un PNG no aportaría 3D real.

---

## 50. Cuándo podría justificarse 3D

Podría evaluarse si el proyecto dispone de:

```text
.glb
.gltf
```

o un recurso tridimensional real con suficiente calidad.

También podría considerarse una secuencia de turntable bien optimizada.

---

## 51. Turntable

Una secuencia de imágenes podría simular un giro real del producto.

Sin embargo implicaría:

- múltiples assets;
- mayor peso;
- precarga;
- sincronización;
- responsive;
- consideración de rendimiento.

No se implementará sin evaluar su beneficio.

---

## 52. Browser QA

Los efectos deben probarse especialmente en:

- Chrome/Chromium;
- Firefox;
- Safari/WebKit.

Propiedades como blur y blend pueden producir diferencias visuales entre motores.

---

## 53. FPS

Una animación visualmente compleja pero con scroll entrecortado no es aceptable.

Durante QA se evaluará:

- fluidez;
- input responsiveness;
- coste de composición;
- dispositivos modestos.

---

## 54. Motion debugging

Cuando una animación se comporte mal se debe aislar:

```text
input
↓
Motion Value
↓
spring
↓
transform
↓
render
```

en lugar de ajustar valores aleatoriamente.

---

## 55. Filosofía visual

La dirección no busca una estética:

```text
gaming RGB
cyberpunk exagerado
neón constante
```

El movimiento debe conservar sensación:

```text
premium
clínica
tecnológica
precisa
```

---

## 56. Estado actual

Actualmente están implementados:

- [x] entrada del Hero;
- [x] idle;
- [x] pointer tracking;
- [x] 2.5D;
- [x] springs;
- [x] highlight;
- [x] glow;
- [x] reflexión;
- [x] touch safe;
- [x] reduced motion;
- [x] hover de ProductCard.

Pendiente:

- [ ] narrativa Hero → Products;
- [ ] transiciones de secciones;
- [ ] revisión responsive final;
- [ ] QA de movimiento;
- [ ] revisión de rendimiento.

---

## 57. Documentación relacionada

Consultar:

```text
docs/architecture.md
docs/assets.md
docs/accessibility.md
docs/seo.md
docs/deployment.md
```

Este documento debe actualizarse cuando cambie de forma significativa la estrategia de interacción.