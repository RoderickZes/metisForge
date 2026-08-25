# Ejercicio 00 - Fundamentos de la computadora

---

# Introducción

Antes de instalar herramientas, abrir una terminal o administrar un servidor Linux, necesitamos resolver una pregunta más básica.

**¿Qué es, en realidad, una computadora?**

Parece una pregunta obvia. La mayoría de las personas usa computadoras todos los días sin necesidad de responderla.

Pero para administrar sistemas —y eventualmente asegurarlos— hace falta algo más que "saber usar" una computadora. Hace falta entender qué partes la componen y cómo se relacionan entre sí.

Este ejercicio no requiere Docker, ni terminal, ni conexión a Internet. Podés hacerlo con papel y lápiz, en un pizarrón, o simplemente pensando.

---

# ¿No tenés computadora?

No hace falta tener una computadora para completar este ejercicio.

Todo lo que vas a aprender acá puede explicarse, discutirse y comprenderse sin necesidad de encender ningún equipo.

Si estás en una clase presencial o comunitaria, este es un buen momento para trabajar en grupo, con el docente explicando en un pizarrón o mostrando ejemplos físicos (una computadora abierta, una notebook vieja, o incluso imágenes).

Cuando accedas a una computadora, vas a poder reconocer en ella todo lo que viste acá.

---

# Objetivoss

Al finalizar este ejercicio deberías ser capaz de:

- Diferenciar hardware de software.
- Nombrar los componentes principales de una computadora y para qué sirve cada uno.
- Explicar qué es un sistema operativo y qué relación tiene con el kernel.
- Entender la diferencia entre una aplicación y un archivo.
- Explicar, en términos generales, qué es Linux y qué es una distribución Linux.
- Reconocer diferencias generales entre Windows, macOS y Linux.
- Tener una primera idea de qué es la virtualización.

No se espera que memorices definiciones técnicas exactas.

Se espera que construyas un modelo mental que te sirva de base para todo lo que viene después.

---

## Hardware y software

Toda computadora, sin importar su forma o tamaño, puede dividirse en dos grandes partes.

```text
Computadora
├── Hardware
│   ├── Procesador
│   ├── Memoria RAM
│   ├── Almacenamiento
│   ├── Placa o interfaz de red
│   └── Dispositivos de entrada y salida
└── Software
    ├── Sistema operativo
    ├── Aplicaciones
    └── Archivos
```

El **hardware** es la parte física: todo lo que podrías tocar si abrieras la computadora.

El **software** es la parte lógica: instrucciones que le indican al hardware qué hacer. No podés tocarlo, pero sin él el hardware no sirve de nada.

Ninguno de los dos funciona sin el otro. Un hardware sin software es un conjunto de piezas inertes. Un software sin hardware no tiene dónde ejecutarse.

---

# Las partes del hardware

## El procesador (CPU)

El procesador es el componente que ejecuta instrucciones.

Cada vez que una aplicación hace un cálculo, compara datos o toma una decisión, es el procesador quien lo resuelve.

Se lo suele describir como el "cerebro" de la computadora, aunque en realidad no piensa: solamente ejecuta instrucciones, una detrás de otra, a una velocidad enorme.

## La memoria RAM

La memoria RAM guarda, de forma temporal, los datos y programas que están en uso en este momento.

Es rápida, pero **volátil**: cuando la computadora se apaga, todo lo que había en la RAM se pierde.

Por eso, si estás escribiendo un documento y se corta la luz sin haber guardado, perdés los cambios que no llegaron a guardarse en el almacenamiento.

## El almacenamiento

El almacenamiento (un disco rígido, un SSD, una tarjeta de memoria) guarda información de forma permanente, incluso sin electricidad.

Ahí viven el sistema operativo, las aplicaciones instaladas y tus archivos, hasta que alguien los borra.

## La placa o interfaz de red

Es el componente que permite que la computadora se comunique con otras computadoras, ya sea por cable o de forma inalámbrica.

Sin ella, tu computadora funcionaría, pero de forma completamente aislada: sin Internet, sin red local, sin poder conectarse a ningún otro sistema.

Más adelante, cuando administremos un servidor por SSH, vamos a depender directamente de este componente.

## Dispositivos de entrada y salida

Son los periféricos que te permiten interactuar con la computadora.

Entrada (le dan información a la computadora):

- Teclado.
- Mouse.
- Micrófono.
- Cámara.

Salida (la computadora te da información a vos):

- Pantalla.
- Parlantes.
- Impresora.

Algunos dispositivos, como una pantalla táctil, cumplen las dos funciones al mismo tiempo.

## Firmware, BIOS y UEFI

Antes de que el sistema operativo arranque, existe un software muy básico, guardado directamente en la placa de la computadora, que se encarga de inicializar el hardware.

A eso se lo llama **firmware**, y su implementación más conocida en computadoras personales es la **BIOS** o su versión más moderna, la **UEFI**.

No vas a necesitar modificar nada de esto en este ejercicio. Alcanza con saber que existe, y que es lo primero que se ejecuta cuando encendés una computadora, incluso antes que el sistema operativo.

---

# Las partes del software

## El sistema operativo

El sistema operativo es el software que administra todo el hardware y le permite a las aplicaciones utilizarlo sin que cada programa tenga que saber, por ejemplo, cómo hablarle directamente al procesador o al disco.

Windows, macOS y Linux son sistemas operativos.

## El kernel

El kernel es el núcleo del sistema operativo: la parte que se comunica más directamente con el hardware.

Se encarga de tareas como decidir qué proceso usa el procesador en cada momento, administrar la memoria RAM y controlar el acceso a los dispositivos.

El resto del sistema operativo (utilidades, interfaz gráfica, herramientas) se construye alrededor del kernel.

Cuando más adelante hablemos de "Linux", en sentido estricto nos referimos al kernel. Una distribución Linux es Linux más un conjunto de herramientas, programas y configuraciones construidas alrededor de ese kernel.

## Las aplicaciones

Son los programas que usás para realizar tareas concretas: un navegador, un editor de texto, una terminal.

Las aplicaciones se apoyan en el sistema operativo para acceder al hardware.

## Los archivos

Son unidades de información guardadas en el almacenamiento: un documento, una imagen, un programa instalado, un archivo de configuración.

El sistema operativo es quien organiza, guarda y te permite acceder a esos archivos.

---

# Cómo se relacionan estas piezas

Usuario
↓
Aplicaciones
↓
Sistema operativo
↓
Kernel
↓
Hardware

Vos, como usuario, interactuás con aplicaciones.

Las aplicaciones le piden cosas al sistema operativo (abrir un archivo, mostrar algo en pantalla, conectarse a Internet).

El sistema operativo, a través de su kernel, traduce esos pedidos en instrucciones que el hardware puede ejecutar.

Esta cadena se repite todo el tiempo, en todas las computadoras, sin que la mayoría de las personas la note.

Administrar un servidor Linux, que es lo que vas a empezar a hacer en este laboratorio, significa trabajar directamente con varias de estas capas: el sistema operativo, el kernel y, a través de ellos, el hardware.

---

# ¿Qué es Linux?

Linux es un kernel: un software que se comunica con el hardware y administra los recursos de la computadora.

Fue creado en 1991 y hoy es uno de los kernels más usados del mundo, sobre todo en servidores, infraestructura en la nube y dispositivos como celulares Android.

Linux por sí solo no es un sistema operativo completo. Necesita combinarse con herramientas, programas y configuraciones para poder usarse. A ese conjunto se lo llama **distribución Linux**.

Existen muchas distribuciones distintas: Ubuntu, Debian, Fedora, Arch Linux, entre otras. Todas comparten el mismo kernel, pero difieren en las herramientas que incluyen, cómo se instalan programas y a qué tipo de usuario están orientadas.

Metis Forge utiliza Ubuntu Server como base para sus laboratorios, entre otras razones porque tiene documentación extensa y es ampliamente usada en entornos profesionales.

---

# Windows, macOS y Linux: diferencias generales

Los tres son sistemas operativos, pero parten de decisiones distintas.

| | Windows | macOS | Linux |
|---|---|---|---|
| Quién lo desarrolla | Microsoft | Apple | Comunidad y empresas, según la distribución |
| Código | Privativo | Privativo | Mayormente abierto |
| Dónde se usa más | Computadoras hogareñas y de oficina | Computadoras Apple | Servidores, infraestructura, dispositivos embebidos |
| Costo | Con licencia | Incluido con hardware Apple | Generalmente gratuito |

Esta tabla es una simplificación. Hay excepciones en los tres casos, y las diferencias reales son más complejas.

Lo importante para este laboratorio es entender que **el mismo modelo mental** (hardware, software, sistema operativo, kernel) aplica a los tres, aunque cada uno lo implemente de forma distinta.

Vamos a trabajar con Linux principalmente porque es el sistema operativo más utilizado en servidores e infraestructura profesional.

---

# Una primera idea de virtualización

Más adelante, para construir el laboratorio, vas a usar una computadora Linux "dentro" de tu propia computadora, sin necesidad de instalar Linux directamente sobre tu hardware.

Esto es posible gracias a la **virtualización**: una técnica que permite que una computadora comparta su hardware físico para ejecutar uno o más entornos separados, cada uno con su propio sistema (o parte de uno).

Todavía no necesitás entender los detalles técnicos. Alcanza con esta idea general: tu computadora real, con su hardware físico, va a poder "prestarle" sus recursos a un entorno Linux aislado, que vas a administrar como si fuera un servidor real.

En los próximos pasos, cuando instales Docker, vas a ver esta idea en la práctica.

---

# Por qué esto importa para el laboratorio

Todo lo que administrás en un servidor Linux (usuarios, permisos, procesos, servicios, logs) sucede sobre esta base: hardware, sistema operativo, kernel.

Cuando más adelante veas un error, un proceso que no arranca o un servicio que no responde, vas a poder pensar en términos de estas capas: ¿es un problema de hardware? ¿de configuración del sistema operativo? ¿de una aplicación específica?

Ese es el objetivo de este ejercicio: no memorizar definiciones, sino tener un mapa mental al que volver cuando algo no funcione como se espera.

---

# Actividades

Estas actividades pueden resolverse con o sin computadora.

- Dibujá el diagrama de hardware y software de esta guía, pensando en un dispositivo real: tu computadora, tu celular, o la computadora de la escuela o del taller.
- Pensá en el dispositivo que elegiste (tu computadora, tu celular, el que sea). Sin abrirlo ni instalar nada, identificá dónde está —o qué cumple esa función— cada una de estas piezas: el procesador, la RAM, el almacenamiento, la conexión de red y al menos dos periféricos. No hace falta el modelo ni la marca: alcanza con poder decir "esto es lo que cumple esa función en mi dispositivo".
- Explicale a otra persona, con tus propias palabras, la diferencia entre sistema operativo y kernel.
- Si tenés acceso a una computadora, buscá dónde podés ver su información básica (por ejemplo, cuánta memoria RAM tiene) sin instalar nada nuevo. No hace falta modificar ninguna configuración: solamente observar.

---

# Antes de continuar


Las actividades anteriores ya pusieron a prueba hardware, software, componentes concretos y la diferencia entre sistema operativo y kernel. Antes de pasar al siguiente paso, sumale estas preguntas, que todavía no tocamos:

- ¿Qué diferencia hay entre una aplicación y un archivo?
- ¿Qué es Linux? ¿Qué es una distribución Linux?
- ¿Qué diferencias generales encontrás entre Windows, macOS y Linux?
- ¿Qué es, en líneas generales, la virtualización?

No es necesario responder de memoria ni con definiciones exactas.

Lo importante es que puedas explicar cada idea con tus propias palabras, aunque sea de forma simple.

---

# Evidencia

Si estás llevando un registro de tu recorrido por Metis Forge, guardá:

- Tus respuestas escritas a las preguntas de la sección anterior.
- El diagrama de hardware/software que dibujaste, si hiciste esa actividad.
- Cualquier duda que te haya quedado, para retomarla más adelante.

No hace falta ningún comando ni ninguna captura de pantalla todavía. Eso vendrá en los próximos ejercicios.

---

# Próximo paso

Ya tenés el modelo mental necesario para empezar a preparar tu computadora.

En el próximo paso vas a identificar tu sistema operativo, abrir una terminal por primera vez, e instalar las herramientas necesarias para poner en marcha el laboratorio.

Continuá en:

`../deployment/README.md`