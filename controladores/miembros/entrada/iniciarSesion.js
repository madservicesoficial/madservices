//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { iniciarSesionMiembroVerificadodb } = require('../../../modelos/miembros/entrada/entrada.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const iniciarSesionMiembros = (req, res) => {

    //-- Variables y Ctes.
    const email = req.body.email; 
    const password = req.body.password;
    //-- Proceso de validación.
    if(!email || !password) {
        //-- Renderizar y mostrar mensaje.
        res.status(401).render('paginas/miembros/login', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        //-- Llamada a función.
        iniciarSesionMiembroVerificadodb(email, password, req, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = iniciarSesionMiembros;
//#######################################################################################################//