//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../../randomIDs/generarIDRandom.js');
//-- Importamos la función que comprueba que no se repita el ID aleatorio.
const consultaID = require('./consultaID.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos la función para registrarse como Empresa, con verificación de correo electrónico, en la base de datos de MAD Services.
const registrarEmpresaVerificadadb = async (data, password, res) => {

    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(password, 1);
    //-- Instrucción para consultar Email en la base de datos.
    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM empresas WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para consultar Email en base de datos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    //-- Establecer la comunicación de insertar y consultar datos en la base de datos.
    madservicesEmpresadb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        const cont = results[0].count;
        const emailExiste = cont > 0;
        if(emailExiste) {
            res.status(401).render('paginas/empresas/registrarse', { mensaje: 'Correo ya en uso' });
            return res.end();
        }else {
            let idEmpresa = generarIDrandom() * 3;
            consultaID(idEmpresa, (idExiste) => {
                while(idExiste) {
                    idEmpresa = generarIDrandom() * 3;
                    consultaID(idEmpresa, (idExiste) => {
                        idExiste = idExiste;
                    });
                }
            });
            //-- Instrucción para registrarse en la base de datos.
            let instruccionRegistrarse = "INSERT INTO empresas (id, email, password, marca, nif, tipo, ebitda) VALUES (?, ?, ?, ?, ?, ?, ?)";
            //-- Configuración del formato de los datos introducidos para registrar en base de datos.
            let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [idEmpresa, data.email, passwordCifrada, data.marca, data.nif, data.tipo, data.ebitda]);
            madservicesEmpresadb.query(formatoInstruccionRegistrarse, (error) => {
                if(error) throw error;
                //-- Mostrar Alerta Emergente.
                alerta('Empresa registrada con éxito');
                // Redirigir a la página principal de la aplicación.
                return res.redirect('/');
            });
        }
    });
}

//-- Creamos la función para iniciar sesión como Empresa, con verificación de correo electrónico y contraseña, en la base de datos de MAD Services.
const iniciarSesionEmpresaVerificadadb = (email, password, req, res) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultarEmail = 'SELECT * FROM empresas WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para iniciar sesión y consultar en base de datos.
    let formatoInstruccionConsultarEmail = mysql.format(instruccionConsultarEmail, [email]);
    //-- Establecer la comunicación para consultar el email y la contraseña en la base de datos.
    madservicesEmpresadb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            res.status(401).render('paginas/empresas/login', { mensaje: 'Correo electrónico incorrecto' });
            return res.end();
        }else {
            const miembro = results[0];
            compare(password, miembro.password).then((result) => {
                if(result) {
                    //-- Establecemos el inicio de sesión.
                    req.session.miembro = miembro;
                    return res.redirect(`/sesion-empresa/${miembro.id}`);
                }else {
                    res.status(401).render('paginas/empresas/login', { mensaje: 'Contraseña incorrecta' });
                    return res.end();
                }
            });
        }
    });
}

//-- Creamos la función para actualizar los campos de la interfaz de la Empresa de la base de datos de MAD Services.
const actualizarEmpresaVerificadadb = (data) => {

    //-- Creamos la estructura para definir los campos de la interfaz de la Empresa.
    const hayEmpresa = {
        hayMarca: data.marca,
        hayTipo: data.tipo,
        hayNif: data.nif,
        hayEbitda: data.ebitda,
        hayEmail: data.email
    };
    //-- Actualizamos cada campo de la interfaz del Miembro MAD, si así lo ha indicado el propio Miembro MAD.
    if(hayEmpresa.hayMarca) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarMarca = 'UPDATE empresas SET marca = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarMarca = mysql.format(instruccionActualizarMarca, [hayEmpresa.hayMarca, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesEmpresadb.query(formatoInstruccionActualizarMarca);
    }
    if(hayEmpresa.hayTipo) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarTipo = 'UPDATE empresas SET tipo = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarTipo = mysql.format(instruccionActualizarTipo, [hayEmpresa.hayTipo, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesEmpresadb.query(formatoInstruccionActualizarTipo);
    }
    if(hayEmpresa.hayNif) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarNif = 'UPDATE empresas SET nif = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarNif = mysql.format(instruccionActualizarNif, [hayEmpresa.hayNif, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesEmpresadb.query(formatoInstruccionActualizarNif);
    }
    if(hayEmpresa.hayEbitda) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarEbitda = 'UPDATE empresas SET ebitda = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarEbitda = mysql.format(instruccionActualizarEbitda, [hayEmpresa.hayEbitda, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesEmpresadb.query(formatoInstruccionActualizarEbitda);
    }
    if(hayEmpresa.hayEmail) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarEmail = 'UPDATE empresas SET email = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarEmail = mysql.format(instruccionActualizarEmail, [hayEmpresa.hayEmail, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesEmpresadb.query(formatoInstruccionActualizarEmail);
    }
}

//-- Creamos la función para mostrar los campos de la interfaz de la Empresa de la base de datos de MAD Services.
const mostrarEmpresaVerificadadb = (id, oldpassword, newpassword, repitePassword, res) => {

    //-- Proceso de verificación y actualización de la contraseña + Mostrar todos los campos de la interfaz del Miembro MAD.
    if(oldpassword && newpassword && repitePassword) {
        //-- Verificamos que la contraseña de la base de datos es la misma que la antigua introducida.
        //-- Instrucción para consultar contraseña dado el id.
        let instruccionConsultarPasswordPerfil = 'SELECT * FROM empresas WHERE id = ?';
        //-- Configuración del formato para consultar contraseña dado el id.
        let formatoInstruccionConsultarPasswordPerfil = mysql.format(instruccionConsultarPasswordPerfil, [id]);
        //-- Proceso de consulta de contraseña.
        madservicesEmpresadb.query(formatoInstruccionConsultarPasswordPerfil, (error, results) => {
            if(error) throw error;
            const passwordEnDatabase = results[0].password;
            bcrypt.compare(oldpassword, passwordEnDatabase).then( async (match) => {
                if(match) {
                    //-- Verificamos que la nueva contraseña introducida es correcta.
                    if(newpassword === repitePassword) {
                        //-- Cifrar la nueva contraseña.
                        const nuevaPasswordCifrada = await hash(newpassword,1);
                        //-- Instrucción para actualizar en la base de datos.
                        let instruccionActualizarANuevaPassword = 'UPDATE empresas SET password = ? WHERE id = ?';
                        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                        let formatoInstruccionActualizarANuevaPassword = mysql.format(instruccionActualizarANuevaPassword, [nuevaPasswordCifrada, id]);
                        //-- Proceso de actualización en base de datos.
                        madservicesEmpresadb.query(formatoInstruccionActualizarANuevaPassword);
                        //-- Instrucción consultar para mostrar.
                        let instruccionConsultarParaMostrar = 'SELECT * FROM empresas WHERE id = ?';
                        //-- Configuración del formato de la instrucción.
                        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
                        //-- Proceso de la consulta.
                        madservicesEmpresadb.query(formatoinstruccionConsultarParaMostrar, (error, resultado) => {
                            if(error) throw error;
                            const tablaEmpresa = resultado[0];
                            res.status(201).render('paginas/empresas/interfaz',
                            {
                                msjActualizacion: 'Campos actualizados con éxito y contraseña: ',
                                id: tablaEmpresa.id,
                                email: tablaEmpresa.email,
                                password: tablaEmpresa.password,
                                marca: tablaEmpresa.marca,
                                tipo: tablaEmpresa.tipo,
                                nif: tablaEmpresa.nif,
                                ebitda: tablaEmpresa.ebitda
                            });
                            return res.end();
                        });
                    }else {
                        //-- Instrucción consultar para mostrar.
                        let instruccionConsultarParaMostrar = 'SELECT * FROM empresas WHERE id = ?';
                        //-- Configuración del formato de la instrucción.
                        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
                        //-- Proceso de la consulta.
                        madservicesEmpresadb.query(formatoinstruccionConsultarParaMostrar, (error, result) => {
                            if(error) throw error;
                            const tablaEmpresa = result[0];
                            res.status(401).render('paginas/empresas/interfaz', 
                            {
                                msjError: `La nueva contraseña introducida`,
                                msjError1: `no es igual a la repetida`,
                                id: tablaEmpresa.id,
                                email: tablaEmpresa.email,
                                password: tablaEmpresa.password,
                                marca: tablaEmpresa.marca,
                                tipo: tablaEmpresa.tipo,
                                nif: tablaEmpresa.nif,
                                ebitda: tablaEmpresa.ebitda
                            });
                            return res.end();
                        });
                    }
                }else {
                    //-- Instrucción consultar para mostrar.
                    let instruccionConsultarParaMostrar = 'SELECT * FROM empresas WHERE id = ?';
                    //-- Configuración del formato de la instrucción.
                    let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
                    //-- Proceso de la consulta.
                    madservicesEmpresadb.query(formatoinstruccionConsultarParaMostrar, (error, field) => {
                        if(error) throw error;
                        const tablaEmpresa = field[0];
                        res.status(401).render('paginas/empresas/interfaz', 
                        {
                            msjError: `La antigua contraseña introducida`,
                            msjError1: `no coincide con la de la base de datos`,
                            id: tablaEmpresa.id,
                            email: tablaEmpresa.email,
                            password: tablaEmpresa.password,
                            marca: tablaEmpresa.marca,
                            tipo: tablaEmpresa.tipo,
                            nif: tablaEmpresa.nif,
                            ebitda: tablaEmpresa.ebitda
                        });
                        return res.end();
                    });
                }
            });
        });
    }else {
        //-- Instrucción consultar para mostrar.
        let instruccionConsultarParaMostrar = 'SELECT * FROM empresas WHERE id = ?';
        //-- Configuración del formato de la instrucción.
        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
        //-- Proceso de la consulta.
        madservicesEmpresadb.query(formatoinstruccionConsultarParaMostrar, (error, fields) => {
            if(error) throw error;
            const tablaEmpresa = fields[0];
            res.status(201).render('paginas/empresas/interfaz',
            {
                msjActualizacion: `Campos actualizados con éxito sin contraseña: `,
                id: tablaEmpresa.id,
                email: tablaEmpresa.email,
                password: tablaEmpresa.password,
                marca: tablaEmpresa.marca,
                tipo: tablaEmpresa.tipo,
                nif: tablaEmpresa.nif,
                ebitda: tablaEmpresa.ebitda
            });
            return res.end();
        });
    }
}

//-- Creamos la función para Dar de Baja a la Empresa de la base de datos de MAD Services.
const darseBajaEmpresadb = (id, req, res) => {
    //-- Instrucción para dar de baja.
    let instruccionDarDeBajaEmpresa = 'DELETE FROM empresas WHERE id = ?';
    //-- Configuración del formato de la instrucción dar de baja.
    let formatoinstruccionDarDeBajaEmpresa = mysql.format(instruccionDarDeBajaEmpresa, [id]);
    //-- Proceso de dar de baja.
    madservicesEmpresadb.query(formatoinstruccionDarDeBajaEmpresa);
    //-- Destruir sesión.
    req.session.destroy();
    //-- Mostrar Alerta Emergente.
    alerta('Empresa dada de baja definitivamente');
    // Redirigir a la página principal de la aplicación.
    return res.redirect('/');
}

//-- Exportamos las funciones.
module.exports = {registrarEmpresaVerificadadb, iniciarSesionEmpresaVerificadadb, actualizarEmpresaVerificadadb, mostrarEmpresaVerificadadb, darseBajaEmpresadb};