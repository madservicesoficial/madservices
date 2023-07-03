//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales y para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { ingresarProductosMADdb } = require('../../../modelos/miembros/ingresar/ingresar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const ingresoProductosMAD = async (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const cantidad = req.body.cantidad;
    const categoria = req.body.categoria;
    const titulo = req.body.titulo;
    const precio = req.body.precio;
    const peso = req.body.peso;
    const descripcion = req.body.descripcion;
    const LONG_TITULO = 60;
    const LONG_DESCRIPCION = 998;
    const CANTIDAD_MIN = 1;
    const COSTE_NULO = 1.0;
    const rutaAlDirectorio = path.join(__dirname, '../../../archivos');
    const readdir = util.promisify(fs.readdir);
    const unlink = util.promisify(fs.unlink);
    const files = await readdir(rutaAlDirectorio);
    const file = files[0];
    //-- Proceso de validación.
    if(!cantidad || !categoria || !titulo || !precio || !peso || !descripcion) {
        if(typeof file === 'string') {
            let eliminarArchivo = path.join(rutaAlDirectorio, file);
            await unlink(eliminarArchivo);
        }
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
        if(typeof file === 'string') {
            if(titulo.length > LONG_TITULO) {
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                await unlink(eliminarArchivo);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: `El título no puede tener más de ${LONG_TITULO} caracteres`,
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401);
                res.redirect(`/sesion-miembro/${id}/interfaz`);
                return res.end();
            }else if(descripcion.length > LONG_DESCRIPCION) {
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                await unlink(eliminarArchivo);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: `La descripción no puede tener más de ${LONG_DESCRIPCION} caracteres`,
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401);
                res.redirect(`/sesion-miembro/${id}/interfaz`);
                return res.end();
            }else if(cantidad < CANTIDAD_MIN) {
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                await unlink(eliminarArchivo);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: `No tiene sentido la cantidad ${cantidad}`,
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401);
                res.redirect(`/sesion-miembro/${id}/interfaz`);
                return res.end();
            }else if(precio < COSTE_NULO) {
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                await unlink(eliminarArchivo);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: `No puedes vender por debajo de ${COSTE_NULO}€`,
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
                res.status(401);
                res.redirect(`/sesion-miembro/${id}/interfaz`);
                return res.end();
            }else {
                //-- Llamamos a la función.
                ingresarProductosMADdb
                (
                    id,
                    {cantidad: cantidad, categoria: categoria, titulo: titulo, precio: precio, peso: peso, descripcion: descripcion},
                    res
                );
            }
        }else {
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: 'Debes introducir una imagen de portada',
                    icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                }
            );
            res.status(401);
            res.redirect(`/sesion-miembro/${id}/interfaz`);
            return res.end();
        }
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresoProductosMAD;
//#######################################################################################################//