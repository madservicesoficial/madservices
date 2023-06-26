//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { darseBajaClientedb } = require('../../../modelos/clientes/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const darseBajaCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const dileAdios = req.body.dileAdios;
    let codResp = 1;
    //-- Proceso de validación.
    if(!dileAdios) {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Atención!',
                message: 'Debes confirmar si quieres o no darte de baja',
                icon: path.join(__dirname, '../../../public/images/incorrecto.png')
            }
        );
        codResp = 401;
        res.status(codResp);
        res.redirect(`/sesion-cliente/${id}/perfil`);
        return res.end();
    }else if(dileAdios === 'No') {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Sin cambios!',
                message: 'Gracias por no querer darte de baja',
                icon: path.join(__dirname, '../../../public/images/NotModified.png')
            }
        );
        codResp = 304;
        res.status(codResp);
        res.redirect(`/sesion-cliente/${id}/perfil`);
        return res.end();
    }else if(dileAdios === 'Sí') {
        //-- Llamada a función.
        darseBajaClientedb(id);
        //-- Destruir la sesión.
        req.session.destroy();
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Baja del cliente confirmada!',
                message: 'Cliente dado de baja definitivamente',
                icon: path.join(__dirname, '../../../public/images/correcto.png')
            }
        );
        codResp = 201;
        res.status(codResp);
        res.redirect('/');
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = darseBajaCliente;
//#######################################################################################################//  