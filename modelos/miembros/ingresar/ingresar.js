//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../../config/database.js');
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales y para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para redimensionar las imágenes cargadas en local.
const sharp = require('sharp');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');

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
    const rutaAlDirectorio = path.join(__dirname, '../../../archivos');
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
    let fullFile = path.parse(file);
    let extension = fullFile.ext;
    if(extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
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
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Ingresado!',
                message: 'Producto ingresado con éxito',
                icon: path.join(__dirname, '../../../public/images/correcto.png')
            }
        );
        res.status(201);
        res.redirect(`/sesion-miembro/${id}/interfaz`);
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
                icon: path.join(__dirname, '../../../public/images/incorrecto.png')
            }
        );
        res.status(401);
        res.redirect(`/sesion-miembro/${id}/interfaz`);
        return res.end();
    }
}

//-- Creamos la función para ingresar más imágenes/vídeos en los productos MAD.
const ingresarArchivosMultimediaMADdb = (id, enumeracion, res) => {

    //-- Comprobar si existe dicha enumeración.
    let instruccionConsultarEnumeracion = 'SELECT * FROM multimedia WHERE enumeracion = ?';
    let formatoInstruccionConsultarEnumeracion = mysql.format(instruccionConsultarEnumeracion, [enumeracion]);
    madservicesAdmindb.query(formatoInstruccionConsultarEnumeracion, async (error, results) => {
        if(error) throw error;
        const rutaAlDirectorio = path.join(__dirname, '../../../archivos');
        const readdir = util.promisify(fs.readdir);
        const readFile = util.promisify(fs.readFile);
        const unlink = util.promisify(fs.unlink);
        const files = await readdir(rutaAlDirectorio);
        const file = files[0];
        let rutaAlArchivo = path.join(rutaAlDirectorio, file);
        let nuevaRuta = path.join(rutaAlDirectorio, 'edit' + file);
        await sharp(rutaAlArchivo).resize(260).toFile(nuevaRuta);
        let imagenBuffer = await readFile(nuevaRuta);
        let imagen = imagenBuffer.toString('base64');
        if(results.length === 0) {
            let solicitudIngresar = 'INSERT INTO multimedia (enumeracion, fileuno, filedos, filetres, filecuatro, filecinco, fileseis, filesiete, fileocho, filenueve) VALUES (?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)';
            madservicesAdmindb.query(solicitudIngresar, [enumeracion, imagen]);
            //-- Eliminación de los archivos en local.
            let eliminarArchivo = path.join(rutaAlDirectorio, file);
            let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
            await unlink(eliminarArchivo);
            await unlink(eliminarArchivoEdit);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Ingresado!',
                    message: 'Imagen 2 introducida',
                    icon: path.join(__dirname, '../../../public/images/correcto.png')
                }
            );
        }else {
            let solicitudActualizar = 'UPDATE multimedia SET';
            let solicitudVariable;
            let solicitudFinal = 'WHERE enumeracion = ?';
            if(results[0].filedos === null) {
                solicitudVariable = solicitudActualizar + ' filedos = ? ' + solicitudFinal;
                let formatoSolicitudActualizar = mysql.format(solicitudVariable, [imagen, enumeracion]);
                madservicesAdmindb.query(formatoSolicitudActualizar);
                //-- Eliminación de los archivos en local.
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
                await unlink(eliminarArchivo);
                await unlink(eliminarArchivoEdit);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Ingresado!',
                        message: 'Imagen 3 introducida',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].filetres === null) {
                solicitudVariable = solicitudActualizar + ' filetres = ? ' + solicitudFinal;
                let formatoSolicitudActualizar = mysql.format(solicitudVariable, [imagen, enumeracion]);
                madservicesAdmindb.query(formatoSolicitudActualizar);
                //-- Eliminación de los archivos en local.
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
                await unlink(eliminarArchivo);
                await unlink(eliminarArchivoEdit);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Ingresado!',
                        message: 'Imagen 4 introducida',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].filecuatro === null) {
                solicitudVariable = solicitudActualizar + ' filecuatro = ? ' + solicitudFinal;
                let formatoSolicitudActualizar = mysql.format(solicitudVariable, [imagen, enumeracion]);
                madservicesAdmindb.query(formatoSolicitudActualizar);
                //-- Eliminación de los archivos en local.
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
                await unlink(eliminarArchivo);
                await unlink(eliminarArchivoEdit);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Ingresado!',
                        message: 'Imagen 5 introducida',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].filecinco === null) {
                solicitudVariable = solicitudActualizar + ' filecinco = ? ' + solicitudFinal;
                let formatoSolicitudActualizar = mysql.format(solicitudVariable, [imagen, enumeracion]);
                madservicesAdmindb.query(formatoSolicitudActualizar);
                //-- Eliminación de los archivos en local.
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
                await unlink(eliminarArchivo);
                await unlink(eliminarArchivoEdit);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Ingresado!',
                        message: 'Imagen 6 introducida',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].fileseis === null) {
                solicitudVariable = solicitudActualizar + ' fileseis = ? ' + solicitudFinal;
                let formatoSolicitudActualizar = mysql.format(solicitudVariable, [imagen, enumeracion]);
                madservicesAdmindb.query(formatoSolicitudActualizar);
                //-- Eliminación de los archivos en local.
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
                await unlink(eliminarArchivo);
                await unlink(eliminarArchivoEdit);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Ingresado!',
                        message: 'Imagen 7 introducida',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].filesiete === null) {
                solicitudVariable = solicitudActualizar + ' filesiete = ? ' + solicitudFinal;
                let formatoSolicitudActualizar = mysql.format(solicitudVariable, [imagen, enumeracion]);
                madservicesAdmindb.query(formatoSolicitudActualizar);
                //-- Eliminación de los archivos en local.
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
                await unlink(eliminarArchivo);
                await unlink(eliminarArchivoEdit);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Ingresado!',
                        message: 'Antepenúltima imagen introducida',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].fileocho === null) {
                solicitudVariable = solicitudActualizar + ' fileocho = ? ' + solicitudFinal;
                let formatoSolicitudActualizar = mysql.format(solicitudVariable, [imagen, enumeracion]);
                madservicesAdmindb.query(formatoSolicitudActualizar);
                //-- Eliminación de los archivos en local.
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
                await unlink(eliminarArchivo);
                await unlink(eliminarArchivoEdit);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Ingresado!',
                        message: 'Penúltima imagen introducida',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].filenueve === null) {
                solicitudVariable = solicitudActualizar + ' filenueve = ? ' + solicitudFinal;
                let formatoSolicitudActualizar = mysql.format(solicitudVariable, [imagen, enumeracion]);
                madservicesAdmindb.query(formatoSolicitudActualizar);
                //-- Eliminación de los archivos en local.
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
                await unlink(eliminarArchivo);
                await unlink(eliminarArchivoEdit);
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Ingresado!',
                        message: 'Última imagen introducida',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Atención!',
                        message: 'No puedes introducir más imágenes',
                        icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                    }
                );
            }
        }
        //-- Redirigir.
        res.redirect(`/sesion-miembro/${id}/productosmadservices/expandir${enumeracion}`);
        return res.end();
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    ingresarProductosMADdb,
    ingresarArchivosMultimediaMADdb
};
//#######################################################################################################//