//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarTwitterEmpresadb } = require('../../../../modelos/empresas/actualizar/marketing/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarTwitterEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const twitter = req.body.urlTwitter;
    //-- Llamada a función.
    actualizarTwitterEmpresadb(id, twitter, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarTwitterEmpresa;
//#######################################################################################################//