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

//-- Creamos la función para verificar que el email y la contraseña del Cliente están en la base de datos de MAD Services.
const consultaEmailPasswordClientedb = async (madservicesdb, email, callback) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT id FROM clientes WHERE email = ?';
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [email]);
    //-- Establecer la comunicación para consultar el email en la base de datos.
    madservicesdb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        callback(results);
    });
}

//-- Exportamos las funciones.
module.exports = {registrarClientedb, consultaEmailClientedb, consultaEmailPasswordClientedb};