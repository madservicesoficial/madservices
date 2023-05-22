//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarApellidosVerificadosdb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarApellidos = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const apellidos = req.body.apellidos;
    //-- Llamada a función.
    actualizarApellidosVerificadosdb(id, apellidos, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarApellidos;
//#######################################################################################################//