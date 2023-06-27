//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultarPagWebEmpresadb, borrarPagWebEmpresadb } = require('../../../modelos/empresas/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const borrarPagWebEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    //-- Llamada a función.
    consultarPagWebEmpresadb
    (
        id,
        (salida) => {
            if(salida === null) {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: 'No se puede borrar lo que no existe',
                        icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                    }
                );
                res.status(401);
                res.redirect(`/sesion-empresa/${id}/interfaz`);
                return res.end();
            }else {
                //-- Llamada a función.
                borrarPagWebEmpresadb(id);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Eliminado!',
                        message: 'Página Web borrada con éxito',
                        icon: path.join(__dirname, '../../../../public/images/correcto.png')
                    }
                );
                res.status(201);
                res.redirect(`/sesion-empresa/${id}/interfaz`);
                return res.end();
            }
        }
    );
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = borrarPagWebEmpresa;
//#######################################################################################################//