# Guía de instalación — macOS (Quick Mode)

## Objetivo

Esta guía prepara el entorno necesario para realizar **LAB-001 First Linux Server** utilizando Docker en macOS.

Está pensada para personas que comienzan desde cero. No es necesario tener experiencia previa con Linux, Git o Docker.

Al finalizar vas a poder iniciar el laboratorio con un único comando.

---

## Requisitos mínimos

### Hardware

* Procesador Intel o Apple Silicon (M1, M2, M3 o superior)
* 8 GB de memoria RAM (16 GB recomendado)
* 10 GB de espacio libre en disco

### Sistema operativo

* macOS 13 Ventura o superior

---

## ¿Qué vamos a instalar?

Necesitamos solamente dos herramientas:

| Herramienta    | ¿Para qué sirve?                                      |
| -------------- | ----------------------------------------------------- |
| Docker Desktop | Ejecutar el laboratorio Linux dentro de un contenedor |
| Git            | Descargar el proyecto Metis Forge                     |

No vamos a instalar una máquina virtual ni reemplazar macOS.

---

# Paso 1 — Instalar Docker Desktop

Abrí el sitio oficial de Docker y descargá **Docker Desktop para Mac**.

Elegí la versión correcta:

* **Apple Silicon** → M1, M2, M3…
* **Intel** → Mac con procesador Intel.

Instalá la aplicación normalmente y abrila.

La primera vez puede solicitar permisos del sistema. Aceptalos.

Cuando Docker termine de iniciar deberías ver el icono de la ballena en la barra superior de macOS.

### Comprobar la instalación

Abrí **Terminal** y ejecutá:

```bash
docker --version
docker compose version
```

Deberías obtener una salida similar a:

```text
Docker version 28.x.x
Docker Compose version v2.x.x
```

Si ambos comandos funcionan, Docker está listo.

---

# Paso 2 — Verificar Git

En la misma Terminal ejecutá:

```bash
git --version
```

Si aparece un número de versión, no tenés que hacer nada más.

Si macOS ofrece instalar las **Command Line Tools**, aceptá la instalación y volvé a ejecutar el comando cuando termine.

---

# Paso 3 — Elegir una carpeta de trabajo

Vamos a guardar Metis Forge dentro de tu carpeta personal.

Ejecutá:

```bash
cd ~
mkdir -p Proyectos
cd Proyectos
```

Comprobá dónde estás:

```bash
pwd
```

Deberías encontrarte dentro de una ruta similar a:

```text
/Users/tu_usuario/Proyectos
```

---

# Paso 4 — Descargar Metis Forge

Ejecutá:

```bash
git clone https://github.com/RoderickZes/metisForge.git
```

Entrá al proyecto:

```bash
cd metisForge
```

Comprobá el contenido:

```bash
ls
```

Deberías ver archivos como:

```text
LICENSE
README.md
labs
docs
```

---

# Paso 5 — Ir al laboratorio

Entrá al directorio del primer laboratorio:

```bash
cd labs/LAB-001-first-linux-server
```

Verificá que exista la carpeta de despliegue:

```bash
ls
```

Entre otros elementos deberías encontrar:

```text
deployment
exercises
```

---

# Paso 6 — Iniciar el laboratorio

Ejecutá:

```bash
docker compose -f deployment/compose.yaml up -d --build
```

La primera ejecución puede tardar algunos minutos porque Docker debe construir la imagen del laboratorio.

Cuando termine comprobá que el contenedor esté funcionando:

```bash
docker ps
```

Debería aparecer un contenedor llamado:

```text
metis-lab
```

---

# Paso 7 — Entrar al laboratorio

Abrí una terminal dentro del entorno Linux:

```bash
docker exec -it -u alumno metis-lab bash
```

Si todo salió correctamente, el prompt cambiará a algo similar a:

```text
alumno@metis-lab:~$
```

Ese ya es el entorno donde vas a realizar todos los ejercicios de LAB-001.

---

# Detener el laboratorio

Cuando termines de trabajar, salí de la terminal:

```bash
exit
```

Luego detené el laboratorio desde macOS:

```bash
docker compose -f labs/LAB-001-first-linux-server/deployment/compose.yaml down
```

Esto detiene el contenedor, pero **no elimina** el proyecto ni tus archivos.

Podrás volver a iniciarlo más adelante.

---

# Problemas frecuentes

## `docker: command not found`

Docker Desktop no está instalado o todavía no terminó de iniciarse.

Verificá que la aplicación esté abierta y repetí:

```bash
docker --version
```

---

## `Cannot connect to the Docker daemon`

Docker Desktop está instalado, pero el servicio todavía no está ejecutándose.

Abrí Docker Desktop y esperá hasta que indique que está listo.

---

## `git: command not found`

Instalá las **Command Line Tools** ofrecidas por macOS y comprobá nuevamente:

```bash
git --version
```

---

## El contenedor no aparece en `docker ps`

Revisá el estado del laboratorio:

```bash
docker compose -f deployment/compose.yaml ps
```

Si existe algún error, consultá los mensajes mostrados durante la construcción antes de continuar.

---

# Comprobación final

Si podés ejecutar estos tres comandos sin errores:

```bash
docker ps
docker exec -it -u alumno metis-lab bash
whoami
```

y obtenés:

```text
alumno
```

tu entorno está correctamente preparado y ya podés comenzar con el **Ejercicio 00 — Fundamentos de la computadora**.
