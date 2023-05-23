//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarProductosTheMallEmpresadb } = require('../../../modelos/empresas/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarProductosTheMallEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    //-- Llamada a función.
    mostrarProductosTheMallEmpresadb(id, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarProductosTheMallEmpresa;
//#######################################################################################################//