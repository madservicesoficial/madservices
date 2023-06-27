//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para verificar las contraseñas.
const { compare } = require('bcrypt');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultarEmailEmpresasdb, iniciarSesionEmpresasdb } = require('../../../modelos/empresas/entrada/entrada.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const iniciarSesionEmpresas = (req, res) => {

    //-- Variables y Ctes.
    const email = req.body.email;
    const password = req.body.password;
    //-- Proceso de validación.
    if(!email || !password) {
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
        res.status(401).render('paginas/empresas/login');
        return res.end();
    }else {
        //-- Llamada a función.
        consultarEmailEmpresasdb
        (
            email,
            (salida) => {
                if(salida === 0) {
                    //-- Renderizar y mostrar mensaje.
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Atención!',
                            message: 'Correo electrónico incorrecto',
                            icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                        }
                    );
                    res.status(401).render('paginas/empresas/login');
                    return res.end();
                }else {
                    //-- Llamada a función.
                    iniciarSesionEmpresasdb
                    (
                        email,
                        (miembro) => {
                            compare(password, miembro.password).then( (match) => {
                                if(match) {
                                    req.session.miembro = miembro;
                                    //-- Renderizar y mostrar mensaje.
                                    notifier.notify(
                                        {
                                            sound: true,
                                            wait: true,
                                            title: '¡Sesión iniciada!',
                                            message: 'Empresa autenticada con éxito',
                                            icon: path.join(__dirname, '../../../public/images/correcto.png')
                                        }
                                    );
                                    res.status(201);
                                    res.redirect(`/sesion-empresa/${miembro.id}`);
                                    return res.end();
                                }else {
                                    //-- Renderizar y mostrar mensaje.
                                    notifier.notify(
                                        {
                                            sound: true,
                                            wait: true,
                                            title: '¡Atención!',
                                            message: 'Contraseña incorrecta',
                                            icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                                        }
                                    );
                                    res.status(401).render('paginas/empresas/login');
                                    return res.end();
                                }
                            });
                        }
                    );
                }
            }
        );
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = iniciarSesionEmpresas;
//#######################################################################################################//