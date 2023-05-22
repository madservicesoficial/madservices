//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { ingresarArchivosMultimediaMADdb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar el ingreso de productos MAD.
const ingresarArchivosMultimediaMAD = async (req, res) => {

    //-- Obtenemos el ID del Miembro MAD y la enumeración del Producto MAD.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    //-- Ruta al directorio de las imágenes almacenadas localmente.
    const rutaAlDirectorio = path.join(__dirname, '../../imagenes');
    //-- Fichero asíncrono leer directorio.
    const readdir = util.promisify(fs.readdir);
    //-- Fichero asíncrono borrar fichero.
    const unlink = util.promisify(fs.unlink);
    //-- Ruta donde está el archivo metido localmente.
    const files = await readdir(rutaAlDirectorio);
    const file = files[0];
}

//-- Exportamos la configuración del ingreso de productos MAD para unificarlo con el resto de rutas.
module.exports = ingresarArchivosMultimediaMAD;