//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { borrarWhatsAppEmpresadb } = require('../../../modelos/empresas/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const borrarWhatsAppEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    //-- Llamada a función.
    borrarWhatsAppEmpresadb(id, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = borrarWhatsAppEmpresa;
//#######################################################################################################//