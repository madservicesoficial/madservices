//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarWhatsAppEmpresadb } = require('../../../../modelos/empresas/actualizar/marketing/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarWhatsAppEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const whatsapp = req.body.whatsapp;
    const maxBigInt = 17;
    //-- Proceso de validación.
    if(whatsapp) {
        if(whatsapp.length > maxBigInt) {
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: `El whatsapp no puede tener más de ${maxBigInt} números`,
                    icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                }
            );
            res.status(401);
            res.redirect(`/sesion-empresa/${id}/interfaz`);
            return res.end();
        }else {
            //-- Llamada a función.
            actualizarWhatsAppEmpresadb(id, whatsapp);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Actualizado!',
                    message: 'Nuevo número de teléfono/whatsapp introducido',
                    icon: path.join(__dirname, '../../../../public/images/correcto.png')
                }
            );
            res.status(201);
            res.redirect(`/sesion-empresa/${id}/interfaz`);
            return res.end();
        }
    }else {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Sin cambios!',
                message: 'El whatsapp no ha cambiado',
                icon: path.join(__dirname, '../../../../public/images/NotModified.png')
            }
        );
        res.status(304);
        res.redirect(`/sesion-empresa/${id}/interfaz`);
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarWhatsAppEmpresa;
//#######################################################################################################//