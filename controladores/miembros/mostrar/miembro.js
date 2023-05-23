//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarMiembrodb } = require('../../../modelos/miembros/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    //-- Llamada a función.
    mostrarMiembrodb(id, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarMiembro;
//#######################################################################################################//