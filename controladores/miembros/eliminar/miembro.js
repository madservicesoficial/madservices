//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { darseBajaMiembrodb } = require('../../../modelos/miembros/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const darseBajaMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const decideConfirmar = req.body.decideConfirmar;
    //-- Proceso de validación.
    if(!decideConfirmar) {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Atención!',
                message: 'Debes confirmar si decides dejar MAD Services o te quedas',
                icon: path.join(__dirname, '../../../public/images/incorrecto.png')
            }
        );
        res.status(401);
        res.redirect(`/sesion-miembro/${id}/interfaz`);
        return res.end();
    }else if(decideConfirmar === 'No') {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Sin cambios!',
                message: '¡Tómatelo como una renovación!',
                icon: path.join(__dirname, '../../../public/images/NotModified.png')
            }
        );
        res.status(304);
        res.redirect(`/sesion-miembro/${id}/interfaz`);
        return res.end();
    }else if(decideConfirmar === 'Sí') {
        //-- Llamada a función.
        darseBajaMiembrodb(id);
        //-- Destruir sesión.
        req.session.destroy();
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Eliminado!',
                message: 'Miembro MAD dado de baja definitivamente',
                icon: path.join(__dirname, '../../../public/images/correcto.png')
            }
        );
        res.status(201);
        res.redirect('/');
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = darseBajaMiembro;
//#######################################################################################################//