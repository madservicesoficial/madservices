//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para validar datos enviados por la Empresa.
const validacion = require("validator");
//-- Importamos la Tecnología para validar el CIF/NIF introducido.
const cifvalidacion = require('nif-dni-nie-cif-validation');
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para cifrar las contraseñas.
const { hash } = require('bcrypt');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultaID, consultarEmailEnRegistroEmpresasdb, registroEmpresasdb } = require('../../../modelos/empresas/entrada/entrada.js');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../../general/generar/IDaleatorio.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const registroEmpresas = async (req, res) => {

    //-- Variables y Ctes.
    const marca = req.body.marca;
    const nif = req.body.nif;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const tipo = req.body.tipo;
    const minLong = 10;
    const maxLong = 98;
    const maxLong2 = 50 + maxLong;
    //-- Proceso de validación.
    if(!email || !password || !confirmPassword || !marca || !nif || !tipo) {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Atención!',
                message: 'Campos vacíos',
                icon: path.join(__dirname, '../../../public/images/incorrecto.png')
            }
        );
        res.status(401).render('paginas/empresas/registrarse');
        return res.end();
    }else {
        if(password !== confirmPassword) {
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: 'Introduce la misma contraseña en ambos campos',
                    icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                }
            );
            res.status(401).render('paginas/empresas/registrarse');
            return res.end();
        }else {
            if(marca.length > maxLong2) {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: 'La marca empresarial es demasiado larga',
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401).render('paginas/empresas/registrarse');
                return res.end();
            }else if((cifvalidacion.isValidCif(nif) === false) && (cifvalidacion.isValidNif(nif) === false)) {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: 'El CIF/NIF no es oficial',
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401).render('paginas/empresas/registrarse');
                return res.end();
            }else if(!validacion.isEmail(email)) {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: `El correo electrónico: ${email} no es válido`,
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401).render('paginas/empresas/registrarse');
                return res.end();
            }else if(!validacion.isLength(password, { min: minLong, max: maxLong}) && !validacion.matches(password, /[a-z]/)
            && !validacion.matches(password, /[A-Z]/) && !validacion.matches(password, /[0-9]/) &&
            !validacion.matches(password, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: `La contraseña debe contener como mínimo ${minLong} caracteres, minúsculas, mayúsculas, números y caracteres especiales`,
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401).render('paginas/empresas/registrarse');
                return res.end();
            }else {
                const passwordCifrada = await hash(password, 1);
                //-- Llamada a función.
                consultarEmailEnRegistroEmpresasdb
                (
                    email,
                    (emailExiste) => {
                        if(emailExiste) {
                            //-- Renderizar y mostrar mensaje.
                            notifier.notify(
                                {
                                    sound: true,
                                    wait: true,
                                    title: '¡Atención!',
                                    message: 'Correo ya en uso',
                                    icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                                }
                            );
                            res.status(401).render('paginas/empresas/registrarse');
                            return res.end();
                        }else {
                            let idEmpresa = generarIDrandom() * 3;
                            //-- Llamada a función.
                            consultaID
                            (
                                idEmpresa,
                                (idExiste) => {
                                    while(idExiste) {
                                        idEmpresa = generarIDrandom() * 3;
                                        //-- Llamada a función.
                                        consultaID(idEmpresa, (idExiste) => {
                                            idExiste = idExiste;
                                        });
                                    }
                                }
                            );
                            //-- Llamada a función.
                            registroEmpresasdb({id: idEmpresa, email: email, marca: marca, nif: nif, tipo: tipo}, passwordCifrada);
                            //-- Renderizar y mostrar mensaje.
                            notifier.notify(
                                {
                                    sound: true,
                                    wait: true,
                                    title: '¡Registrado!',
                                    message: 'Empresa registrada con éxito',
                                    icon: path.join(__dirname, '../../../public/images/correcto.png')
                                }
                            );
                            res.status(201);
                            res.redirect('/');
                            return res.end();
                        }
                    }
                );
            }
        }
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = registroEmpresas;
//#######################################################################################################//