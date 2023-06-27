//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../../../config/database.js');
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');
//-- Importamos la Tecnología para redimensionar las imágenes cargadas en local.
const sharp = require('sharp');

//-- Creamos las funciones para ingresar en la interfaz de empresa.
const actualizarDescripcionEmpresadb = (id, descripcion) => {

    let instruccionActualizarDescripcion = 'UPDATE empresas SET descripcion = ? WHERE id = ?';
    let formatoInstruccionActualizarDescripcion = mysql.format(instruccionActualizarDescripcion, [descripcion, id]);
    madservicesEmpresadb.query(formatoInstruccionActualizarDescripcion);
}

const actualizarInstagramEmpresadb = (id, estructuraInstagram) => {

    let instruccionActualizarInstagram = 'UPDATE empresas SET instagram = ? WHERE id = ?';
    let formatoInstruccionActualizarInstagram = mysql.format(instruccionActualizarInstagram, [estructuraInstagram, id]);
    madservicesEmpresadb.query(formatoInstruccionActualizarInstagram);
}

const actualizarTwitterEmpresadb = (id, estructuraTwitter) => {

    let instruccionActualizarTwitter = 'UPDATE empresas SET twitter = ? WHERE id = ?';
    let formatoInstruccionActualizarTwitter = mysql.format(instruccionActualizarTwitter, [estructuraTwitter, id]);
    madservicesEmpresadb.query(formatoInstruccionActualizarTwitter);
}

const actualizarWhatsAppEmpresadb = (id, whatsapp) => {

    let instruccionActualizarWhatsApp = 'UPDATE empresas SET whatsapp = ? WHERE id = ?';
    let formatoInstruccionActualizarWhatsApp = mysql.format(instruccionActualizarWhatsApp, [whatsapp, id]);
    madservicesEmpresadb.query(formatoInstruccionActualizarWhatsApp);
}

const actualizarPagWebEmpresadb = (id, pagweb) => {

    let instruccionActualizarPagWeb = 'UPDATE empresas SET pagweb = ? WHERE id = ?';
    let formatoInstruccionActualizarPagWeb = mysql.format(instruccionActualizarPagWeb, [pagweb, id]);
    madservicesEmpresadb.query(formatoInstruccionActualizarPagWeb);
}

const actualizarLogoEmpresadb = (id) => {

    let instruccionConsultarEnumeracion = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultarEnumeracion = mysql.format(instruccionConsultarEnumeracion, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultarEnumeracion, async (error) => {
        if(error) throw error;
        const rutaAlDirectorio = path.join(__dirname, '../../../../archivos');
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
        let instruccionActualizarLogo = 'UPDATE empresas SET logo = ? WHERE id = ?';
        let formatoInstruccionActualizarLogo = mysql.format(instruccionActualizarLogo, [imagen, id]);
        madservicesEmpresadb.query(formatoInstruccionActualizarLogo);
        //-- Eliminar localmente.
        let eliminarArchivo = path.join(rutaAlDirectorio, file);
        let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
        await unlink(eliminarArchivo);
        await unlink(eliminarArchivoEdit);
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    actualizarDescripcionEmpresadb,
    actualizarInstagramEmpresadb,
    actualizarTwitterEmpresadb,
    actualizarWhatsAppEmpresadb,
    actualizarPagWebEmpresadb,
    actualizarLogoEmpresadb
};
//#######################################################################################################//