# Arquitectura — PepEspaña

Este documento describe la arquitectura técnica de la aplicación web de **PepEspaña**, las decisiones adoptadas durante el desarrollo y las convenciones que deben mantenerse a medida que el proyecto crezca.

La documentación refleja el estado real del proyecto en cada fase y debe actualizarse cuando cambien decisiones estructurales importantes.

---

## 1. Objetivo arquitectónico

La arquitectura de PepEspaña busca mantener un equilibrio entre:

- simplicidad;
- mantenibilidad;
- rendimiento;
- accesibilidad;
- SEO;
- reutilización;
- claridad del código;
- facilidad de evolución.

El proyecto no necesita actualmente una arquitectura empresarial compleja.

La prioridad es utilizar la menor complejidad necesaria para resolver correctamente los requisitos actuales.

Principio general:

```text
simple
+
predecible
+
tipado
+
reutilizable
+
escalable cuando sea necesario
```

Se evita introducir abstracciones, librerías o capas arquitectónicas antes de que exista una necesidad real.

---

## Integración de marca

La identidad oficial pepEspaña v1.0 se considera fuente de verdad para:

- logotipo e isotipo;
- tipografía;
- colores corporativos;
- iconografía de marca;
- aplicaciones digitales.

La interfaz mantiene una dirección Dark Editorial propia, diferenciando entre:

```text
Identidad corporativa
+
Sistema visual de interfaz
```

Los colores oscuros de superficie pertenecen a la interfaz y no se consideran colores corporativos adicionales.

## 2. Stack principal

La aplicación está construida actualmente con:

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Motion
- Next/Image
- ESLint
- npm

Se utiliza:

```text
Next.js App Router
```

No se utiliza actualmente:

- Pages Router;
- CMS;
- base de datos;
- sistema de autenticación;
- carrito;
- e-commerce;
- panel de administración;
- WebGL;
- Three.js;
- backend independiente.

Estas funcionalidades solo deberán introducirse si el alcance futuro del proyecto realmente las requiere.

---

## 3. App Router

La aplicación utiliza el **App Router de Next.js**.

La estructura principal comienza en:

```text
app/
```

Actualmente contiene:

```text
app/
├── globals.css
├── layout.tsx
└── page.tsx
```

### `layout.tsx`

Es responsable de la estructura global de la aplicación.

Entre sus responsabilidades pueden encontrarse:

- documento base;
- metadata global;
- fuentes;
- configuración general del HTML;
- elementos persistentes cuando proceda.

No debe utilizarse como lugar donde acumular lógica específica de secciones concretas.

---

### `page.tsx`

Representa actualmente la landing principal de PepEspaña.

Su responsabilidad es **componer las grandes secciones de la página**.

Conceptualmente:

```tsx
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Statement/>
      <Products />
    </main>
  );
}
```

`page.tsx` no debe contener internamente toda la implementación de cada sección.

Su función principal es actuar como punto de ensamblaje.

---

## 4. Arquitectura actual de componentes

Actualmente la composición principal es:

```text
page.tsx
├── Navbar
├── Hero
│   └── VialVisual
├── Statement
└── Products
    └── ProductCard × 7
```

La arquitectura continuará creciendo con futuras secciones.

Estructura prevista:

```text
page.tsx
├── Navbar
├── Hero
│   └── VialVisual
├── Statement
├── Products
│   └── ProductCard × n
├── Quality
├── BrandStatement
├── Contact
└── Footer
```

Esta estructura es orientativa.

Los componentes futuros solo deberán crearse cuando exista contenido o comportamiento suficiente para justificar su existencia.

---

## 5. Principio de separación de responsabilidades

Cada componente debe tener una responsabilidad clara.

Ejemplo:

```text
Hero
→ composición y contenido del Hero

VialVisual
→ comportamiento visual e interactivo del vial
```

No sería recomendable introducir directamente toda la lógica de pointer tracking, springs y transformaciones dentro de `Hero.tsx`.

Separarlo permite que:

- `Hero.tsx` sea más fácil de leer;
- `VialVisual.tsx` pueda evolucionar independientemente;
- la lógica de Motion quede localizada;
- la depuración sea más sencilla.

---

## 6. Componentes actuales

### Navbar

Archivo:

```text
components/Navbar.tsx
```

Responsabilidades actuales:

- identidad de marca;
- navegación principal;
- CTA de contacto;
- adaptación inicial entre desktop y mobile.

La navegación móvil definitiva todavía está pendiente.

---

### Hero

Archivo:

```text
components/Hero.tsx
```

Responsabilidades:

- encabezado principal;
- mensaje introductorio;
- CTA hacia productos;
- CTA de contacto;
- estructura visual del Hero;
- integración del vial principal.

El Hero debe mantener el contenido separado de la lógica compleja de animación.

---

### VialVisual

Archivo:

```text
components/VialVisual.tsx
```

Responsabilidades:

- renderizado del vial principal;
- interacción con puntero;
- efecto 2.5D;
- springs;
- transformaciones;
- idle animation;
- glow;
- reflejos;
- soporte para reduced motion.

Es actualmente un **Client Component** porque necesita interacción del navegador y APIs de Motion basadas en estado dinámico del cliente.

El archivo comienza con:

```tsx
"use client";
```

---

### Statement

Archivo:

```text
components/Statement.tsx
```

Responsabilidades:

- transición editorial entre Hero y catálogo;
- reducción deliberada de intensidad visual;
- introducción del mensaje de marca;
- preparación espacial para la sección Products.

Actualmente es un Server Component y no necesita JavaScript de cliente ni Motion.

La sección utiliza contenido HTML indexable y mantiene una jerarquía semántica mediante `section`, `h2` y `aria-labelledby`.

---

### IntroJourney

Archivo:

```text
components/IntroJourney.tsx
```

Responsabilidades:

- agrupar Hero y Statement dentro de una misma escena de scroll;
- medir un único progreso global mediante `useScroll`;
- suavizar ese progreso con `useSpring`;
- compartir el mismo MotionValue con los componentes participantes;
- mantener separada la estructura semántica de la narrativa visual.

`IntroJourney` funciona como Client Component porque necesita medir el scroll en el navegador.

El progreso compartido evita que distintos componentes calculen timelines independientes y terminen desincronizados.

Conceptualmente:

```text
IntroJourney
│
├── Hero
├── Statement
│   └── StatementReveal
│
└── VialJourney
    └── VialVisual
```

---

### VialJourney

Archivo:

```text
components/VialJourney.tsx
```

Responsabilidades:

- controlar la posición global del vial durante la escena introductoria;
- desplazar el vial desde Hero hacia Statement;
- definir su escala, rotación y opacidad según el scroll;
- mantener una pausa visual dentro de Statement;
- retirar el vial antes de que Products tome protagonismo.

`VialJourney` no controla internamente el pointer tracking ni el idle del vial.

Estas responsabilidades permanecen dentro de:

```text
VialVisual.tsx
```

Esto mantiene separados:

```text
trayectoria global
≠
interacción local del objeto
```

---

### StatementReveal

Archivo:

```text
components/StatementReveal.tsx
```

Responsabilidades:

- animar la entrada editorial del contenido de Statement;
- sincronizar identificador, heading, párrafo y línea ambiental;
- utilizar exactamente el mismo progreso global que `VialJourney`;
- respetar `prefers-reduced-motion`.

La entrada utiliza una secuencia progresiva:

```text
línea
↓
identificador
↓
título
↓
texto
```

Todos los elementos utilizan el mismo reloj de `IntroJourney`, evitando desincronización entre la llegada del vial y la aparición del contenido.

---

### Products

Archivo:

```text
components/Products.tsx
```

Responsabilidades:

- estructura semántica de la sección de catálogo;
- encabezado de sección;
- grid;
- iteración sobre los datos de productos;
- posicionamiento responsive de las tarjetas.

`Products` no almacena manualmente la información de los siete productos.

Los datos proceden de:

```text
data/products.ts
```

---

### ProductCard

Archivo:

```text
components/ProductCard.tsx
```

Responsabilidades:

- representación visual de un producto;
- imagen;
- número editorial;
- nombre;
- descripción;
- CTA;
- microinteracciones visuales.

Una única implementación se reutiliza para todos los productos.

Conceptualmente:

```text
ProductCard
+
datos diferentes
=
tarjetas diferentes
```

Esto evita copiar y pegar siete estructuras prácticamente idénticas.

---

### Quality

Archivo:

```text
components/Quality.tsx
```

Responsabilidades:

- presentar los principios editoriales de calidad de PepEspaña;
- cambiar deliberadamente el ritmo visual después del catálogo;
- evitar claims técnicos o comerciales no verificados;
- utilizar una composición de columna editorial + lista de principios;
- controlar una entrada local sincronizada con scroll;
- respetar `prefers-reduced-motion`.

A diferencia de `Statement`, Quality no participa en la timeline compartida de `IntroJourney`.

Su animación es completamente local a la propia sección, por lo que actualmente no necesita un componente adicional como `QualityReveal`.

`Quality.tsx` funciona como Client Component debido al uso de:

```text
useScroll
useSpring
useTransform
useReducedMotion
```

La decisión evita introducir una abstracción adicional sin necesidad real.

Conceptualmente:

```text
Quality
├── contenido editorial izquierdo
└── lista de principios derecha
```

Ambos lados se aproximan desde direcciones opuestas y adquieren opacidad progresivamente durante el scroll.

---

## 7. Server Components y Client Components

Next.js utiliza Server Components por defecto dentro del App Router.

Por tanto, un componente no debe convertirse en Client Component si no existe una razón real.

Ejemplo:

```text
ProductCard
```

actualmente puede utilizar:

- JSX;
- Next/Image;
- Tailwind;
- hover mediante CSS;

sin necesitar JavaScript interactivo del navegador.

No necesita:

```tsx
"use client";
```

en su estado actual.

En cambio:

```text
VialVisual
```

sí necesita ejecutarse como Client Component porque utiliza:

- eventos de puntero;
- Motion Values;
- Springs;
- transformaciones dinámicas;
- información de `prefers-reduced-motion`.

Principio:

> Mantener componentes en servidor por defecto y moverlos al cliente únicamente cuando la interacción lo requiera.

Esto ayuda a controlar la cantidad de JavaScript enviado al navegador.

---

## 8. Fronteras cliente/servidor

Un Server Component puede renderizar un Client Component.

Por ejemplo:

```text
Hero
└── VialVisual
```

no obliga necesariamente a que toda la página sea cliente.

La frontera debe mantenerse lo más abajo posible en el árbol cuando sea razonable.

Conceptualmente:

```text
Server Component
├── contenido
├── estructura
└── Client Component
    └── interacción específica
```

Esto permite aprovechar mejor la arquitectura de Next.js.

---

## 9. Datos separados del JSX

Los datos del catálogo se almacenan en:

```text
data/products.ts
```

en lugar de declararse directamente dentro de `Products.tsx`.

Esto permite separar:

```text
datos
≠
presentación
```

La ventaja es que podemos modificar el catálogo sin reconstruir manualmente el componente visual.

---

## 10. Modelo Product

Actualmente el modelo de producto es:

```ts
export type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
};
```

La colección utiliza:

```ts
export const products: Product[] = [
  // ...
];
```

El tipado explícito obliga a que cada producto contenga la estructura necesaria.

Por ejemplo, un producto incompleto como:

```ts
{
  id: "08",
  name: "Producto"
}
```

producirá un problema de tipos porque faltan campos obligatorios.

Esto permite detectar errores antes de llegar al navegador.

---

## 11. Razón para incluir `slug`

Aunque actualmente la landing no dispone de páginas individuales de producto, el modelo incluye:

```ts
slug: string;
```

Ejemplo:

```text
tesamorelina
ipamorelina
bpc-157
```

Esto prepara la arquitectura para posibles necesidades futuras como:

```text
/productos/tesamorelina
```

o para:

- analítica;
- formularios;
- selección automática de producto;
- parámetros de URL;
- identificadores semánticos.

Se evita así depender únicamente del texto visible del nombre como identificador funcional.

---

## 12. Props

Los componentes reutilizables reciben mediante props únicamente los datos que necesitan.

Ejemplo actual:

```ts
type ProductCardProps = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
};
```

Esto establece un contrato claro.

El componente no necesita conocer el array completo de productos ni acceder directamente a `products.ts`.

Flujo:

```text
products.ts
    ↓
Products
    ↓
ProductCard props
    ↓
render
```

---

## 13. Flujo de datos actual

El flujo del catálogo es unidireccional:

```text
data/products.ts
        ↓
    Products.tsx
        ↓
     map()
        ↓
 ProductCard.tsx
        ↓
      HTML
```

Actualmente no existe estado global porque no existe ninguna necesidad que lo justifique.

No se utilizan:

- Redux;
- Zustand;
- Context global;
- otras librerías de estado.

Si futuras funcionalidades necesitan compartir estado entre partes distantes de la aplicación, se evaluará entonces la solución apropiada.

---

## 14. Estado local

El estado o Motion Values deben mantenerse lo más cerca posible del componente que realmente los necesita.

Ejemplo:

```text
VialVisual
```

controla internamente sus valores relacionados con:

- puntero;
- rotaciones;
- posición;
- springs;
- highlight.

No existe una razón para almacenar estos valores globalmente.

Principio:

> El estado debe vivir en el nivel más bajo que permita resolver correctamente su responsabilidad.

---

## 15. Tailwind CSS

Tailwind se utiliza para el styling principal.

Actualmente permite mantener junto al componente decisiones relacionadas con:

- layout;
- espaciado;
- responsive;
- color;
- tipografía;
- hover;
- transiciones.

Ejemplo conceptual:

```tsx
<article className="rounded-[28px] border border-white/10 ...">
```

No obstante, las clases deben mantenerse legibles.

Cuando una estructura de estilos se vuelva excesivamente repetitiva o compleja se evaluará:

- extracción de componente;
- variable;
- helper;
- CSS global;
- otra abstracción justificada.

---

## 16. CSS global

Archivo:

```text
app/globals.css
```

Debe utilizarse para estilos realmente globales.

Ejemplos apropiados:

- reset;
- variables globales;
- estilos base;
- comportamiento general del documento.

No debe convertirse en un archivo donde se introduzca todo el CSS específico de cada componente sin organización.

---

## 17. Motion frente a CSS

No toda animación debe utilizar Motion.

La estrategia actual distingue dos niveles.

### Interacciones complejas

Ejemplo:

```text
Hero / VialVisual
```

Motion está justificado por:

- pointer tracking;
- springs;
- múltiples valores derivados;
- animaciones coordinadas;
- reduced motion;
- comportamiento 2.5D.

### Microinteracciones simples

Ejemplo:

```text
ProductCard
```

Se utilizan preferentemente:

- Tailwind;
- CSS transitions;
- transform;
- opacity.

Esto evita añadir JavaScript interactivo donde CSS puede resolver el mismo problema correctamente.

---

## 18. Rendimiento como criterio arquitectónico

La arquitectura debe considerar rendimiento desde el inicio.

Principios actuales:

- Server Components cuando sea posible;
- Client Components solo cuando sean necesarios;
- evitar JavaScript innecesario;
- utilizar `Next/Image`;
- evitar WebGL sin justificación;
- usar `transform` y `opacity` para movimiento;
- limitar dependencias;
- mantener assets optimizados;
- lazy loading cuando corresponda.

Una decisión visual puede ser descartada si su coste técnico es desproporcionado respecto al valor que aporta.

---

## 19. Imágenes

Las imágenes públicas utilizadas por la aplicación se encuentran bajo:

```text
public/images/
```

El catálogo utiliza actualmente:

```text
public/images/products/
```

Las imágenes se consumen mediante rutas como:

```text
/images/products/tesamorelina-vial.png
```

La estrategia completa de assets se documenta en:

```text
docs/assets.md
```

---

## 20. Alias de importación

El proyecto utiliza alias mediante:

```text
@/
```

Ejemplos:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
```

y:

```tsx
import { products } from "@/data/products";
```

Esto evita imports relativos largos como:

```text
../../../components/ProductCard
```

y facilita reorganizaciones internas.

---

## 21. Naming

Los nombres del código deben describir claramente su función.

Ejemplos actuales:

```text
Navbar
Hero
VialVisual
Products
ProductCard
```

Se evitan nombres ambiguos como:

```text
Component1
Box
Thing
Content2
FinalComponent
```

La misma regla se aplica a:

- variables;
- funciones;
- tipos;
- archivos;
- assets.

---

## 22. Convención de componentes

Los componentes React utilizan nombres en:

```text
PascalCase
```

Ejemplo:

```text
ProductCard.tsx
VialVisual.tsx
```

Los datos y utilidades utilizan nombres coherentes con su responsabilidad.

Ejemplo:

```text
products.ts
```

---

## 23. Comentarios de código

Los comentarios se utilizan cuando aportan contexto real.

Deben explicar principalmente:

- decisiones;
- comportamiento no evidente;
- arquitectura;
- animaciones;
- accesibilidad;
- razones técnicas.

Ejemplo útil:

```ts
// Suavizamos los valores del cursor mediante springs
// para evitar movimientos bruscos.
```

Ejemplo innecesario:

```ts
// Creamos una variable.
const value = 1;
```

Los comentarios no deben sustituir nombres claros ni una buena estructura.

---

## 24. Componentes futuros

A medida que avance la landing está previsto incorporar componentes como:

```text
Statement
Quality
BrandStatement
Contact
Footer
```

No deben introducirse todos anticipadamente como archivos vacíos.

Se crean cuando exista una implementación concreta para ellos.

---

## 25. Arquitectura futura de Contact

La sección Contact requerirá una evaluación especial porque introducirá comportamiento funcional.

Probablemente necesitará separar:

```text
presentación
+
estado del formulario
+
validación
+
envío
+
errores
+
respuesta
```

La solución definitiva se decidirá cuando se implemente.

No se añadirá un sistema global de formularios o estado antes de necesitarlo.

---

## 26. Validación

Cuando se implemente el formulario, la validación no deberá depender únicamente del navegador.

Conceptualmente:

```text
validación cliente
+
validación servidor
```

La validación del cliente mejora experiencia de usuario.

La validación del servidor protege la integridad de la operación.

---

## 27. Backend

Actualmente PepEspaña no requiere un backend independiente.

Next.js puede resolver determinadas necesidades de servidor dentro de la misma aplicación cuando llegue el momento.

Solo se evaluará un backend separado si aparecen requisitos que lo justifiquen.

Por ejemplo:

- lógica compleja de negocio;
- múltiples consumidores;
- API independiente;
- base de datos extensa;
- administración avanzada;
- integraciones significativas.

---

## 28. Base de datos

Actualmente no existe base de datos.

Los siete productos se mantienen como datos estáticos tipados porque el catálogo actual es pequeño y no requiere administración dinámica.

Introducir una base de datos para siete registros estáticos añadiría complejidad sin aportar suficiente valor en esta fase.

Si el cliente necesita modificar frecuentemente el catálogo sin intervención de desarrollo, se reevaluará la arquitectura.

---

## 29. CMS

Actualmente no se utiliza CMS.

La decisión es deliberada.

El alcance actual no justifica añadir:

- autenticación;
- panel;
- CMS headless;
- sincronización;
- API externa.

Si en el futuro el cliente necesita gestionar contenido directamente, se evaluará la opción adecuada.

---

## 30. SEO como parte de arquitectura

Las decisiones arquitectónicas deben facilitar:

- HTML semántico;
- renderizado indexable;
- metadata;
- URLs limpias;
- rendimiento;
- accesibilidad;
- slugs;
- contenido estructurado.

La estrategia completa se encuentra en:

```text
docs/seo.md
```

SEO no debe resolverse únicamente añadiendo meta tags al final del proyecto.

---

## 31. Accesibilidad como parte de arquitectura

La arquitectura debe permitir:

- interacción mediante teclado;
- estructura semántica;
- reduced motion;
- textos alternativos;
- controles accesibles;
- navegación comprensible.

Más información:

```text
docs/accessibility.md
```

---

## 32. Responsive como responsabilidad del componente

El responsive no se concentra en un único archivo.

Cada sección debe controlar correctamente su comportamiento según el viewport.

Ejemplo:

```text
ProductCard
→ escala de imagen

Products
→ número de columnas

Navbar
→ disposición de navegación

Hero
→ layout y escala visual
```

Esto mantiene la responsabilidad cerca del elemento afectado.

---

## 33. Mobile-first

Tailwind aplica por defecto una estrategia mobile-first.

Ejemplo:

```tsx
className="w-[260px] md:w-[280px]"
```

significa:

```text
base
→ mobile

md
→ tablet / pantallas superiores
```

Los estilos base deben funcionar correctamente sin depender de un breakpoint superior.

---

## 34. Evitar sobrearquitectura

No se crearán capas como:

```text
services/
repositories/
use-cases/
controllers/
factories/
```

si el proyecto todavía no tiene una necesidad concreta para ellas.

La arquitectura debe crecer proporcionalmente al producto.

Principio:

> No diseñar hoy la complejidad que quizá exista dentro de tres años.

Pero sí mantener decisiones actuales que no bloqueen un crecimiento razonable.

---

## 35. Dependencias

Cada nueva dependencia debe responder al menos a una pregunta:

> ¿Qué problema real resuelve que no podamos resolver razonablemente con las herramientas actuales?

Antes de añadir una librería se evaluará:

- peso;
- mantenimiento;
- compatibilidad;
- impacto en cliente;
- necesidad real;
- alternativas nativas.

Ejemplo actual:

```text
Motion
```

está justificado por el nivel de interacción del Hero.

Three.js actualmente no lo está.

---

## 36. Git y arquitectura

Las modificaciones arquitectónicas importantes deben realizarse mediante commits identificables.

Ejemplos:

```text
feat: ...
refactor: ...
docs: ...
```

Esto permite comprender posteriormente cuándo y por qué cambió la estructura.

---

## 37. Refactorización

Una refactorización debe mejorar la estructura sin modificar innecesariamente el comportamiento observable.

Se realizará cuando aparezcan señales como:

- duplicación;
- componentes demasiado grandes;
- responsabilidades mezcladas;
- dificultad de lectura;
- props excesivas;
- lógica repetida;
- dificultad de testeo;
- acoplamiento innecesario.

No se refactoriza únicamente para hacer el código "más sofisticado".

---

## 38. Regla de crecimiento

Cuando una funcionalidad nueva llegue al proyecto se seguirá este orden conceptual:

```text
requisito
↓
responsabilidad
↓
ubicación correcta
↓
componente / módulo
↓
tipado
↓
implementación
↓
responsive
↓
accesibilidad
↓
rendimiento
↓
SEO cuando aplique
↓
pruebas
↓
documentación
```

---

## 39. Arquitectura objetivo de la landing

La arquitectura esperada al finalizar la primera versión será aproximadamente:

```text
app/
├── layout.tsx
├── page.tsx
└── globals.css

components/
├── Navbar.tsx
├── Hero.tsx
├── VialVisual.tsx
├── Statement.tsx
├── Products.tsx
├── ProductCard.tsx
├── Quality.tsx
├── BrandStatement.tsx
├── Contact.tsx
└── Footer.tsx

data/
└── products.ts

public/
└── images/

docs/
├── architecture.md
├── assets.md
├── motion.md
├── seo.md
├── accessibility.md
└── deployment.md
```

Esta estructura no es un contrato rígido.

Puede cambiar cuando el desarrollo revele una solución mejor.

---

## 40. Decisiones arquitectónicas actuales

Resumen:

| Decisión | Estado |
|---|---|
| Next.js App Router | Adoptado |
| TypeScript | Adoptado |
| Tailwind CSS | Adoptado |
| Motion | Adoptado para interacciones complejas |
| Server Components por defecto | Adoptado |
| Client Components cuando sean necesarios | Adoptado |
| Datos del catálogo separados del JSX | Adoptado |
| Catálogo estático tipado | Adoptado |
| Next/Image | Adoptado |
| CMS | No necesario actualmente |
| Base de datos | No necesaria actualmente |
| Backend separado | No necesario actualmente |
| Three.js / WebGL | No justificado actualmente |
| Estado global | No necesario actualmente |
| Vercel | Previsto para deployment |

---

## 41. Criterios para modificar la arquitectura

La arquitectura puede cambiar cuando exista una razón concreta.

Ejemplos:

- nuevo requisito funcional;
- problemas de rendimiento;
- mantenimiento difícil;
- crecimiento considerable del catálogo;
- incorporación de rutas;
- integración externa;
- necesidad real de CMS;
- administración de contenido;
- necesidad de persistencia;
- cambio en los requisitos de despliegue.

Las decisiones deben basarse en necesidades del producto, no en tendencias tecnológicas.

---

## 42. Documentación relacionada

Consultar también:

```text
docs/assets.md
docs/motion.md
docs/seo.md
docs/accessibility.md
docs/deployment.md
```

Cada documento profundiza en su área sin convertir el README general en un manual excesivamente grande.

---

## 43. Estado actual de esta documentación

Esta versión documenta la arquitectura existente hasta la implementación de:

```text
Navbar
+
Hero
+
VialVisual
+
Products
+
ProductCard
+
catálogo de 7 productos
```

Debe actualizarse cuando entren nuevas responsabilidades estructurales relevantes.