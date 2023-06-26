//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultarTarjetaBankdb, editarValidezTarjetaBankdb } = require('../../../../modelos/clientes/actualizar/tarjeta/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const editarValidezTarjetaBank = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const validez = req.body.validez;
    let existenciaTarjBank = 0;
    let codResp = 1;
    //-- Proceso de validación.
    if(validez) {
        //-- Llamada a función.
        consultarTarjetaBankdb
        (
            id, existenciaTarjBank,
            (existenciaTarjBank) => {
                if(existenciaTarjBank === 1) {
                    const newExpiracion = validez + '-01';
                    //-- Llamada a función.
                    editarValidezTarjetaBankdb(id, newExpiracion);
                    //-- Renderizar y mostrar mensaje.
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Actualizado!',
                            message: 'La fecha de expiración de la tarjeta bancaria ha sido actualizada',
                            icon: path.join(__dirname, '../../../../public/images/correcto.png')
                        }
                    );
                    codResp = 201;
                    res.status(codResp);
                    res.redirect(`/sesion-cliente/${id}/perfil`);
                    return res.end();
                }else {
                    //-- Renderizar y mostrar mensaje.
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Atención!',
                            message: 'No hay tarjeta bancaria a actualizar',
                            icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                        }
                    );
                    codResp = 401;
                    res.status(codResp);
                    res.redirect(`/sesion-cliente/${id}/perfil`);
                    return res.end();
                }
            }
        );
    }else {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Sin cambios!',
                message: 'La fecha de expiración de la tarjeta bancaria no ha sido actualizada',
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
module.exports = editarValidezTarjetaBank;
//#######################################################################################################//