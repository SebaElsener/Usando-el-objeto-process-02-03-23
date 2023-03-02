# Usando el objeto process

## Claves y credenciales
Se pasaron a un archivo .env ubicado en la raíz del proyecto, estas son cargadas usando la librería *dotenv*

## Puerto de escucha del servidor
Es pasado a través de la línea de comando haciendo uso de *yargs* con el alias "-p", por defecto es 8080

## Ruta /api/info
Muestra en pantalla información acerca de process

## Ruta /api/random
A través de una función, calcula números random entre 1 y 1000, la cantidad se pasa por query params o calcula 500000 si no se le pasa ningún parámetro.  Es una ruta no bloqueante, implementada utilizando el método *fork* de *child process*, renderiza en el frontend una tabla con cada número random y la cantidad de veces que se repite.

## Links al live deploy en *Render.com*:
https://usando-objeto-process.onrender.com/api/random
https://usando-objeto-process.onrender.com/api/info
https://usando-objeto-process.onrender.com/api/register
