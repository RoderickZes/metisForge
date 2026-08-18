# Ejercicio 06 - Administración remota mediante SSH

---

# Bienvenido

Hasta ahora administraste el servidor desde una terminal abierta directamente dentro del laboratorio.

Eso funciona mientras tenés acceso directo al entorno.

Pero en infraestructura real, muchas veces el servidor se encuentra:

* En otra habitación.
* En otro edificio.
* En un centro de datos.
* En una máquina virtual.
* En un proveedor de infraestructura.
* En una red a la que accedemos remotamente.

Necesitamos una forma de conectarnos al servidor sin estar físicamente frente a él.

Una de las herramientas más utilizadas para hacerlo es SSH.

SSH permite establecer una conexión cifrada entre un cliente y un servidor, autenticarse y ejecutar comandos remotamente.

En este ejercicio vas a preparar el servidor SSH del laboratorio, conectarte desde tu computadora anfitriona y comprobar qué ocurre durante una conexión.

También vas a utilizar lo aprendido sobre:

* Usuarios.
* Grupos.
* Permisos.
* Procesos.
* Redes.
* Mínimo privilegio.

No se espera que memorices toda la configuración de OpenSSH.

Se espera que puedas explicar:

> quién se conecta, a qué sistema se conecta, qué servicio recibe la conexión y cómo se decide si el acceso está autorizado.

---

# Objetivos

Al finalizar este ejercicio deberías ser capaz de:

* Explicar qué problema resuelve SSH.
* Diferenciar SSH de OpenSSH.
* Diferenciar cliente SSH y servidor SSH.
* Explicar qué función cumple `sshd`.
* Diferenciar conexión local y conexión remota.
* Comprender qué función cumplen una dirección IP y un puerto.
* Explicar por qué el laboratorio utiliza los puertos `2222` y `22`.
* Preparar una cuenta específica para administración remota.
* Iniciar y comprobar el servidor SSH.
* Validar la configuración antes de iniciar `sshd`.
* Identificar la clave de host del servidor.
* Verificar la huella del servidor durante la primera conexión.
* Conectarte mediante SSH desde la computadora anfitriona.
* Ejecutar comandos dentro de una sesión remota.
* Diferenciar autenticación mediante contraseña y mediante clave pública.
* Crear un par de claves para autenticación.
* Configurar `authorized_keys`.
* Aplicar permisos correctos sobre los archivos de autenticación.
* Reconocer errores frecuentes de conexión.
* Aplicar el principio de mínimo privilegio al acceso remoto.

---

# Antes de comenzar

En este ejercicio vamos a utilizar dos terminales al mismo tiempo.

Es importante que puedas reconocerlas.

## Terminal A - Linux del laboratorio

Esta terminal se encuentra dentro del contenedor de Metis Forge.

Su prompt debería verse de forma similar a:

```text
alumno@metis-lab:~$
```

Acá vamos a preparar el servidor SSH.

---

## Terminal B - Computadora anfitriona

Esta terminal se ejecuta directamente en tu computadora.

Puede ser:

```text
Windows
→ PowerShell

macOS
→ Terminal

Linux
→ Terminal
```

Desde esta terminal vamos a actuar como cliente SSH.

---

Durante todo el ejercicio se indicará explícitamente dónde debe ejecutarse cada comando.

No ejecutes un comando hasta saber en cuál de las dos terminales estás trabajando.

---

# Actividad 1 - Reconocé tus dos entornos

## Terminal A - Linux del laboratorio

Ejecutá:

```bash
whoami
hostname
pwd
```

Deberías reconocer:

```text
usuario
→ alumno

hostname
→ metis-lab
```

---

## Terminal B - Computadora anfitriona

Todavía no ejecutes comandos.

Respondé:

1. ¿Qué sistema operativo utiliza tu computadora anfitriona?
2. ¿Qué terminal vas a utilizar?
3. ¿Cuál de las dos terminales representa actualmente al servidor?
4. ¿Cuál actuará como cliente?

No continúes hasta poder distinguir ambos entornos.

---

# ¿Qué problema resuelve SSH?

Imaginemos un servidor instalado en otra habitación.

Podríamos conectarle:

* Monitor.
* Teclado.
* Mouse.

Pero eso deja de ser práctico cuando administramos muchos servidores o cuando están físicamente lejos.

Necesitamos administrar el sistema a través de una red.

Podemos representar el problema así:

```text
Administrador
     │
     │ necesita administrar
     ▼
Servidor remoto
```

SSH permite establecer un canal entre ambos:

```text
Computadora del administrador
          │
          │ conexión SSH
          ▼
      Servidor
```

A través de ese canal podemos, entre otras cosas:

* Autenticarnos.
* Abrir una terminal remota.
* Ejecutar comandos.
* Transferir información.
* Administrar servicios.

En este laboratorio nos concentraremos en el acceso remoto mediante terminal.

---

# ¿Qué significa SSH?

SSH significa:

```text
Secure Shell
```

Es un protocolo diseñado para realizar comunicaciones seguras a través de una red.

Una conexión SSH protege la comunicación mediante criptografía.

Esto permite evitar que comandos, credenciales y otros datos de la sesión viajen simplemente como texto legible por la red.

Pero SSH no significa:

> cualquier conexión es automáticamente confiable.

También debemos comprobar:

* Con qué servidor estamos hablando.
* Qué usuario intenta ingresar.
* Cómo demuestra su identidad.
* Qué permisos tendrá después de ingresar.

---

# SSH y OpenSSH no son exactamente lo mismo

SSH es el protocolo.

OpenSSH es una implementación de ese protocolo que proporciona diferentes herramientas.

Dos de las más importantes son:

```text
ssh
```

y:

```text
sshd
```

Podemos diferenciarlas así:

```text
ssh
→ cliente

sshd
→ servidor
```

El cliente inicia la conexión.

El servidor espera conexiones y decide cómo procesarlas.

---

# Cliente y servidor

En nuestro laboratorio:

```text
COMPUTADORA ANFITRIONA
        │
        │ ssh
        │
        ▼
     conexión
        │
        ▼
CONTENEDOR METIS-LAB
        │
        │ sshd
        ▼
 servidor SSH
```

La computadora anfitriona será el cliente.

El contenedor será el servidor.

Esto no significa que una computadora siempre tenga que ser cliente y la otra siempre servidor.

Los términos describen el papel que cumplen en una comunicación concreta.

---

# ¿Qué es un daemon?

El programa que recibe conexiones SSH se llama:

```text
sshd
```

La letra final:

```text
d
```

proviene de:

```text
daemon
```

Un daemon es un programa que permanece ejecutándose en segundo plano para proporcionar algún servicio.

En este caso:

```text
sshd
→ espera conexiones SSH
```

Cuando llega una conexión, participa en tareas como:

* Negociar la comunicación segura.
* Presentar la identidad del servidor.
* Autenticar usuarios.
* Crear sesiones.
* Ejecutar comandos.

---

# Puertos

Una dirección IP permite identificar un sistema dentro de una comunicación de red.

Pero un mismo sistema puede ofrecer muchos servicios diferentes.

Por eso también utilizamos puertos.

Por convención, SSH utiliza normalmente el puerto:

```text
22
```

Podemos pensar en una combinación de dirección y puerto así:

```text
Dirección IP
→ qué sistema

Puerto
→ qué servicio de ese sistema
```

---

# El puerto del laboratorio

Metis Forge utiliza una configuración ligeramente diferente.

Dentro del contenedor, SSH escucha en:

```text
22
```

Pero desde tu computadora anfitriona vas a utilizar:

```text
2222
```

Docker conecta ambos.

```text
Computadora anfitriona

127.0.0.1:2222
        │
        │ Docker
        ▼
Contenedor metis-lab

puerto 22
        │
        ▼
      sshd
```

Por eso más adelante utilizaremos:

```text
-p 2222
```

al conectarnos.

La opción `-p` permite indicar el puerto del servidor al que queremos conectarnos.

---

# ¿Qué significa 127.0.0.1?

La dirección:

```text
127.0.0.1
```

representa la interfaz de loopback IPv4 de la propia computadora.

También suele asociarse con el nombre:

```text
localhost
```

En este laboratorio Docker publica el puerto SSH solamente en:

```text
127.0.0.1
```

Por lo tanto, el puerto `2222` está pensado para ser utilizado desde la propia computadora anfitriona.

No necesitamos exponer este laboratorio a otros equipos de la red.

---

# Actividad 2 - Dibujá la conexión

Antes de ejecutar ningún comando, completá:

```text
________________________
        CLIENTE
            │
            │ programa: __________
            │ puerto: _____________
            ▼
________________________
        SERVIDOR
            │
            │ programa: __________
            │ puerto: _____________
```

Respondé además:

1. ¿Dónde se ejecutará `ssh`?
2. ¿Dónde se ejecutará `sshd`?
3. ¿Por qué aparecen dos números de puerto?
4. ¿Qué función cumple Docker entre ambos?

Esta actividad puede realizarse sin computadora.

---

# Comprobar que OpenSSH está disponible

Volvé a:

```text
Terminal A - Linux del laboratorio
```

Ejecutá:

```bash
which ssh
which sshd
```

Deberías encontrar los programas instalados.

También podés consultar:

```bash
ssh -V
```

El cliente mostrará información sobre su versión.

Para `sshd` utilizaremos explícitamente la ruta:

```text
/usr/sbin/sshd
```

Comprobala:

```bash
ls -l /usr/sbin/sshd
```

---

# El servidor todavía no está funcionando

Que un programa esté instalado no significa que esté ejecutándose.

Comprobalo:

```bash
pgrep -a sshd
```

En un laboratorio recién iniciado normalmente no debería aparecer un servidor SSH principal funcionando.

Comprobá también qué puertos TCP están escuchando:

```bash
sudo ss -ltnp
```

Buscá el puerto:

```text
22
```

Si `sshd` todavía no está iniciado, no debería aparecer escuchando allí.

---

# Instalado no significa activo

Esta distinción es importante.

```text
Programa instalado
        ≠
Servicio funcionando
```

Podemos tener:

```text
openssh-server instalado
```

pero:

```text
sshd detenido
```

y entonces nadie podrá conectarse.

Cuando investigues un servicio, preguntate al menos:

```text
¿Está instalado?
        ↓
¿Está configurado?
        ↓
¿Está ejecutándose?
        ↓
¿Está escuchando?
        ↓
¿Puedo alcanzarlo desde el cliente?
```

---

# Una limitación de Quick Mode

Este laboratorio utiliza un contenedor.

No estamos simulando que sea una máquina virtual completa.

En un servidor Linux tradicional podrías encontrar un administrador de servicios como:

```text
systemd
```

y comandos como:

```text
systemctl
```

En este Quick Mode el proceso principal del contenedor mantiene el entorno funcionando y vamos a iniciar `sshd` directamente.

Esto permite aprender:

* Qué programa ofrece SSH.
* Qué proceso está funcionando.
* Qué puerto escucha.
* Cómo comprobarlo.

Más adelante una máquina virtual puede proporcionar una experiencia más completa de administración de servicios.

---

# Preparar una identidad para acceso remoto

No vamos a conectarnos como `root`.

Tampoco utilizaremos el usuario administrativo `alumno` como identidad remota principal.

Vamos a crear una cuenta específica:

```text
operador
```

Esto nos permite separar:

```text
administración del laboratorio
```

de:

```text
identidad utilizada para acceso SSH
```

---

# Crear el usuario operador

## Terminal A - Linux del laboratorio

Primero comprobá que no exista:

```bash
getent passwd operador
```

Si no existe, normalmente no aparecerá ningún resultado.

Crealo:

```bash
sudo useradd --create-home --user-group --shell /bin/bash operador
```

Comprobá:

```bash
id operador
```

y:

```bash
getent passwd operador
```

Observá:

* UID.
* Grupo.
* Directorio personal.
* Shell.

---

# ¿Por qué operador no pertenece a sudo?

Comprobá:

```bash
id operador
```

No vamos a agregarlo al grupo:

```text
sudo
```

porque todavía no existe ningún requisito que justifique ese privilegio.

El usuario necesita:

```text
iniciar una sesión SSH
```

No necesita:

```text
administrar todo el sistema
```

Aplicamos el mismo principio trabajado en el ejercicio anterior:

> conceder solamente los privilegios necesarios para la función definida.

---

# Preparar autenticación temporal mediante contraseña

Para observar primero el proceso tradicional de autenticación vamos a establecer una contraseña temporal para `operador`.

## Terminal A - Linux del laboratorio

Ejecutá:

```bash
sudo passwd operador
```

El sistema solicitará una contraseña nueva.

Cuando escribas una contraseña en una terminal, normalmente los caracteres no aparecen en pantalla.

Eso es esperado.

Elegí una contraseña exclusiva para este laboratorio.

No reutilices:

* Tu contraseña personal.
* La contraseña de tu correo.
* La contraseña de GitHub.
* La contraseña de tu computadora.
* Ninguna credencial real.

No registres esta contraseña en la evidencia.

---

# Las claves del servidor

Antes de iniciar SSH necesitamos introducir otro concepto.

El servidor también posee claves criptográficas.

Se denominan:

```text
host keys
```

o:

```text
claves de host
```

Estas claves permiten que el servidor presente una identidad criptográfica al cliente.

No son las claves de tu usuario.

Representan al servidor.

---

# Comprobar las claves de host

## Terminal A - Linux del laboratorio

Ejecutá:

```bash
ls -l /etc/ssh/ssh_host_*
```

Deberían existir distintos archivos.

Algunos terminan en:

```text
.pub
```

Esos contienen la parte pública.

Los archivos correspondientes sin `.pub` contienen claves privadas del servidor.

No muestres ni copies esas claves privadas.

---

# Generar solamente claves de host faltantes

Ejecutá:

```bash
sudo ssh-keygen -A
```

Este comando genera las claves de host predeterminadas que todavía no existan.

No debería reemplazar las que ya existen.

Volvé a comprobar:

```bash
ls -l /etc/ssh/ssh_host_*
```

---

# Obtener la huella del servidor

Una clave completa es larga y difícil de comparar visualmente.

Por eso podemos obtener una representación más corta llamada:

```text
fingerprint
```

o:

```text
huella
```

Vamos a utilizar la clave Ed25519 del servidor.

## Terminal A - Linux del laboratorio

Ejecutá:

```bash
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

Obtendrás una salida similar a:

```text
256 SHA256:................................ root@metis-lab (ED25519)
```

No copies literalmente este ejemplo.

Tu huella será diferente.

Registrá temporalmente el valor:

```text
SHA256:...
```

Lo necesitaremos durante la primera conexión.

---

# ¿Para qué sirve esa huella?

Cuando te conectes por primera vez, el cliente todavía no conoce al servidor.

El servidor presentará su clave pública.

El cliente calculará y mostrará una huella.

Vos vas a comparar esa huella con la que acabás de obtener directamente desde el servidor.

La idea es:

```text
Huella observada directamente
          │
          │ comparar
          ▼
Huella presentada por SSH
```

Si coinciden, tenemos evidencia de que estamos viendo la misma clave de host.

No deberíamos acostumbrarnos a aceptar cualquier huella automáticamente.

---

# Preparar el servidor SSH

Antes de iniciar `sshd`, asegurá que exista su directorio de ejecución:

```bash
sudo mkdir -p /run/sshd
```

Ahora comprobá la configuración:

```bash
sudo /usr/sbin/sshd -t
```

Si la configuración y las claves son válidas, normalmente el comando no muestra nada.

Podemos hacerlo más explícito:

```bash
sudo /usr/sbin/sshd -t && echo "Configuración SSH válida"
```

Deberías obtener:

```text
Configuración SSH válida
```

---

# Validar antes de iniciar

Esta secuencia tiene una razón:

```text
Modificar o preparar configuración
            ↓
Validar
            ↓
Iniciar
            ↓
Comprobar
```

Es preferible descubrir una configuración inválida antes de depender del servicio.

No deberíamos cambiar configuraciones y asumir que funcionaron.

---

# Iniciar sshd

## Terminal A - Linux del laboratorio

Ejecutá:

```bash
sudo /usr/sbin/sshd
```

El comando debería regresar al prompt.

Eso no significa que `sshd` haya terminado.

Normalmente el proceso queda ejecutándose en segundo plano.

Comprobalo:

```bash
pgrep -a sshd
```

Ahora debería aparecer un proceso de `sshd`.

---

# Comprobar el puerto

Ejecutá:

```bash
sudo ss -ltnp | grep ':22'
```

Deberías observar que existe un proceso escuchando en el puerto TCP `22`.

En este punto tenemos:

```text
sshd instalado
      ✓

configuración válida
      ✓

sshd ejecutándose
      ✓

puerto 22 escuchando
      ✓
```

Pero todavía falta comprobar que el cliente realmente pueda conectarse.

---

# Comprobar Docker desde el anfitrión

Ahora cambiá a:

```text
Terminal B - Computadora anfitriona
```

Ejecutá:

```bash
docker ps
```

Buscá:

```text
metis-lab
```

En la columna relacionada con los puertos deberías observar algo equivalente a:

```text
127.0.0.1:2222->22/tcp
```

Interpretalo:

```text
127.0.0.1
→ computadora anfitriona

2222
→ puerto utilizado desde el anfitrión

22
→ puerto utilizado dentro del contenedor
```

---

# Comprobar el cliente SSH

Seguimos en:

```text
Terminal B - Computadora anfitriona
```

Ejecutá:

```bash
ssh -V
```

Si obtenés información sobre OpenSSH, el cliente está disponible.

Si recibís un mensaje indicando que ssh no existe, significa que el cliente SSH no está disponible en tu computadora anfitriona o no puede encontrarse desde la terminal actual.

No instales herramientas siguiendo comandos encontrados al azar.

Primero identificá qué sistema operativo y versión estás utilizando. Después buscá cómo instalar o habilitar un cliente OpenSSH utilizando, preferentemente, la documentación oficial de tu sistema operativo.

Antes de ejecutar cualquier instrucción, comprobá:

qué componente vas a instalar o habilitar;
de qué fuente proviene la información;
si las instrucciones corresponden a tu sistema y versión;
si requieren permisos administrativos;
cómo vas a comprobar después que ssh quedó disponible.

Una vez realizado el procedimiento, verificá nuevamente:

ssh -V

Si no tenés permisos para instalar componentes o no disponés de una computadora propia, podés continuar mediante una práctica compartida.

El cliente SSH y el servidor SSH son componentes diferentes.

Tu computadora anfitriona solamente necesita actuar como cliente para esta práctica.

---

# Primera conexión

Ahora vamos a realizar la primera conexión real.

## Terminal B - Computadora anfitriona

Ejecutá:

```bash
ssh -p 2222 operador@127.0.0.1
```

Separémoslo:

```text
ssh
│
└── programa cliente

-p 2222
│
└── conectar al puerto 2222

operador
│
└── usuario remoto

127.0.0.1
│
└── dirección del destino vista desde el anfitrión
```

---

# No aceptes la huella todavía

Durante la primera conexión debería aparecer un mensaje indicando que la autenticidad del host todavía no puede establecerse automáticamente.

También debería aparecer una huella.

Buscá algo similar a:

```text
ED25519 key fingerprint is SHA256:...
```

Detenete.

Compará ese valor con la huella que obtuviste anteriormente dentro del servidor mediante:

```bash
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

Respondé:

```text
¿Coinciden exactamente?
```

Si no coinciden:

```text
NO continúes
```

Primero investigá por qué.

---

# Si la huella coincide

Si comprobaste que ambas huellas corresponden al mismo servidor, aceptá la clave cuando el cliente lo solicite.

Normalmente tendrás que escribir:

```text
yes
```

El cliente guardará información sobre el servidor para futuras conexiones.

Después solicitará la contraseña de:

```text
operador
```

Ingresá la contraseña temporal creada anteriormente.

Recordá:

> la contraseña no debería mostrarse mientras la escribís.

---

# Entraste por SSH

Si la autenticación fue correcta, deberías obtener un prompt similar a:

```text
operador@metis-lab:~$
```

Detenete antes de ejecutar más comandos.

Observá el cambio.

Antes tenías:

```text
alumno@metis-lab:~$
```

Ahora tenés:

```text
operador@metis-lab:~$
```

El servidor sigue siendo:

```text
metis-lab
```

pero tu identidad es diferente.

---

# Actividad 3 - Comprobá dónde estás

Dentro de la sesión SSH ejecutá:

```bash
whoami
hostname
pwd
id
```

Respondé:

1. ¿Cuál es tu usuario?
2. ¿Cuál es el hostname?
3. ¿Cuál es tu directorio personal?
4. ¿A qué grupos pertenece `operador`?
5. ¿Pertenece al grupo `sudo`?
6. ¿Estás trabajando en la computadora anfitriona o dentro del laboratorio?

---

# SSH no te convierte en root

Intentá:

```bash
sudo whoami
```

El comando no debería proporcionarte automáticamente privilegios administrativos.

Eso es deliberado.

SSH responde:

```text
¿Cómo llegamos al servidor?
```

Los permisos y privilegios responden:

```text
¿Qué puede hacer nuestra identidad una vez dentro?
```

Son problemas relacionados, pero diferentes.

---

# Qué acaba de ocurrir

Podemos representar la conexión completa así:

```text
COMPUTADORA ANFITRIONA
          │
          │
          │ ssh -p 2222
          │ operador@127.0.0.1
          ▼
127.0.0.1:2222
          │
          │ Docker
          ▼
CONTENEDOR METIS-LAB
          │
          │ puerto 22
          ▼
        sshd
          │
          │ autenticación
          ▼
      operador
          │
          ▼
       Bash
```

El comando que escribís termina ejecutándose dentro del servidor utilizando los permisos de `operador`.

---

# Cerrar correctamente la sesión

Dentro de la sesión SSH ejecutá:

```bash
exit
```

También podés utilizar:

```text
Ctrl+D
```

La sesión debería cerrarse.

Observá nuevamente tu prompt.

Deberías haber regresado a:

```text
Terminal B - Computadora anfitriona
```

Comprobalo antes de continuar.

---

# Ejecutar un comando remoto sin abrir una sesión interactiva

SSH también puede ejecutar un comando específico.

Desde:

```text
Terminal B - Computadora anfitriona
```

ejecutá:

```bash
ssh -p 2222 operador@127.0.0.1 'whoami && hostname'
```

Después de autenticarte deberían aparecer:

```text
operador
metis-lab
```

El comando se ejecutó en el servidor y su salida regresó al cliente.

No necesitaste mantener una terminal interactiva abierta.

---

# Actividad 4 - Cliente y servidor

Explicá con tus propias palabras:

1. ¿Dónde se ejecutó el programa `ssh`?
2. ¿Dónde se ejecutó `sshd`?
3. ¿Dónde se ejecutó `whoami`?
4. ¿Quién mostró el resultado en pantalla?
5. ¿Qué usuario ejecutó el comando remoto?
6. ¿Por qué el puerto utilizado por el cliente es `2222`, pero `sshd` escucha en `22`?

---

# Contraseña y clave pública

Hasta ahora utilizamos una contraseña.

SSH también permite autenticación mediante criptografía de clave pública.

En este modelo creamos dos archivos relacionados:

```text
Clave privada
      │
      │ permanece con el usuario
      │
      ▼
Computadora cliente

Clave pública
      │
      │ puede copiarse
      ▼
Servidor
```

La clave privada no debe compartirse.

La clave pública puede instalarse en los servidores donde querés autorizar esa identidad.

---

# Dos tipos de claves que no debemos confundir

Ya vimos claves de host.

Ahora veremos claves de usuario.

No son lo mismo.

## Clave de host

Responde aproximadamente:

```text
¿Es este el servidor que creo que es?
```

Pertenece al servidor.

---

## Clave de usuario

Responde aproximadamente:

```text
¿Puede este cliente demostrar que posee la clave privada correspondiente a una clave pública autorizada?
```

Pertenece al usuario o cliente.

---

Podemos representarlo así:

```text
SERVIDOR
│
├── host key
│   └── ayuda al cliente a identificar al servidor
│
└── authorized_keys
    └── contiene claves públicas autorizadas de usuarios


CLIENTE
│
└── clave privada del usuario
    └── demuestra posesión durante la autenticación
```

---

# Nunca compartas una clave privada

Durante esta práctica vas a generar una clave específica para Metis Forge.

La clave privada:

* No debe copiarse dentro del servidor.
* No debe enviarse por correo.
* No debe subirse a Git.
* No debe incluirse en capturas de pantalla.
* No debe incluirse en la evidencia.
* No debe publicarse en GitHub.

Si una clave privada real queda expuesta, debe considerarse comprometida.

---

# Crear una clave específica para el laboratorio

Vamos a crear una clave con un nombre exclusivo:

```text
metis_forge_lab_ed25519
```

Así evitamos modificar accidentalmente otras claves SSH que ya puedas utilizar.

---

# Windows - PowerShell

Si tu computadora anfitriona utiliza Windows, ejecutá en:

```text
Terminal B - PowerShell
```

Primero asegurá que exista el directorio `.ssh`:

```powershell
New-Item -ItemType Directory -Force "$HOME\.ssh" | Out-Null
```

Después generá la clave:

```powershell
ssh-keygen -t ed25519 -f "$HOME\.ssh\metis_forge_lab_ed25519"
```

El programa solicitará una passphrase.

Podés establecer una para proteger la clave privada.

No utilices una contraseña personal ni la registres en la evidencia.

---

# Linux o macOS - Terminal

Si tu computadora anfitriona utiliza Linux o macOS:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

Generá la clave:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/metis_forge_lab_ed25519
```

El programa solicitará una passphrase.

No la registres en la evidencia.

---

# ¿Qué se creó?

Ahora deberían existir dos archivos.

Conceptualmente:

```text
metis_forge_lab_ed25519
│
└── CLAVE PRIVADA


metis_forge_lab_ed25519.pub
│
└── CLAVE PÚBLICA
```

La extensión:

```text
.pub
```

nos ayuda a reconocer la parte pública.

---

# Comprobar sin mostrar la clave privada

## Windows - PowerShell

```powershell
Get-ChildItem "$HOME\.ssh\metis_forge_lab_ed25519*"
```

## Linux o macOS

```bash
ls -l ~/.ssh/metis_forge_lab_ed25519*
```

No ejecutes:

```text
cat clave_privada
```

ni copies su contenido.

---

# Obtener la huella de tu clave pública

## Windows - PowerShell

```powershell
ssh-keygen -lf "$HOME\.ssh\metis_forge_lab_ed25519.pub"
```

## Linux o macOS

```bash
ssh-keygen -lf ~/.ssh/metis_forge_lab_ed25519.pub
```

Esto permite identificar la clave sin publicar el contenido completo de la clave privada.

---

# Llevar la clave pública al laboratorio

Necesitamos colocar únicamente:

```text
metis_forge_lab_ed25519.pub
```

dentro del servidor.

La clave privada permanecerá en la computadora anfitriona.

Utilizaremos `docker cp` para copiar el archivo público al entorno controlado.

---

# Windows - PowerShell

Desde:

```text
Terminal B - Computadora anfitriona
```

ejecutá:

```powershell
docker cp "$HOME\.ssh\metis_forge_lab_ed25519.pub" metis-lab:/tmp/metis_forge_lab_ed25519.pub
```

---

# Linux o macOS

Desde:

```text
Terminal B - Computadora anfitriona
```

ejecutá:

```bash
docker cp ~/.ssh/metis_forge_lab_ed25519.pub metis-lab:/tmp/metis_forge_lab_ed25519.pub
```

---

# ¿Qué acabamos de copiar?

Copiamos:

```text
CLAVE PÚBLICA
```

Desde:

```text
computadora anfitriona
```

hacia:

```text
/tmp/
```

dentro del contenedor.

No copiamos la clave privada.

---

# Preparar authorized_keys

Regresá a:

```text
Terminal A - Linux del laboratorio
```

Comprobá que llegó el archivo:

```bash
ls -l /tmp/metis_forge_lab_ed25519.pub
```

Ahora creá el directorio SSH de `operador`:

```bash
sudo mkdir -p /home/operador/.ssh
```

Copiá la clave pública:

```bash
sudo cp /tmp/metis_forge_lab_ed25519.pub /home/operador/.ssh/authorized_keys
```

---

# authorized_keys

El archivo:

```text
/home/operador/.ssh/authorized_keys
```

contiene las claves públicas autorizadas para iniciar sesión como:

```text
operador
```

La pregunta deja de ser solamente:

```text
¿conoce la contraseña?
```

y pasa a poder incluir:

```text
¿puede demostrar que posee la clave privada
correspondiente a una clave pública autorizada?
```

---

# Propietario y permisos

Acá reutilizamos directamente lo aprendido en el ejercicio 05.

Actualmente creamos los archivos utilizando `sudo`.

Por eso debemos comprobar que la identidad y los permisos sean correctos.

Asigná el directorio a `operador`:

```bash
sudo chown -R operador:operador /home/operador/.ssh
```

Configurá el directorio:

```bash
sudo chmod 700 /home/operador/.ssh
```

Configurá `authorized_keys`:

```bash
sudo chmod 600 /home/operador/.ssh/authorized_keys
```

---

# Interpretá esos permisos

Comprobá:

```bash
ls -ld /home/operador/.ssh
```

Deberías observar algo equivalente a:

```text
drwx------
```

Eso representa:

```text
700
```

Ahora:

```bash
ls -l /home/operador/.ssh/authorized_keys
```

Deberías observar:

```text
-rw-------
```

Eso representa:

```text
600
```

Respondé:

1. ¿Quién puede acceder al directorio `.ssh`?
2. ¿Quién puede leer `authorized_keys`?
3. ¿Quién puede modificarlo?
4. ¿Por qué no necesitamos conceder acceso a otros usuarios?
5. ¿Qué principio del ejercicio anterior estamos aplicando?

---

# Eliminar la copia temporal

La clave pública ya se encuentra en su ubicación definitiva.

Eliminá la copia temporal:

```bash
sudo rm /tmp/metis_forge_lab_ed25519.pub
```

Comprobá:

```bash
ls -l /tmp/metis_forge_lab_ed25519.pub
```

Debería indicar que el archivo ya no existe.

---

# Probar autenticación mediante clave

Volvé a:

```text
Terminal B - Computadora anfitriona
```

## Windows - PowerShell

Ejecutá:

```powershell
ssh -i "$HOME\.ssh\metis_forge_lab_ed25519" -p 2222 operador@127.0.0.1
```

## Linux o macOS

Ejecutá:

```bash
ssh -i ~/.ssh/metis_forge_lab_ed25519 -p 2222 operador@127.0.0.1
```

La opción:

```text
-i
```

indica qué archivo de identidad privada debe utilizar el cliente.

---

# ¿Qué contraseña debería solicitar?

Si protegiste la clave privada con una passphrase, el cliente puede solicitar:

```text
la passphrase de la clave
```

Eso no es necesariamente lo mismo que:

```text
la contraseña de operador en el servidor
```

Son secretos diferentes y protegen cosas diferentes.

Comprobá que podés iniciar sesión.

---

# Verificá nuevamente tu identidad

Dentro de la sesión:

```bash
whoami
hostname
id
```

Deberías seguir siendo:

```text
operador
```

El método de autenticación cambió.

Los privilegios del usuario no cambiaron.

Esto es importante:

```text
Autenticación
        ≠
Autorización
```

La autenticación ayuda a demostrar quién sos.

La autorización determina qué podés hacer.

---

# Contraseña vs clave pública

Podemos resumir el modelo de forma inicial.

## Contraseña

```text
Cliente
  │
  │ presenta un secreto
  ▼
Servidor
  │
  └── valida la credencial
```

## Clave pública

```text
CLIENTE

clave privada
     │
     │ demuestra posesión
     ▼
protocolo SSH
     │
     ▼
SERVIDOR

authorized_keys
     │
     └── contiene la clave pública autorizada
```

La clave privada no necesita viajar hacia el servidor.

---

# Actividad 5 - Ubicá cada elemento

Indicá dónde debería existir cada elemento:

| Elemento                  | Cliente | Servidor |
| ------------------------- | ------- | -------- |
| Programa `ssh`            | ?       | ?        |
| Programa `sshd`           | ?       | ?        |
| Clave privada del usuario | ?       | ?        |
| Clave pública autorizada  | ?       | ?        |
| `authorized_keys`         | ?       | ?        |
| Clave privada de host     | ?       | ?        |
| `known_hosts`             | ?       | ?        |

Después explicá la función de cada uno.

---

# known_hosts

Durante la primera conexión aceptaste una clave de host.

El cliente conserva información sobre servidores conocidos en un archivo llamado normalmente:

```text
known_hosts
```

Su función es diferente a:

```text
authorized_keys
```

Podemos compararlos:

```text
known_hosts
│
└── ayuda al CLIENTE a reconocer SERVIDORES


authorized_keys
│
└── ayuda al SERVIDOR a reconocer claves autorizadas para USUARIOS
```

Confundir ambos archivos produce errores conceptuales frecuentes.

---

# ¿Qué ocurre si cambia la clave del servidor?

Si una clave de host que el cliente ya conocía cambia, OpenSSH puede mostrar una advertencia como:

```text
REMOTE HOST IDENTIFICATION HAS CHANGED
```

No deberías solucionar esto automáticamente borrando archivos.

Una clave puede cambiar por razones legítimas:

* El servidor fue reinstalado.
* El laboratorio fue reconstruido.
* Se regeneraron las claves.

Pero también podría indicar que estás hablando con un sistema diferente al esperado.

Primero investigá.

---

# En este laboratorio

Metis Forge utiliza un entorno descartable.

Una reconstrucción puede producir cambios en la identidad criptográfica del entorno.

Si sabés que reconstruiste deliberadamente el laboratorio:

1. Obtené primero la nueva huella directamente desde `metis-lab`.
2. Confirmá que el cambio tiene una explicación.
3. Eliminá únicamente la entrada correspondiente al laboratorio.

Desde la computadora anfitriona:

```bash
ssh-keygen -R "[127.0.0.1]:2222"
```

Después realizá nuevamente el proceso de verificación.

No elimines todo el archivo `known_hosts` para solucionar una sola entrada.

---

# Comprobar la configuración efectiva del servidor

Volvé a:

```text
Terminal A - Linux del laboratorio
```

Podemos pedirle a `sshd` que muestre su configuración efectiva:

```bash
sudo /usr/sbin/sshd -T
```

La salida es extensa.

Filtrá algunas opciones relevantes:

```bash
sudo /usr/sbin/sshd -T | grep -E '^(port|passwordauthentication|pubkeyauthentication|permitrootlogin) '
```

No modifiques todavía esas opciones.

Primero observá qué configuración está utilizando realmente el servidor.

---

# Tener claves no desactiva automáticamente las contraseñas

Acabamos de comprobar que la autenticación mediante clave pública funciona.

Eso no significa necesariamente que la autenticación mediante contraseña haya quedado deshabilitada.

Son mecanismos diferentes.

En un entorno real podríamos decidir endurecer la configuración, por ejemplo restringiendo determinados métodos de autenticación.

Pero antes de cambiar la configuración debemos:

```text
comprender el requisito
        ↓
comprobar el acceso actual
        ↓
tener un método alternativo probado
        ↓
validar la nueva configuración
        ↓
aplicar el cambio
        ↓
volver a comprobar
```

En este ejercicio no vamos a desactivar todavía la autenticación mediante contraseña.

Primero necesitamos aprender a observar qué ocurre en el sistema.

Eso será especialmente útil cuando estudiemos los registros del sistema en el ejercicio siguiente.

---

# SSH no reemplaza al mínimo privilegio

Una conexión cifrada puede seguir siendo peligrosa si el usuario remoto posee privilegios excesivos.

Por ejemplo:

```text
SSH seguro
     +
usuario root innecesario
     =
riesgo innecesario
```

La seguridad del acceso remoto depende de varias capas:

```text
Red
 ↓
Protocolo
 ↓
Identidad del servidor
 ↓
Autenticación del usuario
 ↓
Permisos del usuario
 ↓
Configuración del servicio
 ↓
Auditoría y registros
```

SSH solamente forma parte del sistema completo.

---

# Por qué no nos conectamos como root

El usuario `root` posee privilegios extremadamente amplios.

Si todas las tareas remotas se realizan directamente como `root`:

* Es más difícil aplicar mínimo privilegio.
* Un error puede afectar todo el sistema.
* Una credencial comprometida tiene mayor impacto.
* Se pierde separación entre acceso y elevación de privilegios.

Por eso en este laboratorio utilizamos:

```text
operador
```

como identidad específica.

La existencia de una cuenta no significa que deba poseer todos los permisos.

---

# Diagnóstico de errores frecuentes

---

## Connection refused

Podrías obtener un mensaje similar a:

```text
Connection refused
```

Esto significa que llegaste a la dirección y puerto, pero no existe un servicio aceptando la conexión allí o la conexión está siendo rechazada.

No cambies contraseñas.

Primero revisá el servidor.

### Terminal A

```bash
pgrep -a sshd
```

Después:

```bash
sudo ss -ltnp | grep ':22'
```

### Terminal B

```bash
docker ps
```

Preguntate:

```text
¿sshd está ejecutándose?
¿está escuchando?
¿Docker publica 2222 hacia 22?
¿estoy utilizando el puerto correcto?
```

---

## Connection timed out

Un timeout implica un problema diferente de una autenticación rechazada.

Investigá:

* Dirección.
* Puerto.
* Estado del contenedor.
* Ruta de red.
* Reglas de filtrado.

No intentes solucionar un problema de red cambiando permisos de archivos.

---

## Permission denied

Podrías observar:

```text
Permission denied
```

o información sobre métodos como:

```text
publickey
password
```

Eso indica que llegaste al servidor, pero la autenticación no terminó correctamente.

Revisá:

```bash
getent passwd operador
```

Comprobá los permisos:

```bash
ls -ld /home/operador
ls -ld /home/operador/.ssh
ls -l /home/operador/.ssh/authorized_keys
```

Comprobá la identidad:

```bash
id operador
```

No respondas concediendo permisos amplios como:

```text
777
```

Los archivos relacionados con autenticación necesitan precisamente controles de acceso cuidadosos.

---

## La clave no funciona pero la contraseña sí

Comprobá primero que estás utilizando la clave correcta.

En el cliente:

```text
-i ruta_de_la_clave_privada
```

Después comprobá:

* Que la clave pública correspondiente esté en `authorized_keys`.
* Que el archivo pertenezca a `operador`.
* Que `.ssh` tenga permisos apropiados.
* Que `authorized_keys` tenga permisos apropiados.

No copies la clave privada al servidor para intentar solucionarlo.

---

## REMOTE HOST IDENTIFICATION HAS CHANGED

No borres inmediatamente:

```text
known_hosts
```

Preguntate:

```text
¿reconstruí el laboratorio?
¿regeneré las host keys?
¿estoy conectándome al mismo destino?
```

Obtené nuevamente la huella desde el servidor.

Solamente cuando hayas justificado el cambio eliminá la entrada específica:

```bash
ssh-keygen -R "[127.0.0.1]:2222"
```

---

## ssh no existe en la computadora anfitriona

Eso es un problema del cliente.

No significa que el servidor esté mal configurado.

Necesitás distinguir:

```text
cliente ausente
```

de:

```text
servidor detenido
```

Consultá la guía correspondiente a tu sistema operativo antes de instalar componentes adicionales.

---

# Actividad 6 - Diagnosticá antes de modificar

Para cada situación, indicá qué comprobarías primero.

## Caso A

```text
ssh: connect to host 127.0.0.1 port 2222:
Connection refused
```

¿Cambiarías la contraseña?

¿Por qué?

---

## Caso B

La conexión llega al servidor, pero `operador` no puede autenticarse mediante su clave.

¿Qué archivos y permisos revisarías?

---

## Caso C

Después de reconstruir el laboratorio aparece una advertencia indicando que cambió la identidad del host.

¿Qué deberías verificar antes de eliminar la entrada anterior?

---

## Caso D

Podés ingresar mediante SSH pero no podés ejecutar:

```bash
sudo apt update
```

¿Es necesariamente un problema de SSH?

Explicá por qué.

---

# Seguridad: no confundir cifrado con confianza

SSH cifra la comunicación.

Eso es importante.

Pero una conexión cifrada con el sistema equivocado sigue siendo un problema.

Por eso necesitamos distinguir:

```text
Confidencialidad de la comunicación
```

de:

```text
Identidad del servidor
```

y de:

```text
Identidad del usuario
```

Cada problema requiere mecanismos diferentes.

---

# Actividad final - Diseñá el acceso

Una organización tiene un servidor Linux.

Existen tres personas:

```text
Lucía
→ administra aplicaciones

Martín
→ solamente consulta registros

Carla
→ no necesita acceso al servidor
```

Respondé:

1. ¿Deberían compartir una misma cuenta SSH?
2. ¿Deberían conectarse directamente como `root`?
3. ¿Quién necesita una identidad en el servidor?
4. ¿Qué diferencia habría entre autenticar a Lucía y decidir qué puede hacer después de autenticarse?
5. ¿Sería correcto darle acceso SSH a Carla solamente porque trabaja en la organización?
6. ¿Qué información debería verificar un cliente durante la primera conexión?
7. ¿Dónde debería permanecer la clave privada de Lucía?
8. ¿Dónde debería instalarse su clave pública?
9. ¿Qué debería ocurrir si Lucía deja de necesitar acceso?
10. ¿Qué evidencia permitiría demostrar que el diseño funciona?

El objetivo no es encontrar una combinación de comandos.

El objetivo es diseñar una política de acceso justificable.

---

# Comprobación de comprensión

Intentá responder sin consultar las secciones anteriores:

1. ¿Qué significa SSH?
2. ¿Qué diferencia existe entre SSH y OpenSSH?
3. ¿Qué función cumple `ssh`?
4. ¿Qué función cumple `sshd`?
5. ¿Qué es un daemon?
6. ¿Cuál es el puerto habitual de SSH?
7. ¿Por qué Metis Forge utiliza `2222` desde el anfitrión?
8. ¿Qué significa `127.0.0.1` en este laboratorio?
9. ¿Qué diferencia existe entre cliente y servidor?
10. ¿Qué es una clave de host?
11. ¿Qué es una fingerprint?
12. ¿Por qué deberías comprobarla durante la primera conexión?
13. ¿Qué función cumple `known_hosts`?
14. ¿Qué función cumple `authorized_keys`?
15. ¿Cuál es la diferencia entre una clave pública y una privada?
16. ¿Cuál de las dos puede copiarse al servidor?
17. ¿Cuál nunca debería compartirse?
18. ¿Qué diferencia existe entre autenticación y autorización?
19. ¿Por qué `operador` no pertenece al grupo `sudo`?
20. ¿Por qué una conexión SSH cifrada no justifica conceder privilegios excesivos?
21. ¿Qué significa `Connection refused`?
22. ¿Por qué un error de autenticación no debería solucionarse con `chmod 777`?
23. ¿Por qué no deberías borrar todo `known_hosts` ante una advertencia?
24. ¿Qué deberías comprobar después de iniciar `sshd`?
25. ¿Qué limitación tiene este laboratorio Docker frente a un servidor Linux completo administrado mediante `systemd`?

Si no podés explicar alguna respuesta con tus propias palabras, revisá esa sección antes de continuar.

---

# Evidencia

Al finalizar registrá:

* Resultado de `id operador`.
* Comprobación de que `sshd` está ejecutándose.
* Comprobación de que el puerto `22` está escuchando dentro del laboratorio.
* Mapeo `127.0.0.1:2222->22`.
* Fingerprint de la clave de host.
* Confirmación de que comparaste la fingerprint durante la primera conexión.
* Resultado de `whoami` dentro de la sesión SSH.
* Resultado de `hostname` dentro de la sesión SSH.
* Resultado del comando remoto no interactivo.
* Fingerprint de la clave pública creada para el laboratorio.
* Permisos de `/home/operador/.ssh`.
* Permisos de `authorized_keys`.
* Confirmación de autenticación mediante clave pública.
* Respuestas de las actividades.
* Errores encontrados.
* Cómo investigaste cada error.
* Decisiones de seguridad tomadas.

No registres:

* Contraseñas.
* Passphrases.
* Claves privadas.
* Tokens.
* Credenciales reales.
* Contenido sensible.
* Información personal innecesaria.

No es necesario publicar la clave pública completa como evidencia.

Una fingerprint es suficiente para identificarla durante esta práctica.

---

# Limpieza

Primero asegurate de haber cerrado cualquier sesión SSH activa:

```bash
exit
```

Volvé a trabajar desde la terminal original del laboratorio.

---

# Detener sshd

## Terminal A - Linux del laboratorio

Comprobá:

```bash
pgrep -a sshd
```

Detené los procesos SSH del laboratorio:

```bash
sudo pkill -x sshd
```

Comprobá:

```bash
pgrep -a sshd
```

Después:

```bash
sudo ss -ltnp | grep ':22'
```

Ya no debería aparecer `sshd` escuchando en el puerto.

---

# Eliminar el usuario del ejercicio

Comprobá primero:

```bash
getent passwd operador
```

Eliminá la cuenta:

```bash
sudo userdel --remove operador
```

Comprobá:

```bash
getent passwd operador
```

Si el grupo privado `operador` todavía existiera:

```bash
getent group operador
```

podés eliminarlo después de comprobar que no tiene ningún otro uso:

```bash
sudo groupdel operador
```

---

# Limpiar la clave creada en la computadora anfitriona

Solamente eliminá estos archivos si fueron creados específicamente durante este ejercicio.

No reemplaces las rutas por nombres de otras claves SSH.

## Windows - PowerShell

```powershell
Remove-Item "$HOME\.ssh\metis_forge_lab_ed25519"
Remove-Item "$HOME\.ssh\metis_forge_lab_ed25519.pub"
```

## Linux o macOS

```bash
rm ~/.ssh/metis_forge_lab_ed25519
rm ~/.ssh/metis_forge_lab_ed25519.pub
```

---

# Eliminar la entrada conocida del laboratorio

Como este entorno es descartable, también podés retirar la asociación específica utilizada durante esta práctica:

```bash
ssh-keygen -R "[127.0.0.1]:2222"
```

Esto elimina la entrada correspondiente a este destino.

No borres el archivo completo `known_hosts`.

---

# Reflexión final

Antes de continuar, respondé:

* ¿Qué problema resuelve SSH?
* ¿Qué diferencia existe entre abrir directamente una terminal del contenedor y conectarse mediante SSH?
* ¿Qué programa inicia la conexión?
* ¿Qué programa espera la conexión?
* ¿Qué función cumple el puerto?
* ¿Qué papel cumple Docker en este laboratorio?
* ¿Cómo comprobaste que el servidor que respondió era el esperado?
* ¿Cómo comprobó el servidor tu identidad?
* ¿Qué información permaneció en el cliente?
* ¿Qué información fue instalada en el servidor?
* ¿Por qué la clave privada nunca debe copiarse al servidor?
* ¿Por qué una cuenta SSH no debería recibir privilegios administrativos automáticamente?
* ¿Qué diferencia existe entre que una conexión funcione y que esté correctamente diseñada?
* ¿Qué revisarías primero ante un `Connection refused`?
* ¿Qué revisarías primero ante un `Permission denied`?
* ¿Qué evidencia demostraría que realmente comprendiste el proceso?

Si podés explicar el recorrido completo:

```text
cliente
   ↓
dirección y puerto
   ↓
Docker
   ↓
sshd
   ↓
identidad del servidor
   ↓
autenticación
   ↓
usuario
   ↓
permisos
   ↓
shell
```

entonces ya comprendés los elementos fundamentales de una conexión SSH.

En el próximo ejercicio vas a observar los registros generados por el sistema y utilizar esa información para comprender qué ocurrió durante las conexiones y los intentos de autenticación.
