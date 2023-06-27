//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { darseBajaEmpresadb } = require('../../../modelos/empresas/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const darseBajaEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const confirmarOpcion = req.body.confirmarOpcion;
    //-- Proceso de validación.
    if(!confirmarOpcion) {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Atención!',
                message: 'Debes confirmar si quieres o no darte de baja',
                icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
            }
        );
        res.status(401);
        res.redirect(`/sesion-empresa/${id}/interfaz`);
        return res.end();
    }else if(confirmarOpcion === 'No') {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Sin cambios!',
                message: 'Gracias por no querer darte de baja',
                icon: path.join(__dirname, '../../../../public/images/NotModified.png')
            }
        );
        res.status(304);
        res.redirect(`/sesion-empresa/${id}/interfaz`);
        return res.end();
    }else if(confirmarOpcion === 'Sí') {
        //-- Llamada a función.
        darseBajaEmpresadb(id);
        //-- Destruir sesión.
        req.session.destroy();
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Eliminado!',
                message: 'Empresa dada de baja definitivamente',
                icon: path.join(__dirname, '../../../../public/images/correcto.png')
            }
        );
        res.status(201);
        res.redirect('/');
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = darseBajaEmpresa;
//#######################################################################################################//