//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../config/database.js');

//-- Creamos la función que saca el Twitter de la base de datos de las Empresas.
function mostrarTwitterdb(id) {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM companyt WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, [id]);
    //-- Establecer la comunicación de consultar ID en la base de datos para sacarlo como variable.
    return new Promise((resolve) => {
        madservicesEmpresadb.query(formatoInstruccionID, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                const zero = 0;
                resolve(zero);
            }else {
                const twitter = results[0].twitter;
                resolve(twitter);
            }
        });
    });
}

//-- Exportamos las funciones.
module.exports = mostrarTwitterdb;