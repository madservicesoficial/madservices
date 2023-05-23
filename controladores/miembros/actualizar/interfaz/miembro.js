//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarMiembroVerificadodb } = require('../../../../modelos/miembros/actualizar/interfaz/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const miembro = req.body.miembro;
    //-- Llamada a función.
    actualizarMiembroVerificadodb(id, miembro, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarMiembro;
//#######################################################################################################//