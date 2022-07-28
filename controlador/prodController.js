const apiProd = require('../negocio/apiProd')

const api = new apiProd()

class prodController {
    
    async getProducto(req, res) {
        const num = req.params.id
        if (num === "all")
        {
            try {
                const productos = await api.getAll()
                res.status(200).send({
                    status: 200,
                    data: {
                        productos,
                    },
                    message:'productos encontrados'
                    })
            } catch (error) {
                res.status(500).send({
                    status: 500,
                    message: error.message
                })
            }
            
        }else{
            try {
                const producto = await api.getById(num)
                res.status(200).send({
                    status: 200,
                    data: {
                        producto,
                    },
                    message:'producto encontrado'
                    })
            } catch (error) {
                res.status(500).send({
                    status: 500,
                    message: error.message
                })
            }
        } 
    }
    
    async addProducto(req, res) {
            try {
                console.log(req.body)
                const id = await api.save(req.body)
                res.send(id)
                
            } catch (error) {
                res.status(500).send({
                    status: 500,
                    message: error.message
                })
            }
    }

    async updateProducto(req, res) { 
            const num = req.params.id
            try {
                let idProd = parseInt(num)
                const cambio = req.body
                const cambiado = await api.changeById(idProd, cambio)
                res.status(200).send({
                    status: 200,
                    data: { 
                        cambiado,
                    },
                    message:'producto actualizado'
                    })
            } catch (error) {
                res.status(500).send({
                    status: 500,
                    message: error.message
                })
            }
    }

    async deleteProducto(req, res) { 
            const num = req.params.id
            try {
                let idProd = parseInt(num)
                const borrar = await api.deleteById(idProd)
                res.status(200).send({
                    status: 200,
                    data: { 
                        borrar,
                    },
                    message:'producto eliminado'
                    })
            } catch (error) {
                res.status(500).send({
                    status: 500,
                    message: error.message
                })
            }
            
        }
}


module.exports = prodController