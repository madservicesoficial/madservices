//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { ingresoInstagramEmpresadb } = require('../../../modelos/empresas/ingresar/ingresar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const ingresoInstagramEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const instagram = req.body.urlInstagram;
    //-- Llamada a función.
    ingresoInstagramEmpresadb(id, instagram, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresoInstagramEmpresa;
//#######################################################################################################//