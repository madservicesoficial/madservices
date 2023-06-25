//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para validar el país introducido.
const { getCode, getCountries } = require('country-list-spanish');
const countries = require('country-list');
//-- Importamos la Tecnología para validar el Código Postal introducido.
const { postcodeValidator } = require('postcode-validator');
//-- Importamos la Tecnología para solicitar URLs de Geolocalización.
const axios = require('axios');
//-- Importamos la configuración del entorno ENV para poder usar su información.
require('../../../../config/env.js');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarLocalizaciondb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarLocalizacion = async (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const pais = req.body.pais;
    const cp = req.body.cp;
    const region = req.body.region;
    const poblacion = req.body.poblacion;
    const direccion = req.body.direccion;
    const paises = getCountries();
    const paisesENG = countries.getNames();
    let codigoPais = getCode(pais);
    let countryCode = countries.getCode(pais);
    const minLong = 5;
    const maxLong = 48;
    //-- Proceso de validación.
    if(pais && cp && region && poblacion && direccion) {
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
                            if(direccion.length >= minLong && direccion.length <= maxLong) {
                                //-- Llamada a función.
                                actualizarLocalizaciondb(id, pais, cp, region, poblacion, direccion);
                                //-- Renderizar y mostrar mensaje.
                                notifier.notify(
                                    {
                                        sound: true,
                                        wait: true,
                                        title: '¡Actualizado!',
                                        message: 'La localización ha sido actualizada',
                                        icon: path.join(__dirname, '../../../../public/images/correcto.png')
                                    }
                                );
                                codResp = 201;
                                res.status(codResp);
                                res.redirect(`/sesion-cliente/${id}/perfil`);
                                return res.end();
                            }else {
                                //-- Renderizar y mostrar mensaje.
                                notifier.notify(
                                    {
                                        sound: true,
                                        wait: true,
                                        title: '¡Atención!',
                                        message: `Dirección de ${poblacion} incorrecta`,
                                        icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                                    }
                                );
                                codResp = 401;
                                res.status(codResp);
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
                                    message: `Población de ${region} incorrecta`,
                                    icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                                }
                            );
                            codResp = 401;
                            res.status(codResp);
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
                                message: `Región de ${pais} incorrecta`,
                                icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                            }
                        );
                        codResp = 401;
                        res.status(codResp);
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
                            message: 'Código Postal no encontrado',
                            icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                        }
                    );
                    codResp = 401;
                    res.status(codResp);
                    res.redirect(`/sesion-cliente/${id}/perfil`);
                    return res.end();
                }
            }else{
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: 'Código Postal incorrecto',
                        icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                    }
                );
                codResp = 401;
                res.status(codResp);
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
                    message: 'País incorrecto',
                    icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                }
            );
            codResp = 401;
            res.status(codResp);
            res.redirect(`/sesion-cliente/${id}/perfil`);
            return res.end();
        }
    }else {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Sin cambios!',
                message: 'Localización no actualizada porque hay campos vacíos',
                icon: path.join(__dirname, '../../../../public/images/NotModified.png')
            }
        );
        codResp = 304;
        res.status(codResp);
        res.redirect(`/sesion-cliente/${id}/perfil`);
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarLocalizacion;
//#######################################################################################################//