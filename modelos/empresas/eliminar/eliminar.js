//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../../config/database.js');

//-- Creamos la función para Dar de Baja a la Empresa de la base de datos de MAD Services.
const darseBajaEmpresadb = (id) => {

    let instruccionDarDeBajaEmpresa = 'DELETE FROM empresas WHERE id = ?';
    let formatoinstruccionDarDeBajaEmpresa = mysql.format(instruccionDarDeBajaEmpresa, [id]);
    madservicesEmpresadb.query(formatoinstruccionDarDeBajaEmpresa);
}

//-- Creamos la función para consultar la descripción de la interfaz de empresa.
const consultarDescripcionEmpresadb = (id, callback) => {

    let instruccionConsultaDescripcion = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultaDescripcion = mysql.format(instruccionConsultaDescripcion, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaDescripcion, (error, results) => {
        if(error) throw error;
        callback(results[0].descripcion);
    });
}

//-- Creamos la función para borrar la descripción de la interfaz de empresa.
const borrarDescripcionEmpresadb = (id) => {

    let instruccionBorrarDescripcion = 'UPDATE empresas SET descripcion = NULL WHERE id = ?';
    let formatoInstruccionBorrarDescripcion = mysql.format(instruccionBorrarDescripcion, [id]);
    madservicesEmpresadb.query(formatoInstruccionBorrarDescripcion);
}

//-- Creamos la función para consultar el instagram de la interfaz de empresa.
const consultarInstagramEmpresadb = (id, callback) => {
    
    let instruccionConsultaInstagram = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultaInstagram = mysql.format(instruccionConsultaInstagram, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaInstagram, (error, results) => {
        if(error) throw error;
        callback(results[0].instagram);
    });
}

//-- Creamos la función para borrar el instagram de la interfaz de empresa.
const borrarInstagramEmpresadb = (id) => {

    let instruccionBorrarInstagram = 'UPDATE empresas SET instagram = NULL WHERE id = ?';
    let formatoInstruccionBorrarInstagram = mysql.format(instruccionBorrarInstagram, [id]);
    madservicesEmpresadb.query(formatoInstruccionBorrarInstagram);
}

//-- Creamos la función para consultar la Página Web de la interfaz de empresa.
const consultarPagWebEmpresadb = (id, callback) => {
    
    let instruccionConsultaInstagram = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultaInstagram = mysql.format(instruccionConsultaInstagram, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaInstagram, (error, results) => {
        if(error) throw error;
        callback(results[0].pagweb);
    });
}

//-- Creamos la función para borrar la Página Web de la interfaz de empresa.
const borrarPagWebEmpresadb = (id) => {
    
    let instruccionBorrarPagWeb = 'UPDATE empresas SET pagweb = NULL WHERE id = ?';
    let formatoInstruccionBorrarPagWeb = mysql.format(instruccionBorrarPagWeb, [id]);
    madservicesEmpresadb.query(formatoInstruccionBorrarPagWeb);
}

//-- Creamos la función para consultar el twitter de la interfaz de empresa.
const consultarTwitterEmpresadb = (id, callback) => {
    
    let instruccionConsultaInstagram = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultaInstagram = mysql.format(instruccionConsultaInstagram, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaInstagram, (error, results) => {
        if(error) throw error;
        callback(results[0].twitter);
    });
}

//-- Creamos la función para borrar el twitter de la interfaz de empresa.
const borrarTwitterEmpresadb = (id) => {
    
    let instruccionBorrarTwitter = 'UPDATE empresas SET twitter = NULL WHERE id = ?';
    let formatoInstruccionBorrarTwitter = mysql.format(instruccionBorrarTwitter, [id]);
    madservicesEmpresadb.query(formatoInstruccionBorrarTwitter);
}

//-- Creamos la función para consultar el whatsapp de la interfaz de empresa.
const consultarWhatsAppEmpresadb = (id, callback) => {
    
    let instruccionConsultaInstagram = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultaInstagram = mysql.format(instruccionConsultaInstagram, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaInstagram, (error, results) => {
        if(error) throw error;
        callback(results[0].whatsapp);
    });
}

//-- Creamos la función para borrar el whatsapp de la interfaz de empresa.
const borrarWhatsAppEmpresadb = (id) => {
    
    let instruccionBorrarWhatsApp = 'UPDATE empresas SET whatsapp = NULL WHERE id = ?';
    let formatoInstruccionBorrarWhatsApp = mysql.format(instruccionBorrarWhatsApp, [id]);
    madservicesEmpresadb.query(formatoInstruccionBorrarWhatsApp);
}

//-- Creamos la función para consultar el logo de la interfaz de empresa.
const consultarLogoEmpresadb = (id, callback) => {
    
    let instruccionConsultaInstagram = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultaInstagram = mysql.format(instruccionConsultaInstagram, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaInstagram, (error, results) => {
        if(error) throw error;
        callback(results[0].logo);
    });
}

//-- Creamos la función para borrar el logo de la interfaz de empresa.
const borrarLogoEmpresadb = (id) => {

    let instruccionBorrarLogo = 'UPDATE empresas SET logo = NULL WHERE id = ?';
    let formatoInstruccionBorrarLogo = mysql.format(instruccionBorrarLogo, [id]);
    madservicesEmpresadb.query(formatoInstruccionBorrarLogo);
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    darseBajaEmpresadb,
    consultarDescripcionEmpresadb,
    borrarDescripcionEmpresadb,
    consultarInstagramEmpresadb,
    borrarInstagramEmpresadb,
    consultarPagWebEmpresadb,
    borrarPagWebEmpresadb,
    consultarTwitterEmpresadb,
    borrarTwitterEmpresadb,
    consultarWhatsAppEmpresadb,
    borrarWhatsAppEmpresadb,
    consultarLogoEmpresadb,
    borrarLogoEmpresadb
};
//#######################################################################################################//