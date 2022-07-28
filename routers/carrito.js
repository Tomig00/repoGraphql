const express = require('express')
const routerCarrito = express.Router()

const cartController = require('../controlador/cartController')
const carro = new cartController()

routerCarrito.post('/', carro.addCarrito)
routerCarrito.post('/productos', carro.addProdCarrito)
routerCarrito.delete('/carrito/:id', carro.deleteCarritoById)
routerCarrito.delete('/eliminarProducto/:idC', carro.deleteProductoDeCarrito)

// routerCarrito.post('/', async function(req, res){
//     try {
//         const carrito = await carro.newCarrito()
//         res.status(200).send({
//             status: 200,
//             data: {
//                 carrito,
//             },
//             message:'carrito agregado'
//             })
//     } catch (error) {
//         res.status(500).send({
//             status: 500,
//             message: error.message
//         })
//     }
// }
// );

// routerCarrito.delete('/carrito/:id', async function(req, res){
//     const num = req.params.id
//     try {
//         const borrado = await carro.deleteCarritoById(num)
//         res.status(200).send({
//             status: 200,
//             data: {
//                 borrado,
//             },
//             message:'carrito borrado'
//             })
//     } catch (error) {
//         res.status(500).send({
//             status: 500,
//             message: error.message
//         })
//     }
// });


// routerCarrito.post('/productos', async function(req, res){
        
//     try {
//             let idCarrito = req.body.idCart
//             let idProducto = req.body.idP
//             const agregado = await carro.agregarProducto(idCarrito, idProducto)
//             res.status(200).send({
//                 status: 200,
//                 data: {
//                     agregado,
//                 },
//                 message:'producto agregado a carrito'
//                 })
//         } catch (error) {
//             res.status(500).send({
//                 status: 500,
//                 message: error.message
//             })
//         }
            
            
// });


// routerCarrito.delete('/eliminarProducto/:idC', async function(req, res){
//     const idCart = req.params.idC
//     try {
//         let idCarrito = req.body.idCart
//         let idProducto = req.body.idP
//         let idEnCarrito = idCart
//         const agregado = await carro.deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito)
//         res.status(200).send({
//             status: 200,
//             data: {
//                 agregado,
//             },
//             message:'producto eliminado del carrito'
//             })
//     } catch (error) {
//         res.status(500).send({
//             status: 500,
//             message: error.message
//         })
//     }
    
// }
// );

module.exports = routerCarrito


