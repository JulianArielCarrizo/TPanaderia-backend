const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerFavoritos, agregarFavorito, eliminarFavorito } = require('../controllers/productosFavoritos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Validar JWT para todas las rutas
router.use(validarJWT);

// Obtener todos los productos favoritos del usuario
router.get('/', obtenerFavoritos);

// Agregar un producto a la lista de favoritos
router.post(
    '/',
    [
        check('productoId', 'El ID del producto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    agregarFavorito
);

// Eliminar un producto de la lista de favoritos
router.delete('/borrarfavorito/:productoId', eliminarFavorito);

module.exports = router;