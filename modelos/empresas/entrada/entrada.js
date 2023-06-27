//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');

//-- Creamos la función que comprueba el ID de la base de datos para no repetir.
const consultaID = (idEmpresa, callback) => {

    let instruccionID = 'SELECT COUNT(*) AS count FROM empresas WHERE id = ?';
    let formatoInstruccionID = mysql.format(instruccionID, idEmpresa);
    madservicesEmpresadb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        const valor = result[0].count;
        callback(valor > 0);
    });
}

//-- Creamos la función para consultar el email en registro de la empresa en base de datos.
const consultarEmailEnRegistroEmpresasdb = (email, callback) => {

    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM empresas WHERE email = ?';
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    madservicesEmpresadb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        const cont = results[0].count;
        const emailExiste = cont > 0;
        callback(emailExiste);
    });
}

//-- Creamos la función para registrarse como Empresa, con verificación de correo electrónico, en la base de datos de MAD Services.
const registroEmpresasdb = async (data, password) => {

    const passwordCifrada = await hash(password, 1);
    let instruccionRegistrarse = "INSERT INTO empresas (id, email, password, marca, nif, tipo, descripcion, instagram, twitter, pagweb, whatsapp, logo) VALUES (?, ?, ?, ?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL)";
    //-- Configuración del formato de los datos introducidos para registrar en base de datos.
    let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [data.id, data.email, passwordCifrada, data.marca, data.nif, data.tipo]);
    madservicesEmpresadb.query(formatoInstruccionRegistrarse);
}

//-- Creamos la función para consultar el email de la empresa en base de datos.
const consultarEmailEmpresasdb = (email, callback) => {

    let instruccionConsultarEmail = 'SELECT * FROM empresas WHERE email = ?';
    let formatoInstruccionConsultarEmail = mysql.format(instruccionConsultarEmail, [email]);
    madservicesEmpresadb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        callback(results.length);
    });
}

//-- Creamos la función para consultar la contraseña de la empresa en base de datos.
const consultarPasswordEmpresasdb = (email, password, callback) => {

    let instruccionConsultarEmail = 'SELECT * FROM empresas WHERE email = ?';
    let formatoInstruccionConsultarEmail = mysql.format(instruccionConsultarEmail, [email]);
    madservicesEmpresadb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        const miembro = results[0];
        compare(password, miembro.password).then( (match) => {
            callback(match);
        });
    });
}

//-- Creamos la función para iniciar sesión como Empresa.
const iniciarSesionEmpresasdb = (email, callback) => {

    let instruccionConsultarEmail = 'SELECT * FROM empresas WHERE email = ?';
    let formatoInstruccionConsultarEmail = mysql.format(instruccionConsultarEmail, [email]);
    madservicesEmpresadb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        callback(results[0]);
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    consultaID,
    consultarEmailEnRegistroEmpresasdb,
    registroEmpresasdb,
    consultarEmailEmpresasdb,
    consultarPasswordEmpresasdb,
    iniciarSesionEmpresasdb
};
//#######################################################################################################//