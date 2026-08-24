# Assets — PepEspaña

Este documento define cómo se crean, organizan, nombran, optimizan y utilizan los recursos visuales de **PepEspaña**.

El objetivo es mantener una separación clara entre:

```text
assets maestros
≠
assets de trabajo
≠
previews
≠
assets de producción
```

Esta separación evita enviar al navegador archivos innecesarios y mantiene el repositorio limpio.

---

## 1. Principio general

Un archivo visual no debe entrar automáticamente en `public/` simplemente porque forme parte del proyecto.

`public/` contiene únicamente recursos que la aplicación necesita servir.

Principio:

```text
asset maestro
↓
edición
↓
validación
↓
optimización web
↓
asset de producción
↓
public/
```

---

## 2. Ubicación de assets de producción

Actualmente los assets de producto utilizados por la aplicación se encuentran en:

```text
public/images/products/
```

Estructura actual:

```text
public/
└── images/
    └── products/
        ├── bpc-157-vial.png
        ├── ipamorelina-vial.png
        ├── mots-c-vial.png
        ├── retatrutida-vial.png
        ├── semaglutida-vial.png
        ├── tesamorelina-vial.png
        ├── tirzepatida-vial.png
        └── vial-hero-mobile.png
```

Los siete primeros corresponden al catálogo.

`vial-hero-mobile.png` corresponde al visual principal utilizado actualmente en el Hero.

---

## 3. Assets maestros

Los originales y materiales de trabajo se mantienen fuera del directorio público de producción.

La gestión documental y visual del proyecto utiliza Google Drive para conservar:

- originales;
- renders;
- previews;
- versiones de edición;
- archivos intermedios;
- referencias;
- material aprobado;
- entregables.

Estos recursos no deben copiarse automáticamente al repositorio.

---

## 4. Por qué no guardar originales en `public/`

Todo archivo almacenado dentro de `public/` puede convertirse en un recurso accesible desde la aplicación desplegada.

Por ejemplo:

```text
public/images/example.png
```

puede servirse como:

```text
/images/example.png
```

Por esta razón, no debemos introducir en `public/`:

- previews;
- PSD;
- originales de alta resolución;
- versiones rechazadas;
- duplicados;
- renders intermedios;
- pruebas;
- archivos internos;
- documentación gráfica.

---

## 5. Naming

Los nombres de archivo deben ser:

- descriptivos;
- semánticos;
- claros;
- estables;
- en minúsculas;
- sin espacios;
- separados mediante guiones.

Ejemplos actuales:

```text
tesamorelina-vial.png
ipamorelina-vial.png
retatrutida-vial.png
```

---

## 6. Nombres que deben evitarse

No utilizar:

```text
image1.png
foto2.png
product-final.png
producto-nuevo.png
final-final.png
imagen-buena.png
test.png
```

Estos nombres no explican qué contiene el archivo y dificultan mantenimiento, búsqueda y reutilización.

---

## 7. SEO y naming

Los nombres semánticos también aportan contexto técnico a buscadores y herramientas de análisis.

Sin embargo, no deben convertirse en keyword stuffing.

Correcto:

```text
tesamorelina-vial.png
```

Incorrecto:

```text
comprar-tesamorelina-peptidos-espana-mejor-precio-barato.png
```

El nombre debe describir el recurso.

No debe intentar manipular el posicionamiento.

---

## 8. Alt text

El nombre de archivo y el atributo `alt` cumplen funciones distintas.

Ejemplo:

```text
tesamorelina-vial.png
```

puede utilizar:

```tsx
alt="Vial de Tesamorelina"
```

El `alt` debe describir la imagen de forma útil.

No debe utilizarse como contenedor de palabras clave.

---

## 9. Alt obligatorio en el catálogo

El modelo de producto incluye:

```ts
imageAlt: string;
```

como propiedad obligatoria.

Ejemplo:

```ts
{
  name: "Tesamorelina",
  image: "/images/products/tesamorelina-vial.png",
  imageAlt: "Vial de Tesamorelina",
}
```

Esto permite que TypeScript ayude a evitar productos sin descripción alternativa.

---

## 10. Assets transparentes

Los viales del catálogo utilizan actualmente fondo transparente.

Esta decisión permite que el mismo asset pueda integrarse sobre:

- fondos oscuros;
- gradientes;
- glows;
- cards;
- composiciones responsive;
- animaciones.

El entorno visual se genera principalmente mediante código.

---

## 11. Razón para separar vial y ambiente

El asset debería contener principalmente el producto.

Efectos como:

```text
glow
reflejo
highlight
sombra ambiental
parallax
hover
```

se generan preferentemente mediante CSS o Motion.

Esto permite ajustar el entorno visual sin tener que volver a exportar cada imagen.

---

## 12. Consistencia visual del catálogo

Los assets de producto deben mantener una percepción coherente en:

- escala;
- encuadre;
- iluminación;
- temperatura de color;
- margen transparente;
- orientación;
- contraste.

No es necesario que todos tengan dimensiones visuales idénticas píxel por píxel.

La prioridad es conseguir equilibrio perceptivo cuando se renderizan dentro de las cards.

---

## 13. Escala

La escala final del producto no se debe resolver únicamente dentro del PNG.

También se controla desde el componente.

Actualmente `ProductCard` utiliza dimensiones responsive mediante clases de Tailwind.

Esto permite realizar ajustes globales sin volver a editar siete imágenes.

---

## 14. Next/Image

Las imágenes se renderizan mediante:

```tsx
import Image from "next/image";
```

Ejemplo conceptual:

```tsx
<Image
  src={image}
  alt={imageAlt}
  width={500}
  height={650}
/>
```

Esto permite utilizar el sistema de imágenes de Next.js en lugar de depender exclusivamente de `<img>`.

---

## 15. `width` y `height`

Los atributos:

```tsx
width={500}
height={650}
```

definen una relación dimensional para el componente.

El tamaño visual final puede modificarse mediante CSS.

Por ejemplo:

```tsx
className="w-[260px] md:w-[280px]"
```

---

## 16. Responsive

El asset debe seguir siendo legible en:

```text
mobile
tablet
desktop
```

Una imagen que funciona visualmente en una card desktop puede resultar demasiado dominante en mobile.

Por ello, escala y espacio deben revisarse dentro del layout real.

---

## 17. Lazy loading

Las imágenes situadas fuera de la primera pantalla deben poder beneficiarse de carga diferida.

No se debe aplicar prioridad alta a todos los assets.

Principio:

```text
above-the-fold
→ evaluar prioridad

below-the-fold
→ carga diferida normalmente
```

---

## 18. LCP

Durante desarrollo Next.js detectó que una imagen del catálogo podía convertirse en Largest Contentful Paint en determinadas condiciones.

Esto no implica que todas las imágenes del catálogo deban utilizar carga eager.

La solución correcta requiere analizar primero qué elemento es realmente el LCP en el layout final.

No debe solucionarse indiscriminadamente mediante:

```text
eager para todas las imágenes
```

---

## 19. Hero asset

El vial principal utiliza actualmente:

```text
/images/products/vial-hero-mobile.png
```

Aunque el nombre incluye `mobile`, actualmente funciona como asset principal del Hero.

En una futura limpieza puede evaluarse si conviene renombrarlo si deja de representar una variante específicamente mobile.

Los cambios de nombre deben realizarse de manera controlada para no romper imports o referencias.

---

## 20. Formatos

Actualmente los assets principales utilizan PNG debido a la necesidad de transparencia.

Antes de producción se evaluará si existen ventajas reales en utilizar otros formatos compatibles con el pipeline final.

La decisión debe valorar:

- transparencia;
- calidad;
- peso;
- compatibilidad;
- optimización de Next.js.

---

## 21. Compresión

Antes del lanzamiento deben revisarse:

- tamaño en bytes;
- resolución real;
- dimensiones necesarias;
- compresión;
- artefactos;
- transparencias;
- coste total de descarga.

No se debe comprimir hasta degradar visiblemente un asset premium.

El objetivo es encontrar el equilibrio entre:

```text
calidad visual
↔
peso
```

---

## 22. Resolución

No tiene sentido servir una imagen extremadamente grande si nunca se muestra a una escala similar.

Se debe evitar:

```text
asset 5000 × 7000
↓
render a 260 px
```

si no existe una razón concreta para ello.

---

## 23. DPR

La optimización debe considerar pantallas de alta densidad.

El asset debe mantener suficiente resolución para verse limpio en dispositivos modernos sin ser desproporcionadamente pesado.

---

## 24. Diseño Dark Biotech

Los assets deben integrarse con la dirección visual:

```text
Dark Biotech
+
Editorial Science
```

Características:

- fondo oscuro;
- luz fría;
- azul profundo;
- cian;
- sensación clínica;
- vidrio;
- reflejos;
- precisión;
- limpieza.

---

## 25. Evitar fondos cuadrados incrustados

Los assets del catálogo no deben parecer:

```text
fotografía cuadrada
dentro de
card cuadrada
```

El objetivo es que el producto se perciba como un objeto integrado en el sistema visual de la página.

Por ello se utilizan versiones aisladas con transparencia.

---

## 26. Producto como foreground

La jerarquía visual de una card debería ser aproximadamente:

```text
ambiente
↓
glow
↓
producto
↓
información
↓
CTA
```

El vial ocupa el foreground visual de la zona gráfica.

---

## 27. Efectos destructivos

Evitar fusionar permanentemente dentro del asset efectos que probablemente necesiten ajustes posteriores.

Ejemplos:

- glow excesivo;
- sombras de fondo;
- gradientes;
- partículas;
- marcos;
- fondos completos.

Cuando sea posible, deben permanecer separados.

---

## 28. Decoración

Los elementos puramente decorativos generados por código deben marcarse correctamente para accesibilidad cuando proceda.

Ejemplo:

```tsx
aria-hidden="true"
```

No todo elemento visual necesita convertirse en una imagen independiente.

---

## 29. Asset vs CSS

Antes de crear un nuevo archivo gráfico debe preguntarse:

> ¿Esto necesita realmente ser una imagen?

Efectos como:

- gradientes;
- líneas;
- blur;
- glow;
- overlay;
- sombras;

pueden resolverse normalmente con CSS.

Esto reduce peticiones y facilita mantenimiento.

---

## 30. Asset vs Motion

Si un efecto necesita reaccionar al usuario, conviene mantenerlo separado del PNG.

Ejemplo:

```text
reflejo que sigue el puntero
```

debe generarse dinámicamente en lugar de exportarse fijo dentro del vial.

---

## 31. Previews

Las versiones de preview sirven para:

- revisión;
- aprobación;
- comparación;
- comunicación;
- documentación.

No tienen por qué ser las mismas utilizadas por la aplicación.

Las previews permanecen fuera de `public/` salvo necesidad explícita.

---

## 32. Flujo de aprobación

Flujo recomendado:

```text
original
↓
edición
↓
preview
↓
revisión
↓
aprobación
↓
export final transparente
↓
optimización
↓
public/
```

---

## 33. Sustitución de assets

Cuando un archivo existente se sustituye manteniendo el mismo nombre, puede aparecer caché durante desarrollo.

Esto ocurrió durante la sustitución de los renders originales por versiones transparentes.

El navegador podía acceder al archivo correcto directamente, mientras Next.js continuaba mostrando una versión previamente procesada.

---

## 34. Limpieza de caché de Next.js

Si se sustituye un asset manteniendo exactamente la misma ruta y Next.js continúa mostrando una versión anterior, puede ser necesario eliminar:

```text
.next/
```

En Git Bash:

```bash
rm -rf .next
```

Después:

```bash
npm run dev
```

y realizar una recarga completa del navegador.

Esto solo debe utilizarse cuando exista evidencia de que la caché de desarrollo está mostrando un recurso obsoleto.

---

## 35. No versionar `.next`

`.next/` es una salida generada.

No debe formar parte del repositorio Git.

Debe permanecer ignorada mediante `.gitignore`.

---

## 36. Git y assets

Antes de añadir nuevos recursos se debe revisar:

```bash
git status
```

y, cuando sea necesario:

```bash
find public/images -type f
```

Esto permite detectar:

- previews;
- duplicados;
- archivos antiguos;
- originales accidentales.

---

## 37. Assets binarios en Git

Git puede versionar PNG, pero no muestra diferencias visuales como ocurre con archivos de texto.

Por tanto, antes del commit debe verificarse manualmente que cada archivo binario corresponde a la versión correcta.

---

## 38. Commit de assets

Los assets deben incorporarse junto con la funcionalidad que los utiliza cuando formen parte de la misma unidad lógica.

Ejemplo:

```text
ProductCard
+
Products
+
products.ts
+
7 assets
```

pueden formar un único commit funcional de catálogo.

---

## 39. No duplicar masters en Git

GitHub no sustituye al sistema de gestión de originales gráficos.

El repositorio contiene recursos web.

Google Drive conserva material maestro y documentación visual.

---

## 40. Organización externa

Separación conceptual:

```text
Google Drive
→ masters
→ previews
→ documentos
→ entrega

GitHub
→ código
→ configuración
→ assets de runtime
```

---

## 41. Favicon y branding

Los futuros assets de identidad deberán seguir la misma política.

Ejemplos:

```text
favicon
apple-touch-icon
Open Graph image
logos web
```

Solo las variantes utilizadas realmente por la aplicación deben entrar en el repositorio.

---

## 42. Open Graph

Cuando se genere la imagen social definitiva deberá diseñarse específicamente para su uso como preview.

No debe utilizarse automáticamente cualquier screenshot de la página.

Su naming y ubicación se definirán durante la fase SEO/social metadata.

---

## 43. Copyright y propiedad

Los assets utilizados deben pertenecer al proyecto o contar con autorización adecuada.

No deben incorporarse imágenes encontradas en Internet sin comprobar derechos de uso.

---

## 44. Checklist para un nuevo asset

Antes de añadir una imagen:

- [ ] ¿Es necesaria para producción?
- [ ] ¿Tiene un nombre descriptivo?
- [ ] ¿Está en la carpeta correcta?
- [ ] ¿Su resolución es razonable?
- [ ] ¿Su peso es razonable?
- [ ] ¿Necesita transparencia?
- [ ] ¿Existe una preview que no debe entrar en Git?
- [ ] ¿Tiene un `alt` apropiado cuando corresponde?
- [ ] ¿Funciona en mobile?
- [ ] ¿Funciona en desktop?
- [ ] ¿Su iluminación coincide con el sistema visual?
- [ ] ¿Puede algún efecto resolverse mejor mediante CSS?
- [ ] ¿Ha sido validado visualmente?

---

## 45. Estado actual

Actualmente están preparados para producción:

```text
7 viales transparentes de catálogo
+
1 vial principal de Hero
```

Quedan pendientes futuras revisiones de:

- peso;
- compresión;
- formatos;
- LCP;
- responsive final;
- assets sociales;
- favicon;
- iconografía final.

---

## 46. Documentación relacionada

Consultar también:

```text
docs/architecture.md
docs/motion.md
docs/seo.md
docs/accessibility.md
docs/deployment.md
```

Este documento debe actualizarse cuando cambie de manera importante la estrategia de assets.