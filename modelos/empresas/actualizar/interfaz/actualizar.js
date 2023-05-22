//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../../../config/database.js');
//-- Importamos la Tecnología para validar datos enviados por la Empresa.
const validacion = require("validator");
//-- Importamos la Tecnología para validar el CIF/NIF introducido.
const cifvalidacion = require('nif-dni-nie-cif-validation');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');

//-- Creamos la función para actualizar el campo marca de la Empresa de la base de datos de MAD Services.
const actualizarMarcaVerificadadb = (id, marca, res) => {

    //-- Declaración de ctes.
    const minLong = 3;
    const maxLong = 148;
    //-- Actualizamos y validamos el campo.
    if(marca) {
        if(marca.length < minLong || marca.length > maxLong) {
            //-- Mostrar Alerta Emergente.
            alerta('La marca empresarial no se ajusta al estándar MAD');
            // Redirigir a la interfaz de la Empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarMarca = 'UPDATE empresas SET marca = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarMarca = mysql.format(instruccionActualizarMarca, [marca, id]);
            //-- Proceso de actualización en base de datos.
            madservicesEmpresadb.query(formatoInstruccionActualizarMarca);
            //-- Mostrar Alerta Emergente.
            alerta(`La marca empresarial ha cambiado a: ${marca}`);
            // Redirigir a la interfaz de la Empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('La marca empresarial no ha cambiado');
        // Redirigir a la interfaz de la Empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

//-- Creamos la función para actualizar el campo tipo de la Empresa de la base de datos de MAD Services.
const actualizarTipoVerificadodb = (id, tipo, res) => {

    //-- Actualizamos y validamos el campo.
    if(tipo) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarTipo = 'UPDATE empresas SET tipo = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarTipo = mysql.format(instruccionActualizarTipo, [tipo, id]);
        //-- Proceso de actualización en base de datos.
        madservicesEmpresadb.query(formatoInstruccionActualizarTipo);
        //-- Mostrar Alerta Emergente.
        alerta(`El tipo de empresa ha cambiado a: ${tipo}`);
        // Redirigir a la interfaz de la Empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El tipo de empresa no ha cambiado');
        // Redirigir a la interfaz de la Empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

//-- Creamos la función para actualizar el campo CIF de la Empresa de la base de datos de MAD Services.
const actualizarCIFVerificadodb = (id, nif, res) => {

    //-- Actualizamos y validamos el campo.
    if(nif) {
        if(!cifvalidacion.isValidCif(nif) || !cifvalidacion.isValidNif(nif)) {
            //-- Mostrar Alerta Emergente.
            alerta(`El NIF/CIF ${nif} no es válido`);
            // Redirigir a la interfaz de la Empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarNIF = 'UPDATE empresas SET nif = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarNIF = mysql.format(instruccionActualizarNIF, [nif, id]);
            //-- Proceso de actualización en base de datos.
            madservicesEmpresadb.query(formatoInstruccionActualizarNIF);
            //-- Mostrar Alerta Emergente.
            alerta(`El NIF/CIF de la empresa ha cambiado a: ${nif}`);
            // Redirigir a la interfaz de la Empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El NIF/CIF de la empresa no ha cambiado');
        // Redirigir a la interfaz de la Empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

//-- Creamos la función para actualizar el campo email de la Empresa de la base de datos de MAD Services.
const actualizarEmailVerificadodb = (id, email, res) => {

    //-- Actualizamos y validamos el campo.
    if(email) {
        if(!validacion.isEmail(email)) {
            //-- Mostrar Alerta Emergente.
            alerta(`${email} es un email no válido`);
            // Redirigir a la interfaz de la Empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarEmail = 'UPDATE empresas SET email = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarEmail = mysql.format(instruccionActualizarEmail, [email, id]);
            //-- Proceso de actualización en base de datos.
            madservicesEmpresadb.query(formatoInstruccionActualizarEmail);
            //-- Mostrar Alerta Emergente.
            alerta(`El email de la empresa ha cambiado a: ${email}`);
            // Redirigir a la interfaz de la Empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El email de la empresa no ha cambiado');
        // Redirigir a la interfaz de la Empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

//-- Creamos la función para actualizar el campo password de la Empresa de la base de datos de MAD Services.
const actualizarPasswordVerificadadb = (id, oldpassword, newpassword, repitePassword, res) => {
    
    //-- Actualizamos y validamos el campo.
    if(oldpassword && newpassword && repitePassword) {
        //-- Verificamos que la contraseña de la base de datos es la misma que la antigua introducida.
        //-- Instrucción para consultar contraseña dado el id.
        let instruccionConsultarPassword = 'SELECT * FROM empresas WHERE id = ?';
        //-- Configuración del formato para consultar contraseña dado el id.
        let formatoInstruccionConsultarPassword = mysql.format(instruccionConsultarPassword, [id]);
        //-- Proceso de consulta de contraseña.
        madservicesEmpresadb.query(formatoInstruccionConsultarPassword, (error, results) => {
            if(error) throw error;
            const passwordEnDatabase = results[0].password;
            compare(oldpassword, passwordEnDatabase).then( async (match) => {
                if(match) {
                    //-- Verificamos que la nueva contraseña introducida es correcta.
                    if(newpassword === repitePassword) {
                        //-- Declaramos las ctes.
                        const minLong = 10;
                        const maxLong = 96;
                        if(validacion.isLength(newpassword, { min: minLong, max: maxLong}) && validacion.matches(newpassword, /[a-z]/)
                        && validacion.matches(newpassword, /[A-Z]/) && validacion.matches(newpassword, /[0-9]/) &&
                        validacion.matches(newpassword, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                            //-- Cifrar la nueva contraseña.
                            const nuevaPasswordCifrada = await hash(newpassword,1);
                            //-- Instrucción para actualizar en la base de datos.
                            let instruccionActualizarANuevaPassword = 'UPDATE empresas SET password = ? WHERE id = ?';
                            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                            let formatoInstruccionActualizarANuevaPassword = mysql.format(instruccionActualizarANuevaPassword, [nuevaPasswordCifrada, id]);
                            //-- Proceso de actualización en base de datos.
                            madservicesEmpresadb.query(formatoInstruccionActualizarANuevaPassword);
                            //-- Mostrar Alerta Emergente.
                            alerta('Nueva contraseña agregada');
                            // Redirigir a la interfaz de la Empresa.
                            return res.redirect(`/sesion-empresa/${id}/interfaz`);
                        }else {
                            //-- Mostrar Alerta Emergente.
                            alerta(`La contraseña debe contener como mínimo ${minLong} caracteres,\nletras mayúsculas y minúsculas y,\nnúmeros y caracteres especiales`);
                            // Redirigir a la interfaz de la Empresa.
                            return res.redirect(`/sesion-empresa/${id}/interfaz`);
                        }
                    }else {
                        //-- Mostrar Alerta Emergente.
                        alerta('Has puesto mal la nueva contraseña');
                        // Redirigir a la interfaz de la Empresa.
                        return res.redirect(`/sesion-empresa/${id}/interfaz`);
                    }
                }else {
                    //-- Mostrar Alerta Emergente.
                    alerta('Veo que no conoces la contraseña de tu sesión');
                    // Redirigir a la interfaz de la Empresa.
                    return res.redirect(`/sesion-empresa/${id}/interfaz`);
                }
            });
        });
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('Requisitos para actualizar la contraseña:\nCompletar los tres campos');
        // Redirigir a la interfaz de la Empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    actualizarMarcaVerificadadb,
    actualizarTipoVerificadodb,
    actualizarCIFVerificadodb,
    actualizarEmailVerificadodb,
    actualizarPasswordVerificadadb
};
//#######################################################################################################//