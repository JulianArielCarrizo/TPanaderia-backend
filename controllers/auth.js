const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
 
const crearUsuario = async (req, res = response) => {
    const { email, password, name } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        // Crear un nuevo usuario con userType preestablecido como 'user'
        usuario = new Usuario({
            email,
            password,
            name,
            
        });

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar el nuevo usuario en la base de datos
        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        });
           

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const loginUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
            


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}
const loginAdmin = async (req, res) => {
    const { name, password } = req.body;

    try {
        // Buscar el usuario en la base de datos por su nombre
        const usuario = await Usuario.findOne({ name });

        // Verificar si el usuario no existe
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese Nombre'
            });
        }

        // Confirmar que la contraseña proporcionada sea válida
        const validPassword = bcrypt.compareSync(password, usuario.password);

        // Verificar si la contraseña es incorrecta
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar un token JWT para el usuario
        const token = await generarJWT(usuario.id, usuario.name);

        // Enviar una respuesta exitosa con el token y la información del usuario
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
           
    } catch (error) {
        // Capturar errores de cualquier excepción y devolver una respuesta de error
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};


const revalidarToken = async (req, res = response ) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT( uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
        
}




module.exports = {
    crearUsuario,
    loginUsuario,
    loginAdmin,
    revalidarToken
}