//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarImagendb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar la actualización de la imagen del producto MAD.
const actualizarImagen = async (req, res) => {

    //-- Introducción de los campos para actualizar la imagen del producto MAD.
    let id = req.params.id;
    const enumeracion = req.body.enumeracion;
    //-- Ruta al directorio de las imágenes almacenadas localmente.
    const rutaAlDirectorio = path.join(__dirname, '../../imagenes');
    //-- Fichero asíncrono leer directorio.
    const readdir = util.promisify(fs.readdir);
    //-- Fichero asíncrono borrar fichero.
    const unlink = util.promisify(fs.unlink);
    //-- Ruta donde está el archivo metido localmente.
    const files = await readdir(rutaAlDirectorio);
    const file = files[0];
    if(!enumeracion) {
        if(typeof file === 'string') {
            //-- Eliminación de las imágenes locales.
            let eliminarArchivo = path.join(rutaAlDirectorio, file);
            await unlink(eliminarArchivo);
        }
        //-- Mostrar Alerta Emergente.
        alerta('Sin cambios en la imagen de ningún producto');
        // Redirigir a la página principal de la aplicación.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }else {
        if(typeof file === 'string') {
            //-- Actualizamos la imagen del producto MAD en la base de datos.
            actualizarImagendb(id, enumeracion, res);
        }else {
            //-- Mostrar Alerta Emergente.
            alerta('Imagen no actualizada');
            // Redirigir a la página de la interfaz del Miembro MAD.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }
    }
}

//-- Exportamos la configuración de la imagen del producto MAD para unificarlo con el resto de rutas.
module.exports = actualizarImagen;