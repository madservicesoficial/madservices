//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { ingresoWhatsAppEmpresadb } = require('../../../modelos/empresas/ingresar/ingresar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const ingresoWhatsAppEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const whatsapp = req.body.whatsapp;
    //-- Llamada a función.
    ingresoWhatsAppEmpresadb(id, whatsapp, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresoWhatsAppEmpresa;
//#######################################################################################################//