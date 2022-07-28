const apiCart = require('../negocio/apicart');

const api = new apiCart();

class cartController {

    async addCarrito(req, res) {
        try {
            const carrito = await api.newCarrito()
            res.status(200).send({
                status: 200,
                data: {
                    carrito,
                },
                message:'carrito agregado'
                })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: error.message
            })
        }
    }

    async addProdCarrito(req, res) {
        try {
            let idCarrito = req.body.idCart
            let idProducto = req.body.idP
            const agregado = await api.agregarProducto(idCarrito, idProducto)
            res.status(200).send({
                status: 200,
                data: {
                    agregado,
                },
                message:'producto agregado a carrito'
                })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: error.message
            })
        }
    }

    async deleteCarritoById(req, res) {
        const num = req.params.id
        try {
            const borrado = await api.deleteCarritoById(num)
            res.status(200).send({
                status: 200,
                data: {
                    borrado,
                },
                message:'carrito borrado'
                })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: error.message
            })
        }
    }

    async deleteProductoDeCarrito(req, res) {
        const idCart = req.params.idC
        try {
            let idCarrito = req.body.idCart
            let idProducto = req.body.idP
            let idEnCarrito = idCart
            const agregado = await api.deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito)
            res.status(200).send({
                status: 200,
                data: {
                    agregado,
                },
                message:'producto eliminado del carrito'
                })
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: error.message
            })
        }
    }
}

module.exports = cartController;