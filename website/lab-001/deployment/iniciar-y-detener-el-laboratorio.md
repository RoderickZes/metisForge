# Iniciar y detener el laboratorio

---

# Introducción

Esta guía asume que ya completaste la guía de tu sistema operativo (`windows.md`, `macos.md` o `linux.md`) y que `docker` y `docker compose` funcionan en tu computadora.

Si todavía no llegaste a ese punto, volvé a [guía de preparación del entorno](./) y elegí la guía correspondiente a tu sistema operativo.

Acá vas a aprender a poner en marcha el laboratorio, entrar a él, salir, detenerlo y volver a arrancarlo — sin perder lo que hiciste adentro.

---

# Obtener los archivos de Metis Forge

Hay dos formas de conseguir el repositorio. Ninguna es "la correcta": depende de si ya tenés Git instalado.

## Sin Git (descargando un ZIP)

Es la opción más simple si nunca usaste Git.

1. Entrá a [github.com/RoderickZes/metisForge](https://github.com/RoderickZes/metisForge).
2. Hacé clic en **Code** y después en **Download ZIP**.
3. Descomprimí el archivo descargado.

Vas a obtener una carpeta con un nombre parecido a `metisForge-main`.

## Con Git (si ya lo tenés instalado)

Si tenés Git, esta opción te va a servir más adelante: te permite traer actualizaciones del proyecto sin descargar todo de nuevo.

git clone https://github.com/RoderickZes/metisForge.git


Esto crea una carpeta llamada `metisForge`.

Si no tenés Git instalado, no hace falta que lo instales solo para este laboratorio: la opción del ZIP alcanza. Instalar Git queda fuera del alcance de esta guía — si más adelante querés hacerlo, la fuente oficial es [git-scm.com](https://git-scm.com/downloads).

---

# Ubicarte en la carpeta correcta

Los archivos que necesitás no están en la raíz del repositorio, sino en:

metisForge/labs/LAB-001-first-linux-server/deployment

(Si descargaste el ZIP, reemplazá `metisForge` por el nombre real de la carpeta que se creó al descomprimir, por ejemplo `metisForge-main`.)

Entrá a esa carpeta con tu terminal:

cd metisForge/labs/LAB-001-first-linux-server/deployment

Todos los comandos que siguen se ejecutan **desde esa carpeta**. Si los corrés desde otro lado, Docker no va a encontrar los archivos y te va a devolver un error.

---

# Construir el entorno

La primera vez que iniciás el laboratorio, Docker necesita construir la imagen: descargar Ubuntu, instalar las herramientas y dejar todo preparado.

docker compose build

Este paso tarda varios minutos la primera vez, según tu conexión. Las siguientes veces va a ser mucho más rápido, porque Docker reutiliza lo que ya construyó.

No hace falta correr este comando cada vez que querés usar el laboratorio — solo cuando lo usás por primera vez, o cuando el `Dockerfile` cambió.

---

# Iniciar el laboratorio

docker compose up -d

`-d` significa "detached": el laboratorio queda corriendo en segundo plano, y te devuelve el control de la terminal.

Si todavía no lo construiste, este comando también lo construye antes de iniciarlo.

---

# Comprobar que está corriendo

docker compose ps

Deberías ver un servicio llamado `metis-lab`, con estado `running` (o `Up`).

Si no aparece nada, el laboratorio no se inició correctamente — revisá la sección de errores frecuentes más abajo.

---

# Entrar al laboratorio

docker exec -it metis-lab bash

Esto te abre una terminal **dentro** del contenedor Linux.

---

# Reconocer el nuevo prompt

Hasta ahora tu terminal mostraba el prompt de tu sistema operativo. Al entrar al laboratorio, va a cambiar a algo como:

alumno@metis-lab:~$

Esa es tu señal de que estás dentro de Linux, no en tu computadora. A partir de acá, todos los comandos de los ejercicios se ejecutan en esta terminal, salvo que se indique lo contrario.

---

# Salir del laboratorio sin apagarlo

exit

(o `Ctrl+D`)

Esto cierra tu sesión de terminal dentro del contenedor, pero **el laboratorio sigue corriendo**. Es lo mismo que desconectarte de un servidor real sin apagarlo: el servidor sigue prendido, vos simplemente dejaste de estar conectado.

Podés volver a entrar en cualquier momento con el mismo comando de la sección anterior.

---

# Detener el laboratorio conservando tu trabajo

Cuando termines de trabajar por hoy, no hace falta que dejes el laboratorio corriendo. Para apagarlo:

docker compose stop

Y para volver a prenderlo, con todo tal cual lo dejaste:

docker compose start

Esto es equivalente a apagar y prender un servidor real: los usuarios que creaste, los archivos que modificaste y la configuración que armaste siguen ahí. Nada se pierde.

Si preferís hacer las dos cosas —apagar y volver a prender— en un solo paso:

docker compose restart

---

# Cuando algo sale mal: arreglalo, no lo tires

Es tentador, cuando algo se rompe, borrar todo y empezar de cero. Pero en una infraestructura real casi nunca vas a tener esa opción — no podés "reiniciar de fábrica" un servidor en producción cada vez que cometés un error.

Por eso, si algo no funciona como esperabas dentro del laboratorio, el primer paso no es borrar el contenedor. Es diagnosticar: leer el mensaje de error, buscar en la documentación, preguntar. Ese proceso —encontrarte con un problema real y resolverlo— es tan parte del aprendizaje como completar el ejercicio.

Guardá los pasos que probaste y lo que descubriste en tu documento de evidencias, aunque el problema te haya llevado un rato resolverlo. Especialmente si te llevó un rato.

---

# Si de verdad necesitás empezar de cero

Hay situaciones legítimas para reconstruir todo: por ejemplo, si el `Dockerfile` cambió (porque Metis Forge se actualizó), o si necesitás practicar el laboratorio completo desde el principio.

Para eso:

docker compose down

Esto elimina el contenedor — pero no la imagen que ya construiste. La próxima vez que corras `docker compose up -d`, vas a arrancar un contenedor nuevo, limpio, según lo que define el `Dockerfile`. Todo lo que hiciste adentro (usuarios creados, archivos modificados) se pierde.

Si además necesitás reconstruir la imagen desde cero —por ejemplo, porque el `Dockerfile` cambió—:

docker compose up -d --build

Y si sospechás que la imagen quedó en un estado raro y querés forzar una reconstrucción completa, ignorando todo lo que Docker guardó en caché:

docker compose build --no-cache


---

# Qué persiste y qué no
'''text
| Acción | ¿Se pierde tu trabajo? |
|---|---|
| `exit` | No. El contenedor sigue corriendo. |
| `docker compose stop` / `start` | No. Es como apagar y prender un servidor. |
| `docker compose restart` | No. |
| `docker compose down` | Sí. El contenedor se elimina; el próximo `up` arranca de cero. |
'''
La imagen construida (`docker compose build`) no se pierde con `down` — solo se pierde el contenedor y lo que hiciste dentro de él.
---

# Errores frecuentes

## "Cannot connect to the Docker daemon"

Docker no está corriendo. En Windows y macOS, abrí Docker Desktop y esperá a que termine de iniciar. En Linux, comprobá el servicio con `sudo systemctl status docker` (o el comando equivalente de tu distribución).

## "no configuration file provided: not found"

Estás corriendo el comando desde una carpeta que no tiene `compose.yaml`. Revisá que estés parado en `labs/LAB-001-first-linux-server/deployment`.

## El puerto 2222 ya está en uso

Algún otro programa de tu computadora ya está usando ese puerto. Todavía no lo necesitás — hasta el ejercicio de SSH no hace falta que funcione — así que por ahora podés ignorar este error si aparece solo como advertencia y el resto de los comandos funciona bien.

---

# Evidencia

Registrá en tu documento de evidencias:

- Resultado de `docker compose ps` con el laboratorio corriendo.
- El prompt que viste al entrar (`alumno@metis-lab:~$`).
- Cualquier error que te haya aparecido y cómo lo resolviste.

---

# Punto de control

Antes de continuar, comprobá que podés responder:

- ¿Qué diferencia hay entre `docker compose stop` y `docker compose down`?
- ¿Qué comando usás para entrar al laboratorio? ¿Y para salir sin apagarlo?
- ¿Cómo reconocés, por el prompt, si estás en tu computadora o dentro del laboratorio?
- ¿Qué se pierde si corrés `docker compose down`? ¿Qué no se pierde?
- ¿Por qué conviene diagnosticar un problema antes de borrar el contenedor?

---

# Próximo paso

Con el laboratorio corriendo y sabiendo cómo entrar, salir y detenerlo, ya podés empezar a explorar el entorno Linux.

## Continúa con

[01 — Entendiendo tu entorno](../01-entorno/)

