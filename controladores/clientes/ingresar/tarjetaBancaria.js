//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para validar datos de la tarjeta bancaria del cliente.
const validarCard = require('card-validator');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultarTarjetaBankdb, ingresarTarjetaBankdb } = require('../../../modelos/clientes/ingresar/ingresar.js');
const { adquirirNombredb } = require('../../../modelos/clientes/guardar/guardar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const ingresarTarjetaBank = async (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const ingresaCard = req.body.ingresaCard;
    const numtarjeta = req.body.tarjetab;
    const validez = req.body.fvalidez;
    let namecard = req.body.nombrecard;
    const cvv = req.body.cvvcod;
    const newExpiracion = validez + '-01';
    const validacionCard = validarCard.number(numtarjeta);
    const validacionCVV = validarCard.cvv(cvv);
    //-- Función extra.
    if(!namecard) {
        namecard = await adquirirNombredb(id);
    }
    //-- Proceso de validación.
    if(!numtarjeta || !validez || !cvv) {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Atención!',
                message: 'Campos vacíos',
                icon: path.join(__dirname, '../../../public/images/incorrecto.png')
            }
        );
        res.status(401);
        res.redirect(`/sesion-cliente/${id}/perfil`);
        return res.end();
    }else {
        if(namecard > 148) {
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: `${namecard} demasiado largo`,
                    icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                }
            );
            res.status(401);
            res.redirect(`/sesion-cliente/${id}/perfil`);
            return res.end();
        }else if(!validacionCard.isValid || numtarjeta.length > 18) {
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: `${numtarjeta} es un número de tarjeta bancaria inválido`,
                    icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                }
            );
            res.status(401);
            res.redirect(`/sesion-cliente/${id}/perfil`);
            return res.end();
        }else if(!validacionCVV.isValid) {
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: `${cvv} es un código CVV inválido`,
                    icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                }
            );
            res.status(401);
            res.redirect(`/sesion-cliente/${id}/perfil`);
            return res.end();
        }else {
            if(ingresaCard) {
                //-- Llamada a función.
                consultarTarjetaBankdb
                (
                    id,
                    (salida) => {
                        if(salida === 0) {
                            //-- Llamada a función.
                            ingresarTarjetaBankdb(id, numtarjeta, newExpiracion, namecard, cvv);
                            notifier.notify(
                                {
                                    sound: true,
                                    wait: true,
                                    title: '¡Ingresado!',
                                    message: 'Tarjeta bancaria ingresada',
                                    icon: path.join(__dirname, '../../../public/images/correcto.png')
                                }
                            );
                            res.status(201);
                            res.redirect(`/sesion-cliente/${id}/perfil`);
                            return res.end();
                        }else {
                            notifier.notify(
                                {
                                    sound: true,
                                    wait: true,
                                    title: '¡Atención!',
                                    message: 'Ya ingresaste una tarjeta bancaria en tu perfil',
                                    icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                                }
                            );
                            res.status(401);
                            res.redirect(`/sesion-cliente/${id}/perfil`);
                            return res.end();
                        }
                    }
                );
            }else {
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: 'Sin pulsar el cuadro, no hay ingreso de la tarjeta bancaria',
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401);
                res.redirect(`/sesion-cliente/${id}/perfil`);
                return res.end();
            }
        }
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresarTarjetaBank;
//#######################################################################################################//