//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { editarCVVTarjetaBankdb } = require('../../../../modelos/clientes/actualizar/tarjeta/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const editarCVVTarjetaBank = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const cvv = req.body.cvv;
    //-- Proceso de validación.
    if(cvv) {
        //-- Llamada a función.
        editarCVVTarjetaBankdb(id, cvv, res);
    }else {
        //-- Mostrar alerta.
        alerta('No ha habido cambios en la tarjeta bancaria');
        //-- Redirigir.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = editarCVVTarjetaBank;
//#######################################################################################################//