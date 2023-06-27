//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarInstagramEmpresadb } = require('../../../../modelos/empresas/actualizar/marketing/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarInstagramEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const instagram = req.body.urlInstagram;
    const maxInstagram = 498;
    //-- Proceso de validación.
    if(instagram) {
        if(instagram.length > maxInstagram) {
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: `El instagram no puede superar los ${maxInstagram} caracteres`,
                    icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                }
            );
            res.status(401);
            res.redirect(`/sesion-empresa/${id}/interfaz`);
            return res.end();
        }else {
            const estructuraInstagram = `https://www.instagram.com/${instagram}/`;
            //-- Llamada a función.
            actualizarInstagramEmpresadb(id, estructuraInstagram);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Actualizado!',
                    message: 'Nuevo instagram introducido',
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
                message: 'El instagram no ha cambiado',
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
module.exports = actualizarInstagramEmpresa;
//#######################################################################################################//