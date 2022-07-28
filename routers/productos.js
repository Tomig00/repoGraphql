const express = require('express')

const routerProductos = express.Router()


const  prodController  = require('..//controlador/prodController')
const prod = new prodController()


routerProductos.get('/:id', prod.getProducto)
routerProductos.post('/', prod.addProducto)
routerProductos.put('/:id', prod.updateProducto)
routerProductos.delete('/:id', prod.deleteProducto)


module.exports = routerProductos


