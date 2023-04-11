//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');

//-- Creamos la función para registrarse como Cliente en la base de datos de MAD Services.
const registrarClientedb = async (madservicesdb, data, callback) => {

    //-- Instrucción para registrarse en la base de datos.
    let instruccionRegistrarse = 
        "INSERT INTO clientes (id, email, password, nombre, apellidos, direccion, poblacion, region, pais, cp, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [data.id, data.email, data.password, data.nombre, data.apellidos, data.direccion, data.poblacion, data.region, data.pais, data.cp, data.genero]);
    //-- Establecer la comunicación de insertar datos en la base de datos.
    madservicesdb.query(formatoInstruccionRegistrarse, (error) => {
        if(error) {
            return callback(error);
        }
        const miembroRegistrado = true;
        return callback(miembroRegistrado);
    });
}

//-- Creamos la función para consultar si el email del Cliente existe en la base de datos de MAD Services.
const consultaEmailClientedb = async (madservicesdb, email, callback) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM clientes WHERE email = ?';
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [email]);
    //-- Establecer la comunicación para consultar el email en la base de datos.
    madservicesdb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) {
            return callback(error);
        }
        const cont = results[0].count;
        const emailExiste = cont > 0;
        return callback(emailExiste);
    });
}

//-- Creamos la función para consultar si el email del Cliente existe en la base de datos de MAD Services.
const consultaNoEmailClientedb = async (madservicesdb, data, callback) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT email FROM clientes WHERE email = ?';
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    await madservicesdb.getConnection( (error, madservicesdb) => {
        if(error) throw error;
        //-- Establecer la comunicación para consultar el email en la base de datos.
        madservicesdb.query(formatoInstruccionConsultar, (error, results) => {
            if(error) throw error
            callback(results.length === 0);
        });
    });
}

//-- Creamos la función para consultar si la Contraseña del Cliente existe en la base de datos de MAD Services.
const consultaPasswordClientedb = async (madservicesdb, data, callback) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT password FROM clientes WHERE email = ?';
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    await madservicesdb.getConnection( (error, madservicesdb) => {
        if(error) throw error;
        //-- Establecer la comunicación para consultar la password en la base de datos.
        madservicesdb.query(formatoInstruccionConsultar, (error, result) => {
            if(error) throw error;
            if(result.length === 0) {
                callback(result.length === 0);
            }else {
                callback(result.length === 0);
            }
        });
    });
}

//-- Exportamos las funciones.
module.exports = {registrarClientedb, consultaEmailClientedb, consultaNoEmailClientedb, consultaPasswordClientedb};