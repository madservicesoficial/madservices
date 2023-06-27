//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');

//-- Creamos la función para consultar el producto MAD a añadir en el carrito de la compra del cliente.
const consultaProductosMADdb = (numProducto, callback) => {

    let instruccionConsultaProductoMAD = 'SELECT * FROM productos WHERE enumeracion = ?'
    let formatoInstruccionConsultaProductoMAD = mysql.format(instruccionConsultaProductoMAD, [numProducto]);
    madservicesClientedb.query(formatoInstruccionConsultaProductoMAD, (error, results) => {
        if(error) throw error;
        callback(results[0]);
    });
}

//-- Creamos la función para consultar si el producto MAD está en el carrito de la compra del cliente.
const consultaCarritodb = (id, titulo, callback) => {

    let instruccionConsultaCarrito = 'SELECT * FROM carrito WHERE titulo = ? AND id = ?'
    let formatoInstruccionConsultaCarrito = mysql.format(instruccionConsultaCarrito, [titulo, id]);
    madservicesClientedb.query(formatoInstruccionConsultaCarrito, (error, results) => {
        if(error) throw error;
        callback(results.length);
    });
}

//-- Creamos la función para consultar la cantidad del producto MAD en el carrito de la compra del cliente.
const consultaCantidadEnCarritodb = (id, titulo, callback) => {

    let instruccionConsultaCarrito = 'SELECT * FROM carrito WHERE titulo = ? AND id = ?'
    let formatoInstruccionConsultaCarrito = mysql.format(instruccionConsultaCarrito, [titulo, id]);
    madservicesClientedb.query(formatoInstruccionConsultaCarrito, (error, results) => {
        if(error) throw error;
        callback(results[0]);
    });
}

//-- Creamos la función para ingresar el producto en el carrito de la compra de la base de datos y de la web de MAD Services.
const ingresoCarritodb = (id, titulo, precio) => {

    let instruccionIngresoCarrito = 'INSERT INTO carrito (id, cantidad, titulo, precio) VALUES (?, ?, ?, ?)';
    let formatoInstruccionIngresoCarrito = mysql.format(instruccionIngresoCarrito, [id, 1, titulo, precio]);
    madservicesClientedb.query(formatoInstruccionIngresoCarrito);
}

//-- Creamos la función para actualizar producto MAD en el carrito de la compra del cliente.
const actualizaCarritodb = (insertar, precioFinal, titulo, id) => {

    let instruccionActualizarCarrito = 'UPDATE carrito SET cantidad = ?, precio = ? WHERE titulo = ? AND id = ?';
    let formatoInstruccionActualizarCarrito = mysql.format(instruccionActualizarCarrito, [insertar+1, precioFinal, titulo, id]);
    madservicesClientedb.query(formatoInstruccionActualizarCarrito);
}

//-- Creamos las funciones para consultar si hay tarjeta bancaria en base de datos.
const consultarTarjetaBankdb = (id, callback) => {

    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        callback(results.length);
    });
}

//-- Creamos las funciones para ingresar la tarjeta bancaria en el perfil.
const ingresarTarjetaBankdb = (id, numtarjeta, newExpiracion, namecard, cvv) => {

    let instruccionIngresarTarjetaBank = 'INSERT INTO tarjeta (id, cliente, numcard, expiracion, cvv) VALUES (?, ?, ?, ?, ?)';
    let formatoInstruccionIngresarTarjetaBank = mysql.format(instruccionIngresarTarjetaBank, [id, namecard, numtarjeta, newExpiracion, cvv]);
    madservicesClientedb.query(formatoInstruccionIngresarTarjetaBank);
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    consultaProductosMADdb,
    consultaCarritodb,
    consultaCantidadEnCarritodb,
    ingresoCarritodb,
    actualizaCarritodb,
    consultarTarjetaBankdb,
    ingresarTarjetaBankdb
};
//#######################################################################################################//