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

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    darseBajaMiembrodb,
    borrarProductoMADdb
};
//#######################################################################################################//