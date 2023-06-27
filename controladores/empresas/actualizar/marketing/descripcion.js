//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarDescripcionEmpresadb } = require('../../../../modelos/empresas/actualizar/marketing/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarDescripcionEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const descripcion = req.body.descripCo;
    const maxDescrip = 498;
    //-- Proceso de validación.
    if(descripcion) {
        if(descripcion.length > maxDescrip) {
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: `La descripción no puede superar los ${maxDescrip} caracteres`,
                    icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                }
            );
            res.status(401);
            res.redirect(`/sesion-empresa/${id}/interfaz`);
            return res.end();
        }else {
            //-- Llamada a función.
            actualizarDescripcionEmpresadb(id, descripcion);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Actualizado!',
                    message: 'Nueva descripción introducida',
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
                message: 'La descripción no ha cambiado',
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
module.exports = actualizarDescripcionEmpresa;
//#######################################################################################################//