const { getApp } = require('firebase-admin/app')
const mongoose = require('mongoose')
const esquemaCart = require('./modelsMDB/schemaCarrito')
const Producto = require('./productoDaos')


const Productos = new Producto()

class Carrito {
    async connectMDB() {
        try {
            const URL = "mongodb+srv://tomasSesiones:asd123@tomi.fuaxu.mongodb.net/sesiones?retryWrites=true&w=majority"
            let rta = await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUniFiedTopology: true
            })
        } catch (e) {
            console.log(e)
        }   
    }

    async newCarrito(dato) {
        try {
            await this.connectMDB()
            const carrito = await esquemaCart.create(dato)
            mongoose.disconnect()
            return carrito
        } catch (error) {
            throw Error(error.message)
        }
    }

    async addProducto(idC, idP) {
        try {
            await this.connectMDB()
            let productoBD = await Productos.getById(idP)
            const cartObjectId = mongoose.Types.ObjectId(idC);

            await this.connectMDB()
            const carrito = await esquemaCart.updateOne({_id: cartObjectId}, { $push: { productos: productoBD } })
            
            mongoose.disconnect()
            //return carrito
        } catch (error) {
            throw Error(error.message)
        }
    }
    async getProductos(idC) {
        try {
            await this.connectMDB()
            const cartObjectId = mongoose.Types.ObjectId(idC);
            const carrito = await esquemaCart.findById(cartObjectId)
            mongoose.disconnect()
            return carrito.productos
        } catch (error) {
            throw Error(error.message)
        }
    }

    async deleteCarritoById(idC) {
        try {
            await this.connectMDB()
            const cartObjectId = mongoose.Types.ObjectId(idC);
            const carrito = await esquemaCart.deleteOne({_id: cartObjectId})
            mongoose.disconnect()
            return carrito
    
        } catch (error){
            throw Error(error.message)
        }
    }

    async deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito) {
        try {
            
            let productoAtlas = await Productos.getById(idProducto)

            await this.connectMDB()
            const cartObjectId = mongoose.Types.ObjectId(idCarrito);
            //delete productoAtlas.idP
            const carrito = await esquemaCart.updateOne({_id: cartObjectId}, { $pull: { productos: { idP: idProducto } } })

            //const carrito = await esquemaCart.updateOne({_id: cartObjectId}, { $pull: { productos: { _id: mongoose.Types.ObjectId(idEnCarrito) } } })
            mongoose.disconnect()
            return carrito

        } catch (error){
            throw Error(error.message)
        }
    }
}

module.exports = Carrito



































//$push: {productos: producto}







//constructor() {
    //     admin.initializeApp({
    //         credential: admin.credential.cert(config),
    //         databaseURL: 'https://carrito-firebase-default-rtdb.firebaseio.com'
    //     })
    // }

    // async newCarrito() {
    //     const db = admin.firestore()
    //     const query = db.collection('carritos')
    //     let time = new Date()
    //     try {
    //         const doc = query.doc()
    //         const carrito = await doc.create({
    //             timestamp: time.toString(),
    //             productos: []
    //         })
    //         return carrito
    //     }catch (error){
    //         throw Error(error.message)
    //     }
    // }

    // async getCarritoById(idC) {
    //     try {
    //         const db = admin.firestore()
    //         const query = db.collection('carritos')
    //         const doc = query.doc(String(idC))
    //         const encontrado = await doc.get()
    //         return encontrado.data()
    
    //     } catch (error){
    //         throw Error(error.message)
    //     }
    // }

    // async deleteCarritoById(idC) {
    //     try {
    //         const db = admin.firestore()
    //         const query = db.collection('carritos')
    //         const doc = query.doc(String(idC))
    //         await doc.delete()

    
    //     } catch (error){
    //         throw Error(error.message)
    //     }
    // }


    // async deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito) {
    //     try {
    //         function random(min, max) {
    //             return Math.floor((Math.random() * (max - min + 1)) + min);
    //         }
            
    //         let productoAtlas = await Productos.getById(idProducto)


    //         const db = admin.firestore()
    //         const query = db.collection('carritos')
    //         const doc = query.doc(idCarrito)

    //         productoAtlas.idC = idEnCarrito

    //         const item = await doc.update({
    //             productos: admin.firestore.FieldValue.arrayRemove(String(productoAtlas))
    //         })

    //     } catch (error){
    //         throw Error(error.message)
    //     }
    // }

    // async agregarProducto(idCarrito, idProducto) {
    //     try {
    //         function random(min, max) {
    //             return Math.floor((Math.random() * (max - min + 1)) + min);
    //         }
            
    //         let productoAtlas = await Productos.getById(idProducto)


    //         const db = admin.firestore()
    //         const query = db.collection('carritos')
    //         const doc = query.doc(idCarrito)

    //         let idrand = random(1,10000)

    //         productoAtlas.idC = String(idrand)

    //         const item = await doc.update({
    //             productos: admin.firestore.FieldValue.arrayUnion(String(productoAtlas))
    //         })

    //     } catch (error){
    //         throw Error(error.message)
    //     }
    // }