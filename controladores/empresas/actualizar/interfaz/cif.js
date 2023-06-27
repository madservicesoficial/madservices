//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para validar el CIF/NIF introducido.
const cifvalidacion = require('nif-dni-nie-cif-validation');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarCIFdb } = require('../../../../modelos/empresas/actualizar/interfaz/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarCIF = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const nif = req.body.nif;
    //-- Proceso de validación.
    if(nif) {
        if(!cifvalidacion.isValidCif(nif) || !cifvalidacion.isValidNif(nif)) {
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: `El NIF/CIF ${nif} no es válido`,
                    icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                }
            );
            res.status(401);
            res.redirect(`/sesion-empresa/${id}/interfaz`);
            return res.end();
        }else {
            //-- Llamada a función.
            actualizarCIFdb(id, nif);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Actualizado!',
                    message: `El NIF/CIF de la empresa ha cambiado a: ${nif}`,
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
                message: 'El NIF/CIF de la empresa no ha cambiado',
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
module.exports = actualizarCIF;
//#######################################################################################################//