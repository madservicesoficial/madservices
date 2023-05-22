//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');

//-- Creamos la función para adquirir el nombre y los apellidos del cliente y meterlos en la variable.
const adquirirNombredb = (id) => {

    let instruccionConsultaNombreApellidos = 'SELECT * FROM clientes WHERE id = ?';
    let formatoInstruccionConsultaNombreApellidos = mysql.format(instruccionConsultaNombreApellidos, [id]);
    return new Promise((resolve) => {
        madservicesClientedb.query(formatoInstruccionConsultaNombreApellidos, (error, results) => {
            if(error) throw error;
            const nombre = results[0].nombre;
            const apellidos = results[0].apellidos;
            const cliente = nombre + ' ' + apellidos;
            resolve(cliente);
        });
    });
}

//-- Creamos la función para guardar la tarjeta bancaria del cliente si así lo ha querido.
const guardaTarjetadb = (id, nombreTarjeta, numTarjeta, newExpiracion, cvv) => {

    let instruccionComprobarExistenciaTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionComprobarExistenciaTarjetaBank = mysql.format(instruccionComprobarExistenciaTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionComprobarExistenciaTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            let instruccionIngresarTarjetaBank = 'INSERT INTO tarjeta (id, cliente, numcard, expiracion, cvv) VALUES (?, ?, ?, ?, ?)';
            let formatoInstruccionIngresarTarjetaBank = mysql.format(instruccionIngresarTarjetaBank, [id, nombreTarjeta, numTarjeta, newExpiracion, cvv]);
            madservicesClientedb.query(formatoInstruccionIngresarTarjetaBank);
        }
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    adquirirNombredb,
    guardaTarjetadb
};
//#######################################################################################################//