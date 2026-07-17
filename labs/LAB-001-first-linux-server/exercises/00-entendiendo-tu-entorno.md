# Ejercicio 00 - Entendiendo tu entorno

---

# Introducción

Antes de aprender comandos, administrar usuarios o configurar servicios, necesitamos comprender una idea fundamental.

**¿Dónde está ejecutándose realmente el servidor con el que vamos a trabajar?**

Muchos cursos comienzan diciendo simplemente:

> "Abrí una terminal."

Pero una terminal es solamente una herramienta.

No explica qué sistema estás utilizando, dónde se ejecuta ni cómo está construido el entorno sobre el que vas a trabajar.

En Metis Forge creemos que comprender la infraestructura es tan importante como aprender a administrarla.

Por eso, antes de comenzar con Linux, vamos a conocer el laboratorio que utilizaremos durante todo este curso.

---

# Objetivos

Al finalizar este ejercicio deberías ser capaz de responder preguntas como:

- ¿Dónde está ejecutándose el servidor?
- ¿Qué función cumple Docker?
- ¿Qué es un contenedor?
- ¿Qué diferencia existe entre mi computadora y el servidor del laboratorio?
- ¿Qué papel cumple la terminal?

Todavía no vas a configurar nada.

Primero vamos a construir el modelo mental que utilizarás durante el resto del laboratorio.

---

# El laboratorio

El entorno que vas a utilizar puede representarse de la siguiente manera.

```
┌────────────────────────────┐
│ Tu computadora             │
│ Sistema Operativo Host     │
└────────────────────────────┘
              │
              ▼
┌────────────────────────────┐
│ Docker Engine              │
└────────────────────────────┘
              │
              ▼
┌────────────────────────────┐
│ Contenedor Linux           │
│ Servidor del laboratorio   │
└────────────────────────────┘
              │
              ▼
┌────────────────────────────┐
│ Tu terminal                │
└────────────────────────────┘
```

Aunque el diagrama parece simple, cada una de estas capas cumple una función diferente.

Comprenderlas hará mucho más sencillo todo lo que aprenderemos más adelante.

---

# Tu computadora

Todo comienza en tu propia computadora.

Puede ejecutar Windows, Linux o macOS.

A este sistema lo llamaremos **Host** o **Sistema Operativo Anfitrión**, porque es quien proporciona los recursos físicos que utilizará el laboratorio:

- Procesador.
- Memoria RAM.
- Almacenamiento.
- Red.

Sin esta capa no existiría ninguna de las demás.

---

# Docker Engine

Sobre el sistema operativo se ejecuta Docker.

Docker es una plataforma que permite crear y administrar contenedores.

Su trabajo consiste en preparar entornos aislados donde puedan ejecutarse aplicaciones o sistemas sin necesidad de instalar una máquina virtual completa.

Durante este laboratorio Docker será el encargado de crear, iniciar y detener el servidor Linux con el que vas a trabajar.

---

# El contenedor Linux

El contenedor representa el servidor del laboratorio.

Será el entorno donde realizarás prácticamente todos los ejercicios.

Dentro de él podrás:

- explorar el sistema de archivos;
- crear usuarios;
- administrar permisos;
- instalar servicios;
- revisar registros del sistema;
- configurar distintos componentes de Linux.

Aunque desde la terminal parezca un servidor independiente, en realidad se está ejecutando sobre tu propia computadora gracias a Docker.

---

# La terminal

La terminal es la herramienta que utilizarás para comunicarte con el servidor.

Cada vez que escribas un comando, éste será enviado al sistema Linux que se encuentra dentro del contenedor.

Por eso es importante entender que la terminal **no es el servidor**.

Es simplemente la interfaz mediante la cual interactuamos con él.

---

# ¿Por qué utilizamos este enfoque?

En muchos cursos se entrega una máquina completamente preparada y el alumno comienza a ejecutar comandos inmediatamente.

En Metis Forge queremos que también entiendas el entorno sobre el que estás trabajando.

Un profesional de infraestructura no solo administra sistemas.

También comprende cómo están construidos.

Ese conocimiento será cada vez más importante a medida que avancemos hacia temas como virtualización, redes, servicios, seguridad y computación en la nube.

---

# Antes de continuar

Antes de comenzar el siguiente ejercicio asegurate de poder responder las siguientes preguntas con tus propias palabras.

- ¿Qué es el sistema operativo anfitrión?
- ¿Qué hace Docker?
- ¿Qué es un contenedor?
- ¿Dónde está ejecutándose Linux?
- ¿Qué función cumple la terminal?

No es necesario memorizar definiciones.

Lo importante es comprender cómo se relacionan estas piezas entre sí.

Excelente.

Todavía no administraste ningún servidor.

Todavía no escribiste ningún comando.

Sin embargo, ahora entendés algo que muchos cursos nunca explican: sobre qué infraestructura vas a trabajar durante todo el laboratorio.

En el próximo ejercicio entraremos por primera vez al servidor Linux y comenzaremos a explorarlo.