# VelezArtisan · Fase 1 móvil

Se conservan `index.html`, `css/`, `js/`, Firebase Auth y Firestore. Se añadió una PWA instalable, barra inferior móvil y estructura de Capacitor 8. No se reescribió la aplicación.

## Web / PWA

Servir desde HTTPS o `localhost` (no abrir el HTML como `file://`). Ejemplo: `npx serve .` desde la raíz. El navegador puede instalar la PWA cuando cumpla sus requisitos. El service worker guarda solamente archivos propios y no cachea Firebase ni recursos de terceros. La interfaz puede abrirse offline, pero iniciar sesión por primera vez y algunas funciones requieren internet. El acceso offline a datos depende de la persistencia de Firestore y de una sesión previa.

## Android

Instalar Node.js 22+, Android Studio y SDK. Ejecutar `npm install`, `npm run build`, `npx cap add android`, `npx cap sync android`, `npx cap open android`. El identificador `com.velezartisan.app` es provisional: definirlo antes de publicar.

## iOS

En un Mac con Xcode: `npm install`, `npm run build`, `npx cap add ios`, `npx cap sync ios`, `npx cap open ios`. Probar Firebase Auth en WebView iOS y configurar dominios autorizados / métodos de acceso según corresponda.

## Precauciones

- La aplicación móvil comparte el mismo Firebase de producción: hacer pruebas con datos de prueba o proyecto de staging.
- `www/` es salida generada; editar archivos fuente en la raíz.
- Para actualizar la PWA, incrementar `CACHE` en `sw.js` cuando cambien recursos estáticos.
- Los scripts Firebase y Google Fonts dependen de internet salvo que se empaqueten localmente en una fase posterior. Para garantizar arranque completamente offline en Capacitor, hay que empaquetar SDKs y fuentes localmente.
- Fase 1 no significa publicación ni prueba de extremo a extremo: validar login, ventas, inventario, sincronización y dispositivos reales.
- El menú Más sigue permitiendo acceso a secciones secundarias; Cerrar sesión está disponible en el menú existente.
