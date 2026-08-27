# Ejercicio 07 - Registros del sistema

---

# Bienvenido

Hasta ahora aprendiste a:

* Explorar Linux.
* Trabajar con usuarios y grupos.
* Configurar permisos.
* Administrar un servicio SSH.
* Conectarte remotamente.
* Diagnosticar algunos errores.

Pero administrar un sistema no consiste solamente en ejecutar comandos.

También necesitamos poder responder preguntas como:

* ¿Qué ocurrió?
* ¿Cuándo ocurrió?
* ¿Qué programa estuvo involucrado?
* ¿Qué usuario realizó una acción?
* ¿Un intento de acceso fue aceptado o rechazado?
* ¿Un servicio estaba funcionando?
* ¿Qué ocurrió antes de que apareciera un problema?

Para responder estas preguntas utilizamos, entre otras fuentes, los registros del sistema.

También vas a encontrarlos mencionados como:

```text
logs
```

En este ejercicio no vamos a asumir que todos los sistemas Linux guardan registros de la misma manera.

Primero vamos a investigar el entorno que realmente tenemos.

Después vamos a generar eventos controlados y comprobar si podemos encontrarlos.

---

# Objetivos

Al finalizar este ejercicio deberías ser capaz de:

* Explicar qué es un registro del sistema.
* Diferenciar un evento de su registro.
* Explicar para qué sirven los registros.
* Reconocer que diferentes sistemas pueden utilizar mecanismos de logging diferentes.
* Identificar qué herramientas de logging existen en un sistema.
* Diferenciar un programa instalado de un servicio funcionando.
* Identificar `rsyslog` dentro del laboratorio.
* Comprender de forma inicial qué función cumple `rsyslogd`.
* Validar su configuración.
* Iniciar el mecanismo de logging utilizado en Quick Mode.
* Identificar dónde se almacenan determinados eventos.
* Generar un evento controlado.
* Leer registros con `tail`.
* Buscar información con `grep`.
* Observar eventos mientras ocurren.
* Relacionar eventos SSH con sus registros.
* Diferenciar registros internos del contenedor de `docker logs`.
* Utilizar registros como parte de un proceso de diagnóstico.
* Reconocer las limitaciones de los registros como fuente de evidencia.

---

# Antes de comenzar

La mayor parte del ejercicio se realizará en:

```text
Terminal A - Linux del laboratorio
```

Tu prompt debería verse de forma similar a:

```text
alumno@metis-lab:~$
```

En algunas actividades volveremos a utilizar:

```text
Terminal B - Computadora anfitriona
```

como hicimos durante el ejercicio de SSH.

Antes de continuar, comprobá tu entorno.

## Terminal A - Linux del laboratorio

```bash
whoami
hostname
pwd
```

Deberías poder reconocer:

```text
usuario
→ alumno

hostname
→ metis-lab
```

No continúes hasta poder distinguir la computadora anfitriona del laboratorio.

---

# ¿Qué es un evento?

Un evento es algo que ocurrió en el sistema.

Por ejemplo:

```text
un usuario ejecutó sudo

un programa comenzó a funcionar

una conexión SSH llegó al servidor

un intento de autenticación fue rechazado

un archivo no pudo abrirse

un proceso terminó
```

El evento es lo que ocurrió.

El registro es información que algún componente produjo acerca de ese evento.

Podemos representarlo así:

```text
Algo ocurre
     │
     ▼
Programa o sistema genera información
     │
     ▼
Mecanismo de logging
     │
     ▼
Registro
```

---

# Un registro no es el evento

Esta diferencia es importante.

Supongamos que alguien intenta ingresar mediante SSH.

El evento es:

```text
intento de autenticación
```

El registro podría contener información como:

```text
fecha y hora

programa

usuario

dirección de origen

resultado
```

El registro describe algo que ocurrió.

No es el evento en sí mismo.

---

# ¿Para qué sirven los registros?

Los registros pueden ayudarnos a:

* Diagnosticar fallas.
* Investigar accesos.
* Analizar comportamiento.
* Reconstruir una secuencia de eventos.
* Detectar errores.
* Auditar acciones.
* Comprender qué estaba haciendo un servicio.
* Investigar incidentes de seguridad.

Pero encontrar una línea en un log no significa automáticamente que ya entendimos lo ocurrido.

Tenemos que interpretarla dentro de su contexto.

---

# Los registros tampoco son una verdad absoluta

Un registro es evidencia.

Pero puede ser:

* Incompleto.
* Mal configurado.
* Eliminado.
* Modificado.
* Interpretado incorrectamente.
* Generado con una hora incorrecta.
* Insuficiente para demostrar por sí solo qué ocurrió.

Además, un usuario con privilegios elevados podría tener capacidad para modificar algunos registros.

Por eso:

> un buen diagnóstico no depende ciegamente de una sola línea.

Los registros son una fuente de información que debemos relacionar con otras evidencias.

---

# ¿Dónde están los logs en Linux?

No existe una única respuesta válida para todos los sistemas Linux.

Podés encontrar registros en:

```text
archivos dentro de /var/log
```

También pueden ser administrados por mecanismos como:

```text
systemd-journald
```

y consultados mediante herramientas como:

```text
journalctl
```

Otros programas pueden escribir:

```text
archivos propios
```

o enviar información hacia:

```text
stdout
stderr
servidores remotos
sistemas de monitoreo
plataformas de observabilidad
```

Por eso no deberíamos empezar preguntando:

> ¿Cuál es el comando para ver los logs?

Primero necesitamos saber:

> ¿Cómo registra eventos este sistema?

---

# Actividad 1 - Investigá antes de asumir

Vamos a observar qué existe realmente dentro de Metis Forge.

## Terminal A - Linux del laboratorio

Primero observá qué proceso ocupa la posición inicial del contenedor:

```bash
ps -p 1 -o pid,comm,args
```

No importa todavía memorizar el significado de todos los campos.

Preguntate:

```text
¿estamos viendo un servidor Linux completo?

¿o estamos dentro de un entorno de contenedor?
```

Recordá lo aprendido anteriormente sobre Quick Mode.

---

# ¿Existe journalctl?

Comprobá:

```bash
command -v journalctl
```

Pueden ocurrir diferentes cosas.

El comando puede:

* Mostrar una ruta.
* No mostrar ningún resultado.

Pero incluso si el programa existe, eso no demuestra que:

```text
systemd-journald
```

esté funcionando dentro del contenedor.

Esta es la misma idea que ya vimos con SSH:

```text
herramienta instalada
        ≠
servicio funcionando
```

No instales componentes nuevos solamente porque viste otra herramienta de logging en un tutorial.

Primero investigá el sistema que realmente estás administrando.

---

# Buscar rsyslog

Ahora ejecutá:

```bash
command -v rsyslogd
```

También:

```bash
rsyslogd -v
```

Deberías encontrar `rsyslog` disponible en el laboratorio.

El programa principal se llama:

```text
rsyslogd
```

La letra:

```text
d
```

vuelve a representar la idea de:

```text
daemon
```

igual que en:

```text
sshd
```

---

# ¿Qué función cumple rsyslog?

`rsyslogd` puede recibir mensajes producidos por diferentes componentes del sistema y procesarlos según reglas de configuración.

Una versión simplificada del recorrido puede verse así:

```text
Programa
   │
   │ genera un mensaje
   ▼
Sistema de logging
   │
   ▼
rsyslogd
   │
   │ aplica reglas
   ▼
Destino
```

El destino podría ser, por ejemplo:

```text
un archivo
```

Pero también podría ser otro sistema.

En este laboratorio nos concentraremos en registros locales.

---

# ¿Está funcionando?

No lo supongas.

Comprobalo:

```bash
pgrep -a rsyslogd
```

Si no aparece ningún proceso, significa que encontramos una situación similar a la que vimos con SSH:

```text
rsyslog instalado
        ↓
pero
        ↓
rsyslogd no está funcionando
```

Esto es esperable en Quick Mode.

El contenedor no inicia automáticamente todos los servicios que encontrarías en una instalación tradicional de Ubuntu Server.

---

# Explorar la configuración

Antes de iniciar `rsyslogd`, vamos a averiguar qué configuración utilizará.

El archivo principal suele encontrarse en:

```text
/etc/rsyslog.conf
```

Comprobá que exista:

```bash
ls -l /etc/rsyslog.conf
```

Ahora observá si existen configuraciones adicionales:

```bash
ls -l /etc/rsyslog.d/
```

No modifiques esos archivos.

Primero queremos entenderlos.

---

# Buscar referencias a autenticación

En lugar de abrir todos los archivos uno por uno, podemos buscar texto dentro de ellos.

Ejecutá:

```bash
sudo grep -R -n 'auth' /etc/rsyslog.conf /etc/rsyslog.d/
```

No memorices la salida.

Buscá conceptos.

Intentá identificar:

```text
auth
authpriv
/var/log/auth.log
```

Si encontrás una regla que relaciona autenticación con:

```text
/var/log/auth.log
```

ya descubriste algo importante:

> la ubicación del registro no fue una suposición; la obtuvimos leyendo la configuración del sistema.

---

# Si no encontrás /var/log/auth.log

No continúes fingiendo que el archivo tiene que existir.

Revisá nuevamente:

```bash
sudo grep -R -n 'auth' /etc/rsyslog.conf /etc/rsyslog.d/
```

Consultá además:

```bash
man rsyslog.conf
```

Buscá cómo funcionan:

```text
facilities
priorities
selectors
```

La documentación y la configuración local son parte de la investigación.

Un administrador no debería asumir que una ruta encontrada en Internet corresponde necesariamente a su sistema.

---

# Facility y prioridad

Los sistemas compatibles con syslog pueden clasificar mensajes utilizando dos conceptos importantes:

```text
facility
```

y:

```text
priority
```

De forma inicial podemos interpretarlos así:

```text
facility
→ qué tipo de componente o subsistema produjo el mensaje

priority
→ qué nivel o importancia tiene el mensaje
```

Algunas facilities que podés encontrar son:

```text
auth
authpriv
daemon
user
kern
```

No necesitás memorizar toda la lista.

Lo importante es comprender que las reglas pueden decidir el destino de un mensaje según estas características.

---

# Validar la configuración

Antes de iniciar `rsyslogd`, comprobá su configuración:

```bash
sudo rsyslogd -N1
```

Leé la salida.

No busques solamente una palabra como:

```text
OK
```

Intentá determinar:

```text
¿la configuración pudo procesarse?

¿apareció algún error?
```

No deberíamos iniciar un servicio después de ignorar errores de configuración.

---

# Iniciar rsyslogd

Si la validación no mostró errores que impidan continuar, iniciá:

```bash
sudo rsyslogd
```

Ahora comprobá:

```bash
pgrep -a rsyslogd
```

Deberías poder identificar un proceso `rsyslogd`.

Acabamos de pasar por esta secuencia:

```text
¿está instalado?
       ↓
¿qué configuración utiliza?
       ↓
¿la configuración es válida?
       ↓
iniciar
       ↓
comprobar
```

No simplemente:

```text
ejecutar un comando
       ↓
suponer que funcionó
```

---

# El socket de logging

Podés observar también:

```bash
ls -l /dev/log
```

En muchos sistemas que utilizan syslog, los programas locales pueden enviar mensajes mediante este socket.

No necesitás comprender todavía todos los detalles de los sockets Unix.

Por ahora pensalo como uno de los puntos mediante los cuales los programas pueden entregar mensajes al sistema de logging.

---

# ¿Existe auth.log ahora?

Comprobá:

```bash
sudo ls -l /var/log/auth.log
```

El archivo puede existir después de iniciar el sistema de logging y generar eventos.

Si todavía no existe, no lo crees manualmente.

Primero vamos a producir un evento.

---

# Generar un evento controlado

Para aprender a buscar registros necesitamos saber exactamente qué evento estamos buscando.

Linux dispone de una herramienta llamada:

```text
logger
```

Comprobá que esté disponible:

```bash
command -v logger
```

Vamos a generar un mensaje completamente identificable.

Ejecutá:

```bash
logger -p auth.notice -t metis-forge "LAB-001 evento controlado de autenticacion"
```

Este comando no está intentando autenticar realmente a ningún usuario.

Estamos generando deliberadamente un mensaje para comprobar el recorrido del sistema de logging.

---

# Buscar el evento

Ahora ejecutá:

```bash
sudo grep 'metis-forge' /var/log/auth.log
```

Deberías poder encontrar el mensaje que acabás de generar.

También podés observar las últimas líneas:

```bash
sudo tail -n 20 /var/log/auth.log
```

Si encontraste el mensaje, acabamos de demostrar:

```text
logger
   │
   ▼
mensaje de logging
   │
   ▼
rsyslogd
   │
   ▼
regla de configuración
   │
   ▼
/var/log/auth.log
```

No tuvimos que asumir que funcionaba.

Lo comprobamos.

---

# Actividad 2 - Interpretá una línea

Buscá la línea que contiene:

```text
LAB-001 evento controlado de autenticacion
```

Intentá identificar:

1. Fecha y hora.
2. Hostname.
3. Programa o etiqueta.
4. Mensaje.

La presentación exacta puede variar.

No copies una salida de ejemplo de Internet.

Analizá la salida producida por tu laboratorio.

---

# Buscar no significa leer todo

Un archivo de registros puede contener cientos, miles o millones de entradas.

No siempre es razonable leerlo completo.

Algunas herramientas simples permiten reducir la información.

---

# tail

Ya utilizamos:

```bash
sudo tail -n 20 /var/log/auth.log
```

Esto muestra las últimas veinte líneas.

Es útil cuando nos interesa lo que ocurrió recientemente.

---

# grep

Podemos buscar eventos relacionados con una palabra.

Por ejemplo:

```bash
sudo grep 'metis-forge' /var/log/auth.log
```

También podríamos investigar referencias a:

```text
sudo
```

mediante:

```bash
sudo grep 'sudo' /var/log/auth.log
```

La búsqueda puede reducir mucho la cantidad de información.

Pero también introduce un riesgo:

> si buscás solamente aquello que esperás encontrar, podés ignorar información importante.

---

# Generar un evento real con sudo

Hasta ahora generamos un mensaje artificial y controlado.

Ahora vamos a producir una acción real.

Primero registrá aproximadamente el momento actual:

```bash
date -Is
```

Después ejecutá:

```bash
sudo whoami
```

El resultado debería indicar:

```text
root
```

Ahora investigá las últimas entradas relacionadas con `sudo`:

```bash
sudo grep 'sudo' /var/log/auth.log | tail -n 20
```

No busques una línea exacta predeterminada.

Intentá responder:

1. ¿Aparece tu usuario?
2. ¿Aparece el comando ejecutado?
3. ¿Aparece una fecha u hora?
4. ¿Podés relacionar la entrada con la acción que acabás de realizar?

---

# Correlacionar un evento

La palabra:

```text
correlacionar
```

aparece frecuentemente cuando trabajamos con registros.

En este contexto significa relacionar diferentes datos para intentar reconstruir qué ocurrió.

Por ejemplo:

```text
15:32
ejecuté sudo whoami
       │
       ▼
15:32
aparece una entrada relacionada con sudo
```

La cercanía temporal ayuda a vincular ambos elementos.

Pero la hora por sí sola no siempre alcanza.

También podemos observar:

* Usuario.
* Programa.
* Comando.
* Host.
* Resultado.
* Otros eventos cercanos.

---

# La hora importa

Ejecutá:

```bash
date
```

Después:

```bash
date -Is
```

Compará ambas salidas.

Cuando analizamos registros es importante saber:

* Qué zona horaria utiliza el sistema.
* Qué formato de fecha utiliza.
* Si los relojes de los sistemas involucrados están sincronizados.

Dos eventos pueden parecer ocurrir en momentos diferentes simplemente porque los sistemas utilizan zonas horarias distintas.

No vamos a configurar sincronización horaria en este ejercicio.

Pero desde ahora deberías considerarla durante cualquier investigación.

---

# Observar eventos mientras ocurren

`tail` también puede permanecer esperando líneas nuevas.

Ejecutá:

```bash
sudo tail -f /var/log/auth.log
```

La terminal quedará ocupada mostrando nuevas entradas a medida que aparezcan.

Para detener la observación:

```text
Ctrl+C
```

No cierres la terminal a la fuerza.

Usá `Ctrl+C` para interrumpir el comando.

---

# Actividad 3 - Observación en tiempo real

Abrí una segunda terminal dentro del laboratorio.

Desde la computadora anfitriona podés abrirla utilizando:

```bash
docker exec -it -u alumno metis-lab bash
```

Antes de continuar comprobá:

```bash
whoami
hostname
```

Deberías reconocer:

```text
alumno
metis-lab
```

En la primera terminal dejá ejecutándose:

```bash
sudo tail -f /var/log/auth.log
```

En la segunda ejecutá:

```bash
logger -p auth.notice -t metis-forge "LAB-001 evento observado en tiempo real"
```

Volvé a mirar la primera terminal.

Deberías observar aparecer el nuevo evento.

Después detené `tail` mediante:

```text
Ctrl+C
```

---

# Lo que acabamos de demostrar

La observación en tiempo real nos permitió relacionar:

```text
acción
  │
  ▼
generación del evento
  │
  ▼
procesamiento
  │
  ▼
aparición en el registro
```

Esto puede resultar especialmente útil durante:

* Diagnósticos.
* Pruebas.
* Cambios de configuración.
* Investigación de errores.
* Análisis de conexiones.

---

# Registros de SSH

En el ejercicio anterior trabajaste con:

```text
sshd
```

OpenSSH genera información relacionada con las conexiones y la autenticación mediante el sistema de logging.

Ahora que `rsyslogd` está funcionando podemos observar ese comportamiento.

Primero comprobá si `sshd` está activo:

```bash
pgrep -a sshd
```

Si no aparece ningún servidor SSH principal, preparalo igual que en el ejercicio anterior:

```bash
sudo mkdir -p /run/sshd
sudo ssh-keygen -A
sudo /usr/sbin/sshd -t
```

Si la configuración es válida:

```bash
sudo /usr/sbin/sshd
```

Comprobá:

```bash
pgrep -a sshd
```

y:

```bash
sudo ss -ltnp | grep ':22'
```

---

# Comprobar cómo SSH registra eventos

Podemos observar parte de la configuración efectiva de `sshd`.

Ejecutá:

```bash
sudo /usr/sbin/sshd -T | grep -E '^(syslogfacility|loglevel) '
```

Intentá identificar:

```text
syslogfacility
```

y:

```text
loglevel
```

No los modifiques.

Primero queremos conocer la configuración real que está utilizando el servicio.

---

# Generar un intento SSH fallido

Vamos a producir deliberadamente un intento de acceso que debe fallar.

No vamos a utilizar una cuenta real.

Primero comprobá que el siguiente usuario no exista:

```bash
getent passwd metis-inexistente
```

No debería aparecer ninguna entrada.

---

# Registrar el momento

Antes del intento:

```bash
date -Is
```

Recordá aproximadamente esa hora.

Ahora cambiá a:

```text
Terminal B - Computadora anfitriona
```

---

# Verificar nuevamente la identidad del servidor si es necesario

Si tu cliente SSH todavía no conoce la clave del laboratorio, no aceptes una huella sin comprobarla.

Desde:

```text
Terminal A - Linux del laboratorio
```

podés obtenerla mediante:

```bash
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

Después comparala con la presentada por el cliente, igual que aprendiste en el ejercicio anterior.

---

# Provocar un fallo controlado

Desde:

```text
Terminal B - Computadora anfitriona
```

ejecutá:

```bash
ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no -o NumberOfPasswordPrompts=1 -p 2222 metis-inexistente@127.0.0.1
```

Si solicita una contraseña, no utilices ninguna contraseña real.

Podés escribir una cadena creada exclusivamente para esta prueba.

El acceso debe ser rechazado porque:

```text
metis-inexistente
```

no es una cuenta válida del laboratorio.

Un rechazo en esta actividad es el resultado esperado.

---

# Investigar el intento

Regresá a:

```text
Terminal A - Linux del laboratorio
```

Ejecutá:

```bash
sudo grep 'sshd' /var/log/auth.log | tail -n 20
```

Después:

```bash
sudo grep 'metis-inexistente' /var/log/auth.log
```

No esperes necesariamente una frase exacta.

La redacción puede depender de la versión y de la etapa en la que haya terminado la conexión.

Buscá información relacionada con:

* `sshd`.
* Usuario solicitado.
* Momento del intento.
* Dirección de origen.
* Resultado.

---

# La dirección puede sorprenderte

Desde la computadora anfitriona te conectaste a:

```text
127.0.0.1:2222
```

Pero el registro dentro del contenedor puede mostrar una dirección de origen diferente.

Recordá que Docker participa en la comunicación:

```text
Computadora anfitriona
        │
        │ 127.0.0.1:2222
        ▼
Docker
        │
        ▼
Contenedor
        │
        │ :22
        ▼
sshd
```

No cambies nada intentando hacer coincidir las direcciones.

Primero intentá explicar lo que estás observando.

---

# Actividad 4 - Reconstruí el intento SSH

Utilizando solamente la información disponible en los registros y lo que sabés que hiciste, respondé:

1. ¿A qué hora realizaste el intento?
2. ¿Qué programa registró el evento?
3. ¿Qué usuario intentó utilizar el cliente?
4. ¿Ese usuario existe?
5. ¿La conexión llegó al servidor?
6. ¿La autenticación tuvo éxito?
7. ¿Qué dirección de origen muestra el registro?
8. ¿Coincide con `127.0.0.1`?
9. Si no coincide, ¿qué componente podría explicar la diferencia?
10. ¿Qué evidencia permite distinguir un problema de red de un rechazo de autenticación?

---

# Un log puede cambiar cómo diagnosticamos

Recordá un error del ejercicio anterior:

```text
Permission denied
```

Sin registros podríamos pensar:

```text
algo está roto
```

Con más información podemos empezar a separar posibilidades:

```text
la conexión nunca llegó

el usuario no existe

el método de autenticación fue rechazado

la clave no fue aceptada

la contraseña fue incorrecta

la cuenta no estaba autorizada
```

El registro no necesariamente nos entrega automáticamente la solución.

Nos permite formular mejores hipótesis.

---

# Diagnóstico basado en evidencia

Un proceso razonable puede verse así:

```text
Observar el síntoma
       ↓
registrar cuándo ocurrió
       ↓
identificar qué componente participa
       ↓
buscar sus registros
       ↓
filtrar eventos relevantes
       ↓
relacionar horarios e identidades
       ↓
formular una hipótesis
       ↓
realizar una prueba
       ↓
observar nuevamente
```

Esto es diferente de:

```text
aparece un error
       ↓
buscar un comando en Internet
       ↓
ejecutarlo
       ↓
esperar que desaparezca
```

---

# Los permisos de los logs también importan

Comprobá:

```bash
ls -l /var/log/auth.log
```

Observá:

* Propietario.
* Grupo.
* Permisos.

Intentá leerlo sin `sudo`:

```bash
tail -n 5 /var/log/auth.log
```

Dependiendo de los permisos y grupos de tu usuario, el acceso puede ser rechazado.

No respondas ejecutando:

```text
chmod 777 /var/log/auth.log
```

El registro contiene información relacionada con autenticación y administración del sistema.

No todos los usuarios deberían poder modificarlo.

---

# Actividad 5 - Aplicá lo aprendido sobre permisos

Respondé:

1. ¿Quién es propietario de `/var/log/auth.log`?
2. ¿Qué grupo tiene asociado?
3. ¿Qué permisos tiene?
4. ¿Tu usuario puede leerlo directamente?
5. ¿Puede modificarlo?
6. ¿Por qué sería peligroso permitir escritura a cualquier usuario?
7. ¿Qué relación existe entre integridad de los registros e investigación de incidentes?

---

# ¿Y docker logs?

Hasta ahora estuvimos observando registros almacenados dentro del sistema Linux del contenedor.

Docker también proporciona:

```bash
docker logs
```

Pero no es exactamente lo mismo.

Cambiá a:

```text
Terminal B - Computadora anfitriona
```

Ejecutá:

```bash
docker logs metis-lab
```

Puede que encuentres poca información o incluso ninguna relacionada con las actividades anteriores.

Eso no significa que:

```text
/var/log/auth.log
```

esté vacío.

---

# Dos caminos diferentes

Podemos representar de forma simplificada dos mecanismos:

```text
Programa
   │
   ├────────→ stdout / stderr
   │               │
   │               ▼
   │          Docker logging
   │
   └────────→ sistema de logging
                   │
                   ▼
               rsyslogd
                   │
                   ▼
             /var/log/...
```

No todos los programas escriben en ambos lugares.

Por eso:

```text
docker logs
```

no debe interpretarse como:

```text
todos los registros que existen dentro del contenedor
```

---

# Quick Mode y una máquina virtual no son iguales

Esta diferencia vuelve a ser importante.

En una máquina virtual con un sistema Linux completo podrías trabajar con:

```text
systemd
systemd-journald
journalctl
systemctl
```

En Quick Mode estamos utilizando un contenedor diseñado específicamente para aprender los conceptos principales con menos recursos.

Por eso en este ejercicio iniciamos `rsyslogd` explícitamente.

No estamos fingiendo que el contenedor funciona exactamente igual que una máquina virtual.

Los objetivos de aprendizaje pueden ser equivalentes aunque algunos mecanismos del sistema sean diferentes.

---

# ¿Qué es observabilidad?

Los logs son una parte de algo más amplio:

```text
observabilidad
```

De forma inicial, podemos pensar la observabilidad como nuestra capacidad para comprender qué está ocurriendo dentro de un sistema utilizando información que el sistema expone.

Los registros son una fuente.

También existen otras, como:

* Métricas.
* Estado de procesos.
* Estado de servicios.
* Conexiones de red.
* Trazas.
* Alertas.

No vamos a estudiar todas estas herramientas en LAB-001.

El objetivo es reconocer que:

> un log es una fuente de observación, no toda la observabilidad del sistema.

---

# No colecciones logs sin propósito

Guardar toda la información posible tampoco es automáticamente una buena estrategia.

Los registros pueden consumir:

* Almacenamiento.
* Ancho de banda.
* Capacidad de procesamiento.
* Tiempo de análisis.

También pueden contener información sensible.

Un sistema real necesita decidir:

* Qué registrar.
* Durante cuánto tiempo.
* Quién puede acceder.
* Cómo proteger la integridad.
* Cuándo rotar o eliminar información.
* Qué información no debería registrarse.

Estos temas se profundizarán en laboratorios posteriores.

---

# Información sensible

Los registros pueden contener elementos como:

* Nombres de usuario.
* Direcciones IP.
* Rutas.
* Nombres de equipos.
* Comandos.
* Identificadores.
* Detalles de errores.

No publiques automáticamente un archivo de logs completo para pedir ayuda.

Primero revisá qué información contiene.

Compartir evidencia no significa compartir todo el sistema.

---

# Actividad 6 - Investigá un problema

Imaginá esta situación:

> Un usuario informa que no puede acceder mediante SSH.

No recibís más información.

Ordená las siguientes acciones según cómo investigarías el problema:

```text
comprobar si sshd está ejecutándose

comprobar si el puerto está escuchando

identificar aproximadamente cuándo ocurrió el intento

buscar eventos de sshd en los registros

comprobar si el usuario existe

revisar el método de autenticación

cambiar todos los permisos a 777

reiniciar todo inmediatamente

eliminar los logs
```

Algunas acciones no deberían formar parte de una investigación razonable.

Explicá por qué.

---

# Actividad 7 - Hechos e hipótesis

Observás una entrada que indica un intento SSH fallido para un usuario.

Clasificá las siguientes afirmaciones.

## A

```text
Hubo un evento registrado por sshd.
```

## B

```text
El usuario escribió mal su contraseña.
```

## C

```text
El servidor recibió una conexión.
```

## D

```text
Alguien está atacando el servidor.
```

## E

```text
La autenticación no terminó correctamente.
```

Indicá cuáles pueden sostenerse directamente con la evidencia disponible y cuáles son solamente hipótesis que necesitarían más información.

Esta distinción es fundamental durante cualquier investigación.

---

# Seguir un registro en tiempo real no reemplaza el análisis histórico

`tail -f` permite observar eventos nuevos.

Pero solamente mirar lo que sucede ahora puede hacer que ignoremos lo ocurrido anteriormente.

Según el problema, podríamos necesitar:

```text
últimas líneas
→ tail

buscar un término
→ grep

observar eventos nuevos
→ tail -f

revisar un período completo
→ analizar el archivo y sus timestamps
```

Elegí la herramienta según la pregunta que intentás responder.

---

# Buscar documentación

Ya conocés varias herramientas nuevas:

```text
rsyslogd
logger
tail
grep
```

No se espera que memorices todas sus opciones.

Podés investigar localmente:

```bash
man rsyslogd
```

```bash
man logger
```

```bash
man tail
```

```bash
man grep
```

También podés consultar ayuda breve cuando esté disponible:

```bash
rsyslogd --help
```

```bash
logger --help
```

```bash
tail --help
```

```bash
grep --help
```

Cuando busques documentación externa, comprobá:

* Qué herramienta estás utilizando.
* Qué versión tenés.
* Si la documentación corresponde a esa herramienta.
* Si la fuente es oficial o confiable.
* Si las instrucciones corresponden a tu distribución o entorno.

La capacidad de encontrar documentación correcta forma parte del trabajo técnico.

---

# Comprobación de comprensión

Intentá responder sin consultar las secciones anteriores.

1. ¿Qué diferencia existe entre un evento y un registro?
2. ¿Para qué puede utilizarse un registro?
3. ¿Por qué no debemos asumir que todos los sistemas Linux utilizan `journalctl`?
4. ¿Qué diferencia existe entre tener `rsyslog` instalado y tener `rsyslogd` funcionando?
5. ¿Dónde se encuentra la configuración principal de `rsyslog` en este laboratorio?
6. ¿Cómo investigaste dónde se almacenan los eventos de autenticación?
7. ¿Qué función cumple `logger`?
8. ¿Qué función cumple `tail`?
9. ¿Qué función cumple `grep`?
10. ¿Qué hace `tail -f`?
11. ¿Por qué es útil registrar la hora antes de reproducir un problema?
12. ¿Qué significa correlacionar eventos?
13. ¿Por qué una dirección observada dentro del contenedor podría ser diferente de `127.0.0.1`?
14. ¿Qué información te permitió investigar el intento SSH fallido?
15. ¿Por qué un registro no debería considerarse una verdad absoluta?
16. ¿Por qué los permisos de los archivos de logs son importantes?
17. ¿Por qué `docker logs` no necesariamente muestra lo mismo que `/var/log/auth.log`?
18. ¿Qué diferencia existe entre logs y observabilidad?
19. ¿Por qué no deberíamos compartir un archivo de registros completo sin revisarlo?
20. ¿Qué pasos seguirías antes de modificar una configuración al investigar un problema?

Si no podés explicar alguna respuesta con tus propias palabras, investigá nuevamente esa parte antes de continuar.

---

# Evidencia

Al finalizar registrá:

* Resultado de `ps -p 1 -o pid,comm,args`.
* Resultado de la búsqueda de `rsyslogd`.
* Comprobación inicial de si `rsyslogd` estaba funcionando.
* Archivos de configuración que investigaste.
* Regla que identificaste para los eventos de autenticación.
* Resultado de la validación de configuración.
* Comprobación de que `rsyslogd` quedó funcionando.
* Evento generado con `logger`.
* Línea correspondiente encontrada en el registro.
* Evento producido mediante `sudo whoami`.
* Información encontrada sobre esa ejecución.
* Resultado del intento SSH fallido.
* Registros de `sshd` asociados al intento.
* Propietario, grupo y permisos de `/var/log/auth.log`.
* Diferencia observada entre los registros internos y `docker logs`.
* Respuestas de las actividades.
* Hipótesis descartadas durante la investigación.
* Errores encontrados.
* Fuentes de documentación utilizadas.

No registres:

* Contraseñas.
* Claves privadas.
* Passphrases.
* Tokens.
* Credenciales.
* Información personal innecesaria.
* Archivos completos si contienen información sensible.

La evidencia debería demostrar:

```text
evento
   ↓
registro
   ↓
búsqueda
   ↓
interpretación
   ↓
conclusión
```

No solamente una colección de capturas de pantalla.

---

# Limpieza

Los registros generados durante el ejercicio forman parte de la evidencia del laboratorio.

No elimines:

```text
/var/log/auth.log
```

para intentar limpiar las pruebas.

En un sistema real, eliminar registros sin comprender su propósito puede destruir información necesaria para diagnóstico o auditoría.

---

# Detener sshd

Si `sshd` fue iniciado durante esta práctica y ya no necesitás mantenerlo activo:

```bash
pgrep -a sshd
```

Después:

```bash
sudo pkill -x sshd
```

Comprobá:

```bash
pgrep -a sshd
```

---

# Detener rsyslogd

Comprobá primero:

```bash
pgrep -a rsyslogd
```

Después:

```bash
sudo pkill -x rsyslogd
```

Comprobá nuevamente:

```bash
pgrep -a rsyslogd
```

No elimines los archivos de configuración del sistema.

No cambies sus permisos.

No elimines otros archivos dentro de `/var/log`.

---

# Reflexión final

Respondé con tus propias palabras:

* ¿Qué problema resuelven los registros?
* ¿Cómo descubriste qué mecanismo de logging utilizaba el laboratorio?
* ¿Por qué no empezamos directamente ejecutando `journalctl`?
* ¿Qué diferencia existe entre instalar una herramienta e iniciar su daemon?
* ¿Cómo comprobaste que el sistema de logging funcionaba realmente?
* ¿Por qué generamos primero un evento conocido?
* ¿Qué información pudiste obtener del uso de `sudo`?
* ¿Qué información pudiste obtener del intento SSH?
* ¿Cómo utilizaste el tiempo para correlacionar eventos?
* ¿Qué limitaciones tienen los logs como evidencia?
* ¿Por qué proteger los registros forma parte de la seguridad del sistema?
* ¿Qué diferencia encontraste entre `/var/log/auth.log` y `docker logs`?
* ¿Qué investigarías primero si mañana encontraras un servicio desconocido y necesitaras localizar sus registros?
* ¿Cómo decidirías si una solución encontrada en Internet corresponde realmente a tu sistema?

El objetivo final de este ejercicio no es memorizar:

```text
/var/log/auth.log
```

El objetivo es aprender un proceso:

```text
Comprender el sistema
        ↓
identificar el mecanismo de logging
        ↓
generar u observar un evento
        ↓
localizar su registro
        ↓
filtrar información
        ↓
correlacionar evidencias
        ↓
formular una hipótesis
        ↓
comprobarla
```

Ese proceso puede seguir siendo útil aunque cambien la distribución, el servicio o la tecnología utilizada.
