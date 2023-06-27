//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');

//-- Creamos la función para actualizar el campo nombre del Cliente de la base de datos de MAD Services.
const actualizarNombredb = (id, nombre) => {

    //-- Instrucción para actualizar en la base de datos.
    let instruccionActualizarNombre = 'UPDATE clientes SET nombre = ? WHERE id = ?';
    //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
    let formatoInstruccionActualizarNombre = mysql.format(instruccionActualizarNombre, [nombre, id]);
    //-- Proceso de actualización en base de datos.
    madservicesClientedb.query(formatoInstruccionActualizarNombre);
}

//-- Creamos la función para actualizar el campo apellidos del Cliente de la base de datos de MAD Services.
const actualizarApellidosdb = (id, apellidos) => {
    
    //-- Instrucción para actualizar en la base de datos.
    let instruccionActualizarApellidos = 'UPDATE clientes SET apellidos = ? WHERE id = ?';
    //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
    let formatoInstruccionActualizarApellidos = mysql.format(instruccionActualizarApellidos, [apellidos, id]);
    //-- Proceso de actualización en base de datos.
    madservicesClientedb.query(formatoInstruccionActualizarApellidos);
}

//-- Creamos la función para actualizar el campo género del Cliente de la base de datos de MAD Services.
const actualizarGenerodb = (id, genero) => {

    //-- Instrucción para actualizar en la base de datos.
    let instruccionActualizarGenero = 'UPDATE clientes SET genero = ? WHERE id = ?';
    //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
    let formatoInstruccionActualizarGenero = mysql.format(instruccionActualizarGenero, [genero, id]);
    //-- Proceso de actualización en base de datos.
    madservicesClientedb.query(formatoInstruccionActualizarGenero);
}

//-- Creamos la función para actualizar el campo email del Cliente de la base de datos de MAD Services.
const actualizarEmaildb = (id, email) => {

    //-- Instrucción para actualizar en la base de datos.
    let instruccionActualizarEmail = 'UPDATE clientes SET email = ? WHERE id = ?';
    //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
    let formatoInstruccionActualizarEmail = mysql.format(instruccionActualizarEmail, [email, id]);
    //-- Proceso de actualización en base de datos.
    madservicesClientedb.query(formatoInstruccionActualizarEmail);
}

//-- Creamos la función para consultar la contraseña que había en la base de datos.
const consultaOldPassworddb = (id, oldpassword, callback) => {

    //-- Instrucción para consultar contraseña dado el id.
    let instruccionConsultarPassword = 'SELECT * FROM clientes WHERE id = ?';
    //-- Configuración del formato para consultar contraseña dado el id.
    let formatoInstruccionConsultarPassword = mysql.format(instruccionConsultarPassword, [id]);
    //-- Proceso de consulta de contraseña.
    madservicesClientedb.query(formatoInstruccionConsultarPassword, (error, results) => {
        if(error) throw error;
        const passwordEnDatabase = results[0].password;
        compare(oldpassword, passwordEnDatabase).then( async (match) => {
            callback(match);
        });
    });
}

//-- Creamos la función para actualizar el campo password del Cliente de la base de datos de MAD Services.
const actualizarPassworddb = async (id, newpassword) => {
    
    //-- Cifrar la nueva contraseña.
    const nuevaPasswordCifrada = await hash(newpassword,1);
    //-- Instrucción para actualizar en la base de datos.
    let instruccionActualizarANuevaPassword = 'UPDATE clientes SET password = ? WHERE id = ?';
    //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
    let formatoInstruccionActualizarANuevaPassword = mysql.format(instruccionActualizarANuevaPassword, [nuevaPasswordCifrada, id]);
    //-- Proceso de actualización en base de datos.
    madservicesClientedb.query(formatoInstruccionActualizarANuevaPassword);
}

//-- Creamos la función para actualizar la localización del Cliente de la base de datos de MAD Services.
const actualizarLocalizaciondb = (id, pais, cp, region, poblacion, direccion) => {
                         
    //-- Instrucción para actualizar en la base de datos.
    let instruccionActualizarLocalizacion = 'UPDATE clientes SET direccion = ?, poblacion = ?, region = ?, pais = ?, cp = ? WHERE id = ?';
    //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
    let formatoInstruccionActualizarLocalizacion = mysql.format(instruccionActualizarLocalizacion, [direccion, poblacion, region, pais, cp, id]);
    //-- Proceso de actualización en base de datos.
    madservicesClientedb.query(formatoInstruccionActualizarLocalizacion);
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    actualizarNombredb,
    actualizarApellidosdb,
    actualizarGenerodb,
    actualizarEmaildb,
    consultaOldPassworddb,
    actualizarPassworddb,
    actualizarLocalizaciondb
};
//#######################################################################################################//