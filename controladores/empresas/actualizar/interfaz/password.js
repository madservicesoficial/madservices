//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para validar datos enviados por la Empresa.
const validacion = require("validator");
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { comprobarOldPassworddb, actualizarPassworddb } = require('../../../../modelos/empresas/actualizar/interfaz/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarPasswordEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    const minLong = 10;
    const maxLong = 96;
    //-- Proceso de validación.
    if(oldpassword && newpassword && repitePassword) {
        //-- Llamada a la función.
        comprobarOldPassworddb
        (
            id, oldpassword,
            (match) => {
                if(match) {
                    if(newpassword === repitePassword) {
                        if(validacion.isLength(newpassword, { min: minLong, max: maxLong}) && validacion.matches(newpassword, /[a-z]/)
                        && validacion.matches(newpassword, /[A-Z]/) && validacion.matches(newpassword, /[0-9]/) &&
                        validacion.matches(newpassword, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                            //-- Llamada a la función.
                            actualizarPassworddb(id, newpassword);
                            //-- Renderizar y mostrar mensaje.
                            notifier.notify(
                                {
                                    sound: true,
                                    wait: true,
                                    title: '¡Actualizado!',
                                    message: 'Nueva contraseña agregada',
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
                                    title: '¡Atención!',
                                    message: `La contraseña debe contener como mínimo ${minLong} caracteres, mayúsculas, minúsculas, números y caracteres especiales`,
                                    icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                                }
                            );
                            res.status(401);
                            res.redirect(`/sesion-empresa/${id}/interfaz`);
                            return res.end();
                        }
                    }else {
                        //-- Renderizar y mostrar mensaje.
                        notifier.notify(
                            {
                                sound: true,
                                wait: true,
                                title: '¡Atención!',
                                message: 'Has puesto mal la nueva contraseña',
                                icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                            }
                        );
                        res.status(401);
                        res.redirect(`/sesion-empresa/${id}/interfaz`);
                        return res.end();
                    }
                }else {
                    //-- Renderizar y mostrar mensaje.
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Atención!',
                            message: 'Veo que no conoces la contraseña de tu sesión',
                            icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                        }
                    );
                    res.status(401);
                    res.redirect(`/sesion-empresa/${id}/interfaz`);
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
                message: 'Requisito para actualizar la contraseña: Completar los tres campos',
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
module.exports = actualizarPasswordEmpresa;
//#######################################################################################################//