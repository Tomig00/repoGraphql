const {carritoDaos: Carrito} = require('../persistencia/daos/mainDaos')
const carro = new Carrito()

class apiCart {
    async newCarrito() {
        return await carro.newCarrito()
    }

    async agregarProducto(idCart, idP) {
        return await carro.addProducto(idCart, idP)
    }

    async deleteCarritoById(id) {
        return await carro.deleteCarritoById(id)
    }

    async deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito){
        return await carro.deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito)
    }


}

module.exports = apiCart