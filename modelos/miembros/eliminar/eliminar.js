//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../../config/database.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos la función para Dar de Baja al Miembro MAD de la base de datos de MAD Services.
const darseBajaMiembrodb = (id, decideConfirmar, req, res) => {
    //-- Caso 1: dejar en blanco la confirmación.
    if(!decideConfirmar) {
        //-- Mostrar Alerta Emergente.
        alerta('Debes confirmar si decides dejar MAD Services o te quedas');
        // Redirigir a la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    //-- Caso 2: pulsar que no quieres darte de baja.
    }else if(decideConfirmar === 'No') {
        //-- Mostrar Alerta Emergente.
        alerta('¡Tómatelo como una renovación!');
        // Redirigir a la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    //-- Caso 3: pulsar que sí quieres darte de baja.
    }else if(decideConfirmar === 'Sí') {
        //-- Instrucción para dar de baja.
        let instruccionDarDeBajaMiembro = 'DELETE FROM miembros WHERE id = ?';
        //-- Configuración del formato de la instrucción dar de baja.
        let formatoinstruccionDarDeBajaMiembro = mysql.format(instruccionDarDeBajaMiembro, [id]);
        //-- Proceso de dar de baja.
        madservicesAdmindb.query(formatoinstruccionDarDeBajaMiembro);
        //-- Destruir sesión.
        req.session.destroy();
        //-- Mostrar Alerta Emergente.
        alerta('Miembro MAD dado de baja definitivamente');
        // Redirigir a la página principal de la aplicación.
        return res.redirect('/');
    }
}

//-- Creamos la función para borrar el producto MAD de la base de datos de MAD Services.
const borrarProductoMADdb = (ptoPartida) => {

    //-- Consultamos los productos MAD en la base de datos.
    let instruccionConsultarProductoMAD = 'SELECT * FROM productos WHERE enumeracion = ?';
    let formatoInstruccionConsultarProductoMAD = mysql.format(instruccionConsultarProductoMAD, [ptoPartida]);
    madservicesAdmindb.query(formatoInstruccionConsultarProductoMAD, (error, results) => {
        if(error) throw error;
        const titulo = results[0].titulo;
        //-- Borramos dicho producto de todos los carritos de los clientes.
        let instruccionBorrarProductoDeCarrito = 'DELETE FROM carrito WHERE titulo = ?';
        let formatoInstruccionBorrarProductoDeCarrito = mysql.format(instruccionBorrarProductoDeCarrito, [titulo]);
        madservicesAdmindb.query(formatoInstruccionBorrarProductoDeCarrito);
        //-- Borramos el producto MAD de la base de datos.
        let instruccionBorrarProductoMAD = 'DELETE FROM productos WHERE enumeracion = ?';
        let formatoInstruccionBorrarProductoMAD = mysql.format(instruccionBorrarProductoMAD, [ptoPartida]);
        madservicesAdmindb.query(formatoInstruccionBorrarProductoMAD);
    });
}

//-- Creamos la función para borrar los archivos multimedia MAD de la base de datos.
const borrarArchivosMultimediaMADdb = (id, enumeracion, res) => {

    let instruccionBorrarMultimediadb = 'SELECT * FROM multimedia WHERE enumeracion = ?';
    let formatoInstruccionBorrarMultimediadb = mysql.format(instruccionBorrarMultimediadb, [enumeracion]);
    madservicesAdmindb.query(formatoInstruccionBorrarMultimediadb, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            //-- Mostrar alerta.
            alerta('Sólo queda por borrar 1 imagen');
        }else {
            let instruccionBorrarImagenAimagen = 'DELETE FROM multimedia WHERE enumeracion = ?';
            let instruccionCambioAnuloUno = 'UPDATE multimedia SET ';
            let instruccionCambioAnuloDos = ' = NULL WHERE enumeracion = ?'
            if(results[0].filenueve !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'filenueve' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                //-- Mostrar alerta.
                alerta('Imagen 10 borrada');
            }else if(results[0].fileocho !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'fileocho' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                //-- Mostrar alerta.
                alerta('Imagen 9 borrada');
            }else if(results[0].filesiete !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'filesiete' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                //-- Mostrar alerta.
                alerta('Imagen 8 borrada');
            }else if(results[0].fileseis !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'fileseis' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                //-- Mostrar alerta.
                alerta('Imagen 7 borrada');
            }else if(results[0].filecinco !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'filecinco' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                //-- Mostrar alerta.
                alerta('Imagen 6 borrada');
            }else if(results[0].filecuatro !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'filecuatro' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                //-- Mostrar alerta.
                alerta('Imagen 5 borrada');
            }else if(results[0].filetres !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'filetres' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                //-- Mostrar alerta.
                alerta('Imagen 4 borrada');
            }else if(results[0].filedos !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'filedos' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                //-- Mostrar alerta.
                alerta('Imagen 3 borrada');
            }else {
                let formatoSolicitudDelBorradoImagenes = mysql.format(instruccionBorrarImagenAimagen, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                //-- Mostrar alerta.
                alerta('Imagen 2 borrada');
            }

        }
    });
    //-- Redirigir.
    return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices/expandir${enumeracion}`);
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    darseBajaMiembrodb,
    borrarProductoMADdb,
    borrarArchivosMultimediaMADdb
};
//#######################################################################################################//