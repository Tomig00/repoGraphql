const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const {Server: HttpServer} = require('http')
const Handlebars = require('handlebars')
const hbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const mail = require('./mails/mail')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportConfig = require('./config/passportConfig')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const Usuario = require('./persistencia/daos/userDaos')
const Carrito = require('./persistencia/daos/carritoDaos')
const {productos} = require('./apiProd')
// const script = require('bcrypt')
// const saltRounds = 10
const {MONGO_URL, SESSION_SECRET} = require('./config/config')

//GraphQL
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')
const crypto = require('crypto')

const apiProd = require('./negocio/apiProd')
const api= new apiProd()

const schemaProd = buildSchema(`
  type Producto {
    name: String,
    description: String,
    price: String,
    thumnail: String,
    stock: String,
    idP: String,
  }

  input ProductoInput {
    name: String,
    description: String,
    price: String,
    thumnail: String,
    stock: String,
    idP: String,
  }

  type Query {
    getProductos: [Producto],
  }

  type Mutation {
    addProducto(producto: ProductoInput): Producto,
    updateProducto(idP:String, producto: ProductoInput): Producto,
    deleteProducto(idP: String): Producto,
  }
`)

class Producto {
  constructor({name, description, price, thumnail, stock, idP}) {
    this.name = name
    this.description = description
    this.price = price
    this.thumnail = thumnail
    this.stock = stock
    this.idP = idP
  }
}

async function getProductos() {
  const productos = await api.getAll()
  return productos
}

async function addProducto({producto}) {
  const nuevoProd = new Producto(producto)
  const prod = JSON.parse(JSON.stringify(nuevoProd))
  //console.log(prod)
  const prodP = await api.save(prod)
  return prodP
}

async function updateProducto(idP) {
  const id = idP
  const Prod = id.producto
  const nuevoProd = new Producto(Prod)
  const prod = JSON.parse(JSON.stringify(nuevoProd))
  console.log(prod)
  
  const prodP = await api.changeById(id.idP, prod)
  return prodP
}

async function deleteProducto(idP) {
  const prod = idP
  console.log(prod.idP)
  const prodP = await api.deleteById(prod.idP)
  return prodP
}

const app = express()
app.use('/graphql', graphqlHTTP(
  {
    schema: schemaProd,
    rootValue: {
      getProductos,
      addProducto,
      updateProducto,
      deleteProducto,
    },
    graphiql: true,
  }
))

app.use(express.static('public'))
// const routerProductos = require('./routers/productos')
// const routerCarrito = require('./routers/carrito')
// const { json } = require('express')
//const apiProd = require('./negocio/apiProd')
//const routerAdmin = require('./routers/admin')


const httpServer = new HttpServer(app)
const advancedOptions = { useNewUrlParser: true, useUniFiedTopology: true }



/* Server Listen */
const PORT = process.env.PORT || 8081
const server = httpServer.listen(PORT , () => console.log(`servidor Levantado ${PORT}`))
server.on('error', (error) => console.log(`Error en servidor ${error}`))











//passport.use(
  //     'register',
    
  //     new LocalStrategy(
  //       { passReqToCallback: true },
  //       async (req, username, password, done ) => {
  //         const {nombre, edad, direccion, telefono, avatar} = req.body
  //         console.log('entro signup')
          
  //         //const usuarioDB = new Usuario()
  //         const carrito = new Carrito()
  //         try {
            
  
  //           script.hash(password, saltRounds, async function (err, hash) {
  //             const newCarrito = await carrito.newCarrito({productos: " "})
  //             const carro = newCarrito._id
  //             await usuarioDB.save({ mail: username, password: hash, nombre: nombre, edad: edad, direccion: direccion, telefono: telefono, avatar: avatar, idC: carro})
              
  //             mail(username, password, nombre, edad, direccion, telefono, avatar)
  //         });          
      
  //           done(null, { mail: username })
  //         } catch (error) {
  //           //loger
  //           return done(null, false, { message: 'Error al registrar el usuario' })
  //         }
  //       }
  //     )
  //   )
  
  //   passport.use(
  //     'login',
  //     new LocalStrategy(async (username, password, done) => { 
  //       let existe
        
        
        
  //       userDB = await usuarioDB.getByUser(username)
        
  //       script.compare(password, userDB?.password??'', function(err, result) {
  //         existe = result
  //         if (!existe) {  
  //           return done(null, false)
  //         } else {
  //           return done(null, existe)
  //         }
  //      });
  //       console.log('ACA USER' + userDB)
  //     })
  //   )
  
  // passport.serializeUser((user, done) => {
  //     done(null, user)
  // })
  // passport.deserializeUser((user, done) => {
  //     done(null, user)
  // })