//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../../config/database.js');

//-- Creamos la función que comprueba el ID de la base de datos para no repetir.
const consultaID = (idMiembro, callback) => {

    //-- Instrucción para no repetir ID.
    let instruccionID = 'SELECT COUNT(*) AS count FROM miembros WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, idMiembro);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesAdmindb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        const valor = result[0].count;
        callback(valor > 0);
    });
}

//-- Creamos la función para consultar el email en registro de la base de datos de MAD Services.
const consultarEmailEnRegistroMiembrosdb = (email, callback) => {

    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM miembros WHERE email = ?';
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [email]);
    madservicesAdmindb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        const cont = results[0].count;
        const emailExiste = cont > 0;
        callback(emailExiste);
    });
}

//-- Creamos la función para registrarse como Miembro MAD, con verificación de correo electrónico, en la base de datos de MAD Services.
const registroMiembrosdb = (data, passwordCifrada) => {

    let instruccionRegistrarse = "INSERT INTO miembros (id, email, password, miembro, departamento, genero) VALUES (?, ?, ?, ?, ?, ?)";
    let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [data.id, data.email, passwordCifrada, data.miembro, data.departamento, data.genero]);
    madservicesAdmindb.query(formatoInstruccionRegistrarse);
}

//-- Creamos la función para consultar el email de la base de datos de MAD Services.
const consultarEmailMiembrosdb = (email, callback) => {

    let instruccionConsultarEmail = 'SELECT * FROM miembros WHERE email = ?';
    let formatoInstruccionConsultarEmail = mysql.format(instruccionConsultarEmail, [email]);
    madservicesAdmindb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        callback(results.length);
    });
}

//-- Creamos la función para iniciar sesión como Miembro MAD.
const iniciarSesionMiembrosdb = (email, callback) => {

    let instruccionConsultarEmail = 'SELECT * FROM miembros WHERE email = ?';
    let formatoInstruccionConsultarEmail = mysql.format(instruccionConsultarEmail, [email]);
    madservicesAdmindb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        const miembro = results[0];
        callback(miembro);
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    consultaID,
    consultarEmailEnRegistroMiembrosdb,
    registroMiembrosdb,
    consultarEmailMiembrosdb,
    iniciarSesionMiembrosdb
};
//#######################################################################################################//