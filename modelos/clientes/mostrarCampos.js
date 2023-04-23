//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../config/database.js');

//-- Creamos la función que saca parámetros de la base de datos de los Clientes.
function sacarParametrosClientedb(idCliente, callback) {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM clientes WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, idCliente);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesClientedb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        const tablaClientes = result[0];
        callback(tablaClientes);
    });
}

//-- Exportamos las funciones.
module.exports = sacarParametrosClientedb;