# Deployment — PepEspaña

Este documento define el proceso previsto para llevar **PepEspaña** desde desarrollo local hasta producción.

La web no se considera terminada únicamente porque funcione en:

```text
localhost:3000
```

El proceso completo incluye:

```text
desarrollo
↓
validación
↓
build
↓
deploy
↓
dominio
↓
DNS
↓
HTTPS
↓
analytics
↓
Search Console
↓
QA producción
↓
monitorización
```

---

## 1. Estado actual

El proyecto todavía se encuentra en desarrollo.

Actualmente:

- repositorio Git local configurado;
- repositorio GitHub configurado;
- rama `main`;
- desarrollo mediante Next.js;
- deployment final pendiente.

La plataforma prevista inicialmente es:

```text
Vercel
```

---

## 2. Entornos

Conceptualmente existirán al menos:

```text
local
preview
production
```

---

## 3. Local

Entorno de desarrollo:

```text
http://localhost:3000
```

Se utiliza mediante:

```bash
npm run dev
```

---

## 4. Preview

Vercel puede generar URLs de preview asociadas al desarrollo.

Estas URLs sirven para:

- revisión;
- QA;
- cliente;
- pruebas antes de producción.

No deben tratarse automáticamente como URLs indexables definitivas.

---

## 5. Production

Producción utilizará el dominio final de PepEspaña una vez configurado.

El dominio definitivo todavía debe confirmarse/configurarse.

---

## 6. GitHub

Repositorio:

```text
mecrophagus/pepespana
```

La rama principal actual es:

```text
main
```

---

## 7. Flujo de código

Flujo habitual:

```text
VS Code
↓
Git local
↓
GitHub
↓
Vercel
```

El código no debe modificarse directamente en producción.

---

## 8. Antes del push

Revisar:

```bash
git status
```

y:

```bash
git diff
```

Después de staging:

```bash
git diff --cached
```

---

## 9. Build local

Antes de una entrega relevante o lanzamiento se debe ejecutar:

```bash
npm run build
```

La build debe finalizar correctamente.

---

## 10. Lint

También debe ejecutarse:

```bash
npm run lint
```

y corregirse cualquier problema relevante.

---

## 11. TypeScript

La build de Next.js ayuda a detectar problemas de tipos.

Si el flujo futuro incorpora un script específico de type-check puede documentarse adicionalmente.

---

## 12. Working tree

Antes de un deploy de producción debe conocerse exactamente qué versión se está desplegando.

Idealmente:

```text
working tree clean
```

después del commit correspondiente.

---

## 13. Commits

Los commits que lleguen a producción deben describir unidades reales.

No deben utilizarse mensajes como:

```text
final final
update
last changes
```

---

## 14. Vercel

Vercel es la opción inicial porque se integra directamente con Next.js.

La configuración definitiva deberá verificarse cuando conectemos el repositorio.

---

## 15. Project root

El repositorio Git actual contiene directamente la aplicación Next.js dentro de `web/` como raíz local del repositorio.

Al conectar Vercel debe verificarse que detecta correctamente:

```text
package.json
next.config.ts
app/
```

---

## 16. Node

La versión utilizada localmente debe ser compatible con el entorno de producción.

No se debe asumir que Vercel utilizará exactamente la misma versión sin configuración.

Antes de deploy se verificará compatibilidad.

---

## 17. Dependencies

Las dependencias deben encontrarse declaradas correctamente en:

```text
package.json
```

No debe dependerse de paquetes instalados globalmente en el ordenador de desarrollo.

---

## 18. package-lock

El repositorio utiliza:

```text
package-lock.json
```

y npm.

El lockfile debe mantenerse versionado.

---

## 19. Environment variables

Actualmente no se han definido variables de entorno necesarias para las secciones ya implementadas.

Cuando entre el formulario o integraciones externas podrán aparecer variables como:

```text
API keys
email provider credentials
analytics configuration
```

---

## 20. Secretos

Nunca deben almacenarse secretos reales directamente en:

```text
source code
README
Git
public/
```

---

## 21. `.env.local`

Los secretos locales podrán almacenarse en:

```text
.env.local
```

cuando sea necesario.

Este archivo no debe versionarse.

---

## 22. Variables en Vercel

Los valores de producción deberán configurarse mediante la gestión de variables de entorno de la plataforma.

---

## 23. NEXT_PUBLIC

Una variable que comienza por:

```text
NEXT_PUBLIC_
```

puede quedar disponible en el código cliente.

No debe utilizarse para secretos.

---

## 24. Formulario

La futura sección Contact necesitará una estrategia real de envío.

Antes de producción deberán validarse:

- destino;
- proveedor;
- validación;
- seguridad;
- antispam;
- errores;
- logs.

---

## 25. Correo

No se implementará un sistema de correo ficticio.

Debe utilizarse un proveedor o mecanismo adecuado al alcance del proyecto.

---

## 26. Telegram

Si existe integración con Telegram, las credenciales sensibles no deben quedar expuestas al navegador.

---

## 27. Dominio

Antes del lanzamiento se necesita confirmar:

- dominio;
- propiedad;
- registrador;
- acceso DNS.

---

## 28. DNS

Al conectar el dominio se configurarán los registros requeridos por Vercel o el proveedor final.

No se copiarán registros DNS de otros proyectos sin comprobar el caso real.

---

## 29. TTL

Los cambios DNS pueden necesitar tiempo de propagación.

No debe asumirse que un cambio falló únicamente porque no es visible inmediatamente.

---

## 30. www

Debe decidirse una URL principal.

Por ejemplo:

```text
https://pepespana.es
```

o:

```text
https://www.pepespana.es
```

La variante secundaria debe redirigir de forma coherente a la principal.

---

## 31. Canonical

La configuración de dominio debe coincidir con la URL canonical utilizada por SEO.

---

## 32. HTTPS

La producción debe servir contenido mediante:

```text
HTTPS
```

Vercel normalmente gestiona certificados TLS, pero debe verificarse su estado real.

---

## 33. Mixed content

Después de activar HTTPS se debe revisar que ningún recurso se cargue mediante:

```text
http://
```

desde una página HTTPS.

---

## 34. Redirect HTTP

El tráfico HTTP debe redirigirse correctamente a HTTPS.

---

## 35. Metadata de producción

Antes del lanzamiento deben actualizarse valores dependientes del dominio.

Ejemplos:

- canonical;
- Open Graph URL;
- metadataBase;
- sitemap;
- robots.

---

## 36. Sitemap

El sitemap debe apuntar al dominio definitivo.

---

## 37. Robots

Debe comprobarse que producción no permanece accidentalmente bloqueada.

Especialmente si durante desarrollo se utiliza alguna configuración:

```text
noindex
disallow
```

---

## 38. Previews y SEO

Las URLs de preview no deben competir con el dominio principal.

Se revisará la configuración de indexación correspondiente.

---

## 39. Analytics

La estrategia prevista inicialmente puede incluir:

```text
Vercel Web Analytics
```

y:

```text
Speed Insights
```

si se consideran apropiados.

---

## 40. Analytics no se instala por inercia

La tecnología final debe decidirse según:

- necesidades;
- privacidad;
- cookies;
- nivel de análisis requerido.

---

## 41. Eventos

Eventos potenciales:

```text
page_view
click_product
click_contact
click_email
click_telegram
form_submit_success
form_submit_error
```

---

## 42. Naming de eventos

Los eventos deben mantener una convención estable.

No mezclar:

```text
ProductClick
product-click
clickProduct
click_product
```

para el mismo concepto.

---

## 43. Product slug

Los slugs existentes pueden utilizarse como identificadores analíticos.

Ejemplo conceptual:

```text
click_product
product: tesamorelina
```

---

## 44. Privacidad

Antes de instalar herramientas de seguimiento debe revisarse qué datos recopilan y qué obligaciones generan.

---

## 45. Cookies

No se añadirá un banner de cookies falso o innecesario.

La solución debe corresponder a las tecnologías realmente utilizadas.

---

## 46. Search Console

Después de disponer de dominio en producción se configurará:

```text
Google Search Console
```

---

## 47. Verificación

La propiedad podrá verificarse mediante uno de los métodos compatibles, preferentemente uno que se adapte correctamente al control disponible sobre dominio/DNS.

---

## 48. Sitemap en Search Console

Después de generar el sitemap se enviará desde Search Console.

---

## 49. Indexación

Se comprobará:

- homepage;
- futuras rutas;
- canonical;
- bloqueos;
- errores.

---

## 50. Inspección de URL

La herramienta de inspección permitirá revisar cómo Google interpreta URLs concretas.

---

## 51. 404

Debe existir comportamiento correcto para URLs inexistentes.

Antes de lanzamiento se comprobará una URL inventada.

---

## 52. 500

También debe conocerse cómo se comporta la aplicación ante errores inesperados cuando existan rutas/operaciones de servidor.

---

## 53. Form errors

El formulario debe manejar fallos de proveedor o servidor sin dejar la interfaz bloqueada.

---

## 54. Loading states

Las operaciones asíncronas deben mostrar estado cuando corresponda.

---

## 55. Success states

Una operación completada debe comunicar claramente su resultado.

---

## 56. QA desktop

Antes del lanzamiento revisar al menos:

- layout;
- navegación;
- hover;
- scroll;
- Hero;
- Products;
- formularios;
- footer;
- enlaces.

---

## 57. QA tablet

Tablet debe verificarse como viewport propio.

No se debe asumir que si mobile y desktop funcionan, tablet funcionará automáticamente.

---

## 58. QA mobile

Revisar:

- navegación;
- touch;
- scroll;
- dimensiones;
- texto;
- cards;
- CTA;
- teclado;
- formulario;
- reduced motion.

---

## 59. Browser matrix

Como mínimo:

```text
Chrome / Chromium
Firefox
Safari / WebKit
```

---

## 60. Windows / macOS / iOS / Android

No es necesario probar todas las combinaciones posibles, pero sí cubrir razonablemente:

- desktop;
- iOS/Safari;
- Android/Chromium.

---

## 61. Responsive widths

Durante QA se comprobarán varios anchos, no únicamente presets exactos.

Los bugs suelen aparecer entre breakpoints.

---

## 62. Real devices

Cuando sea posible se utilizarán dispositivos físicos además del emulador.

---

## 63. Performance

Antes de producción se revisarán:

```text
LCP
INP
CLS
```

---

## 64. Image weight

Se revisará el peso total de:

- Hero;
- catálogo;
- futuros assets.

---

## 65. JavaScript

Se comprobará que las animaciones no han convertido innecesariamente toda la página en Client Component.

---

## 66. Lighthouse

Ejecutar auditorías como referencia.

No perseguir puntuaciones perfectas mediante optimizaciones que empeoren la experiencia.

---

## 67. Speed Insights

Puede utilizarse para observar comportamiento de campo una vez exista tráfico real.

---

## 68. Logging

Si aparecen operaciones de servidor, deberán existir logs suficientes para diagnosticar errores.

No deben registrar secretos ni información sensible innecesaria.

---

## 69. Monitoring

Después de lanzamiento se revisarán:

- errores;
- disponibilidad;
- Web Vitals;
- formularios;
- conversiones;
- indexación.

---

## 70. Rollback

Debe existir capacidad de volver a un deployment anterior si una versión de producción introduce un fallo grave.

Vercel facilita mantener deployments anteriores.

---

## 71. Hotfix

Un hotfix debe seguir entrando por Git.

No se debe modificar manualmente una build desplegada fuera del repositorio.

---

## 72. Producción como fuente visible

La versión de producción debe corresponder a un commit identificable.

Esto permite rastrear:

```text
qué código
↓
generó
↓
qué deployment
```

---

## 73. Branching

Actualmente el proyecto utiliza principalmente:

```text
main
```

No se necesita todavía una estrategia compleja de múltiples ramas permanentes.

Puede introducirse cuando exista:

- equipo mayor;
- releases;
- funcionalidades paralelas;
- necesidad real de revisión.

---

## 74. Pull Requests

En un proyecto individual no son estrictamente necesarias para cada cambio.

Si aumenta el equipo, los PR pueden convertirse en parte importante del QA y revisión.

---

## 75. Backup

GitHub no sustituye completamente al backup de todos los recursos del proyecto.

Los assets maestros y documentación se mantienen también en Google Drive.

---

## 76. Datos del cliente

Las credenciales de dominio, correo o proveedores no deben incluirse en documentación pública del repositorio.

---

## 77. Legal

Antes del lanzamiento deben estar disponibles los textos y datos legales aplicables.

La implementación depende de la configuración real del negocio y del tracking utilizado.

---

## 78. Checklist técnica pre-deploy

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] working tree revisado
- [ ] commit creado
- [ ] push correcto
- [ ] assets finales
- [ ] variables de entorno
- [ ] metadata
- [ ] favicon
- [ ] Open Graph
- [ ] sitemap
- [ ] robots
- [ ] 404
- [ ] responsive
- [ ] accesibilidad
- [ ] formulario
- [ ] enlaces
- [ ] performance
- [ ] reduced motion

---

## 79. Checklist de dominio

- [ ] dominio confirmado
- [ ] acceso al registrador
- [ ] registros DNS
- [ ] dominio añadido a Vercel
- [ ] propagación comprobada
- [ ] versión www/no-www decidida
- [ ] redirecciones
- [ ] HTTPS
- [ ] canonical
- [ ] sitemap actualizado

---

## 80. Checklist post-launch

- [ ] abrir producción en desktop
- [ ] abrir producción en mobile
- [ ] probar formulario real
- [ ] probar email
- [ ] probar Telegram
- [ ] probar anchors
- [ ] probar 404
- [ ] revisar consola
- [ ] revisar Network
- [ ] revisar Web Vitals
- [ ] comprobar HTTPS
- [ ] comprobar canonical
- [ ] comprobar robots
- [ ] comprobar sitemap
- [ ] Search Console
- [ ] enviar sitemap
- [ ] inspeccionar URL
- [ ] comprobar analytics
- [ ] comprobar eventos

---

## 81. Revisión 24–72 horas

Después del lanzamiento se realizará una revisión adicional para detectar problemas que no hayan aparecido durante deploy.

Especialmente:

- DNS;
- formularios;
- analytics;
- indexación;
- errores reales;
- comportamiento mobile.

---

## 82. Revisión posterior

La web necesita mantenimiento incluso después de salir a producción.

Posibles tareas:

- actualizar contenido;
- revisar dependencias;
- observar Search Console;
- revisar rendimiento;
- corregir errores;
- adaptar catálogo.

---

## 83. Definition of Done

PepEspaña no se considera terminado únicamente porque el diseño esté implementado.

La definición de finalización incluye:

```text
publicado
+
responsive
+
accesible
+
indexable
+
medible
+
optimizado
+
formularios funcionales
+
dominio correcto
+
HTTPS
+
analytics
+
Search Console
+
QA post-launch
```

---

## 84. Estado actual

Implementado:

- Git;
- GitHub;
- estructura Next.js;
- build previamente validada durante desarrollo.

Pendiente:

- conexión con Vercel;
- dominio;
- DNS;
- HTTPS definitivo;
- formulario;
- variables;
- Analytics;
- Search Console;
- QA final;
- producción.

---

## 85. Documentación relacionada

Consultar:

```text
docs/architecture.md
docs/assets.md
docs/motion.md
docs/seo.md
docs/accessibility.md
```

Este documento debe actualizarse durante la fase real de deployment con los valores y decisiones finalmente utilizadas.