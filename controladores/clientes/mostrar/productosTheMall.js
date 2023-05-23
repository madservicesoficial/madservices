//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarProductosTheMallClientedb } = require('../../../modelos/clientes/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarProductosTheMallCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    //-- Llamada a función.
    mostrarProductosTheMallClientedb(id, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarProductosTheMallCliente;
//#######################################################################################################//