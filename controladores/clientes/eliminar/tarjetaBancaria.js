//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { borrarTarjetaBankdb } = require('../../../modelos/clientes/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const borrarTarjetaBank = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const borraCard = req.body.borraCard;
    //-- Proceso de validación.
    if(borraCard) {
        //-- Llamada a función.
        borrarTarjetaBankdb(id, res);
    }else {
        //-- Mostrar alerta.
        alerta('No ha habido cambios en la tarjeta bancaria');
        //-- Redirigir.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = borrarTarjetaBank;
//#######################################################################################################//    