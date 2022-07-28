const LocalStrategy = require('passport-local').Strategy

const script = require('bcrypt')
const saltRounds = 10

const Usuario = require('../persistencia/daos/userDaos')
const Carrito = require('../persistencia/daos/carritoDaos')

const usuarioDB = new Usuario()
let userDB

const passportConfig = (passport) => {
    passport.use(
        'register',
      
        new LocalStrategy(
          { passReqToCallback: true },
          async (req, username, password, done ) => {
            const {nombre, edad, direccion, telefono, avatar} = req.body
            console.log('entro signup')
            
            //const usuarioDB = new Usuario()
            const carrito = new Carrito()
            try {
              
    
              script.hash(password, saltRounds, async function (err, hash) {
                const newCarrito = await carrito.newCarrito({productos: " "})
                const carro = newCarrito._id
                await usuarioDB.save({ mail: username, password: hash, nombre: nombre, edad: edad, direccion: direccion, telefono: telefono, avatar: avatar, idC: carro})
                
                mail(username, password, nombre, edad, direccion, telefono, avatar)
            });          
        
              done(null, { mail: username })
            } catch (error) {
              //loger
              return done(null, false, { message: 'Error al registrar el usuario' })
            }
          }
        )
      )
    
      passport.use(
        'login',
        new LocalStrategy(async (username, password, done) => { 
          let existe
          
          
          
          userDB = await usuarioDB.getByUser(username)
          
          script.compare(password, userDB?.password??'', function(err, result) {
            existe = result
            if (!existe) {  
              return done(null, false)
            } else {
              return done(null, existe)
            }
         });
          console.log('ACA USER' + userDB)
        })
      )
    
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((user, done) => {
        done(null, user)
    })
}

module.exports = passportConfig