//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarExpansionMultimarcaMiembrosdb } = require('../../../modelos/miembros/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarExpansionMultimarcaMiembros = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let marca = req.params.marca
    //-- Llamada a función.
    mostrarExpansionMultimarcaMiembrosdb(id, marca, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarExpansionMultimarcaMiembros;
//#######################################################################################################//