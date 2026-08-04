# Ejercicio 04 - Usuarios y grupos

---

# Bienvenido

Hasta ahora aprendiste a orientarte dentro del sistema de archivos de Linux.

Pero un servidor no solamente necesita organizar archivos y directorios.

También necesita saber:

- Quién está utilizando el sistema.
- Qué puede hacer cada persona.
- Qué archivos le pertenecen.
- A qué recursos puede acceder.
- Qué procesos se ejecutan en su nombre.

Linux resuelve este problema mediante un sistema de **usuarios y grupos**.

En este ejercicio vas a aprender cómo Linux representa identidades y cómo utiliza esas identidades para organizar el acceso al sistema.

---

# Objetivos

Al finalizar este ejercicio deberías ser capaz de:

- Comprender qué representa un usuario en Linux.
- Diferenciar usuarios normales, usuarios administrativos y usuarios de servicio.
- Comprender qué son los identificadores UID y GID.
- Explicar para qué sirven los grupos.
- Consultar información sobre tu propia identidad.
- Reconocer los archivos donde Linux almacena información sobre usuarios y grupos.
- Crear usuarios y grupos en un entorno de laboratorio.
- Comprender por qué no deberías trabajar permanentemente como `root`.

No se espera que memorices todos los comandos.

Se espera que comprendas qué información muestra cada uno y por qué resulta importante.

---

# ¿Qué es un usuario?

Un usuario es una identidad reconocida por el sistema operativo.

Cuando una persona inicia sesión, Linux necesita determinar:

- Quién es.
- Qué archivos le pertenecen.
- Qué acciones puede realizar.
- A qué grupos pertenece.
- Qué programas puede ejecutar.
- Qué recursos puede modificar.

Cada usuario posee un nombre visible, por ejemplo:

```
rodrigo
alumno
administrador
```

Sin embargo, Linux no identifica internamente a los usuarios por su nombre.

Los identifica mediante un número llamado **UID**.

---

# UID: identificador de usuario

UID significa:

```
User Identifier
```

En español:

```
Identificador de usuario
```

Cada usuario posee un UID único dentro del sistema.

Por ejemplo:

```
Usuario: alumno
UID: 1000
```

Aunque normalmente trabajamos con nombres porque resultan más fáciles de recordar, Linux utiliza principalmente el número.

Podemos representarlo así:

```
alumno
   │
   └── UID 1000
```

Dos usuarios no deberían compartir el mismo UID, ya que el sistema podría tratarlos como si fueran la misma identidad.

---

# Tipos de usuarios

No todos los usuarios de Linux representan necesariamente a una persona.

Podemos encontrar distintos tipos de cuentas.

## Usuario root

`root` es el usuario administrador principal del sistema.

Normalmente posee:

```
UID 0
```

Tiene permisos para realizar prácticamente cualquier acción, incluyendo:

- Crear o eliminar usuarios.
- Instalar programas.
- Cambiar configuraciones.
- Modificar archivos del sistema.
- Detener servicios.
- Eliminar información crítica.

Por ese motivo, trabajar permanentemente como `root` representa un riesgo.

Un error cometido como usuario normal puede afectar solamente tus propios archivos.

El mismo error ejecutado como `root` puede afectar todo el sistema.

---

## Usuarios normales

Son las cuentas utilizadas habitualmente por personas.

Por ejemplo:

```
alumno
docente
rodrigo
```

Cada usuario suele tener:

- Un nombre.
- Un UID.
- Un directorio personal.
- Un grupo principal.
- Una terminal o shell.
- Permisos limitados.

Los usuarios normales no deberían poder modificar libremente los archivos críticos del sistema.

---

## Usuarios de servicio

Algunos usuarios son creados para ejecutar programas o servicios.

Por ejemplo, un servidor web podría ejecutarse bajo una identidad propia.

Estas cuentas permiten limitar el daño que podría causar un servicio comprometido o configurado incorrectamente.

Un servicio no debería tener más permisos de los necesarios para cumplir su función.

Este principio se conoce como:

```
Principio de mínimo privilegio
```

---

# Principio de mínimo privilegio

El principio de mínimo privilegio indica que una persona, programa o servicio debería recibir únicamente los permisos necesarios para realizar su tarea.

No debería tener permisos adicionales sin una razón concreta.

Por ejemplo:

- Un servidor web necesita leer archivos de una página.
- No necesita modificar las contraseñas de los usuarios.
- Un alumno necesita trabajar dentro de su directorio personal.
- No necesita modificar archivos críticos del sistema.

Reducir privilegios ayuda a limitar errores, abusos y ataques.

---

# ¿Qué es un grupo?

Un grupo permite reunir varias identidades bajo una misma categoría.

En lugar de otorgar permisos individualmente a cada usuario, podemos asignar permisos a un grupo.

Por ejemplo:

```
Grupo: administradores
├── ana
├── carlos
└── sofia
```

Todos los integrantes podrían recibir acceso a determinados archivos o recursos.

Los grupos facilitan la administración cuando existen muchos usuarios.

---

# GID: identificador de grupo

Así como cada usuario posee un UID, cada grupo posee un GID.

GID significa:

```
Group Identifier
```

En español:

```
Identificador de grupo
```

Por ejemplo:

```
Grupo: estudiantes
GID: 1001
```

Linux utiliza este número para identificar internamente al grupo.

---

# Grupo principal y grupos secundarios

Cada usuario posee un grupo principal.

También puede pertenecer a uno o varios grupos secundarios.

Por ejemplo:

```
Usuario: alumno
Grupo principal: alumnos
Grupos secundarios:
- laboratorio
- proyecto
```

El grupo principal suele asociarse a los archivos nuevos que crea el usuario.

Los grupos secundarios permiten conceder acceso adicional a determinados recursos.

---

# Nuestra identidad actual

Antes de crear usuarios nuevos, primero debemos averiguar quiénes somos dentro del sistema.

Ejecutá:

```bash
whoami
```

Este comando muestra el nombre del usuario actual.

Registrá el resultado.

Luego ejecutá:

```bash
id
```

Este comando muestra información más detallada, incluyendo:

- UID del usuario.
- GID del grupo principal.
- Grupos adicionales.
- Nombres asociados a cada identificador.

También podés consultar únicamente los grupos a los que pertenecés:

```bash
groups
```

---

# Actividad 1 - Investigá tu identidad

Ejecutá:

```bash
whoami
id
groups
```

Luego respondé:

1. ¿Cuál es tu nombre de usuario?
2. ¿Cuál es tu UID?
3. ¿Cuál es el GID de tu grupo principal?
4. ¿A cuántos grupos pertenecés?
5. ¿Tu usuario pertenece a algún grupo administrativo?

No copies solamente la salida de los comandos.

Explicá con tus propias palabras qué significa cada dato.

---

# ¿Dónde almacena Linux esta información?

Linux utiliza distintos archivos para registrar información sobre usuarios y grupos.

Los principales son:

```
/etc/passwd
/etc/group
/etc/shadow
```

Estos archivos tienen funciones diferentes.

---

# El archivo /etc/passwd

El archivo `/etc/passwd` contiene información general sobre los usuarios.

Podés observarlo con:

```bash
cat /etc/passwd
```

Cada línea representa una cuenta.

Una entrada puede tener esta forma:

```
alumno:x:1000:1000:Alumno del laboratorio:/home/alumno:/bin/bash
```

Los campos están separados por dos puntos.

```
nombre:x:UID:GID:descripción:directorio_personal:shell
```

Por ejemplo:

```
alumno
```

Nombre de la cuenta.

```
x
```

Indica que la información de la contraseña se encuentra almacenada en otro archivo protegido.

```
1000
```

UID del usuario.

```
1000
```

GID de su grupo principal.

```
Alumno del laboratorio
```

Descripción opcional de la cuenta.

```
/home/alumno
```

Directorio personal.

```
/bin/bash
```

Shell asignada al usuario.

---

# Importante: /etc/passwd no contiene las contraseñas

A pesar de su nombre, `/etc/passwd` no almacena normalmente las contraseñas de los usuarios.

La información sensible relacionada con las contraseñas se guarda en:

```
/etc/shadow
```

Este archivo tiene permisos mucho más restrictivos.

No deberías modificar manualmente ninguno de estos archivos durante este ejercicio.

Las cuentas deben administrarse utilizando herramientas diseñadas para esa tarea.

---

# El archivo /etc/group

El archivo `/etc/group` contiene información sobre los grupos.

Podés observarlo con:

```bash
cat /etc/group
```

Una entrada podría verse así:

```
laboratorio:x:1001:alumno,docente
```

Sus campos representan:

```
nombre:x:GID:miembros
```

En este caso:

- El grupo se llama `laboratorio`.
- Su GID es `1001`.
- Los usuarios `alumno` y `docente` aparecen como miembros.

---

# Consultando información con getent

Leer directamente `/etc/passwd` y `/etc/group` resulta útil para aprender cómo está organizado el sistema.

Sin embargo, existe una herramienta más adecuada para realizar consultas:

```bash
getent
```

Para consultar un usuario:

```bash
getent passwd nombre_del_usuario
```

Por ejemplo:

```bash
getent passwd root
```

Para consultar un grupo:

```bash
getent group nombre_del_grupo
```

Por ejemplo:

```bash
getent group root
```

`getent` consulta las fuentes de información configuradas por el sistema.

Esto resulta importante porque, en entornos profesionales, los usuarios pueden provenir de fuentes externas y no solamente de archivos locales.

---

# Actividad 2 - Investigá usuarios existentes

Utilizá:

```bash
getent passwd root
getent passwd
```

Luego investigá:

1. ¿Qué UID tiene `root`?
2. ¿Cuál es su directorio personal?
3. ¿Qué shell utiliza?
4. ¿Cuántas cuentas aparecen en el sistema?
5. ¿Todas parecen corresponder a personas?
6. ¿Qué cuentas podrían pertenecer a servicios?

Elegí tres cuentas y explicá qué función creés que cumplen.

No es necesario que conozcas todas las respuestas de antemano.

Utilizá la documentación y justificá tus conclusiones.

---

# Crear un grupo

Para crear un grupo se utiliza:

```bash
groupadd
```

Esta operación requiere privilegios administrativos.

Creá un grupo llamado:

```
metis
```

Ejecutá:

```bash
sudo groupadd metis
```

Luego comprobá que exista:

```bash
getent group metis
```

---

# Crear un usuario

Para crear una cuenta podemos utilizar:

```bash
useradd
```

Creá un usuario de laboratorio llamado:

```
aprendiz
```

Ejecutá:

```bash
sudo useradd --create-home --shell /bin/bash aprendiz
```

Las opciones utilizadas significan:

```
--create-home
```

Crea el directorio personal del usuario.

```
--shell /bin/bash
```

Asigna Bash como shell de inicio.

Comprobá la creación:

```bash
getent passwd aprendiz
```

También podés verificar su directorio personal:

```bash
ls -ld /home/aprendiz
```

---

# Agregar el usuario a un grupo

Para agregar un usuario a un grupo secundario utilizaremos:

```bash
usermod
```

Ejecutá:

```bash
sudo usermod --append --groups metis aprendiz
```

Las opciones significan:

```
--append
```

Agrega el nuevo grupo sin eliminar las pertenencias existentes.

```
--groups metis
```

Indica el grupo secundario que queremos asignar.

Comprobá el resultado:

```bash
id aprendiz
```

También podés consultar:

```bash
getent group metis
```

---

# Advertencia sobre usermod

Cuando se modifican grupos secundarios, olvidar la opción `--append` puede reemplazar los grupos existentes del usuario.

Por ejemplo, ejecutar una modificación incorrecta podría eliminar pertenencias necesarias para realizar tareas administrativas.

Antes de ejecutar un comando que modifica identidades, preguntate:

- ¿Qué cuenta estoy modificando?
- ¿Qué grupos posee actualmente?
- ¿Estoy agregando o reemplazando información?
- ¿Cómo voy a comprobar el resultado?

---

# Actividad 3 - Construí una estructura de usuarios

Creá la siguiente estructura:

```
Grupo: estudiantes
├── estudiante1
└── estudiante2
```

Cada usuario deberá tener:

- Su propio directorio personal.
- Bash como shell.
- El grupo `estudiantes` como grupo secundario.

No copies los comandos inmediatamente.

Primero escribí qué pasos creés que necesitás realizar.

Después ejecutalos.

Finalmente comprobá el resultado utilizando:

```bash
id
getent passwd
getent group
ls -ld
```

---

# Actividad 4 - Analizá el resultado

Respondé:

1. ¿Qué UID recibió cada usuario?
2. ¿Qué GID tiene el grupo `estudiantes`?
3. ¿Cuál es el grupo principal de cada usuario?
4. ¿Cuál es su grupo secundario?
5. ¿Dónde se encuentran sus directorios personales?
6. ¿Quién es el propietario de cada directorio?
7. ¿Qué ocurriría si dos cuentas compartieran el mismo UID?
8. ¿Por qué un servicio debería utilizar una cuenta propia?

---

# ¿Dónde buscar información?

Antes de utilizar un comando nuevo, consultá su documentación.

Para obtener una explicación breve:

```bash
useradd --help
groupadd --help
usermod --help
```

Para acceder al manual completo:

```bash
man useradd
man groupadd
man usermod
```

También podés consultar:

```bash
man passwd
man group
```

Tené en cuenta que:

```bash
man passwd
```

puede mostrar el manual de un comando, mientras que:

```bash
man 5 passwd
```

muestra la documentación del formato del archivo `/etc/passwd`.

El número indica la sección del manual que querés consultar.

---

# Regla Metis Nº2

> Toda identidad debe tener una función clara.
>
> Todo privilegio debe tener una justificación.

Crear usuarios no consiste solamente en escribir comandos.

También implica decidir:

- Por qué existe una cuenta.
- Quién debería utilizarla.
- A qué recursos necesita acceder.
- Qué acciones no debería poder realizar.

---

# Evidencia

Al finalizar este ejercicio registrá:

- La salida de `whoami`.
- La salida de `id`.
- Los usuarios creados.
- Los grupos creados.
- Los UID y GID asignados.
- Los comandos utilizados.
- Las comprobaciones realizadas.
- Los errores encontrados y cómo los resolviste.

Evitá registrar contraseñas o información sensible dentro de las evidencias.

---

# Limpieza del laboratorio

Antes de eliminar usuarios o grupos, verificá cuidadosamente sus nombres.

Para eliminar las cuentas creadas durante la actividad:

```bash
sudo userdel --remove estudiante1
sudo userdel --remove estudiante2
sudo userdel --remove aprendiz
```

La opción:

```
--remove
```

elimina también el directorio personal y otros archivos asociados cuando corresponde.

Luego eliminá los grupos:

```bash
sudo groupdel estudiantes
sudo groupdel metis
```

Comprobá que ya no existan:

```bash
getent passwd estudiante1
getent passwd estudiante2
getent passwd aprendiz
getent group estudiantes
getent group metis
```

Cuando `getent` no encuentra una entrada, normalmente no muestra resultados.

---

# Reflexión final

Antes de continuar, intentá responder:

- ¿Cuál es la diferencia entre un nombre de usuario y un UID?
- ¿Cuál es la diferencia entre un grupo y un GID?
- ¿Por qué existen usuarios de servicio?
- ¿Por qué no conviene trabajar siempre como `root`?
- ¿Qué información contiene `/etc/passwd`?
- ¿Por qué `/etc/shadow` está más protegido?
- ¿Qué problema resuelve la existencia de grupos?
- ¿Cómo comprobarías que un usuario fue creado correctamente?
- ¿Qué significa aplicar el principio de mínimo privilegio?

Si podés explicar estas ideas con tus propias palabras, ya comprendés una parte fundamental del modelo de seguridad de Linux.

En el próximo ejercicio vas a aprender cómo Linux utiliza estas identidades para decidir quién puede leer, modificar o ejecutar cada archivo mediante su sistema de **permisos**.