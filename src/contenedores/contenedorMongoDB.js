
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

mongoose.connect(process.env.MONGOURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, error => {
        if(error) throw new Error(`Error al conectar a base de datos, ${error}`)
        console.log('Base de datos conectada')
    }
)

class ContenedorMongoDB {
    
    //  Con los datos recibidos de DAOproductsMongoBD (clase extendida) crea una nueva colección
    //  y un nuevo schema, tanto para productos como para carrito
    constructor (collection, schema) {
        const newSchema = new mongoose.Schema(schema)
        this.newModel = mongoose.model(collection, newSchema)
    }

    //  Métodos comunes productos, carrito, usuarios o mensajes
    //  Traer todos los productos, carritos, usuarios o mensajes
    async getAll() {
        try {
            //return await this.newModel.find().then(res => { return res })
            return await this.newModel.find().lean()
        } catch (error) {
            console.log('Error al leer la base de datos', error)
        }
    }

    //  Traer producto o carrito por id
    async getById(id) {
        try {
            return await this.newModel.findById(id).then(res => { return res })
        } catch (error) {
            console.log('El producto buscado no existe', error)
        }
    }

    // Borrar producto o carrito por id
    async deleteById(id) {
        try {
            return await this.newModel.deleteOne( {_id: id} ).then(res => { return res })
        } catch (err) {
            console.log('Error al eliminar producto', err)
        }
    }

    // Borrar todos los productos o carritos
    async deleteAll() {
        try {
            return await this.newModel.deleteMany({}).then(res => { return res })
        } catch (err) {
            console.log('Error al eliminar todos los productos', err)
        }
    }

    //  ----------- Métodos productos -----------  //
    // Guardar un nuevo producto
    async saveProduct (product) {
        try {
            await new this.newModel(product).save().then(res => { return res })
        } catch (error) {
            console.log(`Error al escribir en base de datos, ${error}`)
        }
    }

    // Actualizar producto por id
    async updateById(id, data) {
        try {
            return await this.newModel.updateOne( {_id: id}, data ).then(res => { return res })
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
            await new this.newModel(newCart).save().then(res => { return res })
        } catch (error) {
            console.log(`Error al escribir en base de datos, ${error}`)
        }
    }

    //  Agregar producto al carrito por id
    async addProductById (id, data) {
        try {
            await this.newModel.updateOne( {_id: id}, {$push: {productos: data}} )
            const updatedCart = await this.getById(id)
            return updatedCart
        } catch (error) {
            console.log(`Error al escribir en base de datos, ${error}`)
        }
    }

    //  Eliminar producto del carrito por id
    async deleteProductById (id, data) {
        try {
            const dataId = (JSON.stringify(data._id))
            const cartToUpdate = await this.getById(id)
            const productToDelete = cartToUpdate.productos.findIndex(product => JSON.stringify(product._id) === dataId)
            cartToUpdate.productos.splice(productToDelete, 1)
            await this.newModel.updateOne( {_id: id}, {$set: {productos: cartToUpdate.productos}} )
            const updatedCart = await this.getById(id)
            return updatedCart
        } catch (error) {
            console.log(`Error al escribir en base de datos, ${error}`)
        }
    }

    //////////////////////////////////////
    ////////  Métodos usuarios  //////////
    //////////////////////////////////////

    async save (item) {
        try {
            return await this.newModel(item).save().then(res => { return JSON.stringify(res) })
        } catch (error) {
            console.log(`Error al escribir en base de datos, ${error}`)
        }
    }

    async getByUser (username) {
        try {
            const matchedUser = await this.newModel.findOne({ user: username })
            if (matchedUser == null) {
                return undefined
            }
            return matchedUser
        } catch (error) {
            console.log(`El usuario ya existe, ${error}`)
        }
    }

}

export default ContenedorMongoDB