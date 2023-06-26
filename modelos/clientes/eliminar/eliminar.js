//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');

//-- Creamos la función para Dar de Baja al Cliente de la base de datos de MAD Services.
const darseBajaClientedb = (id) => {
    //-- Si tiene productos en el carrito, también se borran.
    let instruccionVerCarrito = "SELECT * FROM carrito WHERE id = ?";
    let formatoInstruccionVerCarrito = mysql.format(instruccionVerCarrito, [id]);
    //-- Establecer la configuración de ver los datos de la base de datos.
    madservicesClientedb.query(formatoInstruccionVerCarrito, (error, results) => {
        if(error) throw error;
        if(results.length > 0) {
            //-- Si tiene productos en el carrito, se borran.
            let instruccionDarseBajaCarrito = "DELETE FROM carrito WHERE id = ?";
            let formatoInstruccionDarseBajaCarrito = mysql.format(instruccionDarseBajaCarrito, [id]);
            //-- Establecer la configuración de borrar los datos de la base de datos.
            madservicesClientedb.query(formatoInstruccionDarseBajaCarrito);
        }
    });
    //-- Si tiene guardada la tarjeta bancaria, también se borra.
    let instruccionVerTarjetasBank = "SELECT * FROM tarjeta WHERE id = ?";
    let formatoInstruccionVerTarjetasBank = mysql.format(instruccionVerTarjetasBank, [id]);
    //-- Establecer la configuración de ver los datos de la base de datos.
    madservicesClientedb.query(formatoInstruccionVerTarjetasBank, (error, resultados) => {
        if(error) throw error;
        if(resultados.length > 0) {
            let instruccionBorrarTarjetasBank = "DELETE FROM tarjeta WHERE id = ?";
            let formatoInstruccionBorrarTarjetasBank = mysql.format(instruccionBorrarTarjetasBank, [id]);
            //-- Establecer la configuración de borrar los datos de la base de datos.
            madservicesClientedb.query(formatoInstruccionBorrarTarjetasBank);
        }
    });
    //-- Variables usadas para borrar los datos de la base de datos.
    let instruccionDarseBajaCliente = "DELETE FROM clientes WHERE id = ?";
    let formatoinstruccionDarseBajaCliente = mysql.format(instruccionDarseBajaCliente, [id]);
    //-- Establecer la configuración de borrar los datos de la base de datos.
    madservicesClientedb.query(formatoinstruccionDarseBajaCliente);
}

//-- Creamos la función para quitar el producto del carrito de la compra de la base de datos y de la web de MAD Services.
const quitarProductosdb = (id, titulo, callback) => {

    let instruccionConsultarCantidadCarrito = 'SELECT * FROM carrito WHERE id = ? AND titulo = ?';
    let formatoInstruccionConsultarCantidadCarrito = mysql.format(instruccionConsultarCantidadCarrito, [id, titulo]);
    madservicesClientedb.query(formatoInstruccionConsultarCantidadCarrito, (error, results) => {
        if(error) throw error;
        const cantidad = results[0].cantidad;
        const precio = results[0].precio;
        if(cantidad === 1) {
            let instruccionEliminarDelCarrito = 'DELETE FROM carrito WHERE id = ? AND titulo = ?';
            let formatoInstruccionEliminarDelCarrito = mysql.format(instruccionEliminarDelCarrito, [id, titulo]);
            madservicesClientedb.query(formatoInstruccionEliminarDelCarrito);
        }else {
            //-- Convertimos cantidad a entero para operarlo.
            const cantidadINT = parseInt(cantidad, 10);
            //-- Comprobar el precio del producto a quitar del carrito.
            let instruccionConsultarPrecioBase = 'SELECT * FROM productos WHERE titulo = ?';
            let formatoInstruccionConsultarPrecioBase = mysql.format(instruccionConsultarPrecioBase, [titulo]);
            madservicesClientedb.query(formatoInstruccionConsultarPrecioBase, (error, salidas) => {
                if(error) throw error;
                const precioBase = salidas[0].precio;
                let precioTotal = parseFloat(precio, 10) - parseFloat(precioBase, 10);
                //-- Actualizar el carrito.
                let instruccionActualizarProductoCarrito = 'UPDATE carrito SET cantidad = ?, precio = ? WHERE titulo = ? AND id = ?';
                let formatoInstruccionActualizarProductoCarrito = mysql.format(instruccionActualizarProductoCarrito, [cantidadINT-1, precioTotal, titulo, id]);
                madservicesClientedb.query(formatoInstruccionActualizarProductoCarrito);
            });
        }
        callback(cantidad);
    });
}

//-- Creamos la función para consultar la tarjeta bancaria del perfil.
const consultaTarjetaBankdb = (id, callback) => {

    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        let hayTarjeta = results.length;
        callback(hayTarjeta);
    });
}

//-- Creamos la función para borrar la tarjeta bancaria del perfil.
const borrarTarjetaBankdb = (id) => {

    let instruccionBorrarTarjetaBank = 'DELETE FROM tarjeta WHERE id = ?';
    let formatoInstruccionBorrarTarjetaBank = mysql.format(instruccionBorrarTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionBorrarTarjetaBank);
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    darseBajaClientedb,
    quitarProductosdb,
    consultaTarjetaBankdb,
    borrarTarjetaBankdb
};
//#######################################################################################################//