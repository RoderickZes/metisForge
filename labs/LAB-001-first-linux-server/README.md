# LAB-001 - Primer Servidor Linux

## Bienvenido

Este es el primer laboratorio práctico de Metis Forge.

En este laboratorio construirás y administrarás tu primer servidor Linux utilizando un entorno reproducible basado en Docker.

El objetivo no es memorizar comandos.

El objetivo es comprender cómo funcionan los sistemas Linux y desarrollar las bases necesarias para administrar infraestructura real.

---

# Escenario

Una pequeña organización recibió un nuevo servidor Linux.

El sistema se encuentra recién instalado y necesita ser preparado para su uso.

Como administrador deberás:

- preparar el entorno;
- administrar usuarios;
- configurar permisos;
- habilitar acceso remoto;
- revisar el estado del sistema;
- documentar tu trabajo.

---

# Objetivos

Al finalizar este laboratorio deberías ser capaz de:

- comprender la estructura básica de Linux;
- administrar usuarios y grupos;
- gestionar permisos;
- utilizar SSH;
- interpretar información del sistema;
- documentar tus decisiones técnicas.

---

# Requisitos

No hace falta ningún conocimiento técnico previo. Este laboratorio está pensado para empezar desde cero: no necesitás saber qué es una terminal, ni haber usado Linux, Docker o Git antes de este momento. Todo eso se explica y se instala como parte del recorrido, empezando por `deployment/README.md`.

Lo único que necesitás:

- Una computadora (Windows, macOS o Linux) capaz de correr Docker. La guía de tu sistema operativo, dentro de `deployment/`, te ayuda a comprobarlo — y también contempla alternativas si tu equipo es más limitado.
- Conexión a Internet, al menos para la instalación inicial.

Si tu computadora no cumple estos requisitos, todavía podés participar: consultá con tu docente, o revisá las alternativas que menciona la guía de tu sistema operativo.

Recomendados:

- Conceptos básicos de archivos y directorios.

---

# Estructura del laboratorio

LAB-001/

deployment/
docs/
exercises/
evidence/
scripts/
teacher/

---

# Orden recomendado

1. Leer `deployment/README.md` y elegir la guía de tu sistema operativo.
2. Completar esa guía — incluye el Ejercicio 00 (Fundamentos de la computadora) casi al comienzo, y termina con Docker instalado y funcionando.
3. Seguir `deployment/iniciar-y-detener-el-laboratorio.md` para construir e iniciar el laboratorio por primera vez.
4. Continuar con los ejercicios, en el orden de `exercises/README.md`.
5. Guardar evidencias a medida que avanzás.

---

# Antes de comenzar

Dirigite ahora a:

deployment/README.md

Allí construirás el entorno del laboratorio y aprenderás por qué utilizamos contenedores antes de comenzar a administrar un servidor Linux.

> Estado: Estable · Versión 1.0