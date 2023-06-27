//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarTipodb } = require('../../../../modelos/empresas/actualizar/interfaz/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarTipo = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const tipo = req.body.tipo;
    //-- Proceso de validación.
    if(tipo) {
        //-- Llamada a función.
        actualizarTipodb(id, tipo);
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Actualizado!',
                message: `El tipo de empresa ha cambiado a: ${tipo}`,
                icon: path.join(__dirname, '../../../../public/images/correcto.png')
            }
        );
        res.status(201);
        res.redirect(`/sesion-empresa/${id}/interfaz`);
        return res.end();
    }else {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Sin cambios!',
                message: 'El tipo de empresa no ha cambiado',
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
module.exports = actualizarTipo;
//#######################################################################################################//