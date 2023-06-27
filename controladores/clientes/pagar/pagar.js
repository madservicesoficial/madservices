//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para validar datos de la tarjeta bancaria del cliente.
const validarCard = require('card-validator');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { confirmacionCompradb } = require('../../../modelos/clientes/pagar/pagar.js');
const { adquirirNombredb, guardaTarjetadb } = require('../../../modelos/clientes/guardar/guardar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const compraPagada = async (req, res) => {
    
    //-- Variables y Ctes.
    let id = req.params.id;
    let nombreTarjeta = req.body.nombreTarjeta;
    const numTarjeta = req.body.numeroTarjeta;
    let expiracion = req.body.fechaExpiracion;
    const cvv = req.body.cvv;
    let nohayTarjeta = req.body.nohayTarjeta;
    const guardarTarjeta = req.body.saveCard;
    const newExpiracion = expiracion + '-01';
    const validacionCard = validarCard.number(numTarjeta);
    const validacionCVV = validarCard.cvv(cvv);
    //-- Proceso de validación.
    if(nohayTarjeta) {
        if(!nombreTarjeta) {
            //-- Llamada a función con retorno.
            nombreTarjeta = await adquirirNombredb(id);
        }
        if(!numTarjeta || !expiracion || !cvv) {
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
            res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
            return res.end();
        }else {
            if(nombreTarjeta > 148) {
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: `${nombreTarjeta} demasiado largo`,
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401);
                res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
                return res.end();
            }else if(!validacionCard.isValid || numTarjeta.length > 18) {
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: `${numTarjeta} es un número de tarjeta bancaria inválido`,
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401);
                res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
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
                res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
                return res.end();
            }else {
                if(guardarTarjeta) {
                    //-- Llamada a función.
                    guardaTarjetadb(id, nombreTarjeta, numTarjeta, newExpiracion, cvv);
                }
                let cont = 0;
                //-- Llamada a función.
                confirmacionCompradb(id, cont, res);
            }
        }
    }else {
        let cont = 0;
        //-- Llamada a función.
        confirmacionCompradb(id, cont, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = compraPagada;
//#######################################################################################################//