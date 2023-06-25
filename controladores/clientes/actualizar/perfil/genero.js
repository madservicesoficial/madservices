//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarGenerodb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarGeneroCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const genero = req.body.genero;
    let codResp = 1;
    //-- Proceso de validación.
    if(genero) {
        actualizarGenerodb(id, genero);
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Actualizado!',
                message: 'El género se ha actualizado',
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
                title: '¡Sin cambios!',
                message: 'Género no actualizado',
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
module.exports = actualizarGeneroCliente;
//#######################################################################################################//