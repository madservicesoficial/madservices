//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');
//-- Importamos la Tecnología para sacar la hora de Madrid con la fecha.
const { DateTime } = require('luxon');
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');

//-- Creamos la función para borrar el carrito según el ID del cliente que está comprando.
const borrarCarritoSegunIDdb = (id) => {

    let instruccionEliminarCarritoPorID = 'DELETE FROM carrito WHERE id = ?';
    let formatoInstruccionEliminarCarritoPorID = mysql.format(instruccionEliminarCarritoPorID, [id]);
    madservicesClientedb.query(formatoInstruccionEliminarCarritoPorID);
}

//-- Creamos la función para comprobar si hay producto siguiente.
const comprobarSiHayProductoSigdb = (enumeracionSig) => {

    let instruccionConsultarEnumeracionSig = 'SELECT * FROM productos WHERE enumeracion = ?';
    let formatoInstruccionConsultarEnumeracionSig = mysql.format(instruccionConsultarEnumeracionSig, [enumeracionSig]);
    madservicesClientedb.query(formatoInstruccionConsultarEnumeracionSig, (error, sacar3) => {
        if(error) throw error;
        if(sacar3.length > 0) {
            let enumeracionAnt = enumeracionSig - 1;
            let instruccionActualizarOrden = 'UPDATE productos SET enumeracion = ? WHERE enumeracion = ?';
            let formatoInstruccionActualizarOrden = mysql.format(instruccionActualizarOrden, [enumeracionAnt, enumeracionSig]);
            madservicesClientedb.query(formatoInstruccionActualizarOrden);
            enumeracionSig = enumeracionSig + 1;
            //-- De nuevo llamar a la función.
            comprobarSiHayProductoSigdb(enumeracionSig);
        }
    });
}

//-- Creamos la función para confirmar que el/los producto/s ha/han sido vendidos con éxito.
const operacionCompradb = (id) => {
    
    let instruccionConsultarProductoComprado = 'SELECT titulo, SUM(cantidad) AS total_cantidad, SUM(precio) AS total_precio FROM carrito WHERE id = ? GROUP BY titulo';
    let formatoInstruccionConsultarProductoComprado = mysql.format(instruccionConsultarProductoComprado, [id]);
    madservicesClientedb.query(formatoInstruccionConsultarProductoComprado, (error, results) => {
        if(error) throw error;
        let instruccionConsultarLocalizacionCliente = 'SELECT * FROM clientes WHERE id = ?';
        let formatoInstruccionConsultarLocalizacionCliente = mysql.format(instruccionConsultarLocalizacionCliente, [id]);
        madservicesClientedb.query(formatoInstruccionConsultarLocalizacionCliente, (error, sacar1) => {
            if(error) throw error;
            let tiempo = DateTime.now().setZone('Europe/Madrid');
            let fechaCompra = `${tiempo.c.year}-${tiempo.c.month}-${tiempo.c.day} ${tiempo.c.hour}:${tiempo.c.minute}:${tiempo.c.second}`;
            const email = sacar1[0].email;
            const direccion = sacar1[0].direccion;
            const poblacion = sacar1[0].poblacion;
            const region = sacar1[0].region;
            const pais = sacar1[0].pais;
            const cp = sacar1[0].cp;
            for(let i=0; i<results.length; i++) {
                let instruccionSacar = 'SELECT * FROM productos WHERE titulo = ?';
                let formatoInstruccionSacar = mysql.format(instruccionSacar, [results[i].titulo]);
                madservicesClientedb.query(formatoInstruccionSacar, (error, sacar2) => {
                    if(error) throw error;
                    let enumeracion = sacar2[0].enumeracion;
                    let cantidad = sacar2[0].cantidad;
                    let imagen = sacar2[0].portada;
                    let instruccionIngresarCompra = 'INSERT INTO comprados (email, direccion, poblacion, region, pais, cp, imagen, titulo, cantidades, preciototal, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    let formatoInstruccionIngresarCompra = mysql.format(instruccionIngresarCompra, [email, direccion, poblacion, region, pais, cp, imagen, results[i].titulo, results[i].total_cantidad, results[i].total_precio, fechaCompra]);
                    madservicesClientedb.query(formatoInstruccionIngresarCompra);
                    if(cantidad === 1) {
                        let instruccionEliminarProducto = 'DELETE FROM productos WHERE titulo = ?';
                        let formatoInstruccionEliminarProducto = mysql.format(instruccionEliminarProducto, [results[i].titulo]);
                        madservicesClientedb.query(formatoInstruccionEliminarProducto);
                        let enumeracionSig = enumeracion + 1;
                        //-- Comprobamos si hay siguiente.
                        comprobarSiHayProductoSigdb(enumeracionSig);
                    }else {
                        let cantidadRestante = cantidad - results[i].total_cantidad;
                        if(cantidadRestante === 0) {
                            let instruccionEliminarProducto = 'DELETE FROM productos WHERE titulo = ?';
                            let formatoInstruccionEliminarProducto = mysql.format(instruccionEliminarProducto, [results[i].titulo]);
                            madservicesClientedb.query(formatoInstruccionEliminarProducto);
                            let enumeracionSig = enumeracion + 1;
                            //-- Comprobamos si hay siguiente.
                            comprobarSiHayProductoSigdb(enumeracionSig);
                        }else {
                            let instruccionReducirProducto = 'UPDATE productos SET cantidad = ? WHERE titulo = ?';
                            let formatoInstruccionReducirProducto = mysql.format(instruccionReducirProducto, [cantidadRestante, results[i].titulo]);
                            madservicesClientedb.query(formatoInstruccionReducirProducto);
                        }
                    }
                });
            }
        });
    });
}

//-- Creamos la función para confirmar que el/los producto/s ha/han sido vendidos con éxito.
const confirmacionCompradb = (id, cont, res) => {

    let instruccionConsultarProductoComprado = 'SELECT titulo, SUM(cantidad) AS total_cantidad, SUM(precio) AS total_precio FROM carrito WHERE id = ? GROUP BY titulo';
    let formatoInstruccionConsultarProductoComprado = mysql.format(instruccionConsultarProductoComprado, [id]);
    madservicesClientedb.query(formatoInstruccionConsultarProductoComprado, (error, results) => {
        if(error) throw error;
        if(cont >= results.length) {
            //-- Proceso de operaciones de la compra con alerta de éxito y redirección.
            operacionCompradb(id);
            //-- Borrar el carrito según el ID cliente que ha comprado.
            borrarCarritoSegunIDdb(id);
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Hecho!',
                    message: '¡Compra realizada con éxito!',
                    icon: path.join(__dirname, '../../../public/images/correcto.png')
                }
            );
            res.status(201);
            res.redirect(`/sesion-cliente/${id}/perfil`);
            return res.end();
        }else {
            let instruccionSacar = 'SELECT * FROM productos WHERE titulo = ?';
            let formatoInstruccionSacar = mysql.format(instruccionSacar, [results[cont].titulo]);
            madservicesClientedb.query(formatoInstruccionSacar, (error, sacar) => {
                if(error) throw error;
                let cantidad = sacar[0].cantidad;
                if(cantidad >= results[cont].total_cantidad) {
                    //-- Llamamos de nuevo a la función, incrementando el contador cont.
                    cont = cont + 1;
                    confirmacionCompradb(id, cont, res);
                }else {
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Atención!',
                            message: `Tienes en el carrito más productos de ${results[cont].titulo} de los que hay para comprar`,
                            icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                        }
                    );
                    res.status(401);
                    res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
                    return res.end();
                }
            });
        }
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    borrarCarritoSegunIDdb,
    comprobarSiHayProductoSigdb,
    operacionCompradb,
    confirmacionCompradb
};
//#######################################################################################################//