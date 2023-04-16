//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');

//-- Creamos la función que comprueba los datos de la base de datos y utilizarlos como variables.
function comprobarDatosclientedb(idCliente, callback) {

    //-- Instrucción.
    let instruccionID = 'SELECT * FROM clientes WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, idCliente);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesdb.query(formatoInstruccionID, (error, results) => {
        if(error) throw error;
        const datos = results[0];
        callback(datos);
    });
}

//-- Exportamos las funciones.
module.exports = comprobarDatosclientedb;