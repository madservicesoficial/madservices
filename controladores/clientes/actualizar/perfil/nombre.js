//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarNombreVerificadodb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarNombre = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const nombre = req.body.nombre;
    //-- Llamada a función.
    actualizarNombreVerificadodb(id, nombre, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarNombre;
//#######################################################################################################//