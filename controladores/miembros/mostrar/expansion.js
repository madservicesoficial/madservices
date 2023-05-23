//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarExpansionMiembrosdb } = require('../../../modelos/miembros/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarExpansionMiembros = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    //-- Llamada a función.
    mostrarExpansionMiembrosdb(id, enumeracion, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarExpansionMiembros;
//#######################################################################################################//