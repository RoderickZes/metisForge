# # Deployment - Construyendo el entorno del laboratorio


## Antes de continuar

Todavía no vas a administrar Linux.

Primero vas a construir el entorno donde ese servidor existirá.

En Metis Forge creemos que comprender la infraestructura es tan importante como aprender a utilizarla.

## Bienvenido

Antes de administrar un servidor Linux, primero debemos entender dónde está ejecutándose.

En Metis Forge creemos que la infraestructura también forma parte del aprendizaje.

Por eso este laboratorio no entrega un servidor ya preparado.

Vos mismo vas a construir el entorno sobre el que trabajarás durante todo el laboratorio.

---

# ¿Qué vamos a construir?

En este laboratorio construiremos un entorno reproducible que contendrá un servidor Linux.

El objetivo no es aprender Docker en profundidad.

Docker es la herramienta que utilizaremos para aprender infraestructura Linux.

Este servidor será la base para aprender:

- Administración de sistemas.
- Usuarios y grupos.
- Permisos.
- Acceso remoto mediante SSH.
- Análisis de logs.
- Buenas prácticas de administración.

El entorno será deliberadamente simple.

No incluiremos aplicaciones web, bases de datos ni herramientas de hacking.

Cada nuevo servicio aparecerá únicamente cuando tenga sentido desde el punto de vista educativo.

---

# ¿Por qué usamos Docker?

Docker nos permite crear un entorno completamente reproducible.



Eso significa que cualquier persona puede construir exactamente el mismo laboratorio siguiendo los mismos pasos.

Esto ofrece varias ventajas:

- Bajo consumo de recursos.
- Instalación sencilla.
- Fácil distribución.
- Resultados consistentes.

Para quienes dispongan de más recursos, este mismo laboratorio también podrá ejecutarse utilizando una Máquina Virtual.

Ambos modos persiguen exactamente los mismos objetivos de aprendizaje.

---

# Contenedor vs Máquina Virtual

Es muy común escuchar que Docker "es una máquina virtual".

Eso no es correcto.

Antes de continuar, intentá comprender la siguiente diferencia.

## Máquina Virtual

```
Hardware
    │
    ▼
Hipervisor
    │
    ▼
Sistema Operativo Invitado
    │
    ▼
Aplicaciones
```

Cada máquina virtual ejecuta su propio sistema operativo y su propio kernel.

Esto proporciona un mayor aislamiento, aunque consume más recursos.

No existe una opción "mejor".

Cada tecnología resuelve problemas diferentes.

A lo largo de tu carrera profesional probablemente utilices ambas.

---

## Contenedor

```
Hardware
    │
    ▼
Sistema Operativo Host
    │
    ▼
Docker Engine
    │
    ▼
Contenedor
    │
    ▼
Aplicaciones
```

Muchos principiantes creen que un contenedor es "una computadora pequeña".

No lo es.

Durante este laboratorio vas a administrar procesos que se ejecutan dentro de un contenedor Linux.

Eso significa que aprenderás conceptos reales de administración de sistemas, aunque el entorno sea más liviano que una máquina virtual completa.

Comprender esta diferencia será el objetivo del primer ejercicio.

Los contenedores comparten el kernel del sistema operativo anfitrión.

No simulan un equipo completo.

Por eso son mucho más livianos y rápidos.

Comprender esta diferencia será uno de los objetivos del primer ejercicio.

---

# ¿Qué contiene esta carpeta?

En esta carpeta encontrarás los archivos necesarios para construir el laboratorio.

## Dockerfile

Describe cómo construir la imagen del laboratorio.

Cada sección estará documentada para explicar no solo qué hace, sino también por qué existe.

---

## docker-compose.yml

Permite crear y ejecutar el laboratorio mediante una única instrucción.

Más adelante incorporaremos nuevos servicios sin modificar la forma de iniciar el entorno.

---

## build.sh

Automatiza la construcción de la imagen.

También sirve para mostrar qué comando de Docker se está ejecutando.

---

## run.sh

Automatiza la ejecución del laboratorio.

Su contenido también estará completamente documentado.

---

# Filosofía

En Metis Forge el proceso de construcción forma parte del laboratorio.

El entorno donde trabajarás no es un detalle técnico: es el primer componente que aprenderás a comprender y administrar.

Por esa razón:

Construir
↓

Comprender
↓

Administrar
↓

Asegurar
↓

Documentar

---

# Próximo paso

Los scripts y archivos de esta carpeta serán creados a lo largo del laboratorio.

Una vez disponibles, volverás aquí para construir el entorno con un único comando.

Finalmente podrás comenzar con el **Exercise 00 – Comprendiendo el entorno**.