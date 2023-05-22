//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { iniciarSesionClienteVerificadodb } = require('../../../modelos/clientes/entrada/entrada.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const iniciarSesionClientes = (req, res) => {

    //-- Variables y Ctes.
    const email = req.body.email;
    const password = req.body.password;
    //-- Proceso de validación.
    if(!email || !password) {
        //-- Renderizar y mostrar mensaje.
        res.status(401).render('paginas/clientes/login', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        //-- Llamada a función.
        iniciarSesionClienteVerificadodb(email, password, req, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = iniciarSesionClientes;
//#######################################################################################################//