//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarMiembrodb } = require('../../../../modelos/miembros/actualizar/interfaz/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const miembro = req.body.miembro;
    const maxLong = 149;
    //-- Proceso de validación.
    if(miembro) {
        if(miembro.length > maxLong) {
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: 'El nombre del miembro MAD no se ajusta al estándar MAD',
                    icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                }
            );
            res.status(401);
            res.redirect(`/sesion-miembro/${id}/interfaz`);
            return res.end();
        }else {
            //-- Llamada a función.
            actualizarMiembrodb(id, miembro);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Actualizado!',
                    message: `El nombre del miembro MAD ha cambiado a: ${miembro}`,
                    icon: path.join(__dirname, '../../../../public/images/correcto.png')
                }
            );
            res.status(201);
            res.redirect(`/sesion-miembro/${id}/interfaz`);
            return res.end();
        }
    }else {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Sin cambios!',
                message: 'El nombre del miembro MAD no ha cambiado',
                icon: path.join(__dirname, '../../../../public/images/NotModified.png')
            }
        );
        res.status(304);
        res.redirect(`/sesion-miembro/${id}/interfaz`);
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarMiembro;
//#######################################################################################################//