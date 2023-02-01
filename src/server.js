
import express from 'express'
import { Server as HttpServer } from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import routeProducts from './router/productsRouter.js'
import routeCart from './router/cartRouter.js'

const app = express()
const httpServer = new HttpServer(app)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs')
app.set('views', __dirname + '../../public/views');

app.use(express.json())
app.use(express.static(__dirname + '../../public'))
app.use('/api/productos', routeProducts)
app.use('/api/carrito', routeCart)
// Middleware para mostrar error al intentar acceder a una ruta/método no implementados
app.use((req, res) => {
    res.status(404).json({
        error: -1,
        descripcion: `ruta '${req.path}' método '${req.method}' no implementada`
    })
})

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`http server escuchando en puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))