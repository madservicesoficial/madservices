//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');

//-- Creamos la función que comprueba el ID de la base de datos para no repetir.
function consultaID(idCliente, callback) {

    //-- Instrucción para no repetir ID.
    let instruccionID = 'SELECT COUNT(*) AS count FROM clientes WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, idCliente);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesClientedb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        const valor = result[0].count;
        callback(valor > 0);
    });
}

//-- Creamos la función para consultar el email en el registro de clientes en la base de datos de MAD Services.
const consultarEmailClientesEnRegistrodb = (email, callback) => {

    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM clientes WHERE email = ?';
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [email]);
    madservicesClientedb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        const cont = results[0].count;
        const emailExiste = cont > 0;
        callback(emailExiste);
    });
}

//-- Creamos la función para registrarse como Cliente en la base de datos de MAD Services.
const registroClientesdb = async (data, password) => {

    const passwordCifrada = await hash(password, 1);
    let instruccionRegistrarse = "INSERT INTO clientes (id, email, password, nombre, apellidos, direccion, poblacion, region, pais, cp, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [data.id, data.email, passwordCifrada, data.nombre, data.apellidos, data.direccion, data.poblacion, data.region, data.pais, data.cp, data.genero]);
    madservicesClientedb.query(formatoInstruccionRegistrarse);
}

//-- Creamos la función para consultar el email del cliente en la base de datos de MAD Services.
const consultarEmailClientesdb = (email, callback) => {

    let instruccionConsultarEmail = 'SELECT * FROM clientes WHERE email = ?';
    let formatoInstruccionConsultarEmail = mysql.format(instruccionConsultarEmail, [email]);
    madservicesClientedb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        let hayEmail = results.length;
        callback(hayEmail);
    });
}

//-- Creamos la función para consultar la contraseña del cliente en la base de datos de MAD Services.
const consultarPasswordClientesdb = (email, password, callback) => {

    let instruccionConsultarPassword = 'SELECT * FROM clientes WHERE email = ?';
    let formatoInstruccionConsultarPassword = mysql.format(instruccionConsultarPassword, [email]);
    madservicesClientedb.query(formatoInstruccionConsultarPassword, (error, results) => {
        if(error) throw error;
        const miembro = results[0];
        compare(password, miembro.password).then((match) => {
            callback(match);
        });
    });
}

//-- Creamos la función para iniciar sesión como cliente de MAD Services.
const iniciarSesionClientesdb = (email, callback) => {

    let instruccionConsultarPassword = 'SELECT * FROM clientes WHERE email = ?';
    let formatoInstruccionConsultarPassword = mysql.format(instruccionConsultarPassword, [email]);
    madservicesClientedb.query(formatoInstruccionConsultarPassword, (error, results) => {
        if(error) throw error;
        const miembro = results[0];
        callback(miembro);
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    consultaID,
    consultarEmailClientesEnRegistrodb,
    registroClientesdb,
    consultarEmailClientesdb,
    consultarPasswordClientesdb,
    iniciarSesionClientesdb
};
//#######################################################################################################//