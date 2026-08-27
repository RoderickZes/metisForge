# Ejercicio 02 - Primer contacto con la terminal

---

# Introducción

Ya usaste una terminal, aunque todavía no hablamos en detalle de qué es.

Cuando instalaste Docker en la guía de tu sistema operativo, escribiste comandos en PowerShell (o en la terminal de macOS o Linux, según el caso). Y cuando iniciaste el laboratorio por primera vez, viste aparecer un prompt distinto: `alumno@metis-lab:~$`.

Hasta ahora fuiste siguiendo instrucciones paso a paso. En este ejercicio vamos a entender qué es realmente una terminal, qué es una shell, y qué significa cada parte de ese prompt que ya viste — para que de acá en adelante sepas qué estás haciendo, no solo qué tenés que tipear.

---

# ¿No tenés computadora?

Podés seguir este ejercicio leyendo los ejemplos y pensando qué esperarías ver en cada caso. Cuando tengas acceso a una computadora, vas a poder probarlo directamente y confirmar si tu razonamiento era correcto.

Si estás en una clase compartida, este es un buen ejercicio para que el docente lo haga en vivo mientras el resto observa y predice qué va a pasar antes de que se ejecute cada comando.

---

# Objetivos

Al finalizar este ejercicio deberías poder:

- Diferenciar una interfaz gráfica de una interfaz de línea de comandos.
- Explicar qué es una terminal, qué es una shell, y qué es Bash específicamente.
- Leer un prompt y saber qué información te da.
- Reconocer las partes de un comando: comando, opción y argumento.
- Entender qué son entrada, salida y error.
- Usar Enter, Ctrl+C, el historial y el autocompletado.
- Ejecutar tus primeros comandos dentro del laboratorio.

---

# Interfaz gráfica vs. línea de comandos

Todos los días usás interfaces gráficas: hacés clic en íconos, arrastrás ventanas, tocás botones. Es intuitivo, pero tiene un límite — cada acción depende de que exista un botón para eso.

La línea de comandos funciona distinto: en lugar de hacer clic, escribís instrucciones precisas.

¿Por qué nos importa esto para administrar servidores? Porque la gran mayoría de los servidores Linux del mundo real **no tienen interfaz gráfica**. No hay escritorio, no hay íconos. Todo se administra escribiendo comandos — muchas veces desde otra computadora, conectado remotamente. Vamos a llegar a eso en el ejercicio de SSH.

---

# Terminal, shell y Bash

Estas tres palabras se usan mezcladas todo el tiempo, pero significan cosas distintas.

## Terminal

La terminal es el programa que te muestra una ventana de texto y te deja escribir. Es la "caja" donde todo esto pasa.

## Shell

La shell es el programa que interpreta lo que escribís, lo ejecuta, y te devuelve un resultado. Es la que realmente hace el trabajo.

De hecho, ya usaste una shell sin que te lo dijéramos explícitamente: **PowerShell**, en Windows, es una shell. Cuando instalaste Docker, PowerShell fue interpretando cada comando que escribiste.

## Bash

Bash es la shell que vas a usar de acá en adelante, dentro del laboratorio Linux. Es la shell más común en servidores Linux, y la que vas a encontrar en la gran mayoría de la documentación y los tutoriales.

---

# El prompt

El prompt es la línea que te espera lista para escribir. Ya viste dos, en momentos distintos:

En PowerShell (en tu computadora):

PS C:\Users\Alumno>

Dentro del laboratorio (en Linux):

alumno@metis-lab:~$

Vamos a leer el segundo con más detalle, parte por parte:

- `alumno` — el usuario con el que estás conectado.
- `metis-lab` — el nombre de la computadora en la que estás (el hostname del laboratorio).
- `~` — dónde estás parado ahora mismo. `~` es un atajo que significa "tu carpeta personal".
- `$` — indica que sos un usuario normal. Si alguna vez ves `#` en lugar de `$`, es una señal de que estás como `root`, el usuario con máximo privilegio — algo para prestar mucha atención, no para usar por costumbre.

Una aclaración importante: **el prompt nunca se copia**. Si en una guía ves `alumno@metis-lab:~$ whoami`, lo que tenés que escribir es solamente `whoami`. Todo lo que está antes del `$` ya lo puso la terminal por vos.

---

# Comando, opción y argumento

Un comando puede tener hasta tres partes.

De hecho, ya escribiste una de estas combinaciones en la guía anterior:

docker compose up -d

Acá, `up` es el comando (le decís a Docker Compose qué hacer), y `-d` es una **opción**: le agrega un comportamiento adicional al comando (en este caso, correr en segundo plano).

En general:

- **Comando**: qué querés hacer.
- **Opción**: modifica cómo se comporta el comando. Suele empezar con `-` o `--`.
- **Argumento**: sobre qué querés hacerlo.

No hace falta memorizar esto. Vas a irlo reconociendo naturalmente a medida que uses más comandos.

---

# Entrada, salida y error

Cuando corrés un comando, puede pasar una de estas cosas:

- **Salida**: el comando funcionó, y te devuelve un resultado.
- **Error**: algo salió mal, y te lo informa.
- **Entrada**: información que vos le das al comando (a veces la escribís directamente, a veces no hace falta).

Vas a ver los tres en las actividades de este ejercicio — incluido un error, a propósito.

---

# Teclas y comportamientos que vas a usar todo el tiempo

## Enter

Ejecuta lo que escribiste. Hasta que no lo presionás, no pasa nada — podés seguir editando la línea.

## Ctrl+C

Interrumpe un comando que está corriendo. Es la forma de "frenar" algo que tarda demasiado, se colgó, o simplemente te arrepentiste de haber corrido.

## Historial

Con la flecha hacia arriba (`↑`) podés recuperar comandos que ya escribiste antes, sin tener que tipearlos de nuevo.

## Autocompletado

Si empezás a escribir un comando o un nombre de archivo y presionás `Tab`, la terminal intenta completarlo por vos. Ahorra tiempo y evita errores de tipeo.

## Mayúsculas y minúsculas

En Linux, `ls` y `LS` son comandos completamente distintos — el segundo, de hecho, no existe. Windows generalmente no distingue mayúsculas de minúsculas; Linux sí, siempre. Es uno de los motivos más comunes de error al empezar.

---

# PowerShell y Bash: se parecen, pero no son lo mismo

Las dos son shells, las dos tienen un prompt, las dos ejecutan comandos. Pero no son intercambiables: un comando de PowerShell no necesariamente funciona en Bash, y viceversa.

La diferencia que más te va a chocar al principio es justamente la de mayúsculas y minúsculas que acabamos de ver. Vas a ir notando otras a medida que avances.

---

# Antes de escribir nada: fijate dónde estás

Antes de tipear cualquier comando de acá en adelante, mirá el prompt. Es tu única señal confiable de si estás en tu computadora o dentro del laboratorio — y confundirlos puede hacer que instales algo donde no corresponde, o que busques un archivo en el lugar equivocado.

Si el laboratorio no está corriendo, volvé a [`../deployment/iniciar-y-detener-el-laboratorio.md`](../deployment/iniciar-y-detener-el-laboratorio.md) para levantarlo y entrar.

---

# Manos a la obra: tu primer comando

Con el laboratorio corriendo y el prompt `alumno@metis-lab:~$` en pantalla, escribí:

echo "Hola, Metis Forge"

`echo` es un comando simple: repite en la salida lo que le pasaste como argumento. Es una buena forma de confirmar que la terminal está funcionando y que estás escribiendo donde corresponde.

---

# Más comandos seguros para practicar

whoami

Te dice con qué usuario estás conectado. Debería responder `alumno`.

hostname

Te dice el nombre de la computadora en la que estás. Debería responder `metis-lab`.

pwd

Te muestra dónde estás parado dentro del sistema de archivos. Todavía no hace falta que entiendas a fondo qué significa esa respuesta — de eso hablamos en el próximo ejercicio. Por ahora, solo prestá atención a que te devuelve algo.

---

# Actividades

- Corré `echo` con un mensaje distinto, el que quieras.
- Corré `sleep 30` y esperá un momento — no va a pasar nada visible durante 30 segundos. Interrumpilo antes con `Ctrl+C` y confirmá que volviste al prompt.
- Usá la flecha hacia arriba un par de veces para recuperar comandos anteriores sin volver a escribirlos.
- Escribí las primeras letras de `pwd`, pará, y presioná `Tab`. Fijate qué pasa.
- Escribí a propósito un comando que no existe (por ejemplo, `noexiste`) y leé el mensaje que te devuelve. Ese es tu primer error — leelo con atención, te va a decir más de lo que parece.

---

# Antes de continuar

Antes de pasar al siguiente ejercicio, intentá responder con tus propias palabras:

- ¿Qué diferencia hay entre una terminal y una shell?
- ¿Qué información te da el prompt `alumno@metis-lab:~$`?
- ¿Por qué no hay que copiar el símbolo `$` cuando copiás un comando de una guía?
- ¿Qué hace `Ctrl+C`?
- ¿Qué diferencia concreta notaste entre Bash y PowerShell?

---

# Evidencia

Registrá:

- Los comandos que corriste y lo que te devolvieron.
- El error que generaste a propósito, y el mensaje exacto que te dio.
- Cualquier cosa que te haya sorprendido o costado entender.

---

# Próximo paso

Ya sabés moverte en una terminal y leer lo que te devuelve. En el próximo ejercicio vamos a explorar cómo se organiza Linux por dentro: qué carpetas existen, qué guardan, y cómo moverte entre ellas.

