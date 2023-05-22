//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../../config/database.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos las funciones para ingresar en la interfaz de empresa.
const ingresoDescripcionEmpresadb = (id, descripcion, res) => {

    //-- Verificación de la descripción.
    if(descripcion) {
        const maxDescrip = 498;
        if(descripcion > maxDescrip) {
            //-- Mostrar Alerta Emergente.
            alerta(`La descripción no puede superar los ${maxDescrip}`);
            //-- Redirigir a la interfaz de la empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Comprobamos que no haya descripción en base de datos.
            let instruccionComprobarDescripcion = 'SELECT * FROM companyd WHERE id = ?';
            //-- Formato de la instrucción.
            let formatoIinstruccionComprobarDescripcion = mysql.format(instruccionComprobarDescripcion, [id]);
            //-- Establecemos la conexión.
            madservicesEmpresadb.query(formatoIinstruccionComprobarDescripcion, (error, results) => {
                if(error) throw error;
                if(results[0] === undefined) {
                    //-- Ingresamos la descripción en base de datos.
                    let instruccionIngresarDescripcion = 'INSERT INTO companyd (id, descripcion) values (?, ?)';
                    //-- Formato de la instrucción.
                    let formatoInstruccionIngresarDescripcion = mysql.format(instruccionIngresarDescripcion, [id, descripcion]);
                    //-- Establecemos la conexión.
                    madservicesEmpresadb.query(formatoInstruccionIngresarDescripcion);
                    //-- Mostrar Alerta Emergente.
                    alerta('La descripción ha sido ingresada con éxito');
                    //-- Redirigir a la interfaz de la empresa.
                    return res.redirect(`/sesion-empresa/${id}/interfaz`);
                }else {
                    //-- Actualizamos la descripción en base de datos.
                    let instruccionActualizarDescripcion = 'UPDATE companyd SET descripcion = ? WHERE id = ?';
                    //-- Formato de la instrucción.
                    let formatoInstruccionActualizarDescripcion = mysql.format(instruccionActualizarDescripcion, [descripcion, id]);
                    //-- Establecemos la conexión.
                    madservicesEmpresadb.query(formatoInstruccionActualizarDescripcion);
                    //-- Mostrar Alerta Emergente.
                    alerta('La descripción ha sido actualizada con éxito');
                    //-- Redirigir a la interfaz de la empresa.
                    return res.redirect(`/sesion-empresa/${id}/interfaz`);
                }
            });
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('La descripción no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const ingresoInstagramEmpresadb = (id, instagram, res) => {

    //-- Verificación del instagram.
    if(instagram) {
        //-- Cte estructura de la URL de instagram.
        const estructuraInstagram = `https://www.instagram.com/${instagram}/`;
        //-- Comprobamos que no haya instagram en base de datos.
        let instruccionComprobarInstagram = 'SELECT * FROM companyi WHERE id = ?';
        //-- Formato de la instrucción.
        let formatoInstruccionComprobarInstagram = mysql.format(instruccionComprobarInstagram, [id]);
        //-- Establecemos la conexión.
        madservicesEmpresadb.query(formatoInstruccionComprobarInstagram, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                //-- Ingresamos el instagram en base de datos.
                let instruccionIngresarInstagram = 'INSERT INTO companyi (id, instagram) values (?, ?)';
                //-- Formato de la instrucción.
                let formatoInstruccionIngresarInstagram = mysql.format(instruccionIngresarInstagram, [id, estructuraInstagram]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionIngresarInstagram);
                //-- Mostrar Alerta Emergente.
                alerta('El instagram ha sido ingresado con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }else {
                //-- Actualizamos el instagram en base de datos.
                let instruccionActualizarInstagram = 'UPDATE companyi SET instagram = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarInstagram = mysql.format(instruccionActualizarInstagram, [estructuraInstagram, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarInstagram);
                //-- Mostrar Alerta Emergente.
                alerta('El instagram ha sido actualizado con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }
        });
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El instagram no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const ingresoTwitterEmpresadb = (id, twitter, res) => {

    //-- Verificación del twitter.
    if(twitter) {
        //-- Cte estructura de la URL de twitter.
        const estructuraTwitter = `https://twitter.com/${twitter}`;
        //-- Comprobamos que no haya twitter en base de datos.
        let instruccionComprobarTwitter = 'SELECT * FROM companyt WHERE id = ?';
        //-- Formato de la instrucción.
        let formatoInstruccionComprobarTwitter = mysql.format(instruccionComprobarTwitter, [id]);
        //-- Establecemos la conexión.
        madservicesEmpresadb.query(formatoInstruccionComprobarTwitter, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                //-- Ingresamos el twitter en base de datos.
                let instruccionIngresarTwitter = 'INSERT INTO companyt (id, twitter) values (?, ?)';
                //-- Formato de la instrucción.
                let formatoInstruccionIngresarTwitter = mysql.format(instruccionIngresarTwitter, [id, estructuraTwitter]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionIngresarTwitter);
                //-- Mostrar Alerta Emergente.
                alerta('El twitter ha sido ingresado con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }else {
                //-- Actualizamos el twitter en base de datos.
                let instruccionActualizarTwitter = 'UPDATE companyt SET twitter = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarTwitter = mysql.format(instruccionActualizarTwitter, [estructuraTwitter, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarTwitter);
                //-- Mostrar Alerta Emergente.
                alerta('El twitter ha sido actualizado con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }
        });
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El twitter no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const ingresoWhatsAppEmpresadb = (id, whatsapp, res) => {

    //-- Verificación del whatsapp.
    if(whatsapp) {
        //-- Comprobamos que no haya whatsapp en base de datos.
        let instruccionComprobarWhatsapp = 'SELECT * FROM companyw WHERE id = ?';
        //-- Formato de la instrucción.
        let formatoInstruccionComprobarWhatsapp = mysql.format(instruccionComprobarWhatsapp, [id]);
        //-- Establecemos la conexión.
        madservicesEmpresadb.query(formatoInstruccionComprobarWhatsapp, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                //-- Ingresamos el whatsapp en base de datos.
                let instruccionIngresarWhatsapp = 'INSERT INTO companyw (id, whatsapp) values (?, ?)';
                //-- Formato de la instrucción.
                let formatoInstruccionIngresarWhatsapp = mysql.format(instruccionIngresarWhatsapp, [id, whatsapp]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionIngresarWhatsapp);
                //-- Mostrar Alerta Emergente.
                alerta('El whatsapp ha sido ingresado con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }else {
                //-- Actualizamos el whatsapp en base de datos.
                let instruccionActualizarWhatsapp = 'UPDATE companyw SET whatsapp = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarWhatsapp = mysql.format(instruccionActualizarWhatsapp, [whatsapp, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarWhatsapp);
                //-- Mostrar Alerta Emergente.
                alerta('El whatsapp ha sido actualizado con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }
        });
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El whatsapp no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const ingresoPagWebEmpresadb = (id, pagweb, res) => {
    
    //-- Verificación de la Página Web.
    if(pagweb) {
        //-- Comprobamos que no haya Página Web en base de datos.
        let instruccionComprobarPagWeb = 'SELECT * FROM companypg WHERE id = ?';
        //-- Formato de la instrucción.
        let formatoInstruccionComprobarPagWeb = mysql.format(instruccionComprobarPagWeb, [id]);
        //-- Establecemos la conexión.
        madservicesEmpresadb.query(formatoInstruccionComprobarPagWeb, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                //-- Ingresamos el whatsapp en base de datos.
                let instruccionIngresarPagWeb = 'INSERT INTO companypg (id, pagweb) values (?, ?)';
                //-- Formato de la instrucción.
                let formatoInstruccionIngresarPagWeb = mysql.format(instruccionIngresarPagWeb, [id, pagweb]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionIngresarPagWeb);
                //-- Mostrar Alerta Emergente.
                alerta('La Página Web ha sido ingresada con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }else {
                //-- Actualizamos la Página Web en base de datos.
                let instruccionActualizarPagWeb = 'UPDATE companypg SET pagweb = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarPagWeb = mysql.format(instruccionActualizarPagWeb, [pagweb, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarPagWeb);
                //-- Mostrar Alerta Emergente.
                alerta('La Página Web ha sido actualizada con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }
        });
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('La Página Web no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    ingresoDescripcionEmpresadb,
    ingresoInstagramEmpresadb,
    ingresoTwitterEmpresadb,
    ingresoWhatsAppEmpresadb,
    ingresoPagWebEmpresadb
};
//#######################################################################################################//