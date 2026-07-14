# LAB-001 - Primer Servidor Linux

## Bienvenido a Metis Forge

Este es el primer laboratorio práctico de Metis Forge.

En este laboratorio vas a construir tu primer servidor Linux desde cero.

No vas a recibir una máquina preparada con todo configurado.

Vas a comenzar con un sistema básico y vas a transformarlo progresivamente en un servidor funcional, administrable y más seguro.

El objetivo no es aprender una lista de comandos.

El objetivo es entender cómo funcionan los sistemas que usamos todos los días.


---

# Escenario

Una pequeña organización recibió un nuevo servidor Linux.

Actualmente el sistema solamente tiene una instalación básica.

Tu responsabilidad es preparar este servidor para que pueda ser utilizado de manera segura.

Como administrador del sistema, tendrás que:

- Crear usuarios.
- Organizar permisos.
- Configurar acceso remoto.
- Revisar información del sistema.
- Entender cómo Linux administra recursos.


Al finalizar, tendrás un servidor preparado y documentado.


---

# ¿Qué vas a aprender?

Este laboratorio introduce los fundamentos necesarios para comenzar a administrar sistemas Linux.


## 1. Entender Linux y su estructura

Linux organiza la información utilizando un árbol de directorios.

A diferencia de otros sistemas donde existen unidades separadas como:

```
C:
D:
E:
```

Linux utiliza un único punto de inicio:

```
/
```

Durante este laboratorio conocerás directorios importantes como:

```
/
├── etc
├── home
├── root
├── usr
├── var
└── tmp
```

Aprenderás qué información guarda cada uno y por qué esa organización es importante.


---

## 2. Usuarios y grupos

Los sistemas Linux necesitan controlar quién puede acceder a los recursos.

Aprenderás:

- Qué es un usuario.
- Qué es un grupo.
- Qué diferencia existe entre usuarios normales y administrador (`root`).
- Por qué no deberías trabajar siempre como root.


Vas a practicar:

- Crear usuarios.
- Crear grupos.
- Asignar usuarios a grupos.
- Revisar información de cuentas.


---

## 3. Permisos y seguridad

Una de las características más importantes de Linux es su sistema de permisos.

Aprenderás cómo Linux responde una pregunta fundamental:

> ¿Quién puede hacer qué?


Vas a trabajar con:

```
read    (leer)
write   (escribir)
execute (ejecutar)
```


Y entenderás conceptos como:

- Propietario.
- Grupo.
- Otros usuarios.
- Control de acceso.


---

## 4. Administración remota con SSH

Los servidores normalmente no tienen una pantalla y teclado conectados permanentemente.

Por eso los administradores utilizan herramientas de acceso remoto.

En este laboratorio aprenderás:

- Qué es SSH.
- Cómo funciona la conexión cliente-servidor.
- Cómo administrar un servidor remotamente.
- Por qué proteger este acceso es importante.


---

## 5. Logs y visibilidad del sistema

Un servidor genera información constantemente.

Esa información permite:

- Detectar problemas.
- Investigar errores.
- Analizar actividad.
- Mejorar la seguridad.


Aprenderás a revisar:

- Eventos del sistema.
- Actividad de servicios.
- Registros de autenticación.


---

# Metodología

Metis Forge utiliza una metodología basada en el ciclo de vida de un sistema:

```
Entender
   |
Diseñar
   |
Construir
   |
Operar
   |
Analizar
   |
Asegurar
   |
Documentar
```


Durante el laboratorio se espera que:

- Investigues.
- Leas documentación.
- Cometas errores.
- Busques soluciones.
- Expliques tus decisiones.


Los errores forman parte del aprendizaje.


---

# Requisitos

Para realizar este laboratorio necesitas:

## Obligatorios

- Una computadora.
- Docker instalado.
- Terminal básica.


## Recomendados

No es necesario tener experiencia avanzada, pero ayuda conocer:

- Qué es un archivo.
- Qué es una carpeta.
- Conceptos básicos de redes.


Este laboratorio está pensado para personas que están comenzando.


---

# Ejercicios

El laboratorio se divide en diferentes etapas.


## Ejercicio 01 - Explorando Linux

Objetivo:

Comprender la estructura básica del sistema.


Aprenderás:

- Navegación.
- Directorios.
- Archivos importantes.


---

## Ejercicio 02 - Creando usuarios

Objetivo:

Comprender la administración de identidades.


Aprenderás:

- Usuarios.
- Grupos.
- Privilegios.


---

## Ejercicio 03 - Administrando permisos

Objetivo:

Controlar el acceso a los recursos del sistema.


Aprenderás:

- Propietarios.
- Permisos.
- Seguridad básica.


---

## Ejercicio 04 - Acceso remoto

Objetivo:

Administrar el servidor mediante SSH.


Aprenderás:

- Servicios.
- Conexiones.
- Administración remota.


---

## Ejercicio 05 - Revisando logs

Objetivo:

Aprender a observar qué ocurre dentro del sistema.


Aprenderás:

- Eventos.
- Errores.
- Investigación básica.


---

# Evidencia del laboratorio

En Metis Forge no solamente importa completar una tarea.

También importa poder demostrar que entendiste lo que hiciste.


Durante el laboratorio guarda:

- Comandos utilizados.
- Explicaciones.
- Capturas de pantalla.
- Problemas encontrados.
- Soluciones aplicadas.


Al finalizar deberías poder explicar:

- Qué construiste.
- Cómo funciona.
- Por qué tomaste ciertas decisiones.


---

# Desafío final

Antes de continuar al siguiente laboratorio, intenta responder:

- ¿Puedo explicar cómo está organizado Linux?
- ¿Entiendo cómo funcionan usuarios y permisos?
- ¿Podría administrar este servidor sin una interfaz gráfica?
- ¿Sé dónde buscar información cuando algo falla?


Si la respuesta es sí, completaste tu primer paso en Metis Forge.


---

# Próximos pasos

Después de este laboratorio podrás continuar aprendiendo:

- Servicios web.
- Redes.
- Firewalls.
- Monitoreo.
- Seguridad ofensiva.
- Hardening de sistemas.


Bienvenido a Metis Forge.

Construí. Entendé. Protegé.