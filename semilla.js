require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { dbConnection } = require('./database/config'); // Asegúrate de tener esta conexión configurada
const Usuario = require('./models/Usuario');
const Productos = require('./models/product');

const adminData = require('./admin-user.json');
const productData = require('./productos.json');

const iniciar = async () => {
    try {
        await dbConnection(process.env.DB_CNN); // URL de conexión de entorno

        // Validar que adminData tiene todos los campos necesarios
        if (!adminData.name || !adminData.email || !adminData.password ) {
            throw new Error('Faltan datos en admin-user.json');
        }

        // Encriptar la contraseña del admin
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(adminData.password, salt);

        // Insertar el usuario admin en la colección Usuario
        const adminUser = new Usuario({
            name: adminData.name,
            email: adminData.email,
            password: hashedPassword,
            });
        await adminUser.save();
        console.log('Usuario admin creado');

        // Insertar los productos en la colección Productos
        await Productos.create(productData);
        console.log('Productos creados');

    } catch (error) {
        console.log(error);
    } finally {
        mongoose.connection.close();
    }
}

iniciar();