# ARTISAN CAFÉ · Inventario

Plataforma para registrar ventas, inventario, proveedores, pedidos y mermas de la cafetería.
Funciona en cualquier navegador, con los mismos datos para todo el equipo (Firebase + GitHub Pages).

## Estructura del proyecto

```
artisan-cafe/
├── index.html            ← la página: solo estructura y enlaces a los demás archivos
├── firestore.rules       ← reglas de seguridad de la base de datos (se pegan en Firebase)
├── css/                  ← estilos (se cargan en este orden)
│   ├── base.css          colores, tipografía, estructura y componentes principales
│   ├── glass.css         efecto vidrio (glass)
│   ├── components.css    tarjetas, productos, pedidos, calendario, secciones plegables
│   ├── animations.css    animaciones (se apagan si el dispositivo reduce el movimiento)
│   ├── theme.css         tema blanco: botones, menú lateral y fondo
│   └── login.css         pantalla de inicio de sesión
└── js/                   ← lógica (se cargan en este orden)
    ├── config.js         ★ ÚNICO archivo que debes editar: datos de tu Firebase
    ├── utils.js          formato de dinero y cantidades, unidades, avisos y paneles
    ├── effects.js        contadores animados, entrada en cascada, brillo del cursor
    ├── state.js          estado en memoria, pestañas, filtros y atajos de acceso
    ├── data.js           guardar / borrar / reconstruir inventario, copia de seguridad, datos de ejemplo
    ├── auth.js           inicio de sesión y conexión en vivo con la base de datos
    ├── predict.js        predicción: festivos de Colombia, días pesados, puentes, venta perdida
    ├── charts.js         gráficos (barras, dona, medidor de stock)
    ├── views.js          lo que se dibuja en cada pantalla, menú y navegación
    ├── ventas.js         acciones de Ventas
    ├── inventario.js     acciones de Inventario
    ├── mermas.js         acciones de Mermas
    ├── productos.js      acciones de Productos y recetas
    ├── proveedores.js    acciones de Proveedores
    ├── recepciones.js    acciones de Recepciones (insumos que llegan)
    ├── pedidos.js        acciones de Pedidos
    └── main.js           arranque
```

## Cómo se conectan

1. `index.html` carga los estilos de `css/` y luego los scripts de `js/` **en el orden indicado**.
2. Los scripts comparten las mismas variables y funciones: `state.js` guarda los datos,
   `data.js` los escribe en la base, `views.js` los dibuja, y los archivos de acciones
   (`ventas.js`, `inventario.js`, …) responden a los botones de cada pantalla.
3. `auth.js` pide el correo y la clave; al entrar, se conecta a Firebase y todo se actualiza en vivo.
4. `main.js` va al final porque dibuja la aplicación cuando ya cargó todo lo demás.

> Si agregas un archivo nuevo de `js/`, añade su línea `<script src="js/…">` en `index.html`
> **antes** de `main.js`.

## Cómo publicarlo

### 1. Firebase (base de datos y acceso)
1. Entra a https://console.firebase.google.com y crea un proyecto (puedes desactivar Analytics).
2. **Authentication** → Comenzar → activa **Correo electrónico/contraseña**. En la pestaña
   **Usuarios** agrega la cuenta de la cafetería (correo y clave). En **Configuración → Acciones del
   usuario** desactiva **Habilitar creación (registro)** para que nadie más pueda crear cuentas.
3. **Firestore Database** → Crear base de datos → modo producción → elige una ubicación cercana.
   En la pestaña **Reglas**, pega el contenido de `firestore.rules` (cambia el correo si usas otro) y publica.
4. **Configuración del proyecto** (engranaje) → **Tus apps** → registra una app web (`</>`).
   Copia los datos de `firebaseConfig` y pégalos en **`js/config.js`**.

### 2. GitHub Pages
1. Crea un repositorio en GitHub y sube **todo el contenido** de esta carpeta, respetando las carpetas
   `css/` y `js/`.
2. En el repositorio: **Settings → Pages → Build and deployment → Deploy from a branch → main / (root)**.
3. Espera uno o dos minutos: GitHub te dará la dirección (`https://tuusuario.github.io/nombre-repo/`).
4. En Firebase: **Authentication → Configuración → Dominios autorizados → Agregar dominio**:
   `tuusuario.github.io`.

### 3. Pasar los datos que ya tenías
En la versión anterior: **Ayuda → Copia de seguridad → Exportar datos** y copia el texto.
En esta: **Ayuda → Importar datos**, pega el texto (o elige el archivo) y pulsa **Importar**.

## Seguridad
- El correo y la clave **no están en el código**: se escriben al entrar y Firebase los valida.
- `firestore.rules` solo deja leer y escribir a la cuenta de la cafetería.
- Usa una clave larga y cámbiala desde Firebase si alguien deja el equipo.
