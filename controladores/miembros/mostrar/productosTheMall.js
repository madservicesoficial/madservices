//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarProductosTheMallMiembroMADdb } = require('../../../modelos/miembros/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarProductosTheMallMiembroMAD = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    //-- Llamada a función.
    mostrarProductosTheMallMiembroMADdb(id, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarProductosTheMallMiembroMAD;
//#######################################################################################################//