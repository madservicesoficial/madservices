//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../../../config/database.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para validar datos enviados por la Empresa.
const validacion = require("validator");
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');

//-- Creamos la función para actualizar el campo miembro del Miembro MAD de la base de datos de MAD Services.
const actualizarMiembroVerificadodb = (id, miembro, res) => {

    //-- Declaración de ctes.
    const minLong = 3;
    const maxLong = 149;
    //-- Actualizamos y validamos el campo.
    if(miembro) {
        if(miembro.length < minLong || miembro.length > maxLong) {
            //-- Mostrar Alerta Emergente.
            alerta('El nombre del miembro no se ajusta al estándar MAD');
            // Redirigir a la interfaz del Miembro MAD.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }else {
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarMiembro = 'UPDATE miembros SET miembro = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarMiembro = mysql.format(instruccionActualizarMiembro, [miembro, id]);
            //-- Proceso de actualización en base de datos.
            madservicesAdmindb.query(formatoInstruccionActualizarMiembro);
            //-- Mostrar Alerta Emergente.
            alerta(`El nombre del miembro ha cambiado a: ${miembro}`);
            // Redirigir a la interfaz del Miembro MAD.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El nombre del miembro no ha cambiado');
        // Redirigir a la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }
}

//-- Creamos la función para actualizar el campo departamento del Miembro MAD de la base de datos de MAD Services.
const actualizarDepartamentoVerificadodb = (id, departamento, res) => {

    //-- Actualizamos y validamos el campo.
    if(departamento) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarNombre = 'UPDATE miembros SET departamento = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarNombre = mysql.format(instruccionActualizarNombre, [departamento, id]);
        //-- Proceso de actualización en base de datos.
        madservicesAdmindb.query(formatoInstruccionActualizarNombre);
        //-- Mostrar Alerta Emergente.
        alerta(`El departamento del miembro ha cambiado a: ${departamento}`);
        // Redirigir a la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El departamento del miembro no ha cambiado');
        // Redirigir a la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }
}

//-- Creamos la función para actualizar el campo género del Miembro MAD de la base de datos de MAD Services.
const actualizarGeneroVerificadodb = (id, genero, res) => {

    //-- Actualizamos y validamos el campo.
    if(genero) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarNombre = 'UPDATE miembros SET genero = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarNombre = mysql.format(instruccionActualizarNombre, [genero, id]);
        //-- Proceso de actualización en base de datos.
        madservicesAdmindb.query(formatoInstruccionActualizarNombre);
        //-- Mostrar Alerta Emergente.
        alerta(`El género del miembro ha cambiado a: ${genero}`);
        // Redirigir a la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El género del miembro no ha cambiado');
        // Redirigir a la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }
}

//-- Creamos la función para actualizar el campo email del Miembro MAD de la base de datos de MAD Services.
const actualizarEmailVerificadodb = (id, email, res) => {

    //-- Actualizamos y validamos el campo.
    if(email) {
        if(!validacion.isEmail(email)) {
            //-- Mostrar Alerta Emergente.
            alerta(`${email} es un email no válido`);
            // Redirigir a la interfaz del Miembro MAD.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }else {
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarNombre = 'UPDATE miembros SET email = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarNombre = mysql.format(instruccionActualizarNombre, [email, id]);
            //-- Proceso de actualización en base de datos.
            madservicesAdmindb.query(formatoInstruccionActualizarNombre);
            //-- Mostrar Alerta Emergente.
            alerta(`El email del miembro ha cambiado a: ${email}`);
            // Redirigir a la interfaz del Miembro MAD.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El email del miembro no ha cambiado');
        // Redirigir a la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }
}

//-- Creamos la función para actualizar el campo password del Miembro MAD de la base de datos de MAD Services.
const actualizarPasswordVerificadadb = (id, oldpassword, newpassword, repitePassword, res) => {
    
    //-- Actualizamos y validamos el campo.
    if(oldpassword && newpassword && repitePassword) {
        //-- Verificamos que la contraseña de la base de datos es la misma que la antigua introducida.
        //-- Instrucción para consultar contraseña dado el id.
        let instruccionConsultarPassword = 'SELECT * FROM miembros WHERE id = ?';
        //-- Configuración del formato para consultar contraseña dado el id.
        let formatoInstruccionConsultarPassword = mysql.format(instruccionConsultarPassword, [id]);
        //-- Proceso de consulta de contraseña.
        madservicesAdmindb.query(formatoInstruccionConsultarPassword, (error, results) => {
            if(error) throw error;
            const passwordEnDatabase = results[0].password;
            compare(oldpassword, passwordEnDatabase).then( async (match) => {
                if(match) {
                    //-- Verificamos que la nueva contraseña introducida es correcta.
                    if(newpassword === repitePassword) {
                        //-- Declaramos las ctes.
                        const minLong = 10;
                        const maxLong = 99;
                        if(validacion.isLength(newpassword, { min: minLong, max: maxLong}) && validacion.matches(newpassword, /[a-z]/)
                        && validacion.matches(newpassword, /[A-Z]/) && validacion.matches(newpassword, /[0-9]/) &&
                        validacion.matches(newpassword, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                            //-- Cifrar la nueva contraseña.
                            const nuevaPasswordCifrada = await hash(newpassword,1);
                            //-- Instrucción para actualizar en la base de datos.
                            let instruccionActualizarANuevaPassword = 'UPDATE miembros SET password = ? WHERE id = ?';
                            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                            let formatoInstruccionActualizarANuevaPassword = mysql.format(instruccionActualizarANuevaPassword, [nuevaPasswordCifrada, id]);
                            //-- Proceso de actualización en base de datos.
                            madservicesAdmindb.query(formatoInstruccionActualizarANuevaPassword);
                            //-- Mostrar Alerta Emergente.
                            alerta('Nueva contraseña agregada');
                            // Redirigir a la interfaz del Miembro MAD.
                            return res.redirect(`/sesion-miembro/${id}/interfaz`);
                        }else {
                            //-- Mostrar Alerta Emergente.
                            alerta(`La contraseña debe contener como mínimo ${minLong} caracteres,\nletras mayúsculas y minúsculas y,\nnúmeros y caracteres especiales`);
                            // Redirigir a la interfaz del Miembro MAD.
                            return res.redirect(`/sesion-miembro/${id}/interfaz`);
                        }
                    }else {
                        //-- Mostrar Alerta Emergente.
                        alerta('Has puesto mal la nueva contraseña');
                        // Redirigir a la interfaz del Miembro MAD.
                        return res.redirect(`/sesion-miembro/${id}/interfaz`);
                    }
                }else {
                    //-- Mostrar Alerta Emergente.
                    alerta('Veo que no conoces la contraseña de tu sesión');
                    // Redirigir a la interfaz del Miembro MAD.
                    return res.redirect(`/sesion-miembro/${id}/interfaz`);
                }
            });
        });
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('Requisitos para actualizar la contraseña:\nCompletar los tres campos');
        // Redirigir a la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    actualizarMiembroVerificadodb,
    actualizarDepartamentoVerificadodb,
    actualizarGeneroVerificadodb,
    actualizarEmailVerificadodb,
    actualizarPasswordVerificadadb
};
//#######################################################################################################//