//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarDescripcionEmpresadb } = require('../../../../modelos/empresas/actualizar/marketing/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarDescripcionEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const descripcion = req.body.descripCo;
    //-- Llamada a función.
    actualizarDescripcionEmpresadb(id, descripcion, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarDescripcionEmpresa;
//#######################################################################################################//