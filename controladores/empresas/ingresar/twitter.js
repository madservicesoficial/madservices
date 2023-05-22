//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { ingresoTwitterEmpresadb } = require('../../../modelos/empresas/ingresar/ingresar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const ingresoTwitterEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const twitter = req.body.urlTwitter;
    //-- Llamada a función.
    ingresoTwitterEmpresadb(id, twitter, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresoTwitterEmpresa;
//#######################################################################################################//