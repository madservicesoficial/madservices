//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { ingresoDescripcionEmpresadb } = require('../../../modelos/empresas/ingresar/ingresar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const ingresoDescripcionEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const descripcion = req.body.descripCo;
    //-- Llamada a función.
    ingresoDescripcionEmpresadb(id, descripcion, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresoDescripcionEmpresa;
//#######################################################################################################//