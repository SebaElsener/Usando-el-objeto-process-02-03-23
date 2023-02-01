# Segunda entrega del proyecto final backend

Se reemplazó el sistema de persistencia local que hacía uso de *'fs'* para adaptarlo a *Firebase* y *mongoDB*, conservando las mismas funcionalidades.

* Para testear se conservó la interfaz de frontend con dos rutas principales, *'/api/productos'* y *'/api/carrito'* ya utilizada en la primer entrega del proyecto final, y además se probó mediante *Postman*.

* En el archivo *config.js* se encuentran los medios para cambiar de persistencia a través del valor de la constante *persistenceMethod*, que son importados por los DAO.  Asimismo, en *config.js* se instancian las distintas persistencias.

## Comentarios
Para probar la app se agregaron tanto a *Firebase* como a *mongoDB* tres productos y un carrito con *id=63d99bf8866138633a761063* para poder hacer las operaciones de agregar/eliminar productos.

### Link al repositorio en GitHub:  