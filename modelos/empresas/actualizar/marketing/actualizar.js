//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../../../config/database.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');
//-- Importamos la Tecnología para redimensionar las imágenes cargadas en local.
const sharp = require('sharp');

//-- Creamos las funciones para ingresar en la interfaz de empresa.
const actualizarDescripcionEmpresadb = (id, descripcion, res) => {

    //-- Verificación de la descripción.
    if(descripcion) {
        const maxDescrip = 498;
        if(descripcion.length > maxDescrip) {
            //-- Mostrar Alerta Emergente.
            alerta(`La descripción no puede superar los ${maxDescrip} caracteres`);
            //-- Redirigir a la interfaz de la empresa.
            return res.status(401).redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Comprobamos que no haya descripción en base de datos.
            let instruccionComprobarDescripcion = 'SELECT * FROM empresas WHERE id = ?';
            //-- Formato de la instrucción.
            let formatoIinstruccionComprobarDescripcion = mysql.format(instruccionComprobarDescripcion, [id]);
            //-- Establecemos la conexión.
            madservicesEmpresadb.query(formatoIinstruccionComprobarDescripcion, (error) => {
                if(error) throw error;
                //-- Actualizamos la descripción en base de datos.
                let instruccionActualizarDescripcion = 'UPDATE empresas SET descripcion = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarDescripcion = mysql.format(instruccionActualizarDescripcion, [descripcion, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarDescripcion);
                //-- Mostrar Alerta Emergente.
                alerta('Nueva descripción introducida');
                //-- Redirigir a la interfaz de la empresa.
                return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
            });
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('La descripción no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const actualizarInstagramEmpresadb = (id, instagram, res) => {

    //-- Verificación del instagram.
    if(instagram) {
        const maxInstagram = 498;
        if(instagram.length > maxInstagram) {
            //-- Mostrar Alerta Emergente.
            alerta(`El instagram no puede superar los ${maxInstagram} caracteres`);
            //-- Redirigir a la interfaz de la empresa.
            return res.status(401).redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            const estructuraInstagram = `https://www.instagram.com/${instagram}/`;
            //-- Comprobamos que no haya descripción en base de datos.
            let instruccionComprobarInstagram = 'SELECT * FROM empresas WHERE id = ?';
            //-- Formato de la instrucción.
            let formatoIinstruccionComprobarInstagram = mysql.format(instruccionComprobarInstagram, [id]);
            //-- Establecemos la conexión.
            madservicesEmpresadb.query(formatoIinstruccionComprobarInstagram, (error) => {
                if(error) throw error;
                //-- Actualizamos la descripción en base de datos.
                let instruccionActualizarInstagram = 'UPDATE empresas SET instagram = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarInstagram = mysql.format(instruccionActualizarInstagram, [estructuraInstagram, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarInstagram);
                //-- Mostrar Alerta Emergente.
                alerta('Nuevo instagram introducido');
                //-- Redirigir a la interfaz de la empresa.
                return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
            });
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El instagram no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const actualizarTwitterEmpresadb = (id, twitter, res) => {

    //-- Verificación del twitter.
    if(twitter) {
        const maxTwitter = 498;
        if(twitter.length > maxTwitter) {
            //-- Mostrar Alerta Emergente.
            alerta(`El twitter no puede superar los ${maxTwitter} caracteres`);
            //-- Redirigir a la interfaz de la empresa.
            return res.status(401).redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            const estructuraTwitter = `https://twitter.com/${twitter}`;
            let instruccionComprobarTwitter = 'SELECT * FROM empresas WHERE id = ?';
            //-- Formato de la instrucción.
            let formatoIinstruccionComprobarTwitter = mysql.format(instruccionComprobarTwitter, [id]);
            //-- Establecemos la conexión.
            madservicesEmpresadb.query(formatoIinstruccionComprobarTwitter, (error) => {
                if(error) throw error;
                //-- Actualizamos la descripción en base de datos.
                let instruccionActualizarTwitter = 'UPDATE empresas SET twitter = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarTwitter = mysql.format(instruccionActualizarTwitter, [estructuraTwitter, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarTwitter);
                //-- Mostrar Alerta Emergente.
                alerta('Nuevo twitter introducido');
                //-- Redirigir a la interfaz de la empresa.
                return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
            });
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El twitter no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const actualizarWhatsAppEmpresadb = (id, whatsapp, res) => {

    //-- Verificación del whatsapp.
    if(whatsapp) {
        const maxBigInt = 17;
        if(whatsapp.length > maxBigInt) {
            //-- Mostrar Alerta Emergente.
            alerta(`El whatsapp no puede tener más de ${maxBigInt} números`);
            //-- Redirigir a la interfaz de la empresa.
            return res.status(401).redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            let instruccionComprobarWhatsApp = 'SELECT * FROM empresas WHERE id = ?';
            //-- Formato de la instrucción.
            let formatoIinstruccionComprobarWhatsApp = mysql.format(instruccionComprobarWhatsApp, [id]);
            //-- Establecemos la conexión.
            madservicesEmpresadb.query(formatoIinstruccionComprobarWhatsApp, (error) => {
                if(error) throw error;
                //-- Actualizamos la descripción en base de datos.
                let instruccionActualizarWhatsApp = 'UPDATE empresas SET whatsapp = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarWhatsApp = mysql.format(instruccionActualizarWhatsApp, [whatsapp, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarWhatsApp);
                //-- Mostrar Alerta Emergente.
                alerta('Nuevo nº de teléfono/whatsapp introducido');
                //-- Redirigir a la interfaz de la empresa.
                return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
            });
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El whatsapp no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const actualizarPagWebEmpresadb = (id, pagweb, res) => {
    
    //-- Verificación de la Página Web.
    if(pagweb) {
        const maxPagweb = 498;
        if(pagweb.length > maxPagweb) {
            //-- Mostrar Alerta Emergente.
            alerta(`La URL de la Página Web no puede superar los ${maxPagweb} caracteres`);
            //-- Redirigir a la interfaz de la empresa.
            return res.status(401).redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            let instruccionComprobarPagWeb = 'SELECT * FROM empresas WHERE id = ?';
            //-- Formato de la instrucción.
            let formatoIinstruccionComprobarPagWeb = mysql.format(instruccionComprobarPagWeb, [id]);
            //-- Establecemos la conexión.
            madservicesEmpresadb.query(formatoIinstruccionComprobarPagWeb, (error) => {
                if(error) throw error;
                //-- Actualizamos la descripción en base de datos.
                let instruccionActualizarPagWeb = 'UPDATE empresas SET pagweb = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarPagWeb = mysql.format(instruccionActualizarPagWeb, [pagweb, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarPagWeb);
                //-- Mostrar Alerta Emergente.
                alerta('Nueva Página Web introducida');
                //-- Redirigir a la interfaz de la empresa.
                return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
            });
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('La Página Web no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const actualizarLogoEmpresadb = (id, res) => {

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
        //-- Mostrar Alerta Emergente.
        alerta('Nuevo logo introducido');
        //-- Redirigir a la interfaz de la empresa.
        return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
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