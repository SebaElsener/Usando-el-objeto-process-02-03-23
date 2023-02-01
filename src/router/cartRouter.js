
import { Router as router} from 'express'
import { DAOcarrito } from '../../config/config.js'
import { DAOproducts } from '../../config/config.js'

const routeCart = new router()

// devuelve todos los productos del carrito según id
routeCart.get('/:id/productos', async (req, res) => {
    const cart = await DAOcarrito.getById(req.params.id)
    res.json(cart)
})

// guarda un nuevo carrito con id y timestamp
routeCart.post('/', async (req, res) => {
    const newCart = await DAOcarrito.saveCart()
    res.json(newCart)
})

// guarda un nuevo producto según id de carrito e id de producto especificado
routeCart.post('/:id_cart/productos/:id_prod', async (req, res) => {
    const product = await DAOproducts.getById(req.params.id_prod)
    const addProduct = await DAOcarrito.addProductById(req.params.id_cart, product)
    res.json(addProduct)
})

// elimina un producto según id de carrito e id de producto
routeCart.delete('/:id_cart/productos/:id_prod', async (req, res) => {
    const product = await DAOproducts.getById(req.params.id_prod)
    const productToDelete = await DAOcarrito.deleteProductById(req.params.id_cart, product)
    res.json(productToDelete)
})

// borrar carrito completo según id
routeCart.delete('/:id', async (req, res) => {
    const deletedCart = await DAOcarrito.deleteById(req.params.id)
    res.json(deletedCart)
})

// Renderizar carrito
routeCart.get('/', async (req, res) => {
    const cart = await DAOcarrito.getById('63d88079a8cac0b4e425291f') || { productos: [] }
    res.render('./partials/cart',
        {
            cart: cart,
            productsQty: cart.productos.length
        }
    )
})

export default routeCart