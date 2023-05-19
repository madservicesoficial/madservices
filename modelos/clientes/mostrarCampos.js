//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../config/database.js');

//-- Creamos la función que muestra los parámetros de la base de datos de los Clientes.
const mostrarClientedb = (req, res) => {

    //-- Leemos el ID del cliente en ese momento.
    let id = req.params.id;
    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM clientes WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, [id]);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesClientedb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        const tablaCliente = result[0];
        madservicesClientedb.query('SELECT * FROM tarjeta WHERE id = ?', [id], (error, resultados) => {
            if(error) throw error;
            const tarjetaCliente = resultados[0];
            const formatoFecha = '%m/%Y';
            madservicesClientedb.query('SELECT DATE_FORMAT(expiracion, ?) AS fechaFormateada FROM tarjeta WHERE id = ?', [formatoFecha, id], (error, results) => {
                if(error) throw error;
                const vacio = '-';
                //-- Instrucción del ID.
                let instruccionID = 'SELECT * FROM comprados WHERE email = ?';
                //-- Configuración de su formato en mysql.
                let formatoInstruccionID = mysql.format(instruccionID, [tablaCliente.email]);
                //-- Establecer la comunicación de consultar ID en la base de datos.
                madservicesClientedb.query(formatoInstruccionID, (error, salida) => {
                    if(error) throw error;
                    if(resultados.length > 0) {
                        res.status(201).render('paginas/clientes/perfil', 
                        {
                            id: id,
                            email: tablaCliente.email,
                            password: tablaCliente.password,
                            nombre: tablaCliente.nombre,
                            apellidos: tablaCliente.apellidos,
                            direccion: tablaCliente.direccion,
                            poblacion: tablaCliente.poblacion,
                            region: tablaCliente.region,
                            pais: tablaCliente.pais,
                            cp: tablaCliente.cp,
                            genero: tablaCliente.genero,
                            cliente: tarjetaCliente.cliente,
                            numcard: tarjetaCliente.numcard,
                            expiracion: results[0].fechaFormateada,
                            cvv: tarjetaCliente.cvv,
                            miscompras: salida
                        });
                        return res.end();
                    }else {
                        res.status(201).render('paginas/clientes/perfil', 
                        {
                            id: id,
                            email: tablaCliente.email,
                            password: tablaCliente.password,
                            nombre: tablaCliente.nombre,
                            apellidos: tablaCliente.apellidos,
                            direccion: tablaCliente.direccion,
                            poblacion: tablaCliente.poblacion,
                            region: tablaCliente.region,
                            pais: tablaCliente.pais,
                            cp: tablaCliente.cp,
                            genero: tablaCliente.genero,
                            expiracion: vacio,
                            miscompras: salida
                        });
                        return res.end();
                    }
                });
            });
        });
    });
}

//-- Exportamos las funciones.
module.exports = mostrarClientedb;