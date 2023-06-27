//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales y para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarImagendb } = require('../../../../modelos/miembros/actualizar/productos/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarImagen = async (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const rutaAlDirectorio = path.join(__dirname, '../../../../archivos');
    const readdir = util.promisify(fs.readdir);
    const unlink = util.promisify(fs.unlink);
    const files = await readdir(rutaAlDirectorio);
    const file = files[0];
    //-- Proceso de validación.
    if(typeof file === 'string') {
        let fullFile = path.parse(file);
        let extension = fullFile.ext;
        if(extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
            //-- Llamada a función.
            actualizarImagendb(enumeracion);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Actualizado!',
                    message: 'Imagen actualizada con éxito',
                    icon: path.join(__dirname, '../../../../public/images/correcto.png')
                }
            );
            res.status(201);
            res.redirect(`/sesion-miembro/${id}/productosmadservices`);
            return res.end();
        }else {
            //-- Eliminar localmente.
            let eliminarArchivo = path.join(rutaAlDirectorio, file);
            await unlink(eliminarArchivo);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: 'Formato de imagen incorrecto por no ser: PNG, JPG o JPEG',
                    icon: path.join(__dirname, '../../../../public/images/incorrecto.png')
                }
            );
            res.status(401);
            res.redirect(`/sesion-miembro/${id}/productosmadservices`);
            return res.end();
        }
    }else {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Sin cambios!',
                message: 'Imagen no actualizada',
                icon: path.join(__dirname, '../../../../public/images/NotModified.png')
            }
        );
        res.status(304);
        res.redirect(`/sesion-miembro/${id}/productosmadservices`);
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarImagen;
//#######################################################################################################//