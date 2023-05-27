//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarExpansionMultimarcadb } = require('../../../modelos/general/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarExpansionMultimarca = (req, res) => {

    //-- Variables y Ctes.
    let marca = req.params.marca
    //-- Llamada a función.
    mostrarExpansionMultimarcadb(marca, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarExpansionMultimarca;
//#######################################################################################################//