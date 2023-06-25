//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para validar datos enviados por el cliente.
const validacion = require("validator");
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarEmaildb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarEmailCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const email = req.body.email;
    let codResp = 1;
    //-- Proceso de validación.
    if(email) {
        if(!validacion.isEmail(email)) {
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: `${email} es un correo electrónico no válido`,
                    icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                }
            );
            codResp = 401;
            res.status(codResp);
            res.redirect(`/sesion-cliente/${id}/perfil`);
            return res.end();
        }else {
            actualizarEmaildb(id, email);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Actualizado!',
                    message: 'El correo electrónico se ha actualizado',
                    icon: path.join(__dirname, '../../../../public/images/correcto.png')
                }
            );
            codResp = 201;
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
                message: 'Correo electrónico no actualizado',
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
module.exports = actualizarEmailCliente;
//#######################################################################################################//