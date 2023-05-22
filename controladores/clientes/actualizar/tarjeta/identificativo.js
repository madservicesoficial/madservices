//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { editarNumTarjetaBankdb } = require('../../../../modelos/clientes/actualizar/tarjeta/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const editarNumTarjetaBank = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const numtarjeta = req.body.numtarjeta;
    //-- Proceso de validación.
    if(numtarjeta) {
        //-- Llamada a función.
        editarNumTarjetaBankdb(id, numtarjeta, res);
    }else {
        //-- Mostrar alerta.
        alerta('No ha habido cambios en la tarjeta bancaria');
        //-- Redirigir.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = editarNumTarjetaBank;
//#######################################################################################################//    