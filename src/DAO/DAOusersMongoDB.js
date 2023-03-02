
import ContenedorMongoDB from '../contenedores/contenedorMongoDB.js'

const userSchema = 
    {
        user: {type: String, require: true, max: 300},
        password: {type: String, require: true, max: 300}
    }

class DAOusersMongoDB extends ContenedorMongoDB {

    constructor () {
        super ('users', userSchema)
    }
}

export default DAOusersMongoDB