const {response} = require('express');
const {validationResult} = require('express-validator');

    const validarCampos = (req, res = response, next) => {
        
        const errors = validationResult( req );
       
        if( !errors.isEmpty() ){
            return res.status(400).json({
                ok: false,
                errors: errors.mapped()
            });
        }

     
        next();
    }
    
    const validarNombreNoAdmin = (req, res, next) => {
        const { name } = req.body;
      
        if (name === 'admin' ) {
          return res.status(400).json({
            errors: [{ msg: 'El nombre no puede ser "admin" o "Admin"' }]
          });
        }
      
        next();
      };

      const validarNombreAdmin = (req, res, next) => {
        const { name } = req.body;
      
        if (name !== 'admin') {
          return res.status(400).json({
            errors: [{ msg: 'El nombre debe ser "admin" o "Admin"' }]
          });
        }
      
        next();
      };
      const validarAdminRole = (req, res = response, next) => {
        if (!req.name || req.name !== 'admin') {
            return res.status(403).json({
                msg: 'Acceso denegado. Solo los administradores pueden realizar esta acción.'
            });
        }
    
        next();
    };
  
module.exports = {
    validarCampos,
    validarNombreAdmin,
    validarNombreNoAdmin,
    validarAdminRole,
  }
   