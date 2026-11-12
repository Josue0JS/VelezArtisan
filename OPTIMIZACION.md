# Revisión de rendimiento · VelezArtisan

## Cambios aplicados

- **Carga diferida de Horarios:** `js/horarios.js` y `css/horarios.css` ahora se descargan al entrar por primera vez en esa sección. Se difieren aproximadamente **48,6 KB sin comprimir** del arranque inicial.
- **Menos reconstrucciones y renders:** las actualizaciones de datos agrupan `rebuild()` mediante `requestAnimationFrame`, evitando repetir el trabajo varias veces en el mismo frame.
- **Snapshots incrementales:** Firestore actualiza el mapa local usando `docChanges()` en vez de recorrer y copiar todos los documentos de la colección en cada snapshot.
- **Caché:** se activa la persistencia de Firestore en IndexedDB con soporte para varias pestañas. Si el navegador no la admite, la app continúa funcionando sin bloquear el inicio de sesión.
- **Imágenes:** las imágenes de productos usan `loading="lazy"` y `decoding="async"`. La imagen seleccionada se sigue reduciendo a 500 × 500 JPEG y ahora se libera la URL temporal después de cargarla.
- **Fuentes:** se añaden `preconnect` para Google Fonts y fonts.gstatic.com.

## Hallazgos de la auditoría

- La aplicación usa JavaScript clásico con funciones globales e `onclick` inline; no tiene Vite, Webpack ni otro bundler. Por eso no se hizo una migración a módulos ES ni un cambio masivo de arquitectura: habría riesgo de romper referencias globales. Se aplicó lazy loading al módulo independiente de mayor tamaño (Horarios).
- Firestore tiene siete listeners de colección (`ing`, `prod`, `led`, `prov`, `cfg`, `cal`, `hor`). No se encontraron llamadas `get()`, `where()`, `orderBy()` ni consultas dentro de bucles; por tanto, **no hay evidencia de un patrón N+1 en el código actual**.
- Los listeners leen las colecciones completas. Esto es simple y mantiene la sincronización en vivo, pero el costo de lectura crecerá con el historial, especialmente `led`. No se limitó ni paginó `led` porque las predicciones y reconstrucción de existencias dependen del historial; hacerlo sin rediseñar el modelo podría alterar resultados.
- No es posible identificar consultas lentas reales ni medir latencia de producción sin métricas de Firebase/Performance Monitoring y datos reales. La auditoría identifica el patrón de lecturas, no inventa tiempos.

## Validación

- Se ejecutó `node --check` sobre todos los archivos `js/*.js`; todos pasaron la comprobación sintáctica.
- No se pudo ejecutar una prueba funcional contra el proyecto Firebase real desde este entorno. Después de publicar, conviene validar inicio de sesión, ventas, inventario, pedidos, recepción, mermas y la primera apertura de Horarios.
