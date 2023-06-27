//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultarEmailClientesdb, consultarPasswordClientesdb, iniciarSesionClientesdb } = require('../../../modelos/clientes/entrada/entrada.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const iniciarSesionClientes = (req, res) => {

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
        res.status(401).render('paginas/clientes/login');
        return res.end();
    }else {
        //-- Llamada a función.
        consultarEmailClientesdb
        (
            email,
            (hayEmail) => {
                if(hayEmail === 0) {
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Atención!',
                            message: 'Correo electrónico incorrecto',
                            icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                        }
                    );
                    res.status(401).render('paginas/clientes/login');
                    return res.end();
                }else {
                    //-- Llamada a función.
                    consultarPasswordClientesdb
                    (
                        email, password,
                        (match) => {
                            if(match) {
                                iniciarSesionClientesdb
                                (
                                    email,
                                    (miembro) => {
                                        req.session.miembro = miembro;
                                        const id = miembro.id;
                                        notifier.notify(
                                            {
                                                sound: true,
                                                wait: true,
                                                title: '¡Sesión iniciada!',
                                                message: 'Cliente autenticado con éxito',
                                                icon: path.join(__dirname, '../../../public/images/correcto.png')
                                            }
                                        );
                                        res.status(201);
                                        res.redirect(`/sesion-cliente/${id}`);
                                        return res.end();
                                    }
                                );
                            }else {
                                notifier.notify(
                                    {
                                        sound: true,
                                        wait: true,
                                        title: '¡Atención!',
                                        message: 'Contraseña incorrecta',
                                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                                    }
                                );
                                res.status(401).render('paginas/clientes/login');
                                return res.end();
                            }
                        }
                    );
                }
            }
        );
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = iniciarSesionClientes;
//#######################################################################################################//