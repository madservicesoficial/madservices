//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../../randomIDs/generarIDRandom.js');
//-- Importamos la función que comprueba que no se repita el ID aleatorio.
const consultaID = require('./consultaID.js');

//-- Creamos la función para registrarse como Cliente, con verificación de correo electrónico, en la base de datos de MAD Services.
const registrarClienteVerificadodb = async (data, req, res) => {

    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(data.password, 1);
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
                alert('Cliente registrado con éxito');
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
            bcrypt.compare(password, miembro.password).then((match) => {
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

//-- Creamos la función para actualizar los campos del Perfil Cliente de la base de datos de MAD Services.
const actualizarClienteVerificadodb = (data) => {
    //-- Creamos la estructura para definir los campos del perfil del cliente.
    const hayCliente = {
        hayNombre: data.nombre,
        hayApellidos: data.apellidos,
        hayGenero: data.genero,
        hayEmail: data.email,
        hayDireccion: data.direccion,
        hayPoblacion: data.poblacion,
        hayRegion: data.region,
        hayPais: data.pais,
        hayCP: data.cp,
    };
    //-- Actualizamos cada campo del Perfil Cliente, si así lo ha indicado el propio Cliente.
    if(hayCliente.hayNombre) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarNombre = 'UPDATE clientes SET nombre = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarNombre = mysql.format(instruccionActualizarNombre, [hayCliente.hayNombre, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesClientedb.query(formatoInstruccionActualizarNombre);
    }
    if(hayCliente.hayApellidos) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarApellidos = 'UPDATE clientes SET apellidos = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarApellidos = mysql.format(instruccionActualizarApellidos, [hayCliente.hayApellidos, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesClientedb.query(formatoInstruccionActualizarApellidos);
    }
    if(hayCliente.hayGenero) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarGenero = 'UPDATE clientes SET genero = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarGenero = mysql.format(instruccionActualizarGenero, [hayCliente.hayGenero, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesClientedb.query(formatoInstruccionActualizarGenero);
    }
    if(hayCliente.hayEmail) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarEmail = 'UPDATE clientes SET email = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarEmail = mysql.format(instruccionActualizarEmail, [hayCliente.hayEmail, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesClientedb.query(formatoInstruccionActualizarEmail);
    }
    if(hayCliente.hayDireccion) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarDireccion = 'UPDATE clientes SET direccion = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarDireccion = mysql.format(instruccionActualizarDireccion, [hayCliente.hayDireccion, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesClientedb.query(formatoInstruccionActualizarDireccion);
    }
    if(hayCliente.hayPoblacion) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarPoblacion = 'UPDATE clientes SET poblacion = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarPoblacion = mysql.format(instruccionActualizarPoblacion, [hayCliente.hayPoblacion, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesClientedb.query(formatoInstruccionActualizarPoblacion);
    }
    if(hayCliente.hayRegion) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarRegion = 'UPDATE clientes SET region = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarRegion = mysql.format(instruccionActualizarRegion, [hayCliente.hayRegion, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesClientedb.query(formatoInstruccionActualizarRegion);
    }
    if(hayCliente.hayPais) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarPais = 'UPDATE clientes SET pais = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarPais = mysql.format(instruccionActualizarPais, [hayCliente.hayPais, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesClientedb.query(formatoInstruccionActualizarPais);
    }
    if(hayCliente.hayCP) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarCP = 'UPDATE clientes SET cp = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarCP = mysql.format(instruccionActualizarCP, [hayCliente.hayCP, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesClientedb.query(formatoInstruccionActualizarCP);
    }
}

//-- Creamos la función para mostrar los campos del Perfil Cliente de la base de datos de MAD Services.
const mostrarClienteVerificadodb = (id, oldpassword, newpassword, repitePassword, res) => {
    //-- Proceso de verificación y actualización de la contraseña + Mostrar todos los campos del Perfil del Cliente.
    if(oldpassword && newpassword && repitePassword) {
        //-- Verificamos que la contraseña de la base de datos es la misma que la antigua introducida.
        //-- Instrucción para consultar contraseña dado el id.
        let instruccionConsultarPasswordPerfil = 'SELECT * FROM clientes WHERE id = ?';
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
                            res.status(201).render('paginas/clientes/perfil',
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
                            res.status(401).render('paginas/clientes/perfil', 
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
                        res.status(401).render('paginas/clientes/perfil', 
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
        let instruccionConsultarParaMostrar = 'SELECT * FROM clientes WHERE id = ?';
        //-- Configuración del formato de la instrucción.
        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
        //-- Proceso de la consulta.
        madservicesClientedb.query(formatoinstruccionConsultarParaMostrar, (error, fields) => {
            if(error) throw error;
            const tablaCliente = fields[0];
            res.status(201).render('paginas/clientes/perfil',
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

//-- Creamos la función para Dar de Baja al Cliente de la base de datos de MAD Services.
const darseBajaClientedb = (id, req, res) => {
    //-- Variables usadas para borrar los datos de la base de datos.
    let instruccionDarseBajaCliente = "DELETE FROM clientes WHERE id = ?";
    let formatoinstruccionDarseBajaCliente = mysql.format(instruccionDarseBajaCliente, [id]);
    //-- Establecer la configuración de borrar los datos de la base de datos.
    madservicesClientedb.query(formatoinstruccionDarseBajaCliente);
    //-- Redireccionar a Inicio por darse de baja y destruir sesión.
    req.session.destroy();
    res.redirect('/');
}

//-- Exportamos las funciones.
module.exports = {registrarClienteVerificadodb, iniciarSesionClienteVerificadodb, actualizarClienteVerificadodb, mostrarClienteVerificadodb, darseBajaClientedb};