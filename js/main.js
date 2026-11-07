/* ===== main.js =====
   Arranque: atajos de teclado y primer dibujo de la aplicación. */

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") closeM();
});

draw();
init();
