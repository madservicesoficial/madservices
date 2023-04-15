//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');

//-- Creamos la función para consultar el ID de clientes y de empresas y asignarlo al recurso.
const conseguirID = (madservicesdb, id, callback) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultarIDcliente = 'SELECT id FROM clientes WHERE id = ?';
    let instruccionConsultarIDempresa = 'SELECT id FROM empresas WHERE id = ?';
    //-- Configuración del formato de los datos introducidos para consultar en base de datos.
    let formatoInstruccionConsultarIDcliente = mysql.format(instruccionConsultarIDcliente, [id]);
    let formatoInstruccionConsultarIDempresa = mysql.format(instruccionConsultarIDempresa, [id]);
    //-- Establecer la comunicación para consultar el email y la contraseña en la base de datos.
    madservicesdb.query(formatoInstruccionConsultarIDcliente, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            madservicesdb.query(formatoInstruccionConsultarIDempresa, (error, results) => {
                if(error) throw error;
                callback(results[0]);
            });
        }else {
            callback(results[0]);
        }
    });
}

//-- Exportamos las funciones.
module.exports = {conseguirID};