//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../randomIDs/generarIDRandom.js');
//-- Importamos la función que comprueba que no se repita el ID aleatorio.
const comprobarIDmiembroMADdb = require('./operacionesIDmiembroMAD.js');

//-- Creamos la función para registrarse como Miembro MAD, con verificación de correo electrónico, en la base de datos de MAD Services.
const registrarMiembroMADVerificadodb = async (data, res) => {

    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifradaMiembroMAD = await hash(data.passwordMiembro, 1);
    //-- Instrucción para consultar Email en la base de datos.
    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM miembrosmad WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para consultar Email en base de datos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.emailMiembro]);
    //-- Establecer la comunicación de consultar Email en la base de datos.
    madservicesAdmindb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        const cont = results[0].count;
        const emailExiste = cont > 0;
        if(emailExiste) {
            res.status(401).render('paginas/miembroMADregistrarse', { mensaje: 'Correo ya en uso' });
            return res.end();
        }else {
            let idMiembroMAD = generarIDrandom() * 5;
            comprobarIDmiembroMADdb(idMiembroMAD, (idExiste) => {
                while(idExiste) {
                    idMiembroMAD = generarIDrandom() * 5;
                    comprobarIDmiembroMADdb(idMiembroMAD, (idExiste) => {
                        idExiste = idExiste;
                    });
                }
            });
            //-- Instrucción para registrarse en la base de datos.
            let instruccionRegistrarse = "INSERT INTO miembrosmad (id, nombre, apellidos, genero, email, password) VALUES (?, ?, ?, ?, ?, ?)";
            //-- Configuración del formato de los datos introducidos para registrar en base de datos.
            let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [idMiembroMAD, data.nombreMiembro, data.apellidosMiembro, data.generoMiembro, data.emailMiembro, passwordCifradaMiembroMAD]);
            madservicesAdmindb.query(formatoInstruccionRegistrarse, (error) => {
                if(error) throw error;
                return res.redirect('/');
            });
        }
    });
}

//-- Creamos la función para iniciar sesión como Miembro MAD, con verificación de correo electrónico y contraseña, en la base de datos de MAD Services.
const iniciarSesionMiembroMADVerificadodb = (emailMiembro, passwordMiembro, req, res) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultarEmail = 'SELECT * FROM miembrosmad WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para iniciar sesión y consultar en base de datos.
    let formatoInstruccionConsultarEmail = mysql.format(instruccionConsultarEmail, [emailMiembro]);
    //-- Establecer la comunicación para consultar el email y la contraseña en la base de datos.
    madservicesAdmindb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            res.status(401).render('paginas/miembroMADlogin', { mensaje: 'Correo electrónico incorrecto' });
            return res.end();
        }else {
            const miembro = results[0];
            bcrypt.compare(passwordMiembro, miembro.password).then((match) => {
                if(match) {
                    req.session.miembro = miembro;
                    return res.redirect(`/sesion-mad/MAD${miembro.id}`);
                }else {
                    res.status(401).render('paginas/miembroMADlogin', { mensaje: 'Contraseña incorrecta' });
                    return res.end();
                }
            });       
        }
    });
}

//-- Creamos la función para actualizar los campos de la interfaz del Miembro MAD de la base de datos de MAD Services.
const actualizarMiembroMADVerificadodb = (data) => {

    //-- Creamos la estructura para definir los campos de la interfaz del Miembro MAD.
    const hayMiembroMAD = {
        hayNombreMiembroMAD: data.nombre,
        hayApellidosMiembroMAD: data.apellidos,
        hayGeneroMiembroMAD: data.genero,
        hayEmailMiembroMAD: data.email
    };
    //-- Actualizamos cada campo de la interfaz del Miembro MAD, si así lo ha indicado el propio Miembro MAD.
    if(hayMiembroMAD.hayNombreMiembroMAD) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarNombre = 'UPDATE miembrosmad SET nombre = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarNombre = mysql.format(instruccionActualizarNombre, [hayMiembroMAD.hayNombreMiembroMAD, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesAdmindb.query(formatoInstruccionActualizarNombre);
    }
    if(hayMiembroMAD.hayApellidosMiembroMAD) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarApellidos = 'UPDATE miembrosmad SET apellidos = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarApellidos = mysql.format(instruccionActualizarApellidos, [hayMiembroMAD.hayApellidosMiembroMAD, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesAdmindb.query(formatoInstruccionActualizarApellidos);
    }
    if(hayMiembroMAD.hayGeneroMiembroMAD) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarGenero = 'UPDATE miembrosmad SET genero = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarGenero = mysql.format(instruccionActualizarGenero, [hayMiembroMAD.hayGeneroMiembroMAD, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesAdmindb.query(formatoInstruccionActualizarGenero);
    }
    if(hayMiembroMAD.hayEmailMiembroMAD) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarEmail = 'UPDATE miembrosmad SET email = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarEmail = mysql.format(instruccionActualizarEmail, [hayMiembroMAD.hayEmailMiembroMAD, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesAdmindb.query(formatoInstruccionActualizarEmail);
    }
}

//-- Creamos la función para mostrar los campos de la interfaz del Miembro MAD de la base de datos de MAD Services.
const mostrarMiembroMADVerificadodb = (id, oldpassword, newpassword, repitePassword, res) => {

    //-- Proceso de verificación y actualización de la contraseña + Mostrar todos los campos de la interfaz del Miembro MAD.
    if(oldpassword && newpassword && repitePassword) {
        //-- Verificamos que la contraseña de la base de datos es la misma que la antigua introducida.
        //-- Instrucción para consultar contraseña dado el id.
        let instruccionConsultarPasswordPerfil = 'SELECT * FROM miembrosmad WHERE id = ?';
        //-- Configuración del formato para consultar contraseña dado el id.
        let formatoInstruccionConsultarPasswordPerfil = mysql.format(instruccionConsultarPasswordPerfil, [id]);
        //-- Proceso de consulta de contraseña.
        madservicesClientedb.query(formatoInstruccionConsultarPasswordPerfil, (error, results) => {
            if(error) throw error;
            const passwordEnDatabase = results[0].password;
            bcrypt.compare(oldpassword, passwordEnDatabase).then( async (match) => {
                if(match) {
                    //-- Verificamos que la nueva contraseña introducida es correcta.
                    if(newpassword === repitePassword) {
                        //-- Cifrar la nueva contraseña.
                        const nuevaPasswordCifrada = await hash(newpassword,1);
                        //-- Instrucción para actualizar en la base de datos.
                        let instruccionActualizarANuevaPassword = 'UPDATE clientes SET password = ? WHERE id = ?';
                        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                        let formatoInstruccionActualizarANuevaPassword = mysql.format(instruccionActualizarANuevaPassword, [nuevaPasswordCifrada, id]);
                        //-- Proceso de actualización en base de datos.
                        madservicesClientedb.query(formatoInstruccionActualizarANuevaPassword);
                        //-- Instrucción consultar para mostrar.
                        let instruccionConsultarParaMostrar = 'SELECT * FROM clientes WHERE id = ?';
                        //-- Configuración del formato de la instrucción.
                        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
                        //-- Proceso de la consulta.
                        madservicesClientedb.query(formatoinstruccionConsultarParaMostrar, (error, resultado) => {
                            if(error) throw error;
                            const tablaCliente = resultado[0];
                            res.status(201).render('paginas/perfilClientes',
                            {
                                msjActualizacion: 'Campos actualizados con éxito y contraseña: ',
                                id: tablaCliente.id,
                                nombre: tablaCliente.nombre,
                                apellidos: tablaCliente.apellidos,
                                genero: tablaCliente.genero,
                                email: tablaCliente.email,
                                password: tablaCliente.password,
                                direccion: tablaCliente.direccion,
                                poblacion: tablaCliente.poblacion,
                                region: tablaCliente.region,
                                pais: tablaCliente.pais,
                                cp: tablaCliente.cp
                            });
                            return res.end();
                        });
                    }else {
                        //-- Instrucción consultar para mostrar.
                        let instruccionConsultarParaMostrar = 'SELECT * FROM clientes WHERE id = ?';
                        //-- Configuración del formato de la instrucción.
                        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
                        //-- Proceso de la consulta.
                        madservicesClientedb.query(formatoinstruccionConsultarParaMostrar, (error, result) => {
                            if(error) throw error;
                            const tablaCliente = result[0];
                            res.status(401).render('paginas/perfilClientes', 
                            {
                                msjError: `La nueva contraseña introducida`,
                                msjError1: `no es igual a la repetida`,
                                id: tablaCliente.id,
                                nombre: tablaCliente.nombre,
                                apellidos: tablaCliente.apellidos,
                                genero: tablaCliente.genero,
                                email: tablaCliente.email,
                                password: tablaCliente.password,
                                direccion: tablaCliente.direccion,
                                poblacion: tablaCliente.poblacion,
                                region: tablaCliente.region,
                                pais: tablaCliente.pais,
                                cp: tablaCliente.cp
                            });
                            return res.end();
                        });
                    }
                }else {
                    //-- Instrucción consultar para mostrar.
                    let instruccionConsultarParaMostrar = 'SELECT * FROM clientes WHERE id = ?';
                    //-- Configuración del formato de la instrucción.
                    let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
                    //-- Proceso de la consulta.
                    madservicesClientedb.query(formatoinstruccionConsultarParaMostrar, (error, field) => {
                        if(error) throw error;
                        const tablaCliente = field[0];
                        res.status(401).render('paginas/perfilClientes', 
                        {
                            msjError: `La antigua contraseña introducida`,
                            msjError1: `no coincide con la de la base de datos`,
                            id: tablaCliente.id,
                            nombre: tablaCliente.nombre,
                            apellidos: tablaCliente.apellidos,
                            genero: tablaCliente.genero,
                            email: tablaCliente.email,
                            password: tablaCliente.password,
                            direccion: tablaCliente.direccion,
                            poblacion: tablaCliente.poblacion,
                            region: tablaCliente.region,
                            pais: tablaCliente.pais,
                            cp: tablaCliente.cp
                        });
                        return res.end();
                    });
                }
            });
        });
    }else {
        //-- Instrucción consultar para mostrar.
        let instruccionConsultarParaMostrar = 'SELECT * FROM miembrosmad WHERE id = ?';
        //-- Configuración del formato de la instrucción.
        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
        //-- Proceso de la consulta.
        madservicesClientedb.query(formatoinstruccionConsultarParaMostrar, (error, fields) => {
            if(error) throw error;
            const tablaCliente = fields[0];
            res.status(201).render('paginas/perfilClientes',
            {
                msjActualizacion: `Campos actualizados con éxito sin contraseña: `,
                id: tablaCliente.id,
                nombre: tablaCliente.nombre,
                apellidos: tablaCliente.apellidos,
                genero: tablaCliente.genero,
                email: tablaCliente.email,
                password: tablaCliente.password,
                direccion: tablaCliente.direccion,
                poblacion: tablaCliente.poblacion,
                region: tablaCliente.region,
                pais: tablaCliente.pais,
                cp: tablaCliente.cp
            });
            return res.end();
        });
    }
}

//-- Exportamos las funciones.
module.exports = {registrarMiembroMADVerificadodb, iniciarSesionMiembroMADVerificadodb, actualizarMiembroMADVerificadodb, mostrarMiembroMADVerificadodb};