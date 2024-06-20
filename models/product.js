const mongoose = require('mongoose');

const ProductosEsquema = new mongoose.Schema({
    
    nombre_producto: {
        type: String,
        require: true},
    cantidad_stock: {
        type: Number,
         require:true
    },
    descripcion_corta: {
        type: String,
        require:true
    },
    precio: {
        type: Number,
         require:true
    },
    descripcion_larga: {
        type: String,
        require:true
    },  
    imagen: {
        type:String,
        require:true,
}
});

module.exports = mongoose.model('Productos',ProductosEsquema);
