import ContenedorMongoDB from "../contenedores/contenedorMongoDB.js"

const productSchema = 
    {
        product: {type: String, require: true, max: 50},
        price: {type: Number, require: true},
        stock: {type: Number, require: true, max: 99999},
        description: {type: String, require: true, max: 50},
        code: {type: String, require: true},
        thumbnail: {type: String, require: true, max: 50}
    }

class DAOproductsMongoDB extends ContenedorMongoDB {

    constructor (){
        super('products', productSchema)
    }

}

export default DAOproductsMongoDB