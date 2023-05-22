//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { editarValidezTarjetaBankdb } = require('../../../../modelos/clientes/actualizar/tarjeta/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const editarValidezTarjetaBank = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const validez = req.body.validez;
    //-- Proceso de validación.
    if(validez) {
        //-- Llamada a función.
        editarValidezTarjetaBankdb(id, validez, res);
    }else {
        //-- Mostrar alerta.
        alerta('No ha habido cambios en la tarjeta bancaria');
        //-- Redirigir.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = editarValidezTarjetaBank;
//#######################################################################################################//