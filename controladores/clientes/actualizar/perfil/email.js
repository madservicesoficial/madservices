//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarEmailVerificadodb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarEmailCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const email = req.body.email;
    //-- Llamada a función.
    actualizarEmailVerificadodb(id, email, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarEmailCliente;
//#######################################################################################################//