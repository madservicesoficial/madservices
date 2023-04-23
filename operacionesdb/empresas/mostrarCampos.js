//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../config/database.js');

//-- Creamos la función que saca parámetros de la base de datos de las Empresas.
function sacarParametrosEmpresadb(idEmpresa, callback) {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM empresas WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, idEmpresa);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesEmpresadb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        const tablaEmpresas = result[0];
        callback(tablaEmpresas);
    });
}

//-- Exportamos las funciones.
module.exports = sacarParametrosEmpresadb;