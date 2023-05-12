//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../config/database.js');

//-- Creamos la función que saca parámetros de la base de datos de los Miembros MAD.
const mostrarGenerodb = (id) => {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM miembros WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, [id]);
    //-- Establecer la comunicación de consultar ID en la base de datos para sacarlo como variable.
    return new Promise((resolve) => {
        madservicesAdmindb.query(formatoInstruccionID, (error, results) => {
            if(error) throw error;
            const genero = results[0].genero;
            resolve(genero);
        });
    });
}

//-- Exportamos las funciones.
module.exports = mostrarGenerodb;