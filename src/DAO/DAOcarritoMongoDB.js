
import ContenedorMongoDB from "../contenedores/contenedorMongoDB.js"

const cartSchema = 
    {
        timestamp: {type: String, require: true},
        productos: {type: Array, require: true},
    }

class DAOcarritoMongoDB extends ContenedorMongoDB {

    constructor (){
        super('cart', cartSchema)
    }

}

export default DAOcarritoMongoDB