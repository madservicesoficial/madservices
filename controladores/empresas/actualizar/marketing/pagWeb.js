//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarPagWebEmpresadb } = require('../../../../modelos/empresas/actualizar/marketing/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarPagWebEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const pagweb = req.body.urlPagWeb;
    const maxPagweb = 498;
    //-- Proceso de validación.
    if(pagweb) {
        if(pagweb.length > maxPagweb) {
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: `La URL de la Página Web no puede superar los ${maxPagweb} caracteres`,
                    icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                }
            );
            res.status(401);
            res.redirect(`/sesion-empresa/${id}/interfaz`);
            return res.end();
        }else {
            //-- Llamada a función.
            actualizarPagWebEmpresadb(id, pagweb);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Actualizado!',
                    message: 'Nueva Página Web introducida',
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
                message: 'La Página Web no ha cambiado',
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
module.exports = actualizarPagWebEmpresa;
//#######################################################################################################//