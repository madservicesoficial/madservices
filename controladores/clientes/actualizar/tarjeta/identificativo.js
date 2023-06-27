//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para validar datos de la tarjeta bancaria del cliente.
const validarCard = require('card-validator');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultarTarjetaBankdb, editarNumTarjetaBankdb } = require('../../../../modelos/clientes/actualizar/tarjeta/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const editarNumTarjetaBank = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const numtarjeta = req.body.numtarjeta;
    //-- Proceso de validación.
    if(numtarjeta) {
        //-- Llamada a función.
        consultarTarjetaBankdb
        (
            id,
            (existenciaTarjBank) => {
                if(existenciaTarjBank === 0) {
                    //-- Renderizar y mostrar mensaje.
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Atención!',
                            message: 'No hay tarjeta bancaria a actualizar',
                            icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                        }
                    );
                    res.status(401);
                    res.redirect(`/sesion-cliente/${id}/perfil`);
                    return res.end();
                }else {
                    const validacionCard = validarCard.number(numtarjeta);
                    if(!validacionCard.isValid || numtarjeta.length > 18) {
                        //-- Renderizar y mostrar mensaje.
                        notifier.notify(
                            {
                                sound: true,
                                wait: true,
                                title: '¡Atención!',
                                message: `${numtarjeta} no es un número de tarjeta bancaria válido`,
                                icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                            }
                        );
                        res.status(401);
                        res.redirect(`/sesion-cliente/${id}/perfil`);
                        return res.end();
                    }else {
                        //-- Llamada a función.
                        editarNumTarjetaBankdb(id, numtarjeta);
                        //-- Renderizar y mostrar mensaje.
                        notifier.notify(
                            {
                                sound: true,
                                wait: true,
                                title: '¡Actualizado!',
                                message: 'El número de la tarjeta bancaria ha sido actualizado',
                                icon: path.join(__dirname, '../../../../public/images/correcto.png')
                            }
                        );
                        res.status(201);
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
                message: 'Número de la tarjeta bancaria no actualizado',
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
module.exports = editarNumTarjetaBank;
//#######################################################################################################//    