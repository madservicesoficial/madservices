//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { listaTodosClientesdb, bajaClientePorMiembrodb } = require('../../../modelos/miembros/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const bajaClientePorMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const email = req.body.email;
    const idcliente = req.body.idcliente;
    //-- Proceso de validación.
    if(!email || !idcliente) {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Atención!',
                message: 'Campos vacíos',
                icon: path.join(__dirname, '../../../public/images/incorrecto.png')
            }
        );
        res.status(401);
        res.redirect(`/sesion-miembro/${id}/interfaz`);
        return res.end();
    }else {
        //-- Llamada a función.
        listaTodosClientesdb
        (
            email, idcliente,
            (confirmacion) => {
                if(confirmacion === true) {
                    //-- Llamada a función.
                    bajaClientePorMiembrodb(idcliente);
                    //-- Renderizar y mostrar mensaje.
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Eliminado!',
                            message: 'Cliente dado de baja definitivamente',
                            icon: path.join(__dirname, '../../../public/images/correcto.png')
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
                            title: '¡Atención!',
                            message: 'Cliente erróneo',
                            icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                        }
                    );
                    res.status(401);
                    res.redirect(`/sesion-miembro/${id}/interfaz`);
                    return res.end();
                }
            }
        );
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = bajaClientePorMiembro;
//#######################################################################################################//