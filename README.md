# PepEspaña

Landing page de **PepEspaña**, desarrollada con Next.js, TypeScript, Tailwind CSS y Motion.

El proyecto sigue una dirección visual **Dark Biotech / Editorial Science** y se desarrolla desde el inicio teniendo en cuenta diseño, arquitectura, rendimiento, accesibilidad, SEO y preparación para producción.

---

## Estado del proyecto

> Actualmente en desarrollo.

### Implementado

- [x] Proyecto Next.js
- [x] TypeScript
- [x] Tailwind CSS
- [x] Navbar
- [x] Hero responsive
- [x] Vial principal interactivo
- [x] Motion
- [x] Pointer tracking y efecto 2.5D
- [x] Soporte para `prefers-reduced-motion`
- [x] Catálogo dinámico
- [x] 7 productos
- [x] Datos de producto tipados
- [x] Assets transparentes
- [x] Naming semántico de imágenes
- [x] Alt text obligatorio
- [x] Grid responsive
- [x] Microinteracciones de producto
- [x] Git y GitHub

### Pendiente

- [ ] Narrativa de scroll Hero → Products
- [ ] Statement
- [ ] Quality
- [ ] Brand Statement
- [ ] Contact
- [ ] Footer
- [ ] Navegación mobile definitiva
- [ ] Responsive final
- [ ] SEO técnico
- [ ] Metadata
- [ ] Open Graph
- [ ] Sitemap
- [ ] Robots
- [ ] Datos estructurados
- [ ] Formulario de contacto
- [ ] Accesibilidad final
- [ ] Optimización de rendimiento
- [ ] Core Web Vitals
- [ ] QA
- [ ] Analytics
- [ ] Search Console
- [ ] Deploy
- [ ] Dominio, DNS y HTTPS
- [ ] Revisión post-lanzamiento

---

## Objetivo

El proyecto no se plantea únicamente como una interfaz visual.

El objetivo es entregar una web:

- responsive;
- mantenible;
- accesible;
- indexable;
- optimizada;
- medible;
- preparada para producción.

El SEO, el rendimiento y la accesibilidad se consideran durante el desarrollo y no únicamente al final del proyecto.

---

## Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Motion
- Next/Image
- ESLint
- Turbopack
- npm
- Git
- GitHub

El despliegue está previsto inicialmente mediante Vercel.

---

## Desarrollo local

### Requisitos

Necesitas tener instalados:

- Node.js
- npm
- Git

### Clonar el repositorio

```bash
git clone git@github.com:mecrophagus/pepespana.git
```

```bash
cd pepespana
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

---

## Scripts

### Desarrollo

```bash
npm run dev
```

### Build de producción

```bash
npm run build
```

### Servidor de producción

```bash
npm run start
```

### Lint

```bash
npm run lint
```

---

## Estructura

```text
pepespana/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── Products.tsx
│   └── VialVisual.tsx
│
├── data/
│   └── products.ts
│
├── docs/
│   ├── architecture.md
│   ├── assets.md
│   ├── motion.md
│   ├── seo.md
│   ├── accessibility.md
│   └── deployment.md
│
├── public/
│   └── images/
│       └── products/
│
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

---

## Arquitectura actual

La página principal se compone actualmente así:

```text
page.tsx
├── Navbar
├── Hero
│   └── VialVisual
└── Products
    └── ProductCard × 7
```

Los datos repetitivos se mantienen separados del JSX.

El catálogo utiliza:

```text
data/products.ts
```

y las tarjetas se generan reutilizando:

```text
components/ProductCard.tsx
```

---

## Catálogo

Cada producto utiliza actualmente una estructura tipada:

```ts
export type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
};
```

Esto permite detectar productos incompletos durante desarrollo mediante TypeScript.

---

## Assets

Los assets necesarios para producción se almacenan en:

```text
public/images/
```

Los archivos utilizan nombres descriptivos y semánticos.

Ejemplos:

```text
tesamorelina-vial.png
ipamorelina-vial.png
bpc-157-vial.png
```

Los archivos maestros, previews y recursos de trabajo se mantienen fuera de `public/`.

Más información:

[Documentación de assets](docs/assets.md)

---

## Motion

El Hero utiliza Motion para crear una sensación de profundidad 2.5D mediante:

```text
rotateX
rotateY
translateX
translateY
scale
opacity
```

Se priorizan animaciones basadas en `transform` y `opacity`.

Las animaciones respetan:

```text
prefers-reduced-motion
```

Las Product Cards utilizan microinteracciones más contenidas para mantener una jerarquía visual clara.

Más información:

[Documentación de Motion](docs/motion.md)

---

## SEO

El SEO se considera parte de la arquitectura del proyecto.

Se tienen en cuenta desde desarrollo:

- HTML semántico;
- jerarquía de headings;
- nombres de archivos;
- alt text;
- slugs;
- rendimiento;
- contenido indexable;
- responsive;
- accesibilidad.

Antes de producción también se implementarán y validarán:

- metadata;
- canonical;
- Open Graph;
- sitemap;
- robots;
- datos estructurados cuando proceda.

Más información:

[Documentación SEO](docs/seo.md)

---

## Accesibilidad

Actualmente se aplican criterios como:

- textos alternativos;
- elementos semánticos;
- soporte táctil;
- `aria-hidden` para decoración;
- `prefers-reduced-motion`;
- interacciones que no dependen exclusivamente de hover.

Se realizará una revisión específica antes de producción.

Más información:

[Documentación de accesibilidad](docs/accessibility.md)

---

## Rendimiento

Principios actuales:

```text
Next/Image
+
assets optimizados
+
JavaScript controlado
+
transform / opacity
+
lazy loading cuando proceda
+
sin WebGL innecesario
```

Antes de producción se revisarán especialmente:

```text
LCP
INP
CLS
```

---

## Git

La rama principal es:

```text
main
```

Los commits deben representar unidades lógicas de trabajo.

Ejemplos:

```text
feat: build initial landing hero and navigation
feat: add interactive hero vial animation
feat: build product catalogue with responsive cards
```

Flujo habitual:

```text
desarrollar
↓
probar
↓
git status
↓
git diff
↓
git add
↓
git diff --cached
↓
git commit
↓
git push
```

---

## Documentación técnica

La documentación detallada se mantiene separada del README.

### Arquitectura

[docs/architecture.md](docs/architecture.md)

Componentes, responsabilidades, TypeScript y convenciones de desarrollo.

### Assets

[docs/assets.md](docs/assets.md)

Gestión de imágenes, naming, assets maestros y versiones de producción.

### Motion

[docs/motion.md](docs/motion.md)

Animaciones, vial 2.5D, pointer tracking y reduced motion.

### SEO

[docs/seo.md](docs/seo.md)

SEO técnico, semántica, metadata, indexación y estructura futura.

### Accesibilidad

[docs/accessibility.md](docs/accessibility.md)

Criterios de accesibilidad y checklist de revisión.

### Deployment

[docs/deployment.md](docs/deployment.md)

Build, Vercel, dominio, DNS, HTTPS, Analytics, Search Console y QA de producción.

---

## Flujo de trabajo

```text
Figma
→ diseño

Google Drive
→ documentación de proyecto y assets maestros

VS Code
→ desarrollo

Git
→ control de versiones

GitHub
→ repositorio remoto

Vercel
→ deployment
```

---

## Demo

Existe una demo estática previa utilizada para validar la dirección visual del proyecto.

La demo se conserva separada de la aplicación Next.js de producción y no forma parte del flujo normal de modificación del código actual.

---

## Producción

El proyecto solo se considerará terminado cuando se hayan validado:

```text
desarrollo
+
responsive
+
accesibilidad
+
SEO
+
rendimiento
+
formularios
+
QA
+
deploy
+
dominio
+
HTTPS
+
analítica
+
Search Console
+
revisión post-lanzamiento
```

---

## Documentación viva

La documentación debe evolucionar junto con el código.

Cuando una fase importante se implemente o cambie, se actualizará también la documentación relacionada.

El README funciona como puerta de entrada al repositorio.

La documentación técnica detallada pertenece a `docs/`.