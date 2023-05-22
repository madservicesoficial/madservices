//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para validar datos de la tarjeta bancaria del cliente.
const validarCard = require('card-validator');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { ingresarTarjetaBankdb } = require('../../../modelos/clientes/ingresar/ingresar.js');
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
    //-- Proceso de validación.
    if(!namecard) {
        namecard = await adquirirNombredb(id);
    }
    if(!numtarjeta || !validez || !cvv) {
        //-- Mostrar alerta.
        alerta('Campos vacíos');
        //-- Redirigir.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }else {
        if(namecard > 148) {
            //-- Mostrar alerta.
            alerta(`${namecard} demasiado largo`);
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else if(!validacionCard.isValid || numtarjeta.length > 18) {
            //-- Mostrar alerta.
            alerta(`${numtarjeta} es un nº de tarjeta bancaria inválido`);
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else if(!validacionCVV.isValid) {
            //-- Mostrar alerta.
            alerta(`${cvv} es un código CVV inválido`);
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            //-- Proceso de ingresar la tarjeta bancaria.
            if(ingresaCard) {
                //-- Llamada a función.
                ingresarTarjetaBankdb(id, numtarjeta, newExpiracion, namecard, cvv, res);
            }else {
                //-- Mostrar alerta.
                alerta('Sin pulsar el cuadro, no hay ingreso de la tarjeta bancaria');
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }
        }
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresarTarjetaBank;
//#######################################################################################################//