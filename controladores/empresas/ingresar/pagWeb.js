//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { ingresoPagWebEmpresadb } = require('../../../modelos/empresas/ingresar/ingresar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const ingresoPagWebEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const pagweb = req.body.urlPagWeb;
    //-- Llamada a función.
    ingresoPagWebEmpresadb(id, pagweb, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresoPagWebEmpresa;
//#######################################################################################################//