# Guía de instalación — Linux (Quick Mode)

## Objetivo

Esta guía prepara el entorno necesario para realizar **LAB-001 First Linux Server** utilizando Docker en Linux.

Está pensada para personas que comienzan desde cero. No es necesario tener experiencia previa con Docker, Git o administración de sistemas.

Al finalizar vas a poder iniciar el laboratorio con un único comando.

---

## Requisitos mínimos

### Hardware

* Procesador de 64 bits
* 8 GB de memoria RAM (16 GB recomendado)
* 10 GB de espacio libre en disco

### Sistema operativo

Cualquier distribución Linux moderna que pueda ejecutar Docker, por ejemplo:

* Ubuntu
* Debian
* Fedora
* Arch Linux
* CachyOS
* Linux Mint

No importa cuál uses: el laboratorio se ejecutará dentro de un contenedor independiente.

---

# ¿Qué vamos a instalar?

Necesitamos solamente dos herramientas:

| Herramienta | ¿Para qué sirve?              |
| ----------- | ----------------------------- |
| Docker      | Ejecutar el laboratorio Linux |
| Git         | Descargar Metis Forge         |

No vamos a instalar una máquina virtual ni modificar tu distribución.

---

# Antes de instalar

Abrí una terminal y comprobá si Docker ya existe:

```bash
docker --version
```

Después comprobá Git:

```bash
git --version
```

Si ambos comandos muestran una versión, podés ir directamente al **Paso 3**.

Si alguno no existe, continuá con la instalación.

---

# Paso 1 — Instalar Docker

Cada distribución utiliza un gestor de paquetes diferente.

Identificá cuál utilizás y ejecutá **solamente** el comando correspondiente.

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install docker.io docker-compose-v2 git
```

### Fedora

```bash
sudo dnf install docker docker-compose git
```

### Arch Linux / CachyOS

```bash
sudo pacman -S docker docker-compose git
```

No mezcles comandos de distintas distribuciones.

Si no sabés qué distribución utilizás, comprobalo con:

```bash
cat /etc/os-release
```

---

# Paso 2 — Iniciar Docker

En muchas distribuciones Docker no comienza automáticamente.

Iniciá el servicio:

```bash
sudo systemctl start docker
```

Habilitalo para futuros reinicios:

```bash
sudo systemctl enable docker
```

Comprobá su estado:

```bash
systemctl status docker --no-pager
```

Debería aparecer como:

```text
active (running)
```

---

# Paso 3 — Verificar la instalación

Comprobá las versiones:

```bash
docker --version
docker compose version
git --version
```

Si los tres comandos funcionan, el entorno está listo.

---

# Paso 4 — Elegir una carpeta de trabajo

Vamos a guardar el proyecto dentro de tu carpeta personal.

```bash
cd ~
mkdir -p Proyectos
cd Proyectos
```

Verificá la ubicación:

```bash
pwd
```

Deberías encontrarte en una ruta similar a:

```text
/home/tu_usuario/Proyectos
```

---

# Paso 5 — Descargar Metis Forge

Cloná el repositorio:

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

Deberías encontrar elementos como:

```text
LICENSE
README.md
labs
docs
```

---

# Paso 6 — Ir al laboratorio

Entrá al primer laboratorio:

```bash
cd labs/LAB-001-first-linux-server
```

Verificá la estructura:

```bash
ls
```

Entre otros elementos deberías ver:

```text
deployment
exercises
```

---

# Paso 7 — Construir el laboratorio

Ejecutá:

```bash
docker compose -f deployment/compose.yaml up -d --build
```

La primera ejecución descargará la imagen base y construirá el entorno.

Puede tardar algunos minutos dependiendo de tu conexión.

Cuando termine comprobá:

```bash
docker ps
```

Debería aparecer un contenedor llamado:

```text
metis-lab
```

---

# Paso 8 — Entrar al laboratorio

Ingresá al entorno Linux de Metis Forge:

```bash
docker exec -it -u alumno metis-lab bash
```

El prompt debería cambiar a algo similar a:

```text
alumno@metis-lab:~$
```

Ese será el entorno utilizado durante todos los ejercicios de LAB-001.

---

# Detener el laboratorio

Cuando termines de trabajar, salí del contenedor:

```bash
exit
```

Luego detenelo:

```bash
docker compose -f labs/LAB-001-first-linux-server/deployment/compose.yaml down
```

Tus archivos del proyecto permanecerán intactos.

---

# Problemas frecuentes

## `docker: command not found`

Docker no está instalado o no forma parte del PATH.

Verificá la instalación correspondiente a tu distribución y repetí:

```bash
docker --version
```

---

## `Cannot connect to the Docker daemon`

Docker está instalado, pero el servicio no está iniciado.

Comprobá:

```bash
systemctl status docker
```

Si está detenido:

```bash
sudo systemctl start docker
```

---

## `permission denied while trying to connect to the Docker daemon socket`

Tu usuario no tiene permisos para utilizar Docker.

Podés ejecutar temporalmente los comandos con `sudo`, o agregar tu usuario al grupo `docker`:

```bash
sudo usermod -aG docker $USER
```

Después cerrá la sesión y volvé a iniciarla antes de probar nuevamente.

Comprobá:

```bash
docker ps
```

---

## `git: command not found`

Instalá Git utilizando el gestor de paquetes de tu distribución y verificá:

```bash
git --version
```

---

## El contenedor no aparece en `docker ps`

Revisá el estado del laboratorio:

```bash
docker compose -f deployment/compose.yaml ps
```

Si existe un error durante la construcción, leé los mensajes mostrados por Docker antes de continuar.

---

# Comprobación final

Si estos comandos funcionan correctamente:

```bash
docker ps
docker exec -it -u alumno metis-lab bash
whoami
```

y obtenés:

```text
alumno
```

tu entorno está preparado y ya podés comenzar con el **Ejercicio 00 — Fundamentos de la computadora**.
