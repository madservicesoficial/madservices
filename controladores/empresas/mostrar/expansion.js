//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarExpansionMultimarcaEmpresasdb } = require('../../../modelos/empresas/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarExpansionMultimarcaEmpresas = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let marca = req.params.marca
    //-- Llamada a función.
    mostrarExpansionMultimarcaEmpresasdb(id, marca, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarExpansionMultimarcaEmpresas;
//#######################################################################################################//