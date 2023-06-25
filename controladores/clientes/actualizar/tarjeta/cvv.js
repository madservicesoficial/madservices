//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { editarCVVTarjetaBankdb } = require('../../../../modelos/clientes/actualizar/tarjeta/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const editarCVVTarjetaBank = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const cvv = req.body.cvv;
    let existenciaTarjBank = 0;
    //-- Proceso de validación.
    if(cvv) {
        //-- Llamada a función.
        editarCVVTarjetaBankdb
        (
            id, cvv, existenciaTarjBank,
        );
    }else {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Sin cambios!',
                message: 'Código CVV de la tarjeta bancaria no actualizado',
                icon: path.join(__dirname, '../../../../public/images/NotModified.png')
            }
        );
        codResp = 304;
        res.status(codResp);
        res.redirect(`/sesion-cliente/${id}/perfil`);
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = editarCVVTarjetaBank;
//#######################################################################################################//