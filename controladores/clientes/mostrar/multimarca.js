//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarExpansionMultimarcaClientesdb } = require('../../../modelos/clientes/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarExpansionMultimarcaClientes = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let marca = req.params.marca
    //-- Llamada a función.
    mostrarExpansionMultimarcaClientesdb(id, marca, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarExpansionMultimarcaClientes;
//#######################################################################################################//