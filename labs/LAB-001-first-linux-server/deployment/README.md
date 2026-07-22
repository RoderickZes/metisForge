# Preparación del entorno del laboratorio

## Antes de continuar

Todavía no vas a administrar Linux.

Primero vas a preparar la computadora desde la que realizarás el laboratorio.

Esta etapa también forma parte del aprendizaje.

Vas a aprender a:

- Reconocer el sistema operativo que estás utilizando.
- Abrir una terminal.
- Leer y ejecutar comandos.
- Instalar las herramientas necesarias.
- Verificar que la instalación funcione.
- Construir e iniciar el entorno del laboratorio.
- Distinguir entre tu computadora y el servidor Linux del laboratorio.

No necesitás haber utilizado una terminal anteriormente.

Las instrucciones estarán explicadas paso a paso.

---

# ¿Qué vamos a construir?

Durante esta etapa vas a preparar un entorno Linux aislado utilizando Docker.

El recorrido será similar a este:

```text
Tu computadora
      │
      ▼
Sistema operativo
Windows, macOS o Linux
      │
      ▼
Docker
      │
      ▼
Contenedor del laboratorio
      │
      ▼
Servidor Linux de Metis Forge
```

El contenedor será el servidor Linux que utilizarás durante los ejercicios.

Dentro de ese entorno aprenderás sobre:

- El sistema de archivos de Linux.
- La terminal.
- Usuarios y grupos.
- Permisos.
- Procesos y servicios.
- Acceso remoto mediante SSH.
- Registros del sistema.
- Administración segura.

---

# Importante: existen dos terminales diferentes

Durante la preparación vas a trabajar en dos entornos.

Es importante aprender a reconocerlos.

## Terminal de tu computadora

Es la terminal del sistema operativo que estás utilizando.

En Windows utilizaremos principalmente PowerShell.

Su prompt puede verse así:

```text
PS C:\Users\Alumno>
```

Los comandos de instalación y preparación se ejecutarán aquí.

---

## Terminal del laboratorio

Después de iniciar el contenedor, vas a entrar en un entorno Linux.

Su prompt podrá verse de una forma similar a esta:

```text
alumno@metis-lab:~$
```

Los comandos de administración de Linux se ejecutarán aquí.

A lo largo de las guías se indicará claramente dónde debe ejecutarse cada comando.

No ejecutes un comando si no sabés en cuál de los dos entornos te encontrás.

---

# Elegí tu sistema operativo

Las instrucciones dependen del sistema operativo instalado en tu computadora.

## Windows

Este es el recorrido principal de Metis Forge.

Vas a aprender a:

- Identificar tu versión de Windows.
- Abrir PowerShell.
- Leer y ejecutar comandos básicos.
- Preparar las funciones necesarias del sistema.
- Instalar Docker.
- Verificar que Docker esté funcionando.

Continuá en:

[Preparación del entorno en Windows](windows.md)

---

## macOS

Vas a utilizar la aplicación Terminal y preparar Docker para macOS.

Continuá en:

[Preparación del entorno en macOS](macos.md)

---

## Linux

Vas a utilizar la terminal de tu distribución e instalar Docker utilizando el método correspondiente.

Continuá en:

[Preparación del entorno en Linux](linux.md)

---

# ¿No sabés qué sistema operativo tenés?

Observá la computadora al iniciar.

Algunas señales frecuentes son:

- Si aparece el logotipo de Windows y utilizás el menú Inicio, probablemente estés usando Windows.
- Si utilizás una computadora Apple y aparece el menú de macOS, estás usando macOS.
- Si aparecen nombres como Ubuntu, Debian, Fedora, Mint o Arch, probablemente estés utilizando una distribución Linux.

Si estás realizando el laboratorio con un docente, pedile ayuda antes de continuar.

No instales herramientas hasta haber identificado correctamente tu sistema operativo.

---

# Requisitos generales

Para preparar el laboratorio normalmente necesitarás:

- Acceso a una computadora.
- Permiso para instalar programas.
- Conexión a Internet durante la preparación.
- Espacio disponible en el almacenamiento.
- Posibilidad de reiniciar el equipo.
- Acceso a una cuenta con permisos administrativos cuando el sistema lo solicite.

No todas las computadoras podrán ejecutar el laboratorio de la misma manera.

Si el equipo no cumple los requisitos, todavía podés:

- Participar mediante una computadora compartida.
- Seguir las demostraciones del docente.
- Realizar los ejercicios conceptuales.
- Registrar las respuestas y observaciones.
- Repetir la práctica cuando tengas acceso a otro equipo.

No disponer de una computadora compatible no impide comenzar a aprender.

---

# Sobre los permisos administrativos

Durante la instalación, el sistema operativo puede solicitar permisos especiales.

En Windows puede aparecer una ventana preguntando si permitís que una aplicación realice cambios en el dispositivo.

En macOS o Linux puede solicitarse la contraseña de un usuario administrador.

Estos permisos permiten instalar o modificar componentes del sistema.

Antes de aceptarlos, verificá siempre:

- Qué programa estás instalando.
- De dónde lo descargaste.
- Qué instrucción del laboratorio estás siguiendo.
- Si la fuente utilizada es oficial.

Nunca ingreses una contraseña dentro de una página o ventana que no reconozcas.

---

# No copies comandos sin comprenderlos

Durante esta etapa encontrarás bloques similares al siguiente:

```powershell
docker --version
```

Debés escribir únicamente el comando que aparece dentro del bloque.

No copies el texto del prompt.

Por ejemplo, si ves:

```text
PS C:\Users\Alumno> docker --version
```

el comando es solamente:

```powershell
docker --version
```

Después de escribirlo, presioná `Enter`.

La terminal mostrará el resultado debajo.

Antes de ejecutar cualquier comando, intentá responder:

- ¿En qué terminal debo ejecutarlo?
- ¿Qué intenta hacer?
- ¿Necesita permisos administrativos?
- ¿Cómo puedo verificar el resultado?

---

# Cómo trabajar con errores

Es normal encontrar errores durante una instalación.

Un error no significa necesariamente que hayas dañado el equipo.

Cuando aparezca uno:

1. Detenete.
2. Leé el mensaje completo.
3. Identificá qué comando ejecutaste.
4. Revisá si estabas en la terminal correcta.
5. Compará el resultado con la guía.
6. Registrá el mensaje antes de cerrar la ventana.
7. Buscá el significado en documentación confiable.
8. Pedí ayuda si no comprendés el problema.

No ejecutes comandos adicionales al azar para intentar solucionarlo.

Un buen diagnóstico comienza observando lo que ocurrió.

---

# Después de instalar Docker

Cuando hayas completado la guía correspondiente a tu sistema operativo, vas a verificar la instalación.

Las comprobaciones incluirán comandos similares a:

```text
docker --version
```

```text
docker compose version
```

También realizarás una prueba controlada para confirmar que Docker puede crear y ejecutar contenedores.

La guía de tu sistema operativo explicará:

- Dónde ejecutar cada comando.
- Qué resultado esperar.
- Qué significa el resultado.
- Qué hacer si aparece un error.

---

# Iniciar el laboratorio

Cuando Docker esté instalado y funcionando, continuarás con:

[Iniciar y detener el laboratorio](iniciar-y-detener-el-laboratorio.md)

En esa guía vas a aprender a:

- Obtener los archivos de Metis Forge.
- Ubicarte en la carpeta correcta.
- Construir el entorno.
- Iniciar el laboratorio.
- Comprobar su estado.
- Entrar al contenedor Linux.
- Reconocer el cambio de terminal.
- Salir del contenedor.
- Detener y volver a iniciar el laboratorio.

---

# ¿Por qué utilizamos Docker?

Docker nos permite construir un entorno de laboratorio reproducible.

Esto significa que distintas personas pueden trabajar con una configuración similar, aunque utilicen computadoras diferentes.

También permite:

- Reiniciar el entorno cuando sea necesario.
- Reducir el consumo de recursos.
- Distribuir el laboratorio con facilidad.
- Evitar cambios permanentes innecesarios en la computadora del alumno.

Docker es una herramienta para construir el entorno.

El objetivo principal del laboratorio sigue siendo aprender Linux, infraestructura y seguridad.

La diferencia entre un contenedor y una máquina virtual será estudiada en los ejercicios conceptuales.

---

# Recorrido de preparación

El proceso completo será:

```text
Identificar el sistema operativo
              ↓
Aprender a usar su terminal
              ↓
Preparar los requisitos
              ↓
Instalar Docker
              ↓
Verificar la instalación
              ↓
Obtener Metis Forge
              ↓
Construir el laboratorio
              ↓
Iniciar el contenedor
              ↓
Entrar al entorno Linux
              ↓
Comenzar los ejercicios prácticos
```

---

# Próximo paso

Elegí la guía correspondiente al sistema operativo de tu computadora:

- [Windows](windows.md)
- [macOS](macos.md)
- [Linux](linux.md)

Si estás utilizando una computadora compartida, seguí las indicaciones del docente antes de instalar o modificar cualquier componente.