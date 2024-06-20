const { Schema, model } = require('mongoose');

const ProductosFavoritosSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    productos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Productos',
            required: true
        }
    ]
});

module.exports = model('ProductosFavoritos', ProductosFavoritosSchema);