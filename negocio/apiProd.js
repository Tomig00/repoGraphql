const {productosDaos: Producto} = require('../persistencia/daos/mainDaos')
const prod = new Producto()

class apiProd {
    
    async getAll() {
        return await prod.getAll()
    }

    async getById(id) {
        return await prod.getById(id)
    }

    async save(producto) {
        return await prod.save(producto)
    }

    async changeById(idP, producto) {
        return await prod.changeById(idP, producto)
    }

    async deleteById(idP) {
        return await prod.deleteById(idP)
    }

}

module.exports = apiProd