//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarWhatsAppEmpresadb } = require('../../../../modelos/empresas/actualizar/marketing/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarWhatsAppEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const whatsapp = req.body.whatsapp;
    //-- Llamada a función.
    actualizarWhatsAppEmpresadb(id, whatsapp, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarWhatsAppEmpresa;
//#######################################################################################################//