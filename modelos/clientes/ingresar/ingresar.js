//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos la función para ingresar el producto en el carrito de la compra de la base de datos y de la web de MAD Services.
const ingresoCarritodb = (numProducto, res, id) => {

    //-- Consulta producto MAD en base de datos.
    let instruccionConsultaProductoMAD = 'SELECT * FROM productos WHERE enumeracion = ?'
    let formatoInstruccionConsultaProductoMAD = mysql.format(instruccionConsultaProductoMAD, [numProducto]);
    //-- Conexión para consultar.
    madservicesClientedb.query(formatoInstruccionConsultaProductoMAD, (error, results) => {
        if(error) throw error;
        const cantidad = parseInt(results[0].cantidad, 10);
        const titulo = results[0].titulo;
        const precio = parseFloat(results[0].precio, 10);
        //-- Comprobamos el nº de productos metidos en el carrito.
        let instruccionConsultaCarrito = 'SELECT * FROM carrito WHERE titulo = ? AND id = ?'
        let formatoInstruccionConsultaCarrito = mysql.format(instruccionConsultaCarrito, [titulo, id]);
        //-- Conexión para consultar.
        madservicesClientedb.query(formatoInstruccionConsultaCarrito, (error, salidas) => {
            if(error) throw error;
            if(salidas.length === 0) {
                //-- Ingresamos en el carrito de la base de datos.
                let instruccionIngresoCarrito = 'INSERT INTO carrito (id, cantidad, titulo, precio) VALUES (?, ?, ?, ?)';
                let formatoInstruccionIngresoCarrito = mysql.format(instruccionIngresoCarrito, [id, 1, titulo, precio]);
                madservicesClientedb.query(formatoInstruccionIngresoCarrito);
                //-- Mostrar Alerta Emergente.
                alerta('Producto añadido al carrito');
                // Redirigir a la página de productos MAD.
                return res.redirect(`/sesion-cliente/${id}/empieza/productosmadservices`);
            }else {
                if(cantidad === salidas[0].cantidad) {
                    //-- Mostrar Alerta Emergente.
                    alerta('No hay más productos que añadir');
                    // Redirigir a la página de productos MAD.
                    return res.redirect(`/sesion-cliente/${id}/empieza/productosmadservices`);
                }else {
                    //-- Convertimos a nº entero.
                    let insertar = parseInt(salidas[0].cantidad, 10);
                    //-- Actualziamos el precio.
                    let precioFinal = precio + parseFloat(salidas[0].precio, 10);
                    //-- Actualizamos la cantidad en el carrito de la base de datos.
                    let instruccionActualizarCarrito = 'UPDATE carrito SET cantidad = ?, precio = ? WHERE titulo = ? AND id = ?';
                    let formatoInstruccionActualizarCarrito = mysql.format(instruccionActualizarCarrito, [insertar+1, precioFinal, titulo, id]);
                    madservicesClientedb.query(formatoInstruccionActualizarCarrito);
                    //-- Mostrar Alerta Emergente.
                    alerta(`${insertar+1}º producto de ${titulo} añadido al carrito`);
                    // Redirigir a la página de productos MAD.
                    return res.redirect(`/sesion-cliente/${id}/empieza/productosmadservices`);
                }
            }
        });
    });
}

//-- Creamos las funciones para ingresar la tarjeta bancaria en el perfil.
const ingresarTarjetaBankdb = (id, numtarjeta, newExpiracion, namecard, cvv, res) => {
    
    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            let instruccionIngresarTarjetaBank = 'INSERT INTO tarjeta (id, cliente, numcard, expiracion, cvv) VALUES (?, ?, ?, ?, ?)';
            let formatoInstruccionIngresarTarjetaBank = mysql.format(instruccionIngresarTarjetaBank, [id, namecard, numtarjeta, newExpiracion, cvv]);
            madservicesClientedb.query(formatoInstruccionIngresarTarjetaBank);
            //-- Mostrar alerta.
            alerta('Tarjeta bancaria ingresada en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            //-- Mostrar alerta.
            alerta('Ya ingresaste una tarjeta bancaria en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    ingresoCarritodb,
    ingresarTarjetaBankdb
};
//#######################################################################################################//