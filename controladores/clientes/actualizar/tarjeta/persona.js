//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultarTarjetaBankdb, editarNombreTarjetaBankdb } = require('../../../../modelos/clientes/actualizar/tarjeta/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const editarNombreTarjetaBank = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const namecard = req.body.namecard;
    //-- Proceso de validación.
    if(namecard) {
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
                    if(namecard.length > 25) {
                        //-- Renderizar y mostrar mensaje.
                        notifier.notify(
                            {
                                sound: true,
                                wait: true,
                                title: '¡Atención!',
                                message: `${namecard} no corresponde con ninguna tarjeta bancaria válida`,
                                icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                            }
                        );
                        res.status(401);
                        res.redirect(`/sesion-cliente/${id}/perfil`);
                        return res.end();
                    }else {
                        //-- Llamada a función.
                        editarNombreTarjetaBankdb(id, namecard);
                        //-- Renderizar y mostrar mensaje.
                        notifier.notify(
                            {
                                sound: true,
                                wait: true,
                                title: '¡Actualizado!',
                                message: 'El nombre de la tarjeta bancaria ha sido actualizado',
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
                message: 'Nombre de la tarjeta bancaria no actualizado',
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
module.exports = editarNombreTarjetaBank;
//#######################################################################################################//