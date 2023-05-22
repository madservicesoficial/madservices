//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { editarNombreTarjetaBankdb } = require('../../../../modelos/clientes/actualizar/tarjeta/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const editarNombreTarjetaBank = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const namecard = req.body.namecard;
    //-- Proceso de validación.
    if(namecard) {
        //-- Llamada a función.
        editarNombreTarjetaBankdb(id, namecard, res);
    }else {
        //-- Mostrar alerta.
        alerta('No ha habido cambios en la tarjeta bancaria');
        //-- Redirigir.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = editarNombreTarjetaBank;
//#######################################################################################################//