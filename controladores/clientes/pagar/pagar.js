//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
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
            //-- Mostrar alerta.
            alerta('Campos vacíos');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
        }else {
            if(nombreTarjeta > 148) {
                //-- Mostrar alerta.
                alerta(`${nombreTarjeta} demasiado largo`);
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
            }else if(!validacionCard.isValid || numTarjeta.length > 18) {
                //-- Mostrar alerta.
                alerta(`${numTarjeta} es un nº de tarjeta bancaria inválido`);
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
            }else if(!validacionCVV.isValid) {
                //-- Mostrar alerta.
                alerta(`${cvv} es un código CVV inválido`);
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
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