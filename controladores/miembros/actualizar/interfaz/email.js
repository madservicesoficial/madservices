//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarEmailVerificadodb } = require('../../../../modelos/miembros/actualizar/interfaz/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarEmail = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const email = req.body.email;
    //-- Llamada a función.
    actualizarEmailVerificadodb(id, email, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarEmail;
//#######################################################################################################//