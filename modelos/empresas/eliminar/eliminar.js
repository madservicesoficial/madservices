//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../../config/database.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos la función para Dar de Baja a la Empresa de la base de datos de MAD Services.
const darseBajaEmpresadb = (id, confirmarOpcion, req, res) => {
    //-- Caso 1: dejar en blanco la confirmación.
    if(!confirmarOpcion) {
        //-- Mostrar Alerta Emergente.
        alerta('Debes confirmar si quieres o no darte de baja');
        // Redirigir a la interfaz de la Empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    //-- Caso 2: pulsar que no quieres darte de baja.
    }else if(confirmarOpcion === 'No') {
        //-- Mostrar Alerta Emergente.
        alerta('Gracias por no querer darte de baja');
        // Redirigir a la interfaz de la Empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    //-- Caso 3: pulsar que sí quieres darte de baja.
    }else if(confirmarOpcion === 'Sí') {
        //-- Instrucción para dar de baja.
        let instruccionDarDeBajaEmpresa = 'DELETE FROM empresas WHERE id = ?';
        //-- Configuración del formato de la instrucción dar de baja.
        let formatoinstruccionDarDeBajaEmpresa = mysql.format(instruccionDarDeBajaEmpresa, [id]);
        //-- Proceso de dar de baja.
        madservicesEmpresadb.query(formatoinstruccionDarDeBajaEmpresa);
        //-- Destruir sesión.
        req.session.destroy();
        //-- Mostrar Alerta Emergente.
        alerta('Empresa dada de baja definitivamente');
        // Redirigir a la página principal de la aplicación.
        return res.redirect('/');
    }
}

//-- Creamos las funciones para borrar en la interfaz de empresa.
const borrarDescripcionEmpresadb = (id, res) => {

    //-- Consultar si hay descripción para poder borrarla.
    let instruccionConsultaDescripcion = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultaDescripcion = mysql.format(instruccionConsultaDescripcion, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaDescripcion, (error, results) => {
        if(error) throw error;
        if(results[0].descripcion === null) {
            //-- Mostrar Alerta Emergente.
            alerta('No se puede borrar lo que no existe');
            //-- Redirigir a la interfaz de la empresa.
            return res.status(401).redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Proceso para borrar la descripción.
            let instruccionBorrarDescripcion = 'UPDATE empresas SET descripcion = NULL WHERE id = ?';
            let formatoInstruccionBorrarDescripcion = mysql.format(instruccionBorrarDescripcion, [id]);
            madservicesEmpresadb.query(formatoInstruccionBorrarDescripcion);
            //-- Mostrar Alerta Emergente.
            alerta('Descripción borrada con éxito');
            //-- Redirigir a la interfaz de la empresa.
            return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
        }
    });
}

const borrarInstagramEmpresadb = (id, res) => {
    
    //-- Consultar si hay instagram para poder borrarlo.
    let instruccionConsultaInstagram = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultaInstagram = mysql.format(instruccionConsultaInstagram, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaInstagram, (error, results) => {
        if(error) throw error;
        if(results[0].instagram === null) {
            //-- Mostrar Alerta Emergente.
            alerta('No se puede borrar lo que no existe');
            //-- Redirigir a la interfaz de la empresa.
            return res.status(401).redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Proceso para borrar el instagram.
            let instruccionBorrarInstagram = 'UPDATE empresas SET instagram = NULL WHERE id = ?';
            let formatoInstruccionBorrarInstagram = mysql.format(instruccionBorrarInstagram, [id]);
            madservicesEmpresadb.query(formatoInstruccionBorrarInstagram);
            //-- Mostrar Alerta Emergente.
            alerta('Instagram borrado con éxito');
            //-- Redirigir a la interfaz de la empresa.
            return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
        }
    });
}

const borrarPagWebEmpresadb = (id, res) => {
    
    //-- Consultar si hay página web para poder borrarla.
    let instruccionConsultaPagWeb = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultaPagWeb = mysql.format(instruccionConsultaPagWeb, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaPagWeb, (error, results) => {
        if(error) throw error;
        if(results[0].pagweb === null) {
            //-- Mostrar Alerta Emergente.
            alerta('No se puede borrar lo que no existe');
            //-- Redirigir a la interfaz de la empresa.
            return res.status(401).redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Proceso para borrar el instagram.
            let instruccionBorrarPagWeb = 'UPDATE empresas SET pagweb = NULL WHERE id = ?';
            let formatoInstruccionBorrarPagWeb = mysql.format(instruccionBorrarPagWeb, [id]);
            madservicesEmpresadb.query(formatoInstruccionBorrarPagWeb);
            //-- Mostrar Alerta Emergente.
            alerta('Página Web borrada con éxito');
            //-- Redirigir a la interfaz de la empresa.
            return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
        }
    });
}

const borrarTwitterEmpresadb = (id, res) => {
    
    //-- Consultar si hay twitter para poder borrarlo.
    let instruccionConsultaTwitter = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultaTwitter = mysql.format(instruccionConsultaTwitter, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaTwitter, (error, results) => {
        if(error) throw error;
        if(results[0].twitter === null) {
            //-- Mostrar Alerta Emergente.
            alerta('No se puede borrar lo que no existe');
            //-- Redirigir a la interfaz de la empresa.
            return res.status(401).redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Proceso para borrar el instagram.
            let instruccionBorrarTwitter = 'UPDATE empresas SET twitter = NULL WHERE id = ?';
            let formatoInstruccionBorrarTwitter = mysql.format(instruccionBorrarTwitter, [id]);
            madservicesEmpresadb.query(formatoInstruccionBorrarTwitter);
            //-- Mostrar Alerta Emergente.
            alerta('Twitter borrado con éxito');
            //-- Redirigir a la interfaz de la empresa.
            return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
        }
    });
}

const borrarWhatsAppEmpresadb = (id, res) => {
    
    //-- Consultar si hay whatsapp para poder borrarlo.
    let instruccionConsultaWhatsApp = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultaWhatsApp = mysql.format(instruccionConsultaWhatsApp, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaWhatsApp, (error, results) => {
        if(error) throw error;
        if(results[0].whatsapp === null) {
            //-- Mostrar Alerta Emergente.
            alerta('No se puede borrar lo que no existe');
            //-- Redirigir a la interfaz de la empresa.
            return res.status(401).redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Proceso para borrar el instagram.
            let instruccionBorrarWhatsApp = 'UPDATE empresas SET whatsapp = NULL WHERE id = ?';
            let formatoInstruccionBorrarWhatsApp = mysql.format(instruccionBorrarWhatsApp, [id]);
            madservicesEmpresadb.query(formatoInstruccionBorrarWhatsApp);
            //-- Mostrar Alerta Emergente.
            alerta('WhatsApp borrado con éxito');
            //-- Redirigir a la interfaz de la empresa.
            return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
        }
    });
}

const borrarLogoEmpresadb = (id, res) => {

    let instruccionConsultarLogo = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultarLogo = mysql.format(instruccionConsultarLogo, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultarLogo, (error, results) => {
        if(error) throw error;
        if(results[0].logo === null) {
            //-- Mostrar Alerta Emergente.
            alerta('No se puede borrar lo que no existe');
            //-- Redirigir a la interfaz de la empresa.
            return res.status(401).redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            let instruccionBorrarLogo = 'UPDATE empresas SET logo = NULL WHERE id = ?';
            let formatoInstruccionBorrarLogo = mysql.format(instruccionBorrarLogo, [id]);
            madservicesEmpresadb.query(formatoInstruccionBorrarLogo);
            //-- Mostrar Alerta Emergente.
            alerta('Logo borrado con éxito');
            //-- Redirigir a la interfaz de la empresa.
            return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
        }
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    darseBajaEmpresadb,
    borrarDescripcionEmpresadb,
    borrarInstagramEmpresadb,
    borrarPagWebEmpresadb,
    borrarTwitterEmpresadb,
    borrarWhatsAppEmpresadb,
    borrarLogoEmpresadb
};
//#######################################################################################################//