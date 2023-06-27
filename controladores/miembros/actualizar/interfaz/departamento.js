//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarDepartamentodb } = require('../../../../modelos/miembros/actualizar/interfaz/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarDepartamento = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const departamento = req.body.departamento;
    //-- Proceso de validación.
    if(departamento) {
        //-- Llamada a función.
        actualizarDepartamentodb(id, departamento);
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Actualizado!',
                message: `El departamento del miembro MAD ha cambiado a: ${departamento}`,
                icon: path.join(__dirname, '../../../../public/images/correcto.png')
            }
        );
        res.status(201);
        res.redirect(`/sesion-miembro/${id}/interfaz`);
        return res.end();
    }else {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Sin cambios!',
                message: 'El departamento del miembro MAD no ha cambiado',
                icon: path.join(__dirname, '../../../../public/images/NotModified.png')
            }
        );
        res.status(304);
        res.redirect(`/sesion-miembro/${id}/interfaz`);
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarDepartamento;
//#######################################################################################################//