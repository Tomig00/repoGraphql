const mongoose = require('mongoose')

const esquemaProducto = new mongoose.Schema({
    //_id: {type: String},
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: String, require: true},
    thumnail: {type: String, require: true},
    stock: {type: String, require: true},
    idP: {type: String, require: true},
    //idC: {type: Number, require: false},
    //time: {type: String, require: false}
})

module.exports = mongoose.model('productos', esquemaProducto)