//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarInstagramEmpresadb } = require('../../../../modelos/empresas/actualizar/marketing/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarInstagramEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const instagram = req.body.urlInstagram;
    //-- Llamada a función.
    actualizarInstagramEmpresadb(id, instagram, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarInstagramEmpresa;
//#######################################################################################################//