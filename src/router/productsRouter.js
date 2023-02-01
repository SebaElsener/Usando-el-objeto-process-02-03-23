
import { Router as router} from 'express'
import { DAOproducts } from '../../config/config.js'

const routeProducts = new router()

// Var para habilitar la modificación o alta de productos
const administrador = true

// Renderiza todos los productos y el form de nuevos ingresos
routeProducts.get('/', async (req, res) => {
    const productsList = await DAOproducts.getAll()
    res.render('index', {
        admin: administrador,
        allProducts: productsList,
        productsQty: productsList.length
    })
})

// devuelve un producto según su id
routeProducts.get('/:id', async (req, res) =>{
    if (req.params.id === 'arrayproductos') {
        const allProducts = await DAOproducts.getAll()
        res.json(allProducts)
    } else {
    const productById = await DAOproducts.getById(req.params.id)
    productById === null
        ? res.json({ Error:  'Producto no encontrado' })
        : res.json(productById)
    }
})

// recibe y agrega un producto, y lo devuelve con su id asignado
routeProducts.post('/', async (req, res) =>{
    if (administrador) {
        const savedProduct = await DAOproducts.saveProduct(req.body)
        res.json(savedProduct)
    } else {
        res.json({ error : -1, descripcion: 'Sólo administradores' })
    }
})

// recibe y actualiza un producto según su id
routeProducts.put('/:id', async (req, res) =>{
    if (administrador) {
        const updateInfo = req.body
        const updatedProduct = await DAOproducts.updateById(req.params.id, updateInfo)
        res.json('Producto actualizado con éxito')
    } else {
        res.json({ error : -1, descripcion: 'Sólo administradores' })
    }
})

// elimina un producto según su id
routeProducts.delete('/:id', async (req, res) =>{
    if (administrador) {
        // almaceno el resultado de buscar el id para mostrar éxito o fallo al buscar id para eliminar
        const deletedId = await DAOproducts.getById(req.params.id)
        await DAOproducts.deleteById(req.params.id)
        deletedId === null
            ? res.json( {'Producto con ID': `${req.params.id} no encontrado`} )
            : res.json( {'Producto eliminado': deletedId.product} )
    } else {
        res.json({ error : -1, descripcion: 'Sólo administradores' })
    }
})

export default routeProducts