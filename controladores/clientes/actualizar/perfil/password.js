//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para validar datos enviados por el cliente.
const validacion = require("validator");
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarPassworddb, consultaOldPassworddb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
const { mostrarClientedb } = require('../../../../modelos/clientes/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarPasswordCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let codResp = 1;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    let validezOldPassword = true;
    const minLong = 10;
    const maxLong = 96;
    /* actualizarPassworddb(id, oldpassword, newpassword, repitePassword); */
    //-- Llamada a función.
    if(oldpassword && newpassword && repitePassword) {
        //-- Llamada a función.
        consultaOldPassworddb
        (
            id, validezOldPassword, oldpassword,
            async (validezOldPassword) => {
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
                    codResp = 401;
                    mostrarClientedb(id, res, codResp);
                }else {
                    if(newpassword === repitePassword) {
                        if(validacion.isLength(newpassword, { min: minLong, max: maxLong}) && 
                        validacion.matches(newpassword, /[a-z]/) && validacion.matches(newpassword, /[A-Z]/) &&
                        validacion.matches(newpassword, /[0-9]/) &&
                        validacion.matches(newpassword, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                            //-- Cifrar la nueva contraseña.
                            const nuevaPasswordCifrada = await hash(newpassword,1);
                            //-- Llamada a función.
                            actualizarPassworddb(id, nuevaPasswordCifrada);
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
                            codResp = 201;
                            mostrarClientedb(id, res, codResp);
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
                            codResp = 401;
                            mostrarClientedb(id, res, codResp);
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
                        codResp = 401;
                        mostrarClientedb(id, res, codResp);
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
        codResp = 304;
        mostrarClientedb(id, res, codResp);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarPasswordCliente;
//#######################################################################################################//