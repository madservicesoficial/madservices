//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarPagWebEmpresadb } = require('../../../../modelos/empresas/actualizar/marketing/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarPagWebEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const pagweb = req.body.urlPagWeb;
    //-- Llamada a función.
    actualizarPagWebEmpresadb(id, pagweb, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarPagWebEmpresa;
//#######################################################################################################//