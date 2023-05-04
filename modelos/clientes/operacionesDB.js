//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../../randomIDs/generarIDRandom.js');
//-- Importamos la función que comprueba que no se repita el ID aleatorio.
const consultaID = require('./consultaID.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para validar datos enviados por el cliente.
const validacion = require("validator");

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
    const minLong = 3;
    const maxLong = 48;
    //-- Actualizamos y validamos el campo.
    if(nombre) {
        if(nombre.length < minLong || nombre.length > maxLong) {
            //-- Mostrar Alerta Emergente.
            alerta('El nombre del cliente no se ajusta al estándar MAD');
            // Redirigir a la interfaz del Cliente.
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
            // Redirigir a la interfaz del Cliente.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El nombre del cliente no ha cambiado');
        // Redirigir a la interfaz del Cliente.
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
    darseBajaClientedb
};