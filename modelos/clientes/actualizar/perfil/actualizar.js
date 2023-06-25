//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../../config/database.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para validar datos enviados por el cliente.
const validacion = require("validator");
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');
//-- Importamos la Tecnología para validar el país introducido.
const { getCode, getCountries } = require('country-list-spanish');
const countries = require('country-list');
//-- Importamos la Tecnología para validar el Código Postal introducido.
const { postcodeValidator } = require('postcode-validator');
//-- Importamos la Tecnología para solicitar URLs de Geolocalización.
const axios = require('axios');
//-- Importamos la configuración del entorno ENV para poder usar su información.
require('../../../../config/env.js');

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
const actualizarGeneroVerificadodb = (id, genero, res) => {

    //-- Actualizamos y validamos el campo.
    if(genero) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarGenero = 'UPDATE clientes SET genero = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarGenero = mysql.format(instruccionActualizarGenero, [genero, id]);
        //-- Proceso de actualización en base de datos.
        madservicesClientedb.query(formatoInstruccionActualizarGenero);
        //-- Mostrar Alerta Emergente.
        alerta(`El género del cliente ha cambiado a: ${genero}`);
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El género del cliente no ha cambiado');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}

//-- Creamos la función para actualizar el campo email del Cliente de la base de datos de MAD Services.
const actualizarEmailVerificadodb = (id, email, res) => {

    //-- Actualizamos y validamos el campo.
    if(email) {
        if(!validacion.isEmail(email)) {
            //-- Mostrar Alerta Emergente.
            alerta(`${email} es un email no válido`);
            // Redirigir al perfil del Cliente.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarEmail = 'UPDATE clientes SET email = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarEmail = mysql.format(instruccionActualizarEmail, [email, id]);
            //-- Proceso de actualización en base de datos.
            madservicesClientedb.query(formatoInstruccionActualizarEmail);
            //-- Mostrar Alerta Emergente.
            alerta(`El email del cliente ha cambiado a: ${email}`);
            // Redirigir al perfil del Cliente.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El email del cliente no ha cambiado');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}

//-- Creamos la función para actualizar el campo password del Cliente de la base de datos de MAD Services.
const actualizarPasswordVerificadadb = (id, oldpassword, newpassword, repitePassword, res) => {
    
    //-- Actualizamos y validamos el campo.
    if(oldpassword && newpassword && repitePassword) {
        //-- Verificamos que la contraseña de la base de datos es la misma que la antigua introducida.
        //-- Instrucción para consultar contraseña dado el id.
        let instruccionConsultarPassword = 'SELECT * FROM clientes WHERE id = ?';
        //-- Configuración del formato para consultar contraseña dado el id.
        let formatoInstruccionConsultarPassword = mysql.format(instruccionConsultarPassword, [id]);
        //-- Proceso de consulta de contraseña.
        madservicesClientedb.query(formatoInstruccionConsultarPassword, (error, results) => {
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
                            let instruccionActualizarANuevaPassword = 'UPDATE clientes SET password = ? WHERE id = ?';
                            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                            let formatoInstruccionActualizarANuevaPassword = mysql.format(instruccionActualizarANuevaPassword, [nuevaPasswordCifrada, id]);
                            //-- Proceso de actualización en base de datos.
                            madservicesClientedb.query(formatoInstruccionActualizarANuevaPassword);
                            //-- Mostrar Alerta Emergente.
                            alerta('Nueva contraseña agregada');
                            // Redirigir al perfil del Cliente.
                            return res.redirect(`/sesion-cliente/${id}/perfil`);
                        }else {
                            //-- Mostrar Alerta Emergente.
                            alerta(`La contraseña debe contener como mínimo ${minLong} caracteres,\nletras mayúsculas y minúsculas y,\nnúmeros y caracteres especiales`);
                            // Redirigir al perfil del Cliente.
                            return res.redirect(`/sesion-cliente/${id}/perfil`);
                        }
                    }else {
                        //-- Mostrar Alerta Emergente.
                        alerta('Has puesto mal la nueva contraseña');
                        // Redirigir al perfil del Cliente.
                        return res.redirect(`/sesion-cliente/${id}/perfil`);
                    }
                }else {
                    //-- Mostrar Alerta Emergente.
                    alerta('Veo que no conoces la contraseña de tu sesión');
                    // Redirigir al perfil del Cliente.
                    return res.redirect(`/sesion-cliente/${id}/perfil`);
                }
            });
        });
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('Requisitos para actualizar la contraseña:\nCompletar los tres campos');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}

//-- Creamos la función para actualizar la localización del Cliente de la base de datos de MAD Services.
const actualizarLocalizacionVerificadadb = async (id, pais, cp, region, poblacion, direccion, res) => {

    //-- Declaración de la lista de países existentes en el mundo.
    const paises = getCountries();
    const paisesENG = countries.getNames();
    //-- Proceso de verificación de la localización.
    if(pais && cp && region && poblacion && direccion) {
        if(paises.includes(pais) || paisesENG.includes(pais)) {
            //-- Obtenemos el código del país.
            let codigoPais = getCode(pais);
            let countryCode = countries.getCode(pais);
            if(codigoPais === undefined) {
                codigoPais = countryCode;
            }
            if(postcodeValidator(cp, codigoPais)) {
                //-- Enviamos una solicitud HTTP a la API de Geonames.
                const response = await axios.get('http://api.geonames.org/postalCodeLookupJSON', {
                    params: {
                        postalcode: cp,
                        country: codigoPais,
                        username: process.env.USUARIO_DE_GEONAMES,
                        password: process.env.MYSQL_PASSWORD_CLIENTE
                    },
                });
                const lugar = response.data.postalcodes[0];
                if(lugar || typeof lugar !== 'undefined') {
                    if(region === lugar.adminName1 || region === lugar.adminName2) {
                        if(poblacion === lugar.adminName3 || poblacion === lugar.placeName) {
                            const minLong = 5;
                            const maxLong = 48;
                            if(direccion.length >= minLong && direccion.length <= maxLong) {
                                //-- Actualizamos la localización del Cliente en la base de datos de MAD Services.
                                //-- Instrucción para actualizar en la base de datos.
                                let instruccionActualizarDireccion = 'UPDATE clientes SET direccion = ?, poblacion = ?, region = ?, pais = ?, cp = ? WHERE id = ?';
                                //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                                let formatoInstruccionActualizarDireccion = mysql.format(instruccionActualizarDireccion, [direccion, poblacion, region, pais, cp, id]);
                                //-- Proceso de actualización en base de datos.
                                madservicesClientedb.query(formatoInstruccionActualizarDireccion);
                                //-- Mostrar Alerta Emergente.
                                alerta('Localización del Cliente actualizada');
                                // Redirigir al perfil del Cliente.
                                return res.redirect(`/sesion-cliente/${id}/perfil`);
                            }else {
                                //-- Mostrar Alerta Emergente.
                                alerta(`Dirección de ${poblacion} incorrecta`);
                                // Redirigir al perfil del Cliente.
                                return res.redirect(`/sesion-cliente/${id}/perfil`);
                            }
                        }else {
                            //-- Mostrar Alerta Emergente.
                            alerta(`Población de ${region} incorrecta`);
                            // Redirigir al perfil del Cliente.
                            return res.redirect(`/sesion-cliente/${id}/perfil`);
                        }
                    }else {
                        //-- Mostrar Alerta Emergente.
                        alerta(`Región de ${pais} incorrecta`);
                        // Redirigir al perfil del Cliente.
                        return res.redirect(`/sesion-cliente/${id}/perfil`);
                    }
                }else {
                    //-- Mostrar Alerta Emergente.
                    alerta('Código Postal no encontrado');
                    // Redirigir al perfil del Cliente.
                    return res.redirect(`/sesion-cliente/${id}/perfil`);
                }
            }else {
                //-- Mostrar Alerta Emergente.
                alerta('Código Postal incorrecto');
                // Redirigir al perfil del Cliente.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }
        }else {
            //-- Mostrar Alerta Emergente.
            alerta('País incorrecto');
            // Redirigir al perfil del Cliente.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('No puedes dejar campos vacíos\nY debes saber que:\nEl orden de localización importa\n1º País\n2º CP\n3º Región\n4º Población\n5º Dirección');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    actualizarNombredb,
    actualizarApellidosdb,
    actualizarGeneroVerificadodb,
    actualizarEmailVerificadodb,
    actualizarPasswordVerificadadb,
    actualizarLocalizacionVerificadadb
};
//#######################################################################################################//