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
    let formatoInstruccionID = mysql.format(instruccionID, id);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesClientedb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        const tablaCliente = result[0];
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
            genero: tablaCliente.genero
        });
        return res.end();
    });
}

//-- Exportamos las funciones.
module.exports = mostrarClientedb;