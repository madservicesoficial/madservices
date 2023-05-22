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
    let instruccionConsultaDescripcion = 'SELECT * FROM companyd WHERE id = ?';
    let formatoInstruccionConsultaDescripcion = mysql.format(instruccionConsultaDescripcion, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaDescripcion, (error, results) => {
        if(error) throw error;
        if(results[0] === undefined) {
            //-- Mostrar Alerta Emergente.
            alerta('No se puede borrar lo que no existe');
            //-- Redirigir a la interfaz de la empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Proceso para borrar la descripción.
            let instruccionBorrarDescripcion = 'DELETE FROM companyd WHERE id = ?';
            let formatoInstruccionBorrarDescripcion = mysql.format(instruccionBorrarDescripcion, [id]);
            madservicesEmpresadb.query(formatoInstruccionBorrarDescripcion);
            //-- Mostrar Alerta Emergente.
            alerta('Descripción borrada con éxito');
            //-- Redirigir a la interfaz de la empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }
    });
}

const borrarInstagramEmpresadb = (id, res) => {
    
    //-- Consultar si hay instagram para poder borrarlo.
    let instruccionConsultaInstagram = 'SELECT * FROM companyi WHERE id = ?';
    let formatoInstruccionConsultaInstagram = mysql.format(instruccionConsultaInstagram, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaInstagram, (error, results) => {
        if(error) throw error;
        if(results[0] === undefined) {
            //-- Mostrar Alerta Emergente.
            alerta('No se puede borrar lo que no existe');
            //-- Redirigir a la interfaz de la empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Proceso para borrar la descripción.
            let instruccionBorrarInstagram = 'DELETE FROM companyi WHERE id = ?';
            let formatoInstruccionBorrarInstagram = mysql.format(instruccionBorrarInstagram, [id]);
            madservicesEmpresadb.query(formatoInstruccionBorrarInstagram);
            //-- Mostrar Alerta Emergente.
            alerta('Usuario de instagram borrado con éxito');
            //-- Redirigir a la interfaz de la empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }
    });
}

const borrarPagWebEmpresadb = (id, res) => {
    
    //-- Consultar si hay página web para poder borrarla.
    let instruccionConsultaPagWeb = 'SELECT * FROM companypg WHERE id = ?';
    let formatoInstruccionConsultaPagWeb = mysql.format(instruccionConsultaPagWeb, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaPagWeb, (error, results) => {
        if(error) throw error;
        if(results[0] === undefined) {
            //-- Mostrar Alerta Emergente.
            alerta('No se puede borrar lo que no existe');
            //-- Redirigir a la interfaz de la empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Proceso para borrar la descripción.
            let instruccionBorrarPagWeb = 'DELETE FROM companypg WHERE id = ?';
            let formatoInstruccionBorrarPagWeb = mysql.format(instruccionBorrarPagWeb, [id]);
            madservicesEmpresadb.query(formatoInstruccionBorrarPagWeb);
            //-- Mostrar Alerta Emergente.
            alerta('URL de la Página Web borrada con éxito');
            //-- Redirigir a la interfaz de la empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }
    });
}

const borrarTwitterEmpresadb = (id, res) => {
    
    //-- Consultar si hay twitter para poder borrarlo.
    let instruccionConsultaTwitter = 'SELECT * FROM companyt WHERE id = ?';
    let formatoInstruccionConsultaTwitter = mysql.format(instruccionConsultaTwitter, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaTwitter, (error, results) => {
        if(error) throw error;
        if(results[0] === undefined) {
            //-- Mostrar Alerta Emergente.
            alerta('No se puede borrar lo que no existe');
            //-- Redirigir a la interfaz de la empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Proceso para borrar la descripción.
            let instruccionBorrarTwitter = 'DELETE FROM companyt WHERE id = ?';
            let formatoInstruccionBorrarTwitter = mysql.format(instruccionBorrarTwitter, [id]);
            madservicesEmpresadb.query(formatoInstruccionBorrarTwitter);
            //-- Mostrar Alerta Emergente.
            alerta('Usuario de twitter borrado con éxito');
            //-- Redirigir a la interfaz de la empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }
    });
}

const borrarWhatsAppEmpresadb = (id, res) => {
    
    //-- Consultar si hay whatsapp para poder borrarlo.
    let instruccionConsultaWhatsApp = 'SELECT * FROM companyw WHERE id = ?';
    let formatoInstruccionConsultaWhatsApp = mysql.format(instruccionConsultaWhatsApp, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultaWhatsApp, (error, results) => {
        if(error) throw error;
        if(results[0] === undefined) {
            //-- Mostrar Alerta Emergente.
            alerta('No se puede borrar lo que no existe');
            //-- Redirigir a la interfaz de la empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Proceso para borrar la descripción.
            let instruccionBorrarWhatsApp = 'DELETE FROM companyw WHERE id = ?';
            let formatoInstruccionBorrarWhatsApp = mysql.format(instruccionBorrarWhatsApp, [id]);
            madservicesEmpresadb.query(formatoInstruccionBorrarWhatsApp);
            //-- Mostrar Alerta Emergente.
            alerta('whatsapp/teléfono borrado con éxito');
            //-- Redirigir a la interfaz de la empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
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
    borrarWhatsAppEmpresadb
};
//#######################################################################################################//