//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../../config/database.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
//-- Importamos la Tecnología para redimensionar las imágenes cargadas en local.
const sharp = require('sharp');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');

//-- Creamos la función para ingresar los productos MAD en la base de datos de MAD Services.
const ingresarProductosMADdb = async (id, data, res) => {

    //-- Reiniciar la enumeración de productos.
    let instruccionReiniciarEnumeracion = 'SELECT * FROM productos';
    let formatoInstruccionReiniciarEnumeracion = mysql.format(instruccionReiniciarEnumeracion);
    madservicesAdmindb.query(formatoInstruccionReiniciarEnumeracion, (error, results) => {
        if(error) throw error;
        let hayProductos = results.length;
        hayProductos = hayProductos + 1;
        madservicesAdmindb.query('ALTER TABLE productos AUTO_INCREMENT = ?', [hayProductos]);
    });

    //-- Ruta al directorio de las imágenes almacenadas localmente.
    const rutaAlDirectorio = path.join(__dirname, '../../../imagenes');
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

    if(typeof file === 'string') {
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
        //-- Instrucción para ingresar productos.
        let instruccionIngresaProductos = 'INSERT INTO productos (portada, cantidad, producto, titulo, precio, peso, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)';
        //-- Establecimiento de la conexión con base de datos.
        madservicesAdmindb.query(instruccionIngresaProductos, [imagen, data.cantidad, data.categoria, data.titulo, data.precio, data.peso, data.descripcion]);

        //-- Eliminación de las imágenes locales.
        let eliminarArchivo = path.join(rutaAlDirectorio, file);
        let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
        await unlink(eliminarArchivo);
        await unlink(eliminarArchivoEdit);

        //-- Mostrar Alerta Emergente.
        alerta('Producto ingresado con éxito');
        // Redirigir a la página de la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('Debes introducir una imagen de portada');
        // Redirigir a la página de la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }
}

//-- Creamos la función para ingresar más imágenes/vídeos en los productos MAD.
const ingresarArchivosMultimediaMADdb =  (id, enumeracion, res) => {

    //-- Comprobar si existe dicha enumeración.
    let instruccionConsultarEnumeracion = 'SELECT * FROM multimedia WHERE enumeracion = ?';
    let formatoInstruccionConsultarEnumeracion = mysql.format(instruccionConsultarEnumeracion, [enumeracion]);
    madservicesAdmindb.query(formatoInstruccionConsultarEnumeracion, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            const rutaAlDirectorio = path.join(__dirname, '../../../imagenes');
            
            try {
                const files = fs.readdirSync(rutaAlDirectorio);

                let archivos = new Array(files.length);
        
                for(let i=0; i<files.length; i++) {
                    let file = files[i];
                    let rutaAlArchivo = path.join(rutaAlDirectorio, file);
                    let nuevaRuta = path.join(rutaAlDirectorio, 'edit' + file);
                    sharp(rutaAlArchivo).resize(260).toFile(nuevaRuta);
                    let imagenBuffer = fs.readFileSync(nuevaRuta);
                    archivos[i] = imagenBuffer.toString('base64');
                }

                //-- Insertamos todas en la base de datos.
                let solicitud = 'INSERT INTO multimedia (enumeracion, fileuno, filedos, filetres, filecuatro, filecinco, fileseis, filesiete, fileocho) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                madservicesAdmindb.query(solicitud, [enumeracion, archivos[0], archivos[1], archivos[2], archivos[3], archivos[4], archivos[5], archivos[6], archivos[7]]);
                
                //-- Eliminación de los archivos en local.
                for(let j=0; j<files.length; j++) {
                    let file = files[j];
                    let eliminarArchivo = path.join(rutaAlDirectorio, file);
                    let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
                    fs.unlinkSync(eliminarArchivo);
                    fs.unlinkSync(eliminarArchivoEdit);
                }
            }catch (error) {
                console.log('Error al procesar los archivos: ', error);
            }
        }else {

        }
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    ingresarProductosMADdb,
    ingresarArchivosMultimediaMADdb
};
//#######################################################################################################//