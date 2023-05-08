//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../generarIDRandom.js');
//-- Importamos la función que comprueba que no se repita el ID aleatorio.
const consultaID = require('./consultaID.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para validar datos enviados por la Empresa.
const validacion = require("validator");
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
//-- Importamos la Tecnología para redimensionar las imágenes cargadas en local.
const sharp = require('sharp');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');

//-- Creamos la función para registrarse como Miembro MAD, con verificación de correo electrónico, en la base de datos de MAD Services.
const registrarMiembroVerificadodb = async (data, password, res) => {

    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(password, 1);
    //-- Instrucción para consultar Email en la base de datos.
    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM miembros WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para consultar Email en base de datos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    //-- Establecer la comunicación de consultar Email en la base de datos.
    madservicesAdmindb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        const cont = results[0].count;
        const emailExiste = cont > 0;
        if(emailExiste) {
            res.status(401).render('paginas/miembros/registrarse', { mensaje: 'Correo ya en uso' });
            return res.end();
        }else {
            let idMiembro = generarIDrandom() * 5;
            consultaID(idMiembro, (idExiste) => {
                while(idExiste) {
                    idMiembro = generarIDrandom() * 5;
                    consultaID(idMiembro, (idExiste) => {
                        idExiste = idExiste;
                    });
                }
            });
            //-- Instrucción para registrarse en la base de datos.
            let instruccionRegistrarse = "INSERT INTO miembros (id, email, password, miembro, departamento, genero) VALUES (?, ?, ?, ?, ?, ?)";
            //-- Configuración del formato de los datos introducidos para registrar en base de datos.
            let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [idMiembro, data.email, passwordCifrada, data.miembro, data.departamento, data.genero]);
            madservicesAdmindb.query(formatoInstruccionRegistrarse, (error) => {
                if(error) throw error;
                //-- Mostrar Alerta Emergente.
                alerta('Miembro MAD registrado con éxito');
                // Redirigir a la página principal de la aplicación.
                return res.redirect('/');
            });
        }
    });
}

//-- Creamos la función para iniciar sesión como Miembro MAD, con verificación de correo electrónico y contraseña, en la base de datos de MAD Services.
const iniciarSesionMiembroVerificadodb = (email, password, req, res) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultarEmail = 'SELECT * FROM miembros WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para iniciar sesión y consultar en base de datos.
    let formatoInstruccionConsultarEmail = mysql.format(instruccionConsultarEmail, [email]);
    //-- Establecer la comunicación para consultar el email y la contraseña en la base de datos.
    madservicesAdmindb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            res.status(401).render('paginas/miembros/login', { mensaje: 'Correo electrónico incorrecto' });
            return res.end();
        }else {
            const miembro = results[0];
            compare(password, miembro.password).then((match) => {
                if(match) {
                    req.session.miembro = miembro;
                    return res.redirect(`/sesion-miembro/${miembro.id}`);
                }else {
                    res.status(401).render('paginas/miembros/login', { mensaje: 'Contraseña incorrecta' });
                    return res.end();
                }
            });       
        }
    });
}

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

    //-- Declaración de la estructura correcta del Email.
    const estructuraEmail = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|es)$/;
    //-- Actualizamos y validamos el campo.
    if(email) {
        if(!validacion.isEmail(email) || !estructuraEmail.test(email)) {
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

//-- Creamos la función para Dar de Baja al Miembro MAD de la base de datos de MAD Services.
const darseBajaMiembrodb = (id, siConfirmo, noConfirmo, req, res) => {
    //-- Caso 1: dejar en blanco la confirmación.
    if(!siConfirmo && !noConfirmo) {
        //-- Mostrar Alerta Emergente.
        alerta('Debes confirmar si decides dejar MAD Services o te quedas');
        // Redirigir a la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    //-- Caso 2: pulsar ambas confirmaciones.
    }else if(siConfirmo && noConfirmo) {
        //-- Mostrar Alerta Emergente.
        alerta('Sólo puedes optar por una opción: te quedas o te vas');
        // Redirigir a la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    //-- Caso 3: pulsar que no quieres darte de baja.
    }else if(!siConfirmo && noConfirmo) {
        //-- Mostrar Alerta Emergente.
        alerta('¡Tómatelo como una renovación!');
        // Redirigir a la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    //-- Caso 4: pulsar que sí quieres darte de baja.
    }else if(siConfirmo && !noConfirmo) {
        //-- Instrucción para dar de baja.
        let instruccionDarDeBajaMiembro = 'DELETE FROM miembros WHERE id = ?';
        //-- Configuración del formato de la instrucción dar de baja.
        let formatoinstruccionDarDeBajaMiembro = mysql.format(instruccionDarDeBajaMiembro, [id]);
        //-- Proceso de dar de baja.
        madservicesAdmindb.query(formatoinstruccionDarDeBajaMiembro);
        //-- Destruir sesión.
        req.session.destroy();
        //-- Mostrar Alerta Emergente.
        alerta('Miembro MAD dado de baja definitivamente');
        // Redirigir a la página principal de la aplicación.
        return res.redirect('/');
    }
}

//-- Creamos la función para ingresar los productos MAD en la base de datos de MAD Services.
const ingresarProductosMADdb = async (id, data, res) => {
    //-- Ruta al directorio de las imágenes almacenadas localmente.
    const rutaAlDirectorio = path.join(__dirname, '../../imagenes');
    //-- Fichero asíncrono leer directorio.
    const readdir = util.promisify(fs.readdir);
    //-- Fichero asíncrono leer fichero.
    const readFile = util.promisify(fs.readFile);
    //-- Fichero asíncrono borrar fichero.
    const unlink = util.promisify(fs.unlink);
    //-- Procedimiento para subir la imagen de portada y el resto de campos del producto a la base de datos.

    //-- Ruta donde está el archivo metido localmente.
    const files = await readdir(rutaAlDirectorio);
    const file = files[0];

    if(typeof file === 'string') {
        //-- Ruta del fichero completa metido localmente.
        let rutaAlArchivo = path.join(rutaAlDirectorio, file);
        //-- Ruta del fichero redimensionado metido localmente.
        let nuevaRuta = path.join(rutaAlDirectorio, 'edit' + file);
        //-- Redimensión de la imagen de portada y almacenamiento localmente.
        await sharp(rutaAlArchivo).resize(200).toFile(nuevaRuta);
        //-- Almacenamiento de imagen redimensionada localmente en imagen de buffer.
        let imagenBuffer = await readFile(nuevaRuta);
        //-- Almacenamiento de imagen de buffer en base64.
        let imagen = imagenBuffer.toString('base64');
        //-- Instrucción para ingresar productos.
        let instruccionIngresaProductos = 'INSERT INTO productos (portada, cantidad, producto, titulo, precio, peso, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)';
        //-- Establecimiento de la conexión con base de datos.
        madservicesAdmindb.query(instruccionIngresaProductos, [imagen, data.cantidad, data.categoria, data.titulo, data.precio, data.peso, data.descripcion]);

        //-- Eliminación de las imágenes locales.
        let eliminarArchivo = path.join(rutaAlDirectorio, file);
        let eliminarArchivoEdit = path.join(rutaAlDirectorio, 'edit' + file);
        await unlink(eliminarArchivo);
        await unlink(eliminarArchivoEdit);

        //-- Mostrar Alerta Emergente.
        alerta('Producto ingresado con éxito');
        // Redirigir a la página de la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('Debes introducir una imagen de portada');
        // Redirigir a la página de la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }
}

//-- Exportamos las funciones.
module.exports = {
    registrarMiembroVerificadodb,
    iniciarSesionMiembroVerificadodb,
    actualizarMiembroVerificadodb,
    actualizarDepartamentoVerificadodb,
    actualizarGeneroVerificadodb,
    actualizarEmailVerificadodb,
    actualizarPasswordVerificadadb,
    darseBajaMiembrodb,
    ingresarProductosMADdb
};