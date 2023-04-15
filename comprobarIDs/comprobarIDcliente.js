//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');

//-- Creamos la función que comprueba el ID de la base de datos para no repetir.
function comprobarIDclientedb(idCliente, callback) {

    //-- Instrucción para no repetir ID.
    let instruccionID = 'SELECT COUNT(*) AS count FROM clientes WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, idCliente);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesdb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        const valor = result[0].count;
        callback(valor > 0);
    });
}

//-- Exportamos las funciones.
module.exports = comprobarIDclientedb;