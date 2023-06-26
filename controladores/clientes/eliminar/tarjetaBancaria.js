//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultaTarjetaBankdb, borrarTarjetaBankdb } = require('../../../modelos/clientes/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const borrarTarjetaBank = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const borraCard = req.body.borraCard;
    //-- Proceso de validación.
    if(borraCard) {
        //-- Llamada a función.
        consultaTarjetaBankdb
        (
            id,
            (hayTarjeta) => {
                if(hayTarjeta === 0) {
                    //-- Renderizar y mostrar mensaje.
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Atención!',
                            message: 'No hay ninguna tarjeta bancaria en tu perfil',
                            icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                        }
                    );
                    codResp = 401;
                    res.status(codResp);
                    res.redirect(`/sesion-cliente/${id}/perfil`);
                    return res.end();
                }else {
                    //-- Llamada a función.
                    borrarTarjetaBankdb(id);
                    //-- Renderizar y mostrar mensaje.
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Eliminación exitosa!',
                            message: 'Tarjeta bancaria borrada de tu perfil',
                            icon: path.join(__dirname, '../../../public/images/correcto.png')
                        }
                    );
                    codResp = 201;
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
                message: 'No ha habido cambios en la tarjeta bancaria',
                icon: path.join(__dirname, '../../../public/images/NotModified.png')
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
module.exports = borrarTarjetaBank;
//#######################################################################################################//    