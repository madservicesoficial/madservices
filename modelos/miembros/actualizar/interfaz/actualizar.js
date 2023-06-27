//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../../../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');

//-- Creamos la función para actualizar el campo miembro del Miembro MAD de la base de datos de MAD Services.
const actualizarMiembrodb = (id, miembro) => {

    let instruccionActualizar = 'UPDATE miembros SET miembro = ? WHERE id = ?';
    let formatoInstruccionActualizar = mysql.format(instruccionActualizar, [miembro, id]);
    madservicesAdmindb.query(formatoInstruccionActualizar);
}

//-- Creamos la función para actualizar el campo departamento del Miembro MAD de la base de datos de MAD Services.
const actualizarDepartamentodb = (id, departamento) => {

    let instruccionActualizar = 'UPDATE miembros SET departamento = ? WHERE id = ?';
    let formatoInstruccionActualizar = mysql.format(instruccionActualizar, [departamento, id]);
    madservicesAdmindb.query(formatoInstruccionActualizar);
}

//-- Creamos la función para actualizar el campo género del Miembro MAD de la base de datos de MAD Services.
const actualizarGenerodb = (id, genero) => {

    let instruccionActualizar = 'UPDATE miembros SET genero = ? WHERE id = ?';
    let formatoInstruccionActualizar = mysql.format(instruccionActualizar, [genero, id]);
    madservicesAdmindb.query(formatoInstruccionActualizar);
}

//-- Creamos la función para actualizar el campo email del Miembro MAD de la base de datos de MAD Services.
const actualizarEmaildb = (id, email) => {

    let instruccionActualizar = 'UPDATE miembros SET email = ? WHERE id = ?';
    let formatoInstruccionActualizar = mysql.format(instruccionActualizar, [email, id]);
    madservicesAdmindb.query(formatoInstruccionActualizar);
}

//-- Creamos la función para comprobar la antigua contraseña del Miembro MAD de la base de datos de MAD Services.
const comprobarPassworddb = (id, oldpassword, callback) => {
    
    let instruccionConsultar = 'SELECT * FROM miembros WHERE id = ?';
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [id]);
    //-- Proceso de consulta de contraseña.
    madservicesAdmindb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        const passwordEnDatabase = results[0].password;
        compare(oldpassword, passwordEnDatabase).then( (match) => {
            callback(match);
        });
    });
}

//-- Creamos la función para actualizar el campo password del Miembro MAD de la base de datos de MAD Services.
const actualizarPassworddb = async (id, newpassword) => {

    const nuevaPasswordCifrada = await hash(newpassword,1);
    let instruccionActualizar = 'UPDATE miembros SET password = ? WHERE id = ?';
    let formatoInstruccionActualizar = mysql.format(instruccionActualizar, [nuevaPasswordCifrada, id]);
    madservicesAdmindb.query(formatoInstruccionActualizar);
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    actualizarMiembrodb,
    actualizarDepartamentodb,
    actualizarGenerodb,
    actualizarEmaildb,
    comprobarPassworddb,
    actualizarPassworddb
};
//#######################################################################################################//