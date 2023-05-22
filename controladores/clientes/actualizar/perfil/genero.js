//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarGeneroVerificadodb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarGeneroCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const genero = req.body.genero;
    //-- Llamada a función.
    actualizarGeneroVerificadodb(id, genero, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarGeneroCliente;
//#######################################################################################################//