//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../../../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');

//-- Creamos la función para actualizar el campo marca de la Empresa de la base de datos de MAD Services.
const actualizarMarcadb = (id, marca) => {

    let instruccionActualizarMarca = 'UPDATE empresas SET marca = ? WHERE id = ?';
    let formatoInstruccionActualizarMarca = mysql.format(instruccionActualizarMarca, [marca, id]);
    madservicesEmpresadb.query(formatoInstruccionActualizarMarca);
}

//-- Creamos la función para actualizar el campo tipo de la Empresa de la base de datos de MAD Services.
const actualizarTipodb = (id, tipo) => {

    let instruccionActualizarTipo = 'UPDATE empresas SET tipo = ? WHERE id = ?';
    let formatoInstruccionActualizarTipo = mysql.format(instruccionActualizarTipo, [tipo, id]);
    madservicesEmpresadb.query(formatoInstruccionActualizarTipo);
}

//-- Creamos la función para actualizar el campo CIF de la Empresa de la base de datos de MAD Services.
const actualizarCIFdb = (id, nif) => {

    let instruccionActualizarNIF = 'UPDATE empresas SET nif = ? WHERE id = ?';
    let formatoInstruccionActualizarNIF = mysql.format(instruccionActualizarNIF, [nif, id]);
    madservicesEmpresadb.query(formatoInstruccionActualizarNIF);
}

//-- Creamos la función para actualizar el campo email de la Empresa de la base de datos de MAD Services.
const actualizarEmaildb = (id, email) => {

    let instruccionActualizarEmail = 'UPDATE empresas SET email = ? WHERE id = ?';
    let formatoInstruccionActualizarEmail = mysql.format(instruccionActualizarEmail, [email, id]);
    madservicesEmpresadb.query(formatoInstruccionActualizarEmail);
}

//-- Creamos la función para comprobar el campo de la vieja contraseña de la Empresa de la base de datos de MAD Services.
const comprobarOldPassworddb = (id, oldpassword, callback) => {
    
    let instruccionConsultarPassword = 'SELECT * FROM empresas WHERE id = ?';
    let formatoInstruccionConsultarPassword = mysql.format(instruccionConsultarPassword, [id]);
    madservicesEmpresadb.query(formatoInstruccionConsultarPassword, (error, results) => {
        if(error) throw error;
        const passwordEnDatabase = results[0].password;
        compare(oldpassword, passwordEnDatabase).then( async (match) => {
            callback(match);
        });
    });
}

//-- Creamos la función para actualizar el campo nueva contraseña de la Empresa de la base de datos de MAD Services.
const actualizarPassworddb = async (id, newpassword) => {

    const nuevaPasswordCifrada = await hash(newpassword,1);
    let instruccionActualizarANuevaPassword = 'UPDATE empresas SET password = ? WHERE id = ?';
    let formatoInstruccionActualizarANuevaPassword = mysql.format(instruccionActualizarANuevaPassword, [nuevaPasswordCifrada, id]);
    madservicesEmpresadb.query(formatoInstruccionActualizarANuevaPassword);
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    actualizarMarcadb,
    actualizarTipodb,
    actualizarCIFdb,
    actualizarEmaildb,
    comprobarOldPassworddb,
    actualizarPassworddb
};
//#######################################################################################################//