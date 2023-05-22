//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarMarcaVerificadadb } = require('../../../../modelos/empresas/actualizar/interfaz/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarMarca = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const marca = req.body.marca;
    //-- Llamada a función.
    actualizarMarcaVerificadadb(id, marca, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarMarca;
//#######################################################################################################//