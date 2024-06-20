const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto, obtenerProductoPorId } = require('../controllers/products');
const { validarCampos, validarAdminRole } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// Obtener todos los productos
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);

// Crear un nuevo producto
router.post(
    '/crearproducto',
    [
        check('nombre_producto', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('cantidad_stock', 'La cantidad en stock es obligatoria').isNumeric(),
        check('descripcion_corta', 'La descripción corta es obligatoria').not().isEmpty(),
        check('precio', 'El precio es obligatorio').isNumeric(),
        check('descripcion_larga', 'La descripción larga es obligatoria').not().isEmpty(),
        check('imagen', 'La imagen es obligatoria').not().isEmpty(),
        validarJWT,
        validarAdminRole,
        validarCampos,

    ],
    crearProducto
        
);

// Actualizar un producto
router.put(
    '/actualizarproducto/:id',
    [   
        check('nombre_producto', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('cantidad_stock', 'La cantidad en stock es obligatoria').isNumeric(),
        check('descripcion_corta', 'La descripción corta es obligatoria').not().isEmpty(),
        check('precio', 'El precio es obligatorio').isNumeric(),
        check('descripcion_larga', 'La descripción larga es obligatoria').not().isEmpty(),
        check('imagen', 'La imagen es obligatoria').not().isEmpty(),
        validarJWT,
        validarAdminRole,
        validarCampos
    ],
    actualizarProducto
      
);

// Eliminar un producto
router.delete('/borrarproducto/:id', eliminarProducto);

module.exports = router;
   