
//import * as admin from 'firebase-admin'
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url)
const serviceAccount = require('../../config/coder-test-67523-firebase-adminsdk-w5t74-8bca7fec93.json')
const admin = require("firebase-admin")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
console.log('Base de datos conectada')
const db = admin.firestore()

class ContenedorFirebase {
    
    //  Con el parámetro recibido de DAOproductsFirestore (clase extendida)
    //  crea una nueva colección tanto para productos como para carrito
    constructor (collection) {
        this.collection = collection
        this.query = db.collection(this.collection)
    }

    //  Métodos comunes productos y carrito    
    //  Traer todos los productos o carritos
    async getAll() {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs
            const data = docs.map(doc => ({id: doc.id, ...doc.data()}))
            return data
        } catch (error) {
            console.log('Error al leer la base de datos', error)
        }
    }

    //  Traer producto o carrito por id
    async getById(id) {
        try {
            const doc = this.query.doc(`${id}`)
            const item = await doc.get()
            const data = { _id: id, ...item.data() }
            return data
        } catch (error) {
            console.log('El producto buscado no existe', error)
        }
    }

    // Borrar producto o carrito por id
    async deleteById(id) {
        try {
            const doc = this.query.doc(`${id}`)
            await doc.delete()
        } catch (err) {
            console.log('Error al eliminar producto', err)
        }
    }

    //  ----------- Métodos productos -----------  //
    // Guardar un nuevo producto
    async saveProduct (product) {
        try {
            const doc = this.query.doc()
            await doc.create(product)
        } catch (error) {
            console.log(`Error al escribir en base de datos, ${error}`)
        }
    }

    // Actualizar producto por id
    async updateById(id, data) {
        try {
            const doc = this.query.doc(`${id}`)
            await doc.update(data)
        } catch (err) {
            console.log('Error al actualizar producto', err)
        }
    }

    //  ----------- Métodos carrito -----------  //
    //  Guardar carrito
    async saveCart () {
        try {
            const newCart = {
                timestamp: Date.now(),
                productos: []
            }
            const doc = this.query.doc()
            await doc.create(newCart)
        } catch (error) {
            console.log(`Error al escribir en base de datos, ${error}`)
        }
    }

    //  Agregar producto al carrito por id
    async addProductById (id, data) {
        try {
            const cartToUpdate = await this.getById(id)
            const arrayProducts = [...cartToUpdate.productos, data]
            const doc = this.query.doc(`${id}`)
            await doc.update({ productos: arrayProducts })
            const updatedCart = await this.getById(id)
            return updatedCart
        } catch (error) {
            console.log(`Error al escribir en base de datos, ${error}`)
        }
    }

    //  Eliminar producto del carrito por id
    async deleteProductById (id, data) {
        try {
            const cartToUpdate = await this.getById(id)
            const productToDelete = cartToUpdate.productos.findIndex(product => product.product === data.product)
            cartToUpdate.productos.splice(productToDelete, 1)
            const doc = this.query.doc(`${id}`)
            await doc.set(cartToUpdate)
            const updatedCart = await this.getById(id)
            return updatedCart
        } catch (error) {
            console.log(`Error al escribir en base de datos, ${error}`)
        }
    }

}

export default ContenedorFirebase