//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { darseBajaEmpresadb } = require('../../../modelos/empresas/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const darseBajaEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const confirmarOpcion = req.body.confirmarOpcion;
    //-- Llamada a función.
    darseBajaEmpresadb(id, confirmarOpcion, req, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = darseBajaEmpresa;
//#######################################################################################################//