const Producto = require('./persistencia/daos/productoDaos')

const prod = new Producto()


async function productos() {
    try {
        const productos = await prod.getAll()
        return productos
    } catch (error) {
        throw Error(error.message)
    }
}

module.exports = { productos }