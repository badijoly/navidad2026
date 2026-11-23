# 🎄 Navidad donde los Tapia Rivera 2026 — Amigo Secreto Familiar

Aplicación web estática de Amigo Secreto para 7 miembros de la familia. No requiere servidor ni base de datos: todo funciona en el navegador (localStorage).

## Contenido del proyecto

| Archivo / carpeta | Descripción |
|---|---|
| `index.html` | Punto de entrada (pantalla de login) |
| `jugador/index.html` | Pantalla del jugador (revelación, reglas, ideas, preguntas) |
| `_next/` | Archivos estáticos (JS, CSS, fuentes) — no editar |
| `favicon.ico` | Ícono de la pestaña |

> ⚠️ Importante: sube **todos** los archivos y carpetas tal cual, incluidos los que empiezan con punto o guion bajo (`_next`). No renombres `index.html`.

## Usuarios y claves (no cambiar)

| Nombre | Clave (4 dígitos) |
|---|---|
| Gabriel | 8758 |
| Verónica | 6754 |
| Marlenne | 2032 |
| Rodolfo | 4266 |
| Constanza | 8144 |
| Donovan | 3750 |
| Esteban | 3765 |

La asignación del amigo secreto se genera **una sola vez** (ciclo válido: nadie se asigna a sí mismo, todos dan y reciben exactamente un regalo) y queda guardada en el navegador; nunca cambia.

---

## 1) Subir el proyecto a GitHub

1. Crea una cuenta en [github.com](https://github.com) si no tienes una.
2. Entra a <https://github.com/new> (Nuevo repositorio).
3. Ponle un nombre, por ejemplo `amigo-secreto-familiar`.
4. Marca **Público** (necesario para GitHub Pages gratis) y pulsa **Create repository**.
5. En la página del repositorio nuevo, pulsa el enlace **uploading an existing file**.
6. Arrastra **todos los archivos y carpetas** del proyecto (todo lo que está junto a `index.html`, incluida la carpeta `_next`). Si subes una carpeta con subcarpetas, arrástralas completas.
7. Escribe un mensaje tipo "Primera versión" y pulsa **Commit changes**.
8. Espera la barra verde que dice que los archivos se subieron.

> Tip alternativo: también puedes arrastrar el contenido comprimido en ZIP y descomprimirlo en GitHub, o usar GitHub Desktop.

## 2) Activar GitHub Pages

1. En tu repositorio, entra a **Settings** (⚙️).
2. En el menú lateral, pulsa **Pages**.
3. En **Source** elige **Deploy from a branch**.
4. En **Branch** elige `main` y la carpeta `/ (root)`. Pulsa **Save**.
5. Espera 1–2 minutos y recarga la página: aparecerá la URL pública, por ejemplo:
   `https://TU-USUARIO.github.io/amigo-secreto-familiar/`
6. Abre esa URL en el navegador y comprueba que se ve la pantalla de login con el título **"Navidad donde los Tapia Rivera 2026"**.

> Si algo se ve sin estilos, revisa que la carpeta `_next` se haya subido completa (en GitHub se ve como una carpeta normal).

> ⚠️ Nota: con GitHub Pages la app funciona bien si se entra siempre por la URL principal. Si se comparte el enlace directo a `/jugador/`, GitHub Pages también lo sirve correctamente porque la carpeta `jugador/` contiene su propio `index.html`.

## 3) Alternativa: Netlify Drop (sin cuenta de Git)

1. Entra a <https://app.netlify.com/drop>.
2. Arrastra la **carpeta completa del proyecto** (la que contiene `index.html`).
3. Netlify publica la app al instante con una URL tipo `https://algo.netlify.app`.
4. Puedes crear una cuenta gratis para conservar el sitio y cambiar el nombre del dominio.

## 4) Alternativa: Vercel

1. Entra a <https://vercel.com/new>.
2. Importa el repositorio de GitHub que creaste en el paso 1.
3. No cambies ninguna opción: Vercel detecta que es un sitio estático y lo publica.
4. Pulsa **Deploy**.

---

## 5) Insertar la app en tapiarivera.cl/amigosecreto (Google Sites)

1. Abre tu sitio en <https://sites.google.com> y entra a la página **amigosecreto** (o créala con esa ruta).
2. A la derecha, en el panel **Insertar**, pulsa **Incrustar** (Embed).
3. Elige la pestaña **Incrustar por URL** (Embed by URL).
4. Pega la URL pública de la app (la de GitHub Pages del paso 2, por ejemplo `https://TU-USUARIO.github.io/amigo-secreto-familiar/`) y pulsa **Insertar**.
5. Ajusta el tamaño del bloque insertado para que ocupe bien la pantalla (se recomienda **ancho completo** y una altura de al menos **900 px**, ya que la app está optimizada para móviles con scroll).
6. Publica el sitio con el botón **Publicar** (arriba a la derecha).
7. Comprueba que en `tapiarivera.cl/amigosecreto` se ve la app funcionando.

> 💡 Consejo: si el bloque insertado se ve cortado, vuelve a editarlo y agranda la altura. En móviles el visitante puede hacer scroll dentro del bloque sin problema.

> 💡 Consejo 2: para que la app se vea a pantalla completa sin el menú de Google Sites, puedes añadir en el sitio un enlace o botón que abra directamente la URL de GitHub Pages.

---

## Notas técnicas

- Todo el estado (asignación, sesión, compromiso, ideas, preguntas) se guarda en `localStorage` del navegador de cada persona: **los datos no se comparten entre dispositivos**. Es lo esperado para mantener el secreto: cada quien ve solo lo suyo, y las preguntas anónimas aparecen sin firma cuando el destinatario inicia sesión en su propio dispositivo.
- El botón "Descargar revelación" guarda la foto PNG de tu amigo secreto directamente en el móvil o computador.
- Regalo: entre **$20.000 y $50.000 CLP**, listo para la noche de Navidad. 🎁
