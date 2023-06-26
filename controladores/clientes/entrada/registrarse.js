//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para validar datos enviados por el cliente.
const validacion = require("validator");
//-- Importamos la Tecnología para validar el país introducido.
const { getCode, getCountries } = require('country-list-spanish');
const countries = require('country-list');
//-- Importamos la Tecnología para validar el Código Postal introducido.
const { postcodeValidator } = require('postcode-validator');
//-- Importamos la configuración del entorno ENV para poder usar su información.
require('../../../config/env.js');
//-- Importamos la Tecnología para solicitar URLs de Geolocalización.
const axios = require('axios');
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultaID, consultarEmailClientesEnRegistrodb, registroClientesdb } = require('../../../modelos/clientes/entrada/entrada.js');
const { generarIDrandom } = require('');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const registroClientes = async (req, res) => {

    //-- Variables y Ctes.
    const email = req.body.email; 
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const direccion = req.body.direccion;
    const poblacion = req.body.poblacion;
    const region = req.body.region;
    const pais = req.body.pais;
    const cp = req.body.cp;
    const genero = req.body.genero;
    const minLong = 3;
    const minLong2 = 4 * minLong - 2;
    const maxLong = 48;
    const maxLong2 = 2 * maxLong;
    const paises = getCountries();
    const paisesENG = countries.getNames();
    let codigoPais = getCode(pais);
    let countryCode = countries.getCode(pais);
    const minDir = 5;
    const maxDir= 48;
    //-- Proceso de validación.
    if(!email || !password || !confirmPassword || !nombre || !apellidos || !genero || !direccion || !poblacion || !region || !pais || !cp) {
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
        res.status(401).render('paginas/clientes/registrarse');
        return res.end();
    }else {
        if(password !== confirmPassword) {
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
            res.status(401).render('paginas/clientes/registrarse');
            return res.end();
        }else {
            if(nombre.length > maxLong) {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: 'Nombre muy largo',
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401).render('paginas/clientes/registrarse');
                return res.end();
            }else if(apellidos.length > maxLong2) {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: 'Apellidos muy largos',
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401).render('paginas/clientes/registrarse');
                return res.end();
            }else if(!validacion.isEmail(email)) {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: 'Email no válido',
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401).render('paginas/clientes/registrarse');
                return res.end();
            }else if(!validacion.isLength(password, { min: minLong2, max: maxLong2}) || !validacion.matches(password, /[a-z]/)
            || !validacion.matches(password, /[A-Z]/) || !validacion.matches(password, /[0-9]/) ||
            !validacion.matches(password, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: `La contraseña debe contener como mínimo ${minLong2} caracteres, minúsculas, mayúsculas, números y caracteres especiales`,
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401).render('paginas/clientes/registrarse');
                return res.end();
            }else {
                if(paises.includes(pais) || paisesENG.includes(pais)) {
                    if(codigoPais === undefined) {
                        codigoPais = countryCode;
                    }
                    if(postcodeValidator(cp, codigoPais)) {
                        //-- Enviamos una solicitud HTTP a la API de Geonames.
                        const response = await axios.get('http://api.geonames.org/postalCodeLookupJSON', {
                            params: {
                                postalcode: cp,
                                country: codigoPais,
                                username: process.env.USUARIO_DE_GEONAMES,
                                password: process.env.MYSQL_PASSWORD_CLIENTE
                            },
                        });
                        const lugar = response.data.postalcodes[0];
                        if(lugar || typeof lugar !== 'undefined') {
                            if(region === lugar.adminName1 || region === lugar.adminName2) {
                                if(poblacion === lugar.adminName3 || poblacion === lugar.placeName) {
                                    if(direccion.length >= minDir && direccion.length <= maxDir) {
                                        //-- Llamada a función.
                                        consultarEmailClientesEnRegistrodb
                                        (
                                            email,
                                            (emailExiste) => {
                                                if(emailExiste) {
                                                    notifier.notify(
                                                        {
                                                            sound: true,
                                                            wait: true,
                                                            title: '¡Atención!',
                                                            message: 'Correo ya en uso',
                                                            icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                                                        }
                                                    );
                                                    res.status(401).render('paginas/clientes/registrarse');
                                                    return res.end();
                                                }else {

                                                }
                                            }
                                        );
                                        registroClientesdb
                                        (
                                            {email: email, nombre: nombre, apellidos: apellidos, direccion: direccion, poblacion: poblacion,
                                            region: region, pais: pais, cp: cp, genero: genero},
                                            password,
                                            res
                                        );
                                    }else {
                                        //-- Renderizar y mostrar mensaje.
                                        notifier.notify(
                                            {
                                                sound: true,
                                                wait: true,
                                                title: '¡Atención!',
                                                message: `Dirección de ${poblacion} incorrecta`,
                                                icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                                            }
                                        );
                                        res.status(401).render('paginas/clientes/registrarse');
                                        return res.end();
                                    }
                                }else {
                                    //-- Renderizar y mostrar mensaje.
                                    notifier.notify(
                                        {
                                            sound: true,
                                            wait: true,
                                            title: '¡Atención!',
                                            message: `Población de ${region} incorrecta`,
                                            icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                                        }
                                    );
                                    res.status(401).render('paginas/clientes/registrarse');
                                    return res.end();
                                }
                            }else {
                                //-- Renderizar y mostrar mensaje.
                                notifier.notify(
                                    {
                                        sound: true,
                                        wait: true,
                                        title: '¡Atención!',
                                        message: `Región de ${pais} incorrecta`,
                                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                                    }
                                );
                                res.status(401).render('paginas/clientes/registrarse');
                                return res.end();
                            }
                        }else {
                            //-- Renderizar y mostrar mensaje.
                            notifier.notify(
                                {
                                    sound: true,
                                    wait: true,
                                    title: '¡Atención!',
                                    message: 'Código Postal no encontrado',
                                    icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                                }
                            );
                            res.status(401).render('paginas/clientes/registrarse');
                            return res.end();
                        }
                    }else {
                        //-- Renderizar y mostrar mensaje.
                        notifier.notify(
                            {
                                sound: true,
                                wait: true,
                                title: '¡Atención!',
                                message: 'Código Postal incorrecto',
                                icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                            }
                        );
                        res.status(401).render('paginas/clientes/registrarse');
                        return res.end();
                    }
                }else {
                    //-- Renderizar y mostrar mensaje.
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Atención!',
                            message: 'País incorrecto',
                            icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                        }
                    );
                    res.status(401).render('paginas/clientes/registrarse');
                    return res.end();
                }
            }
        }
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = registroClientes;
//#######################################################################################################//