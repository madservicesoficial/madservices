//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../../../config/database.js');
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
//-- Importamos la Tecnología para redimensionar las imágenes cargadas en local.
const sharp = require('sharp');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');

//-- Creamos la función para actualizar la cantidad del producto MAD en la base de datos de MAD Services.
const actualizarCantidaddb = (enumeracion, cantidad) => {

    let instruccionActualizarCantidad = 'UPDATE productos SET cantidad = ? WHERE enumeracion = ?';
    let formatoInstruccionActualizarCantidad = mysql.format(instruccionActualizarCantidad, [cantidad, enumeracion]);
    madservicesAdmindb.query(formatoInstruccionActualizarCantidad);
}

//-- Creamos la función para actualizar las categorias del producto MAD en la base de datos de MAD Services.
const actualizarCategoriadb = (enumeracion, categoria) => {

    let instruccionActualizarCategoria = 'UPDATE productos SET producto = ? WHERE enumeracion = ?';
    let formatoInstruccionActualizarCategoria = mysql.format(instruccionActualizarCategoria, [categoria, enumeracion]);
    madservicesAdmindb.query(formatoInstruccionActualizarCategoria);
}

//-- Creamos la función para actualizar la descripción del producto MAD en la base de datos de MAD Services.
const actualizarDescripciondb = (enumeracion, descripcion) => {

    let instruccionActualizarDescripcion = 'UPDATE productos SET descripcion = ? WHERE enumeracion = ?';
    let formatoInstruccionActualizarDescripcion = mysql.format(instruccionActualizarDescripcion, [descripcion, enumeracion]);
    madservicesAdmindb.query(formatoInstruccionActualizarDescripcion);
}

//-- Creamos la función para actualizar el precio del producto MAD en la base de datos de MAD Services.
const actualizarPreciodb = (enumeracion, precio) => {

    let instruccionActualizarPrecio = 'UPDATE productos SET precio = ? WHERE enumeracion = ?';
    let formatoInstruccionActualizarPrecio = mysql.format(instruccionActualizarPrecio, [precio, enumeracion]);
    madservicesAdmindb.query(formatoInstruccionActualizarPrecio);
}

//-- Creamos la función para actualizar el título del producto MAD en la base de datos de MAD Services.
const actualizarTitulodb = (enumeracion, titulo) => {

    let instruccionActualizarTitulo = 'UPDATE productos SET titulo = ? WHERE enumeracion = ?';
    let formatoInstruccionActualizarTitulo = mysql.format(instruccionActualizarTitulo, [titulo, enumeracion]);
    madservicesAdmindb.query(formatoInstruccionActualizarTitulo);
}

//-- Creamos la función para actualizar la imagen de portada del producto MAD en la base de datos de MAD Services.
const actualizarImagendb = async (enumeracion) => {
    //-- Ruta al directorio de las imágenes almacenadas localmente.
    const rutaAlDirectorio = path.join(__dirname, '../../../../archivos');
    //-- Fichero asíncrono leer directorio.
    const readdir = util.promisify(fs.readdir);
    //-- Fichero asíncrono leer fichero.
    const readFile = util.promisify(fs.readFile);
    //-- Fichero asíncrono borrar fichero.
    const unlink = util.promisify(fs.unlink);
    //-- Procedimiento para subir la imagen de portada y el resto de campos del producto a la base de datos.

    //-- Ruta donde está el archivo metido localmente.
    const files = await readdir(rutaAlDirectorio);
    const file = files[0];
    //-- Ruta del fichero completa metido localmente.
    let rutaAlArchivo = path.join(rutaAlDirectorio, file);
    //-- Ruta del fichero redimensionado metido localmente.
    let nuevaRuta = path.join(rutaAlDirectorio, 'edit' + file);
    //-- Redimensión de la imagen de portada y almacenamiento localmente.
    await sharp(rutaAlArchivo).resize(260).toFile(nuevaRuta);
    //-- Almacenamiento de imagen redimensionada localmente en imagen de buffer.
    let imagenBuffer = await readFile(nuevaRuta);
    //-- Almacenamiento de imagen de buffer en base64.
    let imagen = imagenBuffer.toString('base64');
    //-- Actualizamos la imagen de portada del producto MAD en base de datos.
    let instruccionActualizarTitulo = 'UPDATE productos SET portada = ? WHERE enumeracion = ?';
    let formatoInstruccionActualizarTitulo = mysql.format(instruccionActualizarTitulo, [imagen, enumeracion]);
    madservicesAdmindb.query(formatoInstruccionActualizarTitulo);
    //-- Eliminación de las imágenes locales.
    let eliminarArchivo = path.join(rutaAlDirectorio, file);
    let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
    await unlink(eliminarArchivo);
    await unlink(eliminarArchivoEdit);
}

//-- Creamos la función para actualizar el peso del producto MAD en la base de datos de MAD Services.
const actualizarPesodb = (enumeracion, peso) => {

    let instruccionActualizarPeso = 'UPDATE productos SET peso = ? WHERE enumeracion = ?';
    let formatoInstruccionActualizarPeso = mysql.format(instruccionActualizarPeso, [peso, enumeracion]);
    madservicesAdmindb.query(formatoInstruccionActualizarPeso);
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    actualizarCantidaddb,
    actualizarCategoriadb,
    actualizarDescripciondb,
    actualizarPreciodb,
    actualizarTitulodb,
    actualizarImagendb,
    actualizarPesodb
};
//#######################################################################################################//