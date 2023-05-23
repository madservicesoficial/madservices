//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarGeneroVerificadodb } = require('../../../../modelos/miembros/actualizar/interfaz/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarGenero = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const genero = req.body.genero;
    //-- Llamada a función.
    actualizarGeneroVerificadodb(id, genero, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarGenero;
//#######################################################################################################//