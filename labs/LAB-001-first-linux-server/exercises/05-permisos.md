# Ejercicio 05 - Permisos

---

# Bienvenido

En el ejercicio anterior aprendiste que Linux utiliza usuarios y grupos para representar identidades.

Pero reconocer una identidad no es suficiente.

El sistema también necesita decidir:

* Quién puede leer un archivo.
* Quién puede modificarlo.
* Quién puede ejecutarlo.
* Quién puede entrar a un directorio.
* Quién puede crear o eliminar contenido.
* Qué usuarios deberían quedar excluidos.

Linux responde estas preguntas mediante propietarios, grupos y permisos.

En este ejercicio vas a aprender a observarlos, interpretarlos, modificarlos y comprobar su comportamiento utilizando un entorno controlado.

No se espera que memorices todas las combinaciones posibles.

Se espera que puedas leer un conjunto de permisos, explicar qué permite y justificar cualquier cambio que realices.

---

# Objetivos

Al finalizar este ejercicio deberías ser capaz de:

* Identificar el propietario y el grupo asociado a un archivo.
* Diferenciar propietario, grupo y otros usuarios.
* Interpretar los permisos `r`, `w` y `x`.
* Explicar por qué los permisos tienen significados diferentes en archivos y directorios.
* Leer los permisos mostrados por `ls -l`.
* Modificar permisos utilizando notación simbólica.
* Modificar permisos utilizando notación numérica.
* Cambiar el propietario o el grupo de un recurso.
* Comprobar el acceso utilizando identidades diferentes.
* Reconocer por qué `chmod 777` no es una solución segura.
* Aplicar el principio de mínimo privilegio.

---

# Antes de comenzar

Todos los comandos de este ejercicio deben ejecutarse dentro de la terminal Linux del laboratorio.

El prompt debería verse de una forma similar a:

```text
alumno@metis-lab:~$
```

No ejecutes estas actividades en la terminal de Windows, macOS o de tu distribución anfitriona.

Comprobá dónde estás:

```bash
whoami
hostname
pwd
```

Deberías reconocer:

* Tu usuario dentro del laboratorio.
* El nombre `metis-lab`.
* Tu directorio de trabajo actual.

Si no podés determinar en qué entorno estás trabajando, detenete y revisá las guías anteriores.

---

# El escenario

Una organización necesita preparar un espacio para un pequeño equipo de trabajo.

Existirán dos usuarios:

```text
analab
brunolab
```

Ambos pertenecerán al grupo:

```text
proyecto
```

También existirá un archivo compartido:

```text
/srv/metis-permisos/informe.txt
```

Inicialmente:

* `analab` será el propietario.
* El archivo pertenecerá al grupo `proyecto`.
* `analab` podrá leerlo y modificarlo.
* Los integrantes de `proyecto` podrán leerlo.
* Los demás usuarios no podrán acceder.
* Más adelante decidiremos si el grupo también necesita modificarlo.

El objetivo no será solamente conseguir que el acceso funcione.

Cada permiso deberá tener una justificación.

---

# Identidad y autorización

Un usuario responde a la pregunta:

> ¿Quién está intentando realizar la acción?

Los permisos responden a la pregunta:

> ¿Qué está autorizado a hacer esa identidad?

Podemos representarlo así:

```text
Usuario o proceso
       │
       ▼
Identidad: UID y grupos
       │
       ▼
Propietario y grupo del recurso
       │
       ▼
Permisos configurados
       │
       ▼
Acceso permitido o rechazado
```

Los permisos no reemplazan a los usuarios y grupos.

Trabajan junto con ellos.

---

# Propietario y grupo

Cada archivo y directorio posee, como mínimo:

* Un usuario propietario.
* Un grupo propietario.
* Un conjunto de permisos.

Podés observar esta información con:

```bash
ls -l
```

Para observar un directorio sin listar su contenido se utiliza:

```bash
ls -ld nombre_del_directorio
```

Una salida podría verse así:

```text
-rw-r----- 1 analab proyecto 38 ago 6 12:00 informe.txt
```

En este ejemplo:

```text
analab
```

es el usuario propietario.

```text
proyecto
```

es el grupo propietario.

```text
-rw-r-----
```

representa el tipo de recurso y sus permisos.

---

# Cómo leer los permisos

Tomemos este ejemplo:

```text
-rw-r-----
```

Podemos separarlo así:

```text
- | rw- | r-- | ---
│    │     │     │
│    │     │     └── Otros usuarios
│    │     └──────── Grupo propietario
│    └────────────── Usuario propietario
└─────────────────── Tipo de recurso
```

El primer carácter indica el tipo de recurso.

Algunos valores frecuentes son:

```text
-    archivo regular
d    directorio
l    enlace simbólico
```

Los nueve caracteres siguientes se dividen en tres grupos:

```text
rw-    propietario
r--    grupo
---    otros
```

---

# Los tres permisos básicos

Linux utiliza tres permisos básicos:

```text
r    read     lectura
w    write    escritura
x    execute  ejecución o acceso
```

Su significado depende de si estamos trabajando con un archivo o con un directorio.

---

# Permisos sobre archivos

En un archivo regular:

| Permiso | Significado general                                 |
| ------- | --------------------------------------------------- |
| `r`     | Permite leer su contenido.                          |
| `w`     | Permite modificar o reemplazar su contenido.        |
| `x`     | Permite intentar ejecutarlo como programa o script. |

Por ejemplo:

```text
rw-
```

significa que se puede leer y modificar el archivo, pero no ejecutarlo directamente.

```text
r-x
```

significa que se puede leer y ejecutar, pero no modificar.

```text
---
```

significa que no se concede ninguno de esos permisos.

---

# Permisos sobre directorios

En un directorio, los mismos símbolos tienen un significado diferente.

| Permiso | Significado general                                                           |
| ------- | ----------------------------------------------------------------------------- |
| `r`     | Permite conocer los nombres de las entradas del directorio.                   |
| `w`     | Permite crear, eliminar o renombrar entradas.                                 |
| `x`     | Permite atravesar el directorio y acceder a elementos conocidos dentro de él. |

El permiso `x` en un directorio no significa ejecutar el directorio.

Significa poder atravesarlo o buscar dentro de él.

Para trabajar normalmente con el contenido de un directorio suele ser necesaria una combinación de permisos.

Por ejemplo, tener `r` sin `x` puede permitir observar algunos nombres, pero no acceder correctamente a la información de los elementos.

Tener `w` sin `x` tampoco suele ser suficiente para crear o eliminar elementos de forma normal.

---

# Actividad 1 - Interpretá permisos sin ejecutar comandos

Observá los siguientes ejemplos.

## Ejemplo A

```text
-rw-r--r--
```

Respondé:

1. ¿Qué tipo de recurso representa?
2. ¿Qué puede hacer el propietario?
3. ¿Qué puede hacer el grupo?
4. ¿Qué pueden hacer los demás usuarios?
5. ¿Puede ejecutarse directamente?

## Ejemplo B

```text
drwxr-x---
```

Respondé:

1. ¿Es un archivo o un directorio?
2. ¿Quién puede modificar su contenido?
3. ¿El grupo puede atravesarlo?
4. ¿Los demás usuarios pueden acceder?
5. ¿Qué diferencia existe entre `x` en este caso y `x` en un archivo?

Esta actividad puede realizarse sin computadora.

---

# Notación simbólica

El comando utilizado para modificar permisos es:

```bash
chmod
```

Su nombre proviene de:

```text
change mode
```

Una forma de utilizarlo es mediante notación simbólica.

Las identidades se representan así:

```text
u    usuario propietario
g    grupo propietario
o    otros usuarios
a    todos
```

Las operaciones se representan así:

```text
+    agregar un permiso
-    retirar un permiso
=    establecer exactamente esos permisos
```

Por ejemplo:

```bash
chmod u+x archivo
```

Agrega permiso de ejecución al propietario.

```bash
chmod g+w archivo
```

Agrega permiso de escritura al grupo.

```bash
chmod o-r archivo
```

Retira el permiso de lectura a los demás usuarios.

```bash
chmod u=rw,g=r,o= archivo
```

Establece exactamente:

```text
propietario    lectura y escritura
grupo          lectura
otros          ningún permiso
```

La notación simbólica resulta útil cuando querés realizar un cambio concreto sin reemplazar todos los permisos existentes.

---

# Actividad 2 - Predecí el resultado

Sin ejecutar todavía los comandos, explicá qué cambio produciría cada uno:

```bash
chmod u+x programa.sh
```

```bash
chmod g-w informe.txt
```

```bash
chmod o= secreto.txt
```

```bash
chmod a-r archivo.txt
```

```bash
chmod u=rw,g=r,o= documento.txt
```

No respondas solamente con los símbolos.

Explicá qué identidad gana o pierde qué capacidad.

---

# Notación numérica

Los permisos también pueden expresarse mediante números.

Cada permiso tiene un valor:

```text
r = 4
w = 2
x = 1
```

Los valores se suman para cada categoría.

| Número | Permisos | Significado general            |
| -----: | -------- | ------------------------------ |
|    `0` | `---`    | Ningún permiso                 |
|    `1` | `--x`    | Ejecución o acceso             |
|    `2` | `-w-`    | Escritura                      |
|    `3` | `-wx`    | Escritura y ejecución          |
|    `4` | `r--`    | Lectura                        |
|    `5` | `r-x`    | Lectura y ejecución            |
|    `6` | `rw-`    | Lectura y escritura            |
|    `7` | `rwx`    | Lectura, escritura y ejecución |

Se utilizan tres números:

```text
propietario | grupo | otros
```

Por ejemplo:

```text
640
```

representa:

```text
6    propietario    rw-
4    grupo          r--
0    otros          ---
```

Su representación simbólica es:

```text
rw-r-----
```

Otro ejemplo:

```text
750
```

representa:

```text
7    propietario    rwx
5    grupo          r-x
0    otros          ---
```

En un directorio se vería así:

```text
drwxr-x---
```

La notación numérica establece un conjunto completo de permisos.

Por ese motivo, antes de utilizarla debés calcular el resultado completo y no solamente el permiso que querés cambiar.

---

# Actividad 3 - Calculá permisos

Convertí las siguientes necesidades a notación simbólica y numérica.

## Caso 1

El propietario puede leer y escribir.

El grupo solamente puede leer.

Los demás usuarios no pueden realizar ninguna acción.

## Caso 2

El propietario tiene todos los permisos.

El grupo puede leer y atravesar el directorio.

Los demás usuarios no pueden acceder.

## Caso 3

El propietario y el grupo pueden leer y escribir un archivo.

Los demás usuarios no pueden acceder.

## Caso 4

Solamente el propietario puede leer y escribir.

Ninguna otra identidad puede acceder.

Comprobá tus respuestas antes de continuar.

---

# Preparar las identidades del escenario

El ejercicio anterior incluía una etapa de limpieza.

Por eso vamos a preparar identidades específicas para esta actividad.

Primero comprobá que no existan:

```bash
getent passwd analab
getent passwd brunolab
getent group proyecto
```

Cuando `getent` no encuentra una entrada, normalmente no muestra resultados.

Si alguna identidad ya existe, no continúes creando duplicados.

Investigá primero por qué existe y eliminá solamente los recursos pertenecientes a una ejecución anterior de este ejercicio.

Creá el grupo:

```bash
sudo groupadd proyecto
```

Creá los usuarios:

```bash
sudo useradd --create-home --shell /bin/bash analab
sudo useradd --create-home --shell /bin/bash brunolab
```

Agregalos al grupo:

```bash
sudo usermod --append --groups proyecto analab
sudo usermod --append --groups proyecto brunolab
```

Comprobá el resultado:

```bash
id analab
id brunolab
getent group proyecto
```

Ambos usuarios deberían aparecer asociados al grupo `proyecto`.

No necesitás asignarles contraseñas.

Durante esta práctica ejecutaremos procesos controlados utilizando `sudo -u`.

---

# Crear el espacio de trabajo

Creá el directorio:

```bash
sudo mkdir -p /srv/metis-permisos
```

Creá el archivo compartido:

```bash
sudo touch /srv/metis-permisos/informe.txt
```

En este ejercicio utilizamos `/srv/metis-permisos` como un espacio controlado del laboratorio.

No modifiques otros directorios del sistema.

---

# Cambiar propietario y grupo

El comando `chown` permite cambiar el propietario de un recurso.

También puede cambiar simultáneamente el usuario y el grupo.

Su estructura general es:

```text
chown usuario:grupo recurso
```

Aplicá el propietario y el grupo definidos en el escenario:

```bash
sudo chown analab:proyecto /srv/metis-permisos
sudo chown analab:proyecto /srv/metis-permisos/informe.txt
```

Comprobá el resultado:

```bash
ls -ld /srv/metis-permisos
ls -l /srv/metis-permisos/informe.txt
```

También existe el comando:

```bash
chgrp
```

que permite cambiar solamente el grupo.

Por ejemplo:

```text
chgrp grupo recurso
```

No necesitás ejecutarlo ahora porque `chown` ya configuró el grupo.

---

# Aplicar los permisos iniciales

El directorio deberá permitir:

```text
propietario    leer, escribir y atravesar
grupo          leer y atravesar
otros          ningún acceso
```

Esto corresponde a:

```text
750
```

Aplicalo:

```bash
sudo chmod 750 /srv/metis-permisos
```

El archivo deberá permitir:

```text
propietario    leer y escribir
grupo          leer
otros          ningún acceso
```

Esto corresponde a:

```text
640
```

Aplicalo:

```bash
sudo chmod 640 /srv/metis-permisos/informe.txt
```

Comprobá:

```bash
ls -ld /srv/metis-permisos
ls -l /srv/metis-permisos/informe.txt
```

El resultado debería ser similar a:

```text
drwxr-x--- analab proyecto /srv/metis-permisos
-rw-r----- analab proyecto /srv/metis-permisos/informe.txt
```

La fecha, el tamaño y otros campos pueden ser diferentes.

---

# No pruebes siempre como administrador

El usuario `root` puede evitar muchas de las restricciones normales del sistema.

Por eso, probar solamente con privilegios administrativos puede producir una conclusión incorrecta.

En este ejercicio utilizaremos:

```bash
sudo -u nombre_del_usuario comando
```

Esto permite ejecutar un proceso utilizando otra identidad dentro del laboratorio.

No estamos iniciando una sesión interactiva completa.

Estamos ejecutando comandos concretos para comprobar el control de acceso.

---

# Actividad 4 - Probar como propietario

Escribí contenido utilizando la identidad de `analab`:

```bash
sudo -u analab sh -c 'printf "Informe inicial de Metis Forge\n" > /srv/metis-permisos/informe.txt'
```

Leé el archivo como `analab`:

```bash
sudo -u analab cat /srv/metis-permisos/informe.txt
```

El propietario debería poder leer y modificar el archivo porque posee:

```text
rw-
```

Comprobá nuevamente:

```bash
ls -l /srv/metis-permisos/informe.txt
```

---

# Actividad 5 - Probar como integrante del grupo

Leé el archivo como `brunolab`:

```bash
sudo -u brunolab cat /srv/metis-permisos/informe.txt
```

La lectura debería funcionar porque:

* `brunolab` pertenece a `proyecto`.
* El archivo pertenece al grupo `proyecto`.
* El grupo tiene permiso de lectura.
* El directorio permite al grupo atravesarlo.

Ahora intentá modificar el archivo:

```bash
sudo -u brunolab sh -c 'printf "Revisión de Bruno\n" >> /srv/metis-permisos/informe.txt'
```

Debería aparecer un error similar a:

```text
Permission denied
```

Este error es esperado.

No indica que el laboratorio esté roto.

Indica que el sistema aplicó los permisos configurados.

Respondé:

1. ¿Por qué `brunolab` puede leer el archivo?
2. ¿Por qué no puede modificarlo?
3. ¿Qué categoría de permisos está utilizando?
4. ¿Qué permiso falta?
5. ¿Sería correcto conceder ese permiso si Bruno solamente necesitara leer?

---

# Autorizar la escritura del grupo

Supongamos ahora que los integrantes del proyecto necesitan editar el mismo informe.

Podemos agregar escritura al grupo utilizando notación simbólica:

```bash
sudo chmod g+w /srv/metis-permisos/informe.txt
```

Comprobá el cambio:

```bash
ls -l /srv/metis-permisos/informe.txt
```

Los permisos deberían quedar así:

```text
-rw-rw----
```

Su representación numérica es:

```text
660
```

Volvé a intentar la modificación:

```bash
sudo -u brunolab sh -c 'printf "Revisión de Bruno\n" >> /srv/metis-permisos/informe.txt'
```

Leé el resultado:

```bash
cat /srv/metis-permisos/informe.txt
```

La modificación debería funcionar.

El cambio no se realizó porque apareció un error.

Se realizó porque cambió el requisito:

> Bruno ahora necesita colaborar en la edición del informe.

Cada ampliación de permisos debe responder a una necesidad concreta.

---

# El permiso de ejecución

Creá un pequeño script utilizando la identidad de `analab`:

```bash
sudo -u analab sh -c 'printf "#!/bin/bash\necho Hola desde Metis Forge\n" > /srv/metis-permisos/saludo.sh'
```

Configurá su propietario y grupo:

```bash
sudo chown analab:proyecto /srv/metis-permisos/saludo.sh
```

Asignale inicialmente:

```text
640
```

```bash
sudo chmod 640 /srv/metis-permisos/saludo.sh
```

Comprobá:

```bash
ls -l /srv/metis-permisos/saludo.sh
```

Intentá ejecutarlo directamente como propietario:

```bash
sudo -u analab /srv/metis-permisos/saludo.sh
```

Debería aparecer un error relacionado con permisos.

El contenido existe y el propietario puede leerlo.

Pero el archivo no tiene permiso de ejecución.

Agregá ejecución solamente al propietario:

```bash
sudo chmod u+x /srv/metis-permisos/saludo.sh
```

Comprobá:

```bash
ls -l /srv/metis-permisos/saludo.sh
```

Los permisos deberían quedar:

```text
-rwxr-----
```

Ejecutalo nuevamente:

```bash
sudo -u analab /srv/metis-permisos/saludo.sh
```

Ahora debería mostrar:

```text
Hola desde Metis Forge
```

Respondé:

1. ¿Qué cambió entre ambos intentos?
2. ¿Por qué no agregamos ejecución al grupo?
3. ¿Por qué no agregamos ejecución a otros usuarios?
4. ¿Qué combinación numérica representa `rwxr-----`?

---

# Los permisos del directorio también importan

Un archivo puede tener permisos correctos y aun así resultar inaccesible.

Para llegar hasta él, el usuario necesita atravesar los directorios que forman su ruta.

En nuestro escenario:

```text
/srv/metis-permisos/informe.txt
```

los permisos de `/srv/metis-permisos` también participan en la decisión.

Comprobá:

```bash
ls -ld /srv/metis-permisos
```

Actualmente el grupo posee:

```text
r-x
```

Esto le permite observar y atravesar el directorio.

No le permite crear ni eliminar entradas dentro de él.

Por eso `brunolab` puede modificar el contenido de `informe.txt` cuando el archivo tiene permiso de escritura grupal, pero no puede crear libremente archivos nuevos dentro del directorio.

Probalo:

```bash
sudo -u brunolab touch /srv/metis-permisos/nuevo.txt
```

Debería obtener:

```text
Permission denied
```

La escritura sobre un archivo existente y la escritura sobre un directorio son controles diferentes.

---

# Eliminar un archivo depende del directorio

Existe un comportamiento que suele resultar confuso al principio.

La posibilidad de eliminar un archivo depende principalmente de los permisos del directorio que contiene su nombre.

Creá un archivo temporal como `analab`:

```bash
sudo -u analab sh -c 'printf "Archivo temporal\n" > /srv/metis-permisos/temporal.txt'
```

Retirale todos los permisos excepto lectura para el propietario:

```bash
sudo chmod 400 /srv/metis-permisos/temporal.txt
```

Comprobá:

```bash
ls -l /srv/metis-permisos/temporal.txt
```

Ahora, de forma temporal, concedé escritura al grupo sobre el directorio:

```bash
sudo chmod 770 /srv/metis-permisos
```

Comprobá:

```bash
ls -ld /srv/metis-permisos
```

Intentá eliminar el archivo como `brunolab`:

```bash
sudo -u brunolab rm /srv/metis-permisos/temporal.txt
```

Aunque `brunolab` no tenía permisos sobre el contenido del archivo, debería poder eliminar su entrada porque posee escritura y acceso sobre el directorio.

Comprobá:

```bash
ls -l /srv/metis-permisos
```

Este comportamiento demuestra que proteger solamente el archivo puede no ser suficiente.

También es necesario controlar el directorio que lo contiene.

Restaurá los permisos anteriores del directorio:

```bash
sudo chmod 750 /srv/metis-permisos
```

---

# Por qué no debemos utilizar chmod 777 como solución automática

El permiso:

```text
777
```

significa:

```text
propietario    rwx
grupo          rwx
otros          rwx
```

Esto concede lectura, escritura y ejecución a todas las categorías.

Aplicar `777` puede hacer desaparecer algunos errores, pero normalmente no resuelve su causa.

Puede ocultar problemas como:

* Propietario incorrecto.
* Grupo incorrecto.
* Usuario ausente del grupo necesario.
* Permisos mal calculados.
* Ruta equivocada.
* Falta de acceso en un directorio anterior.
* Diseño incorrecto del recurso compartido.

Antes de modificar permisos preguntate:

1. ¿Quién necesita acceder?
2. ¿Qué operación necesita realizar?
3. ¿Necesita leer, escribir o ejecutar?
4. ¿El acceso debe aplicarse al propietario, al grupo o a otros?
5. ¿Puedo conceder menos permisos y cumplir igualmente el objetivo?
6. ¿Cómo voy a comprobar el resultado?

No utilices:

```bash
chmod 777 recurso
```

como respuesta general ante un error de acceso.

---

# Cuidado con los cambios recursivos

Los comandos `chmod` y `chown` pueden aplicarse de forma recursiva.

Eso significa modificar un directorio y todo lo que se encuentra dentro.

Una operación recursiva incorrecta puede cambiar cientos o miles de recursos.

Durante este ejercicio no necesitás utilizar:

```text
chmod -R
chown -R
```

No ejecutes variantes encontradas en Internet sin comprender:

* Desde qué ruta se ejecutan.
* Qué archivos alcanzarán.
* Qué propietario establecerán.
* Qué permisos reemplazarán.
* Cómo podrías restaurar el estado anterior.

Antes de una operación recursiva siempre deberías inspeccionar el árbol afectado.

---

# Diagnóstico de errores frecuentes

## Permission denied

No aumentes inmediatamente los permisos.

Revisá:

```bash
whoami
id
ls -ld directorio
ls -l archivo
```

Preguntate:

* ¿Quién está ejecutando el comando?
* ¿Quién es el propietario?
* ¿Cuál es el grupo?
* ¿A qué grupos pertenece el usuario?
* ¿Qué permisos tiene el archivo?
* ¿Qué permisos tienen los directorios de la ruta?

## Operation not permitted

Puede indicar que el usuario actual no tiene autorización para cambiar el propietario o los permisos del recurso.

Comprobá si la operación realmente necesita `sudo`.

No agregues `sudo` automáticamente sin entender por qué.

## No such file or directory

Comprobá la ruta:

```bash
pwd
ls
ls -l /srv/metis-permisos
```

Un problema de ruta no se resuelve cambiando permisos.

## El grupo no aparece

Comprobá:

```bash
id nombre_del_usuario
getent group proyecto
```

Si modificaste los grupos de una sesión interactiva ya abierta, algunos cambios pueden requerir iniciar una sesión nueva.

En esta práctica utilizamos procesos nuevos mediante `sudo -u`.

## Funciona como root pero no como otro usuario

Eso no demuestra que los permisos sean correctos.

Repetí la comprobación con la identidad que realmente necesita acceder.

---

# Principio del ejercicio

> Un permiso que no puede justificarse probablemente sea excesivo.

El objetivo no es conceder la mayor cantidad posible de permisos.

El objetivo es conceder exactamente los necesarios para una función definida.

En nuestro escenario:

* `analab` administra el archivo.
* `brunolab` colabora mediante el grupo.
* Los demás usuarios no participan.
* El directorio no permite al grupo crear o eliminar archivos.
* El archivo compartido sí permite al grupo modificar su contenido.

Cada decisión responde a una necesidad concreta.

---

# Actividad final - Diseñá una política de acceso

Una organización necesita almacenar tres recursos:

```text
configuracion.conf
manual-publico.txt
herramienta.sh
```

Los requisitos son:

## configuracion.conf

* El administrador puede leer y modificar.
* El grupo técnico puede leer.
* Los demás usuarios no pueden acceder.
* No debe ejecutarse.

## manual-publico.txt

* El propietario puede leer y modificar.
* El grupo puede leer.
* Los demás usuarios pueden leer.
* No debe ejecutarse.

## herramienta.sh

* El propietario puede leer, modificar y ejecutar.
* El grupo puede leer y ejecutar.
* Los demás usuarios no pueden acceder.

Para cada recurso indicá:

1. La notación simbólica.
2. La notación numérica.
3. Un comando `chmod` que establezca esos permisos.
4. Qué usuario debería ser propietario.
5. Qué grupo debería estar asociado.
6. Por qué no concederías permisos adicionales.

No ejecutes los comandos sobre archivos reales del sistema.

Podés resolver esta actividad en papel o dentro de un directorio temporal creado específicamente para practicar.

---

# Comprobación de comprensión

Intentá responder sin consultar las secciones anteriores:

1. ¿Cuál es la diferencia entre propietario y grupo propietario?
2. ¿Qué representan `u`, `g` y `o`?
3. ¿Qué significan `r`, `w` y `x` en un archivo?
4. ¿Qué significa `x` en un directorio?
5. ¿Qué permisos representa `640`?
6. ¿Qué permisos representa `750`?
7. ¿Cuál es la diferencia entre `chmod g+w` y `chmod 660`?
8. ¿Para qué se utiliza `chown`?
9. ¿Para qué se utiliza `chgrp`?
10. ¿Por qué probar como `root` puede producir una conclusión incorrecta?
11. ¿Por qué un usuario podría modificar un archivo pero no crear otro en el mismo directorio?
12. ¿Por qué alguien podría eliminar un archivo que no puede modificar?
13. ¿Qué riesgos introduce `chmod 777`?
14. ¿Cómo comprobarías un cambio de permisos?
15. ¿Cómo se relacionan los permisos con el principio de mínimo privilegio?

Si no podés explicar alguna respuesta con tus propias palabras, revisá esa sección antes de continuar.

---

# Evidencia

Al finalizar este ejercicio registrá:

* La salida de `id analab`.
* La salida de `id brunolab`.
* El propietario y el grupo del directorio.
* El propietario y el grupo de `informe.txt`.
* Los permisos iniciales `750` y `640`.
* El intento de lectura realizado como `brunolab`.
* El intento de escritura rechazado.
* El cambio que permitió la escritura grupal.
* La prueba del permiso de ejecución.
* La prueba controlada sobre eliminación dentro del directorio.
* Las respuestas de la actividad final.
* Los errores encontrados.
* Cómo comprobaste cada corrección.
* Una explicación del principio de mínimo privilegio aplicada al escenario.

No registres:

* Contraseñas.
* Claves privadas.
* Tokens.
* Información personal.
* Archivos del sistema que no formen parte de la práctica.

La evidencia debe demostrar comprensión, no solamente mostrar capturas de comandos.

---

# Limpieza del laboratorio

Antes de eliminar recursos, verificá cuidadosamente las rutas y los nombres.

Comprobá el directorio:

```bash
ls -ld /srv/metis-permisos
ls -l /srv/metis-permisos
```

Eliminá solamente el espacio creado para este ejercicio:

```bash
sudo rm -rf /srv/metis-permisos
```

Comprobá que ya no exista:

```bash
ls -ld /srv/metis-permisos
```

El comando debería informar que la ruta no existe.

Eliminá los usuarios:

```bash
sudo userdel --remove analab
sudo userdel --remove brunolab
```

Eliminá el grupo:

```bash
sudo groupdel proyecto
```

Comprobá:

```bash
getent passwd analab
getent passwd brunolab
getent group proyecto
```

Cuando las identidades no existen, `getent` normalmente no muestra resultados.

No reemplaces los nombres de esta sección por nombres de usuarios reales del sistema.

---

# Reflexión final

Antes de continuar, respondé:

* ¿Qué problema resuelven los permisos?
* ¿Por qué los permisos dependen de usuarios y grupos?
* ¿Qué diferencia existe entre modificar un archivo y modificar el directorio que lo contiene?
* ¿Por qué el permiso de ejecución no debería concederse automáticamente?
* ¿Cuándo utilizarías notación simbólica?
* ¿Cuándo utilizarías notación numérica?
* ¿Qué comprobarías antes de ejecutar `chmod`?
* ¿Qué comprobarías antes de ejecutar `chown`?
* ¿Por qué un error de acceso no debería resolverse inmediatamente con `sudo` o `777`?
* ¿Cómo diseñarías permisos para un equipo que solamente necesita leer documentación?
* ¿Cómo demostrarías que una política de permisos funciona correctamente?

Si podés responder estas preguntas y justificar los permisos del escenario, ya comprendés una parte central del modelo de seguridad de Linux.

En el próximo ejercicio vas a utilizar estos conocimientos para comprender cómo proteger el acceso remoto a un servidor mediante SSH.
