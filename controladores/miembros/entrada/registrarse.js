//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para validar datos enviados por el Miembro MAD.
const validacion = require("validator");
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { hash } = require('bcrypt');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultaID, consultarEmailEnRegistroMiembrosdb, registroMiembrosdb } = require('../../../modelos/miembros/entrada/entrada.js');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../../general/generar/IDaleatorio.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const registroMiembros = async (req, res) => {

    //-- Variables y Ctes.
    const miembro = req.body.miembro;
    const departamento = req.body.departamento;
    const genero = req.body.genero;
    const email = req.body.email; 
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const minLong = 10;
    const maxLong = 98;
    const maxLong2 = 50 + maxLong;
    //-- Proceso de validación.
    if(!email || !password || !confirmPassword || !miembro || !departamento || !genero) {
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
        res.status(401).render('paginas/miembros/registrarse');
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
            res.status(401).render('paginas/miembros/registrarse');
            return res.end();
        }else {
            if(miembro.length > maxLong2) {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: 'Nombre del Miembro MAD demasiado largo',
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401).render('paginas/miembros/registrarse');
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
                res.status(401).render('paginas/miembros/registrarse');
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
                res.status(401).render('paginas/miembros/registrarse');
                return res.end();
            }else {
                //-- Llamada a función.
                consultarEmailEnRegistroMiembrosdb
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
                            res.status(401).render('paginas/miembros/registrarse');
                            return res.end();
                        }else {
                            let idMiembro = generarIDrandom() * 5;
                            consultaID
                            (
                                idMiembro,
                                (idExiste) => {
                                    while(idExiste) {
                                        idMiembro = generarIDrandom() * 5;
                                        consultaID(idMiembro, (idExiste) => {
                                            idExiste = idExiste;
                                        });
                                    }
                                }
                            );
                            const passwordCifrada = await hash(password, 1);
                            registroMiembrosdb
                            (
                                {id: idMiembro, miembro: miembro, departamento: departamento, genero: genero, email: email},
                                passwordCifrada
                            );
                            //-- Renderizar y mostrar mensaje.
                            notifier.notify(
                                {
                                    sound: true,
                                    wait: true,
                                    title: '¡Registrado!',
                                    message: 'Miembro MAD registrado con éxito',
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
module.exports = registroMiembros;
//#######################################################################################################//