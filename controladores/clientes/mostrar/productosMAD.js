//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarProductosMADclientesdb } = require('../../../modelos/clientes/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarProductosMADclientes = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    //-- Llamada a función.
    mostrarProductosMADclientesdb(id, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarProductosMADclientes;
//#######################################################################################################//