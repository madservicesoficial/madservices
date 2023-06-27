//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para validar datos enviados por el cliente.
const validacion = require("validator");
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarPassworddb, consultaOldPassworddb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarPasswordCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    const minLong = 10;
    const maxLong = 96;
    //-- Proceso de validación.
    if(oldpassword && newpassword && repitePassword) {
        //-- Llamada a función.
        consultaOldPassworddb
        (
            id, oldpassword,
            (validezOldPassword) => {
                if(validezOldPassword === false) {
                    //-- Renderizar y mostrar mensaje.
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Atención!',
                            message: 'No conoces la contraseña anterior',
                            icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                        }
                    );
                    res.status(401);
                    res.redirect(`/sesion-cliente/${id}/perfil`);
                    return res.end();
                }else {
                    if(newpassword === repitePassword) {
                        if(validacion.isLength(newpassword, { min: minLong, max: maxLong}) && 
                        validacion.matches(newpassword, /[a-z]/) && validacion.matches(newpassword, /[A-Z]/) &&
                        validacion.matches(newpassword, /[0-9]/) &&
                        validacion.matches(newpassword, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                            //-- Llamada a función.
                            actualizarPassworddb(id, newpassword);
                            //-- Renderizar y mostrar mensaje.
                            notifier.notify(
                                {
                                    sound: true,
                                    wait: true,
                                    title: '¡Actualizado!',
                                    message: 'La contraseña se ha actualizado',
                                    icon: path.join(__dirname, '../../../../public/images/correcto.png')
                                }
                            );
                            res.status(201);
                            res.redirect(`/sesion-cliente/${id}/perfil`);
                            return res.end();
                        }else {
                            //-- Renderizar y mostrar mensaje.
                            notifier.notify(
                                {
                                    sound: true,
                                    wait: true,
                                    title: '¡Atención!',
                                    message: `La nueva contraseña debe tener como mínimo ${minLong} caracteres, mayúsculas, minúsculas, números y caracteres especiales`,
                                    icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                                }
                            );
                            res.status(401);
                            res.redirect(`/sesion-cliente/${id}/perfil`);
                            return res.end();
                        }
                    }else {
                        //-- Renderizar y mostrar mensaje.
                        notifier.notify(
                            {
                                sound: true,
                                wait: true,
                                title: '¡Atención!',
                                message: 'La nueva contraseña debe coincidir con su repetición',
                                icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                            }
                        );
                        res.status(401);
                        res.redirect(`/sesion-cliente/${id}/perfil`);
                        return res.end();
                    }
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
                message: 'Contraseña no actualizada',
                icon: path.join(__dirname, '../../../../public/images/NotModified.png')
            }
        );
        res.status(304);
        res.redirect(`/sesion-cliente/${id}/perfil`);
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarPasswordCliente;
//#######################################################################################################//