//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../config/database.js');

//-- Pto de control de sacar por pantalla los productos agregados al carrito.
const mostrarCompraCliente = (req, res) => {
    
    //-- Obtenemos el ID del Cliente.
    let id = req.params.id;
    //-- Sacar los productos MAD del carrito de la base de datos.
    let instruccionConsultaCliente = 'SELECT * FROM clientes WHERE id = ?';
    let formatoInstruccionConsultaCliente = mysql.format(instruccionConsultaCliente, [id]);
    madservicesClientedb.query(formatoInstruccionConsultaCliente, (error, results) => {
        if(error) throw error;
        const direccion = results[0].direccion;
        const poblacion = results[0].poblacion;
        const region = results[0].region;
        const pais = results[0].pais;
        const cp = results[0].cp;
        let instruccionConsultaCarrito = 'SELECT * FROM carrito WHERE id = ?';
        let formatoInstruccionConsultaCarrito = mysql.format(instruccionConsultaCarrito, [id]);
        madservicesClientedb.query(formatoInstruccionConsultaCarrito, (error, resultado) => {
            if(error) throw error;
            let instruccionConsultaTarjeta = 'SELECT * FROM tarjeta WHERE id = ?';
            let formatoInstruccionConsultaTarjeta = mysql.format(instruccionConsultaTarjeta, [id]);
            madservicesClientedb.query(formatoInstruccionConsultaTarjeta, (error, salida) => {
                if(error) throw error;
                const formatoFecha = '%m/%Y';
                let instruccionConsultaFechaExp = 'SELECT DATE_FORMAT(expiracion, ?) AS fechaFormateada FROM tarjeta WHERE id = ?';
                let formatoInstruccionConsultaFechaExp = mysql.format(instruccionConsultaFechaExp, [formatoFecha, id]);
                madservicesClientedb.query(formatoInstruccionConsultaFechaExp, (error, out) => {
                    if(error) throw error;
                    if(salida.length > 0) {
                        //-- Sacarlo por pantalla.
                        res.status(201).render('paginas/clientes/comprar', 
                        { 
                            id: id, 
                            direccion: direccion, 
                            poblacion: poblacion,
                            region: region,
                            pais: pais,
                            cp: cp,
                            carrito: resultado,
                            cliente: salida[0].cliente,
                            numcard: salida[0].numcard,
                            cvv: salida[0].cvv,
                            expiracion: out[0].fechaFormateada
                        });
                        return res.end();
                    }else {
                        let nohayTarjeta = true;
                        //-- Sacarlo por pantalla.
                        res.status(201).render('paginas/clientes/comprar', 
                        { 
                            id: id, 
                            direccion: direccion, 
                            poblacion: poblacion,
                            region: region,
                            pais: pais,
                            cp: cp,
                            carrito: resultado,
                            nohayTarjeta: nohayTarjeta
                        });
                        return res.end();
                    }
                });
            });
        });
    });
}

//-- Exportamos para unir con el resto de rutas.
module.exports = mostrarCompraCliente;