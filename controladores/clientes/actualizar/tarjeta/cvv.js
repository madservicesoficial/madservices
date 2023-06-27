//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para validar datos de la tarjeta bancaria del cliente.
const validarCard = require('card-validator');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultarTarjetaBankdb, editarCVVTarjetaBankdb } = require('../../../../modelos/clientes/actualizar/tarjeta/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const editarCVVTarjetaBank = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const cvv = req.body.cvv;
    //-- Proceso de validación.
    if(cvv) {
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
                    const validacionCVV = validarCard.cvv(cvv);
                    if(validacionCVV.isValid) {
                        //-- Llamada a función.
                        editarCVVTarjetaBankdb(id, cvv);
                        //-- Renderizar y mostrar mensaje.
                        notifier.notify(
                            {
                                sound: true,
                                wait: true,
                                title: '¡Actualizado!',
                                message: 'Código CVV actualizado en la tarjeta bancaria',
                                icon: path.join(__dirname, '../../../../public/images/correcto.png')
                            }
                        );
                        res.status(201);
                        res.redirect(`/sesion-cliente/${id}/perfil`);
                        return res.end();
                    }else {
                        //-- Renderizar y mostrar mensaje.
                        notifier.notify(
                            {
                                sound: true,
                                wait: true,
                                title: '¡Atención!',
                                message: `${cvv} no es un código CVV válido`,
                                icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                            }
                        );
                        res.status(401);
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
                message: 'Código CVV de la tarjeta bancaria no actualizado',
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
module.exports = editarCVVTarjetaBank;
//#######################################################################################################//