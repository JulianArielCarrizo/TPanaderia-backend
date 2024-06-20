// controllers/productosFavoritos.js
const ProductosFavoritos = require('../models/ProductosFavoritos');

// Obtener la lista de productos favoritos de un usuario
const obtenerFavoritos = async (req, res) => {
    const userId = req.uid;

    try {
        const favoritos = await ProductosFavoritos.findOne({ user: userId }).populate('productos');

        if (!favoritos) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron productos favoritos'
            });
        }

        res.json({
            ok: true,
            productos: favoritos.productos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

// Agregar un producto a la lista de favoritos
const agregarFavorito = async (req, res) => {
    const userId = req.uid;
    const { productoId } = req.body;

    try {
        let favoritos = await ProductosFavoritos.findOne({ user: userId });

        if (!favoritos) {
            favoritos = new ProductosFavoritos({ user: userId, productos: [productoId] });
        } else {
            if (favoritos.productos.includes(productoId)) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El producto ya está en la lista de favoritos'
                });
            }
            favoritos.productos.push(productoId);
        }

        await favoritos.save();

        res.json({
            ok: true,
            productos: favoritos.productos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

// Eliminar un producto de la lista de favoritos
const eliminarFavorito = async (req, res) => {
    const userId = req.uid;
    const { productoId } = req.params;

    try {
        const favoritos = await ProductosFavoritos.findOne({ user: userId });

        if (!favoritos) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron productos favoritos'
            });
        }

        favoritos.productos = favoritos.productos.filter(prodId => prodId.toString() !== productoId);

        await favoritos.save();

        res.json({
            ok: true,
            productos: favoritos.productos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    obtenerFavoritos,
    agregarFavorito,
    eliminarFavorito
};