# Preparación del entorno en Windows

## Introducción

En esta guía vas a preparar una computadora con Windows para ejecutar el laboratorio de Metis Forge.

No necesitás haber utilizado PowerShell, WSL ni Docker anteriormente.

Cada paso indicará:

- Qué herramienta estás utilizando.
- Dónde debés ejecutar cada comando.
- Qué resultado deberías obtener.
- Cómo comprobar que el paso funcionó.
- Qué hacer si aparece un error.

Durante toda esta guía trabajaremos sobre tu computadora real.

Todavía no estaremos dentro del servidor Linux del laboratorio.

---

## Antes de comenzar

Antes de seguir, completá:

[Ejercicio 00 — Fundamentos de la computadora](../00-fundamentos/)

Ese ejercicio explica conceptos necesarios para comprender esta instalación:

- Procesador.
- Memoria RAM.
- Almacenamiento.
- Sistema operativo.
- Virtualización.
- UEFI o BIOS.
- Aplicaciones y archivos.

También necesitás:

- Una computadora con Windows.
- Una conexión a Internet.
- Permiso para instalar programas.
- Posibilidad de reiniciar el equipo.
- Acceso a una cuenta administrativa cuando Windows lo solicite.


---

## Objetivos

Al finalizar esta guía deberías ser capaz de:

- Identificar la versión y arquitectura de Windows.
- Reconocer los recursos principales de tu computadora.
- Abrir y utilizar PowerShell.
- Diferenciar una terminal normal de una terminal administrativa.
- Verificar si la virtualización está habilitada.
- Instalar y actualizar WSL.
- Instalar Docker Desktop desde su fuente oficial.
- Verificar Docker y Docker Compose.
- Ejecutar tu primer contenedor de prueba.
- Reconocer algunos errores frecuentes.

---

# Etapa 1 — Conocer la computadora

Antes de instalar una herramienta debemos comprobar si el equipo puede ejecutarla.

Para esta instalación nos interesan especialmente los siguientes componentes.

| Componente | Función | Por qué nos importa |
|---|---|---|
| Procesador | Ejecuta las instrucciones de los programas. | Debe ser de 64 bits y admitir virtualización. |
| Memoria RAM | Mantiene temporalmente los programas y datos que se están utilizando. | Windows, WSL y Docker compartirán esta memoria. |
| Almacenamiento | Guarda Windows, programas, archivos e imágenes de Docker. | Necesitamos espacio libre para instalar y construir el laboratorio. |
| UEFI o BIOS | Configura funciones básicas del hardware. | Desde allí puede habilitarse la virtualización. |
| Sistema operativo | Administra el hardware y permite ejecutar aplicaciones. | En esta guía utilizaremos Windows como sistema anfitrión. |

No es necesario memorizar estos conceptos.

Lo importante es comprender que Docker no funciona de manera aislada: utiliza recursos reales de la computadora.

---

# Etapa 2 — Identificar la versión de Windows

## Abrir la información de versión

Presioná al mismo tiempo:

```text
Windows + R
```

Se abrirá la ventana **Ejecutar**.

Escribí:

```text
winver
```

Presioná `Enter`.

Aparecerá una ventana con información similar a:

```text
Microsoft Windows
Versión 11
Compilación del sistema operativo...
```

Registrá:

- Versión de Windows.
- Edición.
- Número de compilación.

No es necesario registrar la clave de producto ni otra información sensible.

---

## Identificar la arquitectura

Abrí:

```text
Inicio
→ Configuración
→ Sistema
→ Acerca de
```

Buscá el apartado:

```text
Tipo de sistema
```

El resultado debería indicar algo similar a:

```text
Sistema operativo de 64 bits, procesador basado en x64
```

También podría indicar:

```text
Procesador basado en ARM64
```

Registrá el resultado.

> Si Windows indica que el sistema operativo es de 32 bits, no continúes con la instalación de Docker Desktop. Esa arquitectura no es compatible con el recorrido de esta guía.

---

# Etapa 3 — Revisar la memoria RAM

En la misma pantalla:

```text
Configuración
→ Sistema
→ Acerca de
```

Buscá:

```text
RAM instalada
```

Registrá la cantidad.

La documentación actual de Docker Desktop establece 8 GB de RAM como requisito para su funcionamiento en Windows con WSL 2.

Si el equipo tiene menos memoria, no fuerces la instalación.

Todavía existen distintas formas de continuar:

- Utilizar una computadora compartida.
- Participar en las demostraciones del docente.
- Continuar con los ejercicios conceptuales.
- Acceder a un laboratorio remoto cuando Metis Forge incorpore esa modalidad.
- Evaluar la recuperación del equipo mediante una distribución Linux liviana.

---

## Alternativa: recuperar una computadora antigua con Linux

Una computadora que funciona con dificultad en versiones modernas de Windows todavía puede resultar útil para aprender Linux, redes y administración de sistemas.

En algunos casos es posible reemplazar Windows por una distribución Linux que consuma menos recursos, como Linux Mint con un entorno de escritorio liviano u otra distribución adecuada para equipos antiguos.

El recorrido sería diferente:

```text
Computadora antigua
        ↓
Distribución Linux liviana
        ↓
Terminal de Linux
        ↓
Docker Engine
        ↓
Laboratorio de Metis Forge

---

# Etapa 4 — Revisar el espacio disponible

Abrí el Explorador de archivos.

Podés hacerlo presionando:

```text
Windows + E
```

Luego ingresá en:

```text
Este equipo
```

Buscá la unidad donde está instalado Windows, normalmente:

```text
Disco local (C:)
```

Observá cuánto espacio libre tiene.

Docker utiliza almacenamiento para guardar:

- Imágenes.
- Contenedores.
- Volúmenes.
- Archivos temporales.
- Datos internos de WSL.

Registrá el espacio disponible.

No borres archivos para liberar espacio sin conocer su función.

---

# Etapa 5 — Comprobar la virtualización

Docker Desktop utilizará virtualización para ejecutar un entorno Linux sobre Windows.

Para comprobar su estado:

1. Presioná `Ctrl + Shift + Esc`.
2. Se abrirá el Administrador de tareas.
3. Si aparece una ventana pequeña, seleccioná **Más detalles**.
4. Ingresá en **Rendimiento**.
5. Seleccioná **CPU**.
6. Buscá el campo **Virtualización**.

Podrás encontrar uno de estos resultados:

```text
Virtualización: Habilitada
```

o:

```text
Virtualización: Deshabilitada
```

## Si aparece habilitada

Podés continuar.

## Si aparece deshabilitada

No cambies configuraciones al azar.

La virtualización puede habilitarse desde el firmware UEFI o BIOS, pero el procedimiento varía según el fabricante y modelo de la computadora.

Consultá:

- La documentación oficial del fabricante.
- La guía oficial de Microsoft incluida al final de este documento.
- A un docente o una persona con experiencia.

> Modificá únicamente la opción relacionada con virtualización. Cambiar otras configuraciones del firmware podría impedir que Windows inicie correctamente.

---

# Etapa 6 — Primer contacto con PowerShell

PowerShell es una interfaz de línea de comandos incluida en Windows.

La utilizaremos para comprobar el sistema e instalar algunos componentes.

## Abrir PowerShell

1. Abrí el menú Inicio.
2. Escribí:

```text
PowerShell
```

3. Seleccioná **Windows PowerShell** o **PowerShell**.

Por ahora no elijas **Ejecutar como administrador**.

Deberías observar algo similar a:

```text
PS C:\Users\Alumno>
```

Este texto se llama **prompt**.

Nos indica que:

- Estamos utilizando PowerShell.
- Estamos dentro de Windows.
- Nuestra ubicación actual se encuentra dentro de una carpeta.

No debés escribir el prompt cuando copies un comando.

---

## Ejecutar el primer comando

En PowerShell escribí:

```powershell
Write-Output "Hola, Metis Forge"
```

Presioná `Enter`.

Deberías obtener:

```text
Hola, Metis Forge
```

El texto que escribiste es el comando.

El texto mostrado debajo es su resultado.

---

## Consultar la ubicación actual

Ejecutá:

```powershell
Get-Location
```

PowerShell mostrará la carpeta en la que te encontrás.

Podría verse así:

```text
Path
----
C:\Users\Alumno
```

No necesitás comprender todavía toda la estructura de carpetas.

El objetivo es comenzar a reconocer cómo responde una terminal.

---

# PowerShell normal y PowerShell administrativo

Algunas operaciones pueden ejecutarse con permisos normales.

Otras modifican componentes de Windows y requieren permisos administrativos.

Una ventana administrativa suele mostrar en su título:

```text
Administrador: Windows PowerShell
```

Para abrirla:

1. Abrí el menú Inicio.
2. Buscá PowerShell.
3. Hacé clic derecho sobre el resultado.
4. Seleccioná **Ejecutar como administrador**.
5. Revisá el mensaje de Windows.
6. Aceptá solamente si reconocés la aplicación y comprendés por qué necesita permisos.

Utilizaremos permisos administrativos únicamente cuando una instrucción lo indique.

No es recomendable trabajar permanentemente como administrador.

---

# Etapa 7 — Comprobar WSL

WSL significa:

```text
Windows Subsystem for Linux
```

En español:

```text
Subsistema de Windows para Linux
```

WSL permite ejecutar un entorno Linux sobre Windows.

Docker Desktop puede utilizar WSL 2 como base para ejecutar contenedores Linux.

Abrí una ventana normal de PowerShell y ejecutá:

```powershell
wsl --version
```

## Si WSL está instalado

Aparecerá información sobre sus componentes y versiones.

Luego ejecutá:

```powershell
wsl --status
```

Registrá el resultado.

## Si WSL no está instalado

Podrías encontrar:

- Un mensaje indicando que WSL no está instalado.
- La ayuda del comando.
- Un error indicando que el comando no existe.
- Una solicitud para instalar o actualizar WSL.

No ejecutes comandos adicionales al azar.

Continuá con la etapa siguiente.

---

# Etapa 8 — Instalar WSL

Para instalar WSL debemos utilizar PowerShell con permisos administrativos.

Abrí PowerShell como administrador y ejecutá:

```powershell
wsl --install --no-distribution
```

Este comando:

- Habilita los componentes necesarios de Windows.
- Instala WSL.
- Evita instalar una distribución Linux adicional que todavía no necesitamos.

Docker Desktop utilizará su propio entorno interno de WSL.

## Si la opción no está disponible

En algunas instalaciones de Windows podría no reconocerse:

```text
--no-distribution
```

En ese caso utilizá:

```powershell
wsl --install
```

Este comando también instalará Ubuntu como distribución predeterminada.

Que Ubuntu se instale no representa un problema, pero ese Ubuntu no será el laboratorio de Metis Forge.

---

## Reiniciar la computadora

Windows puede solicitar un reinicio.

Antes de hacerlo:

- Guardá tus archivos.
- Cerrá los programas abiertos.
- Confirmá que no haya tareas importantes ejecutándose.

Después reiniciá la computadora.

Un reinicio no es lo mismo que apagar y volver a encender en todos los equipos. Cuando la guía solicite reiniciar, utilizá la opción:

```text
Inicio
→ Encendido
→ Reiniciar
```

---

# Etapa 9 — Actualizar y verificar WSL

Después del reinicio, abrí PowerShell normalmente.

Ejecutá:

```powershell
wsl --update
```

Este comando busca e instala una versión más reciente de WSL cuando está disponible.

Luego ejecutá:

```powershell
wsl --version
```

Y:

```powershell
wsl --status
```

Finalmente establecé WSL 2 como versión predeterminada:

```powershell
wsl --set-default-version 2
```

La documentación actual de Docker Desktop requiere WSL 2.1.5 o posterior y recomienda utilizar la versión más reciente disponible.

---

# Etapa 10 — Descargar Docker Desktop

Docker Desktop debe descargarse únicamente desde la página oficial de Docker.

Ingresá en:

[Instalar Docker Desktop en Windows](https://docs.docker.com/desktop/setup/install/windows-install/)

Antes de descargar el instalador, verificá:

- Que el dominio sea `docs.docker.com` o `docker.com`.
- Que la descarga corresponda a Windows.
- Que la arquitectura coincida con la identificada anteriormente.
- Que no estés utilizando una página de descargas de terceros.

La mayoría de las computadoras convencionales utilizan:

```text
x86_64
```

Algunos equipos más recientes utilizan:

```text
ARM64
```

No elijas una arquitectura diferente a la de tu computadora.

---

# Etapa 11 — Instalar Docker Desktop

Una vez descargado, el archivo tendrá un nombre similar a:

```text
Docker Desktop Installer.exe
```

Para instalarlo:

1. Abrí la carpeta Descargas.
2. Identificá el instalador.
3. Verificá que el editor sea Docker.
4. Ejecutá el archivo.
5. Leé las opciones que aparezcan.
6. Utilizá el motor basado en WSL 2 cuando se ofrezca esa opción.
7. No cambies configuraciones que no comprendas.
8. Esperá a que finalice la instalación.
9. Reiniciá o cerrá la sesión si el instalador lo solicita.

El aspecto del instalador puede cambiar entre versiones.

Por eso es importante leer los mensajes que aparecen y comparar el proceso con la documentación oficial.

---

# Etapa 12 — Iniciar Docker Desktop

Después de instalarlo:

1. Abrí el menú Inicio.
2. Buscá:

```text
Docker Desktop
```

3. Ejecutá la aplicación.
4. Esperá a que finalice el inicio.

La primera ejecución puede demorar más que las siguientes.

Docker Desktop debe permanecer iniciado para que los comandos de Docker funcionen desde PowerShell.

---

## Verificar el motor de WSL 2

Dentro de Docker Desktop ingresá en:

```text
Settings
→ General
```

Buscá una opción similar a:

```text
Use the WSL 2 based engine
```

Debería estar habilitada.

En algunas versiones esta opción se activa automáticamente y podría no aparecer.

Aplicá los cambios solamente si modificaste alguna configuración.

---

# Etapa 13 — Verificar Docker desde PowerShell

Cerrá las ventanas anteriores de PowerShell.

Abrí una nueva ventana normal.

Esto permite que PowerShell cargue correctamente los cambios realizados durante la instalación.

Ejecutá:

```powershell
docker --version
```

Deberías obtener información similar a:

```text
Docker version ...
```

La versión exacta puede ser diferente.

Luego ejecutá:

```powershell
docker compose version
```

Deberías obtener algo similar a:

```text
Docker Compose version ...
```

Docker Compose viene incluido con Docker Desktop.

---

## Comprobar que el motor esté funcionando

Ejecutá:

```powershell
docker info
```

Este comando muestra información sobre:

- El cliente de Docker.
- El servidor de Docker.
- Los contenedores.
- Las imágenes.
- El almacenamiento.
- El entorno utilizado.

La salida puede ser extensa.

Por ahora solamente necesitamos comprobar que no aparezca un error indicando que el servidor o motor de Docker está detenido.

---

# Etapa 14 — Ejecutar el primer contenedor

En PowerShell ejecutá:

```powershell
docker run --rm hello-world
```

La primera vez, Docker probablemente mostrará un mensaje indicando que no encontró la imagen localmente.

Eso es normal.

Docker realizará aproximadamente estos pasos:

```text
Buscar la imagen en la computadora
              ↓
Descargarla desde el registro de Docker
              ↓
Crear un contenedor
              ↓
Ejecutar su programa
              ↓
Mostrar el resultado
              ↓
Eliminar el contenedor
```

La opción:

```text
--rm
```

indica que el contenedor debe eliminarse automáticamente cuando termine.

Si la prueba funciona, aparecerá un mensaje de bienvenida de Docker.

No es necesario que el texto coincida palabra por palabra con una captura antigua.

Lo importante es que indique que la instalación pudo:

- Comunicarse con Docker.
- Descargar una imagen.
- Crear un contenedor.
- Ejecutarlo correctamente.

---

# Etapa 15 — Comprobar el resultado

Ejecutá:

```powershell
docker ps
```

Este comando muestra los contenedores que están ejecutándose actualmente.

Es posible que la lista esté vacía.

Eso es correcto porque el contenedor `hello-world` terminó y fue eliminado mediante `--rm`.

También podés observar las imágenes descargadas con:

```powershell
docker image ls
```

Debería aparecer una imagen llamada:

```text
hello-world
```

La imagen permanece disponible aunque el contenedor haya sido eliminado.

La diferencia entre imagen y contenedor se estudiará con mayor profundidad durante el laboratorio.

---

# Cómo reconocer dónde estás trabajando

Durante toda esta guía utilizaste PowerShell sobre Windows.

El prompt se veía de una forma similar a:

```text
PS C:\Users\Alumno>
```

Más adelante, cuando ingreses al laboratorio Linux, verás algo parecido a:

```text
alumno@metis-lab:~$
```

No son la misma terminal ni aceptan necesariamente los mismos comandos.

Antes de ejecutar algo, observá siempre el prompt.

Preguntate:

- ¿Estoy en Windows?
- ¿Estoy dentro del laboratorio Linux?
- ¿La guía indica dónde ejecutar este comando?

---

# Errores frecuentes

## “docker no se reconoce como un comando”

Posibles causas:

- Docker Desktop no terminó de instalarse.
- PowerShell estaba abierto antes de la instalación.
- Docker Desktop no se inició correctamente.
- La instalación tuvo un error.

Probá:

1. Cerrar PowerShell.
2. Abrir Docker Desktop.
3. Esperar a que inicie.
4. Abrir una nueva ventana de PowerShell.
5. Ejecutar nuevamente:

```powershell
docker --version
```

---

## “Cannot connect to the Docker daemon” o error de conexión

Docker está instalado, pero su motor puede no estar iniciado.

Comprobá:

- Que Docker Desktop esté abierto.
- Que haya terminado de iniciar.
- Que no muestre advertencias.
- Que WSL esté actualizado.

Podés ejecutar:

```powershell
wsl --update
```

Luego:

```powershell
wsl --shutdown
```

Después volvé a abrir Docker Desktop.

---

## WSL necesita una actualización

Abrí PowerShell como administrador y ejecutá:

```powershell
wsl --update
```

Reiniciá Windows si el sistema lo solicita.

Después comprobá:

```powershell
wsl --version
```

---

## La virtualización está deshabilitada

No intentes resolverlo ejecutando comandos encontrados al azar.

Consultá la documentación oficial de Microsoft y del fabricante de la computadora.

En equipos escolares o compartidos, es posible que solamente el responsable técnico pueda modificar esta configuración.

---

## El equipo no cumple los requisitos

No fuerces la instalación.

Registrá:

- Versión de Windows.
- Arquitectura.
- Memoria RAM.
- Estado de virtualización.
- Mensaje de incompatibilidad.

Luego continuá mediante:

- Una demostración compartida.
- Una computadora del docente.
- Los ejercicios teóricos.
- Otro equipo compatible.
- Una modalidad remota futura.

---

# Evidencia de la preparación

Registrá en tu documento de evidencias:

- Versión de Windows.
- Arquitectura del sistema.
- Cantidad de memoria RAM.
- Espacio libre aproximado.
- Estado de la virtualización.
- Resultado de `wsl --version`.
- Resultado de `docker --version`.
- Resultado de `docker compose version`.
- Resultado general de `docker run --rm hello-world`.
- Errores encontrados y cómo fueron resueltos.

No registres:

- Contraseñas.
- Claves de producto.
- Direcciones particulares.
- Nombres de usuario que contengan información sensible.
- Capturas con archivos o datos personales visibles.

---

# Punto de control

Antes de continuar, comprobá que podés responder:

- ¿Qué sistema operativo utiliza tu computadora?
- ¿Tu procesador y Windows son de 64 bits?
- ¿Cuánta memoria RAM tiene el equipo?
- ¿La virtualización está habilitada?
- ¿Qué diferencia existe entre PowerShell normal y administrativo?
- ¿Para qué utiliza Docker a WSL 2?
- ¿Cómo comprobás que Docker está instalado?
- ¿Cómo comprobás que Docker Compose está disponible?
- ¿Qué ocurrió al ejecutar `hello-world`?
- ¿Cómo reconocés si estás en PowerShell o dentro de Linux?

Si alguna respuesta no está clara, revisá la sección correspondiente antes de avanzar.

---

# Fuentes oficiales

Las herramientas cambian con el tiempo.

Antes de modificar el sistema, consultá siempre la documentación oficial vigente:

- [Instalar WSL](https://learn.microsoft.com/windows/wsl/install)
- [Comandos básicos de WSL](https://learn.microsoft.com/windows/wsl/basic-commands)
- [Habilitar virtualización en Windows](https://support.microsoft.com/windows/experience/enable-virtualization-on-windows)
- [Instalar Docker Desktop en Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
- [Docker Desktop y WSL 2](https://docs.docker.com/desktop/features/wsl/)
- [Instalar Docker Compose](https://docs.docker.com/compose/install/)

Si una instrucción de Metis Forge contradice la documentación oficial actual, detené el proceso y reportá la diferencia.

---

# Próximo paso

Cuando Docker Desktop, WSL y Docker Compose estén funcionando, continuá con:

[Iniciar y detener el laboratorio](iniciar-y-detener-el-laboratorio.md)

Allí vas a aprender a:

- Obtener los archivos de Metis Forge.
- Ubicarte en la carpeta del laboratorio.
- Construir el entorno.
- Iniciar el contenedor.
- Entrar al servidor Linux.
- Salir y detener el laboratorio correctamente.