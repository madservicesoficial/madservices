//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../config/database.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos la función que saca los Productos MAD de la base de datos para verlos en la Interfaz del Miembro MAD.
const mostrarDatosdb = (id, email, password, miembro, departamento, genero, res) => {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM productos';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID);
    //-- Establecer la comunicación con los Productos MAD de la base de datos.
    madservicesAdmindb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        res.status(201).render('paginas/miembros/interfaz',
        {
            id: id,
            email: email,
            password: password,
            miembro: miembro,
            departamento: departamento,
            genero: genero,
            todosProductosInterfaz: result
        });
        return res.end();
    });
}

//-- Exportamos las funciones.
module.exports = mostrarDatosdb;