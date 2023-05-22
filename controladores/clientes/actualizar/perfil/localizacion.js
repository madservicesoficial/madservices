//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarLocalizacionVerificadadb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarLocalizacion = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const pais = req.body.pais;
    const cp = req.body.cp;
    const region = req.body.region;
    const poblacion = req.body.poblacion;
    const direccion = req.body.direccion;
    //-- Llamada a función.
    actualizarLocalizacionVerificadadb(id, pais, cp, region, poblacion, direccion, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarLocalizacion;
//#######################################################################################################//