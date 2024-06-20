/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarNombreAdmin, validarNombreNoAdmin } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, loginAdmin, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();



router.post(
    '/new', 
    [ 
        // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener al menos 10 caracteres, una letra mayúscula y un símbolo')
        .isLength({ min: 10 })
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])/),
        validarNombreNoAdmin,
        validarCampos
    ],
    crearUsuario 
);
     

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener al menos 10 caracteres, una letra mayúscula y un símbolo')
        .isLength({ min: 10 })
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])/),
        validarNombreNoAdmin,
        validarCampos
    ],
    loginUsuario 
     
        
);
router.post(
    '/admin',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener al menos 10 caracteres, una letra mayúscula y un símbolo')
        .isLength({ min: 10 })
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])/),
        validarNombreAdmin,
        validarCampos
    ],
    loginAdmin
);


router.get('/renew', validarJWT , revalidarToken );




module.exports = router;


