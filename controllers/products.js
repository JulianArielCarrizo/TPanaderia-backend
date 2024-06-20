const Producto = require('../models/product');

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json({
            ok: true,
            productos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
//
const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        res.json({
            ok: true,
            producto
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor al obtener el producto'
        });
    }
};

// Crear un nuevo producto
const crearProducto = async (req, res) => {
    const producto = new Producto(req.body);

    try {
        const productoGuardado = await producto.save();
        res.json({
            ok: true,
            producto: productoGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
    const productoId = req.params.id;

    try {
        const producto = await Producto.findById(productoId);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado por id'
            });
        }

        const nuevoProducto = {
            ...req.body
        }

        const productoActualizado = await Producto.findByIdAndUpdate(productoId, nuevoProducto, { new: true });

        res.json({
            ok: true,
            producto: productoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
    const productoId = req.params.id;

    try {
        const producto = await Producto.findById(productoId);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado por id'
            });
        }

        await Producto.findByIdAndDelete(productoId);

        res.json({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};