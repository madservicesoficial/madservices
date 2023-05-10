//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../generarIDRandom.js');
//-- Importamos la función que comprueba que no se repita el ID aleatorio.
const consultaID = require('./consultaID.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para validar datos enviados por el cliente.
const validacion = require("validator");
//-- Importamos la Tecnología para validar el país introducido.
const {getCountries, getCode} = require('country-list-spanish');
//-- Importamos la Tecnología para validar el Código Postal introducido.
const { postcodeValidator } = require('postcode-validator');
//-- Importamos la configuración del entorno ENV para poder usar su información.
require('../../config/env.js');
//-- Importamos la Tecnología para solicitar URLs de Geolocalización.
const axios = require('axios');

//-- Creamos la función para registrarse como Cliente, con verificación de correo electrónico, en la base de datos de MAD Services.
const registrarClienteVerificadodb = async (data, password, res) => {

    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(password, 1);
    //-- Instrucción para consultar Email en la base de datos.
    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM clientes WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para consultar Email en base de datos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    //-- Establecer la comunicación de consultar Email en la base de datos.
    madservicesClientedb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        const cont = results[0].count;
        const emailExiste = cont > 0;
        if(emailExiste) {
            res.status(401).render('paginas/clientes/registrarse', { mensaje: 'Correo ya en uso' });
            return res.end();
        }else {
            let idCliente = generarIDrandom() * 2;
            consultaID(idCliente, (idExiste) => {
                while(idExiste) {
                    idCliente = generarIDrandom() * 2;
                    consultaID(idCliente, (idExiste) => {
                        idExiste = idExiste;
                    });
                }
            });
            //-- Instrucción para registrarse en la base de datos.
            let instruccionRegistrarse = "INSERT INTO clientes (id, email, password, nombre, apellidos, direccion, poblacion, region, pais, cp, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            //-- Configuración del formato de los datos introducidos para registrar en base de datos.
            let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [idCliente, data.email, passwordCifrada, data.nombre, data.apellidos, data.direccion, data.poblacion, data.region, data.pais, data.cp, data.genero]);
            madservicesClientedb.query(formatoInstruccionRegistrarse, (error) => {
                if(error) throw error;
                //-- Mostrar Alerta Emergente.
                alerta('Cliente registrado con éxito');
                //-- Redirigir a la página principal de la aplicación.
                return res.redirect('/');
            });
        }
    });
}

//-- Creamos la función para iniciar sesión como Cliente, con verificación de correo electrónico y contraseña, en la base de datos de MAD Services.
const iniciarSesionClienteVerificadodb = (email, password, req, res) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultarEmail = 'SELECT * FROM clientes WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para iniciar sesión y consultar en base de datos.
    let formatoInstruccionConsultarEmail = mysql.format(instruccionConsultarEmail, [email]);
    //-- Establecer la comunicación para consultar el email y la contraseña en la base de datos.
    madservicesClientedb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            res.status(401).render('paginas/clientes/login', { mensaje: 'Correo electrónico incorrecto' });
            return res.end();
        }else {
            const miembro = results[0];
            compare(password, miembro.password).then((match) => {
                if(match) {
                    req.session.miembro = miembro;
                    return res.redirect(`/sesion-cliente/${miembro.id}`);
                }else {
                    res.status(401).render('paginas/clientes/login', { mensaje: 'Contraseña incorrecta' });
                    return res.end();
                }
            });       
        }
    });
}

//-- Creamos la función para actualizar el campo nombre del Cliente de la base de datos de MAD Services.
const actualizarNombreVerificadodb = (id, nombre, res) => {

    //-- Declaración de ctes.
    const maxLong = 48;
    //-- Actualizamos y validamos el campo.
    if(nombre) {
        if(nombre.length > maxLong) {
            //-- Mostrar Alerta Emergente.
            alerta(`El nombre no puede ser más largo de ${maxLong} caracteres`);
            // Redirigir al perfil del Cliente.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarNombre = 'UPDATE clientes SET nombre = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarNombre = mysql.format(instruccionActualizarNombre, [nombre, id]);
            //-- Proceso de actualización en base de datos.
            madservicesClientedb.query(formatoInstruccionActualizarNombre);
            //-- Mostrar Alerta Emergente.
            alerta(`El nombre del cliente ha cambiado a: ${nombre}`);
            // Redirigir al perfil del Cliente.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El nombre del cliente no ha cambiado');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}

//-- Creamos la función para actualizar el campo apellidos del Cliente de la base de datos de MAD Services.
const actualizarApellidosVerificadosdb = (id, apellidos, res) => {

    //-- Declaración de ctes.
    const maxLong = 96;
    //-- Actualizamos y validamos el campo.
    if(apellidos) {
        if(apellidos.length > maxLong) {
            //-- Mostrar Alerta Emergente.
            alerta(`Los apellidos no pueden ser más largos de ${maxLong} caracteres`);
            // Redirigir al perfil del Cliente.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarApellidos = 'UPDATE clientes SET apellidos = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarApellidos = mysql.format(instruccionActualizarApellidos, [apellidos, id]);
            //-- Proceso de actualización en base de datos.
            madservicesClientedb.query(formatoInstruccionActualizarApellidos);
            //-- Mostrar Alerta Emergente.
            alerta(`Los apellidos del cliente han cambiado a: ${apellidos}`);
            // Redirigir al perfil del Cliente.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('Los apellidos del cliente no han cambiado');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
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

    //-- Declaración de la estructura correcta del Email.
    const estructuraEmail = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|es)$/;
    //-- Actualizamos y validamos el campo.
    if(email) {
        if(!validacion.isEmail(email) || !estructuraEmail.test(email)) {
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

    //-- Declaración de la cte que saca todos los países del mundo en español.
    const paises = getCountries();
    //-- Proceso de verificación de la localización.
    if(pais && cp && region && poblacion && direccion) {
        if(paises.includes(pais)) {
            //-- Obtenemos el código del país.
            const codigoPais = getCode(pais);
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
                if(region === lugar.adminName1 || region === lugar.adminName2) {
                    if(poblacion === lugar.adminName3) {
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

//-- Creamos la función para Dar de Baja al Cliente de la base de datos de MAD Services.
const darseBajaClientedb = (id, siConfirmo, noConfirmo, req, res) => {
    //-- Caso 1: dejar en blanco la confirmación.
    if(!siConfirmo && !noConfirmo) {
        //-- Mostrar Alerta Emergente.
        alerta('Debes confirmar si quieres o no darte de baja');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    //-- Caso 2: pulsar ambas confirmaciones.
    }else if(siConfirmo && noConfirmo) {
        //-- Mostrar Alerta Emergente.
        alerta('Debes elegir sólo una opción de confirmación');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    //-- Caso 3: pulsar que no quieres darte de baja.
    }else if(!siConfirmo && noConfirmo) {
        //-- Mostrar Alerta Emergente.
        alerta('Gracias por no querer darte de baja');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    //-- Caso 4: pulsar que sí quieres darte de baja.
    }else if(siConfirmo && !noConfirmo) {
        //-- Variables usadas para borrar los datos de la base de datos.
        let instruccionDarseBajaCliente = "DELETE FROM clientes WHERE id = ?";
        let formatoinstruccionDarseBajaCliente = mysql.format(instruccionDarseBajaCliente, [id]);
        //-- Establecer la configuración de borrar los datos de la base de datos.
        madservicesClientedb.query(formatoinstruccionDarseBajaCliente);
        //-- Destruir la sesión.
        req.session.destroy();
        //-- Mostrar Alerta Emergente.
        alerta('Cliente dado de baja definitivamente');
        // Redirigir a la página principal de la aplicación.
        return res.redirect('/');
    }
}

//-- Exportamos las funciones.
module.exports = {
    registrarClienteVerificadodb,
    iniciarSesionClienteVerificadodb,
    actualizarNombreVerificadodb,
    actualizarApellidosVerificadosdb,
    actualizarGeneroVerificadodb,
    actualizarEmailVerificadodb,
    actualizarPasswordVerificadadb,
    actualizarLocalizacionVerificadadb,
    darseBajaClientedb
};