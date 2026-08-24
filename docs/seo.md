# SEO — PepEspaña

Este documento define la estrategia técnica y on-page de SEO para la web de **PepEspaña**.

La estrategia debe mantenerse subordinada a dos principios:

1. el contenido publicado debe ser veraz;
2. el SEO no debe comprometer legalidad, accesibilidad, rendimiento ni experiencia de usuario.

---

## 1. Principio general

SEO no es una capa que se añade al terminar la web.

Se considera desde:

```text
arquitectura
+
contenido
+
HTML
+
assets
+
rendimiento
+
accesibilidad
+
URLs
+
metadata
```

---

## 2. Estado actual

Actualmente ya se han incorporado algunas decisiones compatibles con SEO:

- naming semántico de imágenes;
- `alt` de producto;
- HTML por secciones;
- headings;
- slugs;
- contenido renderizado;
- Next.js;
- Next/Image;
- arquitectura preparada para metadata.

La implementación SEO completa sigue pendiente.

---

## 3. Objetivo

La web debe poder:

- ser rastreada;
- ser indexada;
- explicar claramente qué ofrece PepEspaña;
- responder a búsquedas relevantes;
- cargar con rapidez;
- mostrar contenido legible;
- evitar claims no verificados;
- generar previews sociales adecuadas.

---

## 4. Cluster inicial de búsqueda

Como hipótesis inicial de trabajo se contemplan términos como:

```text
péptidos España
péptidos en España
distribuidor de péptidos
proveedor de péptidos
```

Estos términos son provisionales.

Antes de producción deberán contrastarse con:

- alcance real del negocio;
- clasificación de productos;
- contenido permitido;
- intención de búsqueda;
- estrategia comercial.

---

## 5. Keyword research

No debe construirse el copy final únicamente a partir de intuición.

Antes de cerrar contenido se realizará investigación sobre:

- volumen;
- intención;
- competencia;
- variantes semánticas;
- búsquedas informativas;
- búsquedas comerciales;
- términos relacionados.

---

## 6. Keyword stuffing

No se repetirá artificialmente una keyword para intentar posicionar.

Ejemplo incorrecto:

```text
PepEspaña ofrece péptidos España para personas que buscan
péptidos en España y proveedor de péptidos España...
```

La redacción debe sonar natural y responder realmente a la intención.

---

## 7. H1

La landing utilizará un único tema principal claramente identificable.

Actualmente:

```text
PÉPTIDOS EN ESPAÑA.
```

funciona como H1 provisional.

Antes de producción se verificará que sigue siendo coherente con:

- posicionamiento;
- regulación;
- identidad;
- contenido final.

---

## 8. H2

Cada sección principal debe utilizar headings coherentes.

Ejemplos:

```text
Productos
Calidad
Contacto
```

o versiones editoriales equivalentes.

---

## 9. H3

Los nombres de productos dentro del catálogo pueden utilizar:

```html
<h3>
```

si se encuentran dentro de una sección encabezada por H2.

---

## 10. Jerarquía

La jerarquía no debe elegirse por tamaño visual.

Correcto:

```text
H1
└── H2
    └── H3
```

El styling se controla mediante CSS.

---

## 11. HTML semántico

Se utilizan elementos semánticos cuando representan correctamente el contenido:

```text
main
nav
section
article
footer
```

Las Product Cards utilizan actualmente:

```html
<article>
```

porque representan entidades individuales dentro del catálogo.

---

## 12. Contenido indexable

El contenido relevante debe existir como texto HTML.

No se debe renderizar información esencial únicamente dentro de:

- imágenes;
- canvas;
- vídeo;
- animaciones.

---

## 13. Server rendering

Se aprovecha la arquitectura de Next.js para mantener el contenido principal fácilmente renderizable.

No existe motivo para convertir toda la página en una SPA cliente.

---

## 14. URLs

Actualmente la web es una landing.

Si en el futuro aparecen páginas independientes deben utilizar URLs limpias y descriptivas.

Ejemplo:

```text
/productos/tesamorelina
```

en lugar de:

```text
/product?id=1
```

---

## 15. Slugs

El modelo ya incluye:

```ts
slug: string;
```

Ejemplos:

```text
tesamorelina
ipamorelina
retatrutida
bpc-157
```

Esto prepara futuras rutas sin tener que reconstruir el modelo.

---

## 16. Title

Título provisional:

```text
PepEspaña | Péptidos en España
```

No debe darse por definitivo hasta validar estrategia comercial y regulatoria.

---

## 17. Meta description

La meta description debe:

- describir la página;
- ser natural;
- evitar claims dudosos;
- apoyar la intención de búsqueda;
- incentivar un clic informado.

No debe rellenarse con una lista de keywords.

---

## 18. Next.js Metadata API

La metadata se implementará preferentemente mediante la API de metadata de Next.js.

Ejemplo conceptual:

```ts
export const metadata = {
  title: "...",
  description: "...",
};
```

La implementación definitiva se realizará cuando los textos hayan sido validados.

---

## 19. Canonical

La versión de producción debe declarar una URL canonical correcta cuando corresponda.

No se debe apuntar accidentalmente a:

- localhost;
- previews;
- dominios temporales;
- URLs antiguas.

---

## 20. Open Graph

Se configurará:

- title;
- description;
- URL;
- site name;
- image;
- type.

Esto permitirá previews coherentes al compartir la página.

---

## 21. Imagen Open Graph

La imagen OG debe diseñarse específicamente para el proyecto.

Debe tener:

- marca;
- legibilidad;
- composición compatible con recortes;
- tamaño apropiado.

No debe utilizarse automáticamente cualquier screenshot.

---

## 22. Sitemap

Se generará sitemap cuando exista dominio y arquitectura final.

En una landing inicial será sencillo.

Si aparecen rutas de producto, deberán incluirse únicamente las páginas indexables y válidas.

---

## 23. Robots

Se configurará `robots` para producción.

Debe revisarse especialmente que ningún entorno de desarrollo o configuración provisional bloquee accidentalmente la indexación final.

---

## 24. Noindex

Las páginas que no deban aparecer en buscadores deberán tratarse explícitamente.

No se debe aplicar `noindex` indiscriminadamente al sitio.

---

## 25. Schema.org

Se evaluará la implementación de datos estructurados únicamente cuando exista correspondencia real.

Posibles entidades a estudiar:

- Organization;
- WebSite;
- BreadcrumbList si aparecen rutas;
- otras únicamente si son realmente aplicables.

---

## 26. No false schema

No se añadirá:

```text
Product
Review
AggregateRating
```

si la página no contiene realmente los datos necesarios.

El objetivo no es engañar a los motores de búsqueda.

---

## 27. Imágenes

Las imágenes utilizan nombres descriptivos.

Ejemplo:

```text
tesamorelina-vial.png
```

---

## 28. Alt text

Ejemplo:

```tsx
alt="Vial de Tesamorelina"
```

Debe describir la imagen.

No debe contener listas de keywords.

---

## 29. Performance

El rendimiento afecta tanto a usuario como a SEO.

Se controlarán:

```text
LCP
INP
CLS
```

---

## 30. LCP

El Hero probablemente tendrá un papel importante en LCP.

La estrategia final debe revisar:

- prioridad;
- tamaño;
- peso;
- fuente;
- renderizado.

---

## 31. CLS

Se debe evitar que imágenes, fuentes o contenido cargado tarde provoquen desplazamientos visuales.

Definir dimensiones de imágenes ayuda a reducir este riesgo.

---

## 32. INP

Las animaciones y JavaScript no deben degradar significativamente la capacidad de respuesta.

El uso contenido de Client Components ayuda a controlar este aspecto.

---

## 33. Mobile

Google y los usuarios deben recibir una experiencia móvil completa.

El contenido importante no puede desaparecer simplemente para simplificar el diseño.

---

## 34. Responsive

Los breakpoints deben adaptar presentación, no crear dos webs distintas con contenido contradictorio.

---

## 35. Enlazado interno

Actualmente la landing utiliza anchors.

Ejemplos:

```text
#productos
#contacto
```

Si aparecen futuras páginas, se diseñará una estructura coherente de enlaces internos.

---

## 36. Anchor text

Los textos de enlace deben comunicar destino o acción.

Ejemplo:

```text
Ver productos
Consultar producto
Contacto
```

es preferible a:

```text
Haz clic aquí
```

---

## 37. Contenido de producto

Actualmente las cards muestran una descripción genérica provisional.

Antes de producción debe revisarse.

No se debe publicar contenido específico sobre beneficios, usos, pureza o resultados sin validación.

---

## 38. Claims

No deben publicarse afirmaciones no verificadas como:

```text
99.9% pureza
grado farmacéutico
GMP
laboratorio certificado
COA garantizado
máxima calidad
```

si no existe evidencia real que las respalde.

---

## 39. Contexto regulatorio

El catálogo contiene nombres de sustancias que pueden estar sujetas a marcos regulatorios sensibles dependiendo de:

- clasificación;
- presentación;
- finalidad;
- claims;
- forma de comercialización.

Por tanto, SEO y copy no deben definirse únicamente desde intención comercial.

---

## 40. No asumir "research use"

La etiqueta:

```text
solo para investigación
```

no debe utilizarse automáticamente como mecanismo para legitimar cualquier producto.

La clasificación real debe revisarse caso por caso.

---

## 41. Productos sensibles

Antes de publicación definitiva debe verificarse especialmente el contexto aplicable a productos como:

- semaglutida;
- tirzepatida;
- retatrutida;
- otros péptidos del catálogo.

El hecho de existir como asset o dato dentro del repositorio no constituye validación legal para su comercialización.

---

## 42. Copy provisional

Los textos actuales deben considerarse provisionales mientras no exista validación suficiente.

Ejemplo actual:

```text
Información detallada disponible mediante atención directa.
```

es deliberadamente prudente.

---

## 43. EEAT y confianza

La web deberá reforzar señales reales de confianza mediante información verificable.

Por ejemplo, cuando proceda:

- identidad empresarial;
- contacto;
- ubicación;
- políticas;
- información legal;
- proceso real;
- documentación disponible.

No se inventarán señales de autoridad.

---

## 44. Información legal

Antes del lanzamiento deberán obtenerse los datos necesarios del titular.

Entre otros, cuando sean aplicables:

- razón social;
- NIF/CIF;
- dirección;
- email;
- información registral.

---

## 45. Contacto

Una sección de contacto clara ayuda tanto a usuario como a confianza general del sitio.

Los datos mostrados deben ser reales y operativos.

---

## 46. SEO local

Si se decide trabajar posicionamiento local, deberá existir una relación real con la localización utilizada.

No se crearán páginas masivas de ciudades sin contenido o presencia real.

---

## 47. Contenido duplicado

Si aparecen páginas de producto, cada una deberá aportar contenido propio y útil.

No bastará con cambiar únicamente el nombre dentro de una plantilla idéntica.

---

## 48. Thin content

No se crearán rutas únicamente para capturar keywords si no existe suficiente contenido para justificar una página independiente.

---

## 49. Indexación de futuras rutas

No todas las posibles combinaciones de producto, filtro o parámetro deben convertirse en URLs indexables.

La arquitectura futura deberá controlar esto.

---

## 50. JavaScript

El contenido esencial no debe depender innecesariamente de JavaScript del navegador.

El uso de Server Components favorece una base indexable.

---

## 51. Motion

Las animaciones pueden modificar presentación, pero no deben impedir que el contenido exista en el DOM de forma comprensible.

---

## 52. Accessibility + SEO

Buenas decisiones de accesibilidad suelen apoyar también:

- estructura;
- semántica;
- navegación;
- comprensión del contenido.

Ambas áreas se trabajan conjuntamente.

---

## 53. Favicon

Antes de producción se incorporarán favicons y otros iconos de marca.

---

## 54. Manifest

Se evaluará si el proyecto necesita un web app manifest.

No se añadirá por inercia si no aporta valor real.

---

## 55. Social preview

Además de Open Graph, se revisará cómo se muestra la URL al compartirse en plataformas principales.

---

## 56. Domain

Toda metadata dependiente de URL debe configurarse con el dominio final antes del lanzamiento.

---

## 57. HTTPS

La producción debe utilizar HTTPS.

Además de seguridad, es un estándar básico para un sitio web moderno.

---

## 58. Search Console

Después del deploy definitivo se configurará Google Search Console.

Objetivos:

- comprobar propiedad;
- enviar sitemap;
- revisar indexación;
- detectar errores;
- monitorizar rendimiento orgánico.

---

## 59. Analytics

Analytics y SEO responden a preguntas diferentes pero complementarias.

SEO:

```text
¿Cómo nos encuentran?
```

Analytics:

```text
¿Qué hacen al llegar?
```

---

## 60. Eventos

Se contemplan eventos como:

```text
click_product
click_contact
click_email
click_telegram
form_submit_success
```

La implementación definitiva se documentará durante deployment/analytics.

---

## 61. Lighthouse

Lighthouse puede utilizarse como herramienta de diagnóstico, pero no debe tratarse como única fuente de verdad.

Se revisarán:

- Performance;
- Accessibility;
- Best Practices;
- SEO.

---

## 62. Web Vitals reales

Cuando exista tráfico real, las métricas de campo serán más importantes que una única prueba sintética.

---

## 63. Estrategia de contenidos

Antes de producción deberán revisarse:

- H1;
- subtítulo;
- statement;
- textos de calidad;
- cards;
- contacto;
- footer;
- metadata.

Todos deben utilizar terminología coherente.

---

## 64. Lenguaje

La versión inicial está dirigida principalmente al mercado español.

El contenido deberá utilizar español natural y consistente.

---

## 65. Internacionalización

Actualmente no existe requisito multilingüe.

No se introducirá i18n hasta que exista una necesidad real.

---

## 66. Checklist SEO pre-launch

Antes de producción:

- [ ] title definitivo
- [ ] meta description
- [ ] canonical
- [ ] H1 validado
- [ ] jerarquía H2/H3
- [ ] contenido final
- [ ] claims verificados
- [ ] alt revisados
- [ ] naming revisado
- [ ] Open Graph
- [ ] favicon
- [ ] sitemap
- [ ] robots
- [ ] schema cuando proceda
- [ ] enlaces internos
- [ ] 404
- [ ] dominio final
- [ ] HTTPS
- [ ] Core Web Vitals
- [ ] responsive
- [ ] Search Console
- [ ] sitemap enviado
- [ ] indexación comprobada

---

## 67. Estado actual

Implementado parcialmente:

- HTML semántico;
- H1/H2/H3 iniciales;
- assets semánticos;
- alt;
- slugs;
- Next/Image;
- arquitectura indexable.

Pendiente:

- investigación SEO;
- contenido final;
- metadata;
- canonical;
- OG;
- sitemap;
- robots;
- schema;
- Search Console;
- medición;
- revisión regulatoria completa.

---

## 68. Documentación relacionada

Consultar:

```text
docs/architecture.md
docs/assets.md
docs/accessibility.md
docs/deployment.md
docs/motion.md
```

La estrategia SEO debe actualizarse cuando cambie el alcance comercial, legal o estructural del proyecto.