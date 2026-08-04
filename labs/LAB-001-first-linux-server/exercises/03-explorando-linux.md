# Ejercicio 03 - Explorando Linux

---

# Bienvenido

Ahora que comprendés dónde está ejecutándose el laboratorio, llegó el momento de entrar por primera vez al servidor Linux.

En este ejercicio no vamos a configurar servicios ni modificar el sistema.

Nuestro objetivo será mucho más simple y, al mismo tiempo, mucho más importante:

**Aprender a orientarnos dentro de Linux.**

Antes de administrar un sistema es necesario saber cómo está organizado.

Del mismo modo que sería imposible recorrer una ciudad sin conocer sus calles, también resulta muy difícil administrar un servidor si no entendemos cómo se organiza su sistema de archivos.

¿No tenés computadora?

No te preocupes. Este ejercicio puede comprenderse completamente mediante la explicación del docente o la lectura del material. Cuando tengas acceso a una computadora, podrás realizar la práctica siguiendo los mismos pasos.
---

# Objetivos

Al finalizar este ejercicio deberías ser capaz de:

- Comprender cómo Linux organiza la información.
- Navegar entre directorios.
- Identificar las carpetas más importantes del sistema.
- Comprender la diferencia entre rutas absolutas y relativas.
- Saber dónde buscar ayuda cuando tengas dudas.

No se espera que memorices todos los directorios.

Se espera que aprendas a encontrarlos y entender su propósito.

---
## Antes de empezar

Si todavía no construiste el laboratorio, volvé al apartado **deployment/** y seguí las instrucciones de instalación.

Una vez iniciado el contenedor, regresá a este ejercicio.


# ¿Qué es un sistema de archivos?

Todo sistema operativo necesita una forma de organizar la información.

Linux utiliza una estructura jerárquica en forma de árbol.

A diferencia de Windows, donde existen varias unidades independientes como:

```
C:
D:
E:
```

Linux organiza absolutamente todo a partir de un único punto de inicio:

```
/
```

Este directorio recibe el nombre de **directorio raíz** (*root directory*).

A partir de él se construye todo el sistema.

```
/
├── etc
├── home
├── root
├── usr
├── var
├── tmp
└── ...
```

Cada directorio tiene una función específica.

Durante este ejercicio comenzaremos a conocer los más importantes.

---

# Navegando por el sistema

Para recorrer el sistema de archivos utilizaremos algunos comandos básicos.

No intentes memorizarlos todavía.

Lo importante es comprender qué hace cada uno.

Durante el ejercicio trabajarás principalmente con:

- `pwd`
- `ls`
- `cd`

A medida que avances descubrirás otros comandos de forma natural.

---

# Directorios importantes

Algunos directorios aparecen prácticamente en cualquier distribución Linux.

Por ejemplo:

## /

Es el punto de inicio del sistema de archivos.

Todo comienza aquí.

---

## /home

Contiene los directorios personales de los usuarios.

Cada usuario normalmente dispone de su propio espacio de trabajo.

---

## /root

Es el directorio personal del usuario administrador (`root`).

No debe confundirse con el directorio raíz (`/`).

Aunque sus nombres sean similares, representan conceptos diferentes.

---

## /etc

Aquí se almacenan la mayoría de los archivos de configuración del sistema.

Muchos servicios guardan su configuración en este directorio.

Con el tiempo aprenderás a trabajar frecuentemente aquí.

---

## /usr

Contiene gran parte de los programas y utilidades instaladas en el sistema.

---

## /var

Almacena información que cambia constantemente.

Por ejemplo:

- Logs
- Cachés
- Colas de impresión
- Bases de datos de algunos servicios

---

## /tmp

Espacio destinado a archivos temporales.

Su contenido puede eliminarse automáticamente.

---

# Aprender a buscar información

Uno de los errores más comunes al comenzar es intentar memorizar todos los comandos.

No es necesario.

Los administradores de sistemas consultan documentación constantemente.

Aprender **dónde buscar información** es una habilidad profesional.

Cuando tengas dudas, priorizá las siguientes fuentes.

## Documentación del sistema

Muchos programas incluyen ayuda incorporada.

Más adelante aprenderás a utilizar herramientas como:

- `man`
- `--help`
- `info`

---

## Documentación oficial

Siempre que exista, la documentación oficial debería ser tu primera referencia.

Evitá depender exclusivamente de videos o respuestas generadas por inteligencia artificial.

Las mejores respuestas suelen encontrarse en la documentación oficial del proyecto que estás utilizando.

---

## Arch Wiki

Aunque no utilices Arch Linux, su documentación es considerada una de las mejores referencias técnicas de la comunidad.

Muchos administradores la utilizan diariamente.

---

## Debian Wiki

Excelente para comprender conceptos generales sobre Linux.

---

## Ubuntu Documentation

Muy recomendable para quienes están comenzando.

---

## Docker Documentation

La referencia oficial para todo lo relacionado con contenedores.

---

# Regla Metis Nº1

> Un buen administrador no es quien más comandos memoriza.
>
> Es quien sabe encontrar información confiable, comprenderla y aplicarla correctamente.

Durante todo el recorrido de Metis Forge vas a practicar esta forma de aprender.

---

# Actividades

Durante este ejercicio deberás:

- Identificar tu ubicación actual dentro del sistema.
- Recorrer diferentes directorios.
- Explorar el contenido del sistema de archivos.
- Diferenciar rutas absolutas y relativas.
- Investigar el propósito de distintos directorios.
- Consultar documentación cuando encuentres algo que no conozcas.

El objetivo no es llegar rápido al final.

El objetivo es comprender cómo está organizado Linux.

Durante este ejercicio intentá responder las siguientes preguntas utilizando la terminal.

- ¿En qué directorio comenzás?
- ¿Qué contiene tu directorio personal?
- ¿Qué directorios existen directamente bajo `/`?
- ¿Qué diferencias encontrás entre `/home` y `/root`?
- ¿Qué archivos aparecen dentro de `/etc`?
- ¿Qué información guarda `/var`?


---

# Evidencia

Al finalizar este ejercicio registra:

- Los comandos utilizados.
- Capturas de pantalla relevantes.
- Directorios explorados.
- Conceptos nuevos aprendidos.
- Preguntas que hayan surgido durante la exploración.

---

# Reflexión final

Antes de continuar con el siguiente ejercicio, intentá responder:

- ¿Puedo explicar cómo organiza Linux su sistema de archivos?
- ¿Sé cuál es la diferencia entre `/` y `/root`?
- ¿Entiendo para qué sirven directorios como `/etc`, `/home` y `/var`?
- ¿Sé dónde buscar información cuando no conozco un comando o un directorio?

Si podés responder estas preguntas con seguridad, ya tenés una base sólida para comenzar a administrar sistemas Linux.

En el próximo ejercicio aprenderemos cómo Linux identifica a las personas que utilizan el sistema mediante **usuarios y grupos**.