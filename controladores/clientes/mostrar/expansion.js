//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarExpansionClientesdb } = require('../../../modelos/clientes/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarExpansionClientes = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    //-- Llamada a función.
    mostrarExpansionClientesdb(id, enumeracion, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarExpansionClientes;
//#######################################################################################################//