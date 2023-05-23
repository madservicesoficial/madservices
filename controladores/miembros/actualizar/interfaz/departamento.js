//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarDepartamentoVerificadodb } = require('../../../../modelos/miembros/actualizar/interfaz/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarDepartamento = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const departamento = req.body.departamento;
    //-- Llamada a función.
    actualizarDepartamentoVerificadodb(id, departamento, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarDepartamento;
//#######################################################################################################//