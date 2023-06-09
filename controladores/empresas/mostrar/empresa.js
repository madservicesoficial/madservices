//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarEmpresadb } = require('../../../modelos/empresas/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    //-- Llamada a función.
    mostrarEmpresadb(id, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarEmpresa;
//#######################################################################################################//