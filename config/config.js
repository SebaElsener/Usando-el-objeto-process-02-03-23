
import DAOproductsMongoDB from '../src/DAO/DAOproductsMongoDB.js'
import DAOcarritoMongoDB from '../src/DAO/DAOcarritoMongoDB.js'
import DAOproductsFirebase from '../src/DAO/DAOproductsFirebase.js'
import DAOcarritoFirebase from '../src/DAO/DAOcarritoFirebase.js'

let DAOproducts = null
let DAOcarrito = null
//  Con la siguiente var elegimos el método de persistencia.
//  Según su valor se exporta la instancia de las clases para la persistencia
const persistenceMethod = 'firebase'

switch (persistenceMethod) {
    case 'mongoDB':
        DAOproducts = new DAOproductsMongoDB()
        DAOcarrito = new DAOcarritoMongoDB()
        break
    case 'firebase':
        DAOproducts = new DAOproductsFirebase()
        DAOcarrito = new DAOcarritoFirebase()
        break
}

export { DAOproducts, DAOcarrito }