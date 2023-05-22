//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarPasswordVerificadadb } = require('../../../../modelos/empresas/actualizar/interfaz/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarPasswordEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    //-- Llamada a función.
    actualizarPasswordVerificadadb(id, oldpassword, newpassword, repitePassword, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarPasswordEmpresa;
//#######################################################################################################//