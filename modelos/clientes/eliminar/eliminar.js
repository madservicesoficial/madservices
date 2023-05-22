//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos la función para Dar de Baja al Cliente de la base de datos de MAD Services.
const darseBajaClientedb = (id, dileAdios, req, res) => {
    //-- Caso 1: dejar en blanco la confirmación.
    if(!dileAdios) {
        //-- Mostrar Alerta Emergente.
        alerta('Debes confirmar si quieres o no darte de baja');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    //-- Caso 2: pulsar que no quieres darte de baja.
    }else if(dileAdios === 'No') {
        //-- Mostrar Alerta Emergente.
        alerta('Gracias por no querer darte de baja');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    //-- Caso 3: pulsar que sí quieres darte de baja.
    }else if(dileAdios === 'Sí') {
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
        //-- Destruir la sesión.
        req.session.destroy();
        //-- Mostrar Alerta Emergente.
        alerta('Cliente dado de baja definitivamente');
        // Redirigir a la página principal de la aplicación.
        return res.redirect('/');
    }
}

//-- Creamos la función para quitar el producto del carrito de la compra de la base de datos y de la web de MAD Services.
const quitarProductosdb = (id, titulo, res) => {

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
            //-- Mostrar Alerta Emergente.
            alerta(`${titulo} eliminado del carrito`);
            // Redirigir a la página de productos MAD.
            return res.redirect(`/sesion-cliente/${id}/carrito`);
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
                //-- Mostrar Alerta Emergente.
                alerta(`Hemos quitado un producto de los ${cantidadINT} que había en ${titulo}`);
                // Redirigir a la página de productos MAD.
                return res.redirect(`/sesion-cliente/${id}/carrito`);
            });
        }
    });
}

//-- Creamos la función para borrar la tarjeta bancaria del perfil.
const borrarTarjetaBankdb = (id, res) => {

    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            //-- Mostrar alerta.
            alerta('No hay ninguna tarjeta bancaria en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            let instruccionBorrarTarjetaBank = 'DELETE FROM tarjeta WHERE id = ?';
            let formatoInstruccionBorrarTarjetaBank = mysql.format(instruccionBorrarTarjetaBank, [id]);
            madservicesClientedb.query(formatoInstruccionBorrarTarjetaBank);
            //-- Mostrar alerta.
            alerta('Tarjeta bancaria borrada de tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    darseBajaClientedb,
    quitarProductosdb,
    borrarTarjetaBankdb
};
//#######################################################################################################//