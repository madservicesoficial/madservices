//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../config/database.js');
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
//-- Importamos la Tecnología para validar el CIF/NIF introducido.
const cifvalidacion = require('nif-dni-nie-cif-validation');

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
            let instruccionRegistrarse = "INSERT INTO empresas (id, email, password, marca, nif, tipo) VALUES (?, ?, ?, ?, ?, ?)";
            //-- Configuración del formato de los datos introducidos para registrar en base de datos.
            let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [idEmpresa, data.email, passwordCifrada, data.marca, data.nif, data.tipo]);
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

//-- Creamos la función para actualizar el campo NIF de la Empresa de la base de datos de MAD Services.
const actualizarNIFVerificadodb = (id, nif, res) => {

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

    //-- Declaración de la estructura correcta del Email.
    const estructuraEmail = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|es)$/;
    //-- Actualizamos y validamos el campo.
    if(email) {
        if(!validacion.isEmail(email) || !estructuraEmail.test(email)) {
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

//-- Creamos la función para Dar de Baja a la Empresa de la base de datos de MAD Services.
const darseBajaEmpresadb = (id, confirmarOpcion, req, res) => {
    //-- Caso 1: dejar en blanco la confirmación.
    if(!confirmarOpcion) {
        //-- Mostrar Alerta Emergente.
        alerta('Debes confirmar si quieres o no darte de baja');
        // Redirigir a la interfaz de la Empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    //-- Caso 2: pulsar que no quieres darte de baja.
    }else if(confirmarOpcion === 'No') {
        //-- Mostrar Alerta Emergente.
        alerta('Gracias por no querer darte de baja');
        // Redirigir a la interfaz de la Empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    //-- Caso 3: pulsar que sí quieres darte de baja.
    }else if(confirmarOpcion === 'Sí') {
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
}

//-- Creamos las funciones para ingresar en la interfaz de empresa.
const ingresoDescripcionEmpresadb = (id, descripcion, res) => {

    //-- Verificación de la descripción.
    if(descripcion) {
        const maxDescrip = 498;
        if(descripcion > maxDescrip) {
            //-- Mostrar Alerta Emergente.
            alerta(`La descripción no puede superar los ${maxDescrip}`);
            //-- Redirigir a la interfaz de la empresa.
            return res.redirect(`/sesion-empresa/${id}/interfaz`);
        }else {
            //-- Comprobamos que no haya descripción en base de datos.
            let instruccionComprobarDescripcion = 'SELECT * FROM companyd WHERE id = ?';
            //-- Formato de la instrucción.
            let formatoIinstruccionComprobarDescripcion = mysql.format(instruccionComprobarDescripcion, [id]);
            //-- Establecemos la conexión.
            madservicesEmpresadb.query(formatoIinstruccionComprobarDescripcion, (error, results) => {
                if(error) throw error;
                if(results[0] === undefined) {
                    //-- Ingresamos la descripción en base de datos.
                    let instruccionIngresarDescripcion = 'INSERT INTO companyd (id, descripcion) values (?, ?)';
                    //-- Formato de la instrucción.
                    let formatoInstruccionIngresarDescripcion = mysql.format(instruccionIngresarDescripcion, [id, descripcion]);
                    //-- Establecemos la conexión.
                    madservicesEmpresadb.query(formatoInstruccionIngresarDescripcion);
                    //-- Mostrar Alerta Emergente.
                    alerta('La descripción ha sido ingresada con éxito');
                    //-- Redirigir a la interfaz de la empresa.
                    return res.redirect(`/sesion-empresa/${id}/interfaz`);
                }else {
                    //-- Actualizamos la descripción en base de datos.
                    let instruccionActualizarDescripcion = 'UPDATE companyd SET descripcion = ? WHERE id = ?';
                    //-- Formato de la instrucción.
                    let formatoInstruccionActualizarDescripcion = mysql.format(instruccionActualizarDescripcion, [descripcion, id]);
                    //-- Establecemos la conexión.
                    madservicesEmpresadb.query(formatoInstruccionActualizarDescripcion);
                    //-- Mostrar Alerta Emergente.
                    alerta('La descripción ha sido actualizada con éxito');
                    //-- Redirigir a la interfaz de la empresa.
                    return res.redirect(`/sesion-empresa/${id}/interfaz`);
                }
            });
        }
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('La descripción no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const ingresoInstagramEmpresadb = (id, instagram, res) => {

    //-- Verificación del instagram.
    if(instagram) {
        //-- Cte estructura de la URL de instagram.
        const estructuraInstagram = `https://www.instagram.com/${instagram}/`;
        //-- Comprobamos que no haya instagram en base de datos.
        let instruccionComprobarInstagram = 'SELECT * FROM companyi WHERE id = ?';
        //-- Formato de la instrucción.
        let formatoInstruccionComprobarInstagram = mysql.format(instruccionComprobarInstagram, [id]);
        //-- Establecemos la conexión.
        madservicesEmpresadb.query(formatoInstruccionComprobarInstagram, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                //-- Ingresamos el instagram en base de datos.
                let instruccionIngresarInstagram = 'INSERT INTO companyi (id, instagram) values (?, ?)';
                //-- Formato de la instrucción.
                let formatoInstruccionIngresarInstagram = mysql.format(instruccionIngresarInstagram, [id, estructuraInstagram]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionIngresarInstagram);
                //-- Mostrar Alerta Emergente.
                alerta('El instagram ha sido ingresado con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }else {
                //-- Actualizamos el instagram en base de datos.
                let instruccionActualizarInstagram = 'UPDATE companyi SET instagram = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarInstagram = mysql.format(instruccionActualizarInstagram, [estructuraInstagram, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarInstagram);
                //-- Mostrar Alerta Emergente.
                alerta('El instagram ha sido actualizado con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }
        });
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El instagram no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const ingresoTwitterEmpresadb = (id, twitter, res) => {

    //-- Verificación del twitter.
    if(twitter) {
        //-- Cte estructura de la URL de twitter.
        const estructuraTwitter = `https://twitter.com/${twitter}`;
        //-- Comprobamos que no haya twitter en base de datos.
        let instruccionComprobarTwitter = 'SELECT * FROM companyt WHERE id = ?';
        //-- Formato de la instrucción.
        let formatoInstruccionComprobarTwitter = mysql.format(instruccionComprobarTwitter, [id]);
        //-- Establecemos la conexión.
        madservicesEmpresadb.query(formatoInstruccionComprobarTwitter, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                //-- Ingresamos el twitter en base de datos.
                let instruccionIngresarTwitter = 'INSERT INTO companyt (id, twitter) values (?, ?)';
                //-- Formato de la instrucción.
                let formatoInstruccionIngresarTwitter = mysql.format(instruccionIngresarTwitter, [id, estructuraTwitter]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionIngresarTwitter);
                //-- Mostrar Alerta Emergente.
                alerta('El twitter ha sido ingresado con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }else {
                //-- Actualizamos el twitter en base de datos.
                let instruccionActualizarTwitter = 'UPDATE companyt SET twitter = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarTwitter = mysql.format(instruccionActualizarTwitter, [estructuraTwitter, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarTwitter);
                //-- Mostrar Alerta Emergente.
                alerta('El twitter ha sido actualizado con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }
        });
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El twitter no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const ingresoWhatsAppEmpresadb = (id, whatsapp, res) => {

    //-- Verificación del whatsapp.
    if(whatsapp) {
        //-- Comprobamos que no haya whatsapp en base de datos.
        let instruccionComprobarWhatsapp = 'SELECT * FROM companyw WHERE id = ?';
        //-- Formato de la instrucción.
        let formatoInstruccionComprobarWhatsapp = mysql.format(instruccionComprobarWhatsapp, [id]);
        //-- Establecemos la conexión.
        madservicesEmpresadb.query(formatoInstruccionComprobarWhatsapp, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                //-- Ingresamos el whatsapp en base de datos.
                let instruccionIngresarWhatsapp = 'INSERT INTO companyw (id, whatsapp) values (?, ?)';
                //-- Formato de la instrucción.
                let formatoInstruccionIngresarWhatsapp = mysql.format(instruccionIngresarWhatsapp, [id, whatsapp]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionIngresarWhatsapp);
                //-- Mostrar Alerta Emergente.
                alerta('El whatsapp ha sido ingresado con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }else {
                //-- Actualizamos el whatsapp en base de datos.
                let instruccionActualizarWhatsapp = 'UPDATE companyw SET whatsapp = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarWhatsapp = mysql.format(instruccionActualizarWhatsapp, [whatsapp, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarWhatsapp);
                //-- Mostrar Alerta Emergente.
                alerta('El whatsapp ha sido actualizado con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }
        });
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('El whatsapp no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

const ingresoPagWebEmpresadb = (id, pagweb, res) => {
    
    //-- Verificación de la Página Web.
    if(pagweb) {
        //-- Comprobamos que no haya Página Web en base de datos.
        let instruccionComprobarPagWeb = 'SELECT * FROM companypg WHERE id = ?';
        //-- Formato de la instrucción.
        let formatoInstruccionComprobarPagWeb = mysql.format(instruccionComprobarPagWeb, [id]);
        //-- Establecemos la conexión.
        madservicesEmpresadb.query(formatoInstruccionComprobarPagWeb, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                //-- Ingresamos el whatsapp en base de datos.
                let instruccionIngresarPagWeb = 'INSERT INTO companypg (id, pagweb) values (?, ?)';
                //-- Formato de la instrucción.
                let formatoInstruccionIngresarPagWeb = mysql.format(instruccionIngresarPagWeb, [id, pagweb]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionIngresarPagWeb);
                //-- Mostrar Alerta Emergente.
                alerta('La Página Web ha sido ingresada con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }else {
                //-- Actualizamos la Página Web en base de datos.
                let instruccionActualizarPagWeb = 'UPDATE companypg SET pagweb = ? WHERE id = ?';
                //-- Formato de la instrucción.
                let formatoInstruccionActualizarPagWeb = mysql.format(instruccionActualizarPagWeb, [pagweb, id]);
                //-- Establecemos la conexión.
                madservicesEmpresadb.query(formatoInstruccionActualizarPagWeb);
                //-- Mostrar Alerta Emergente.
                alerta('La Página Web ha sido actualizada con éxito');
                //-- Redirigir a la interfaz de la empresa.
                return res.redirect(`/sesion-empresa/${id}/interfaz`);
            }
        });
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('La Página Web no ha cambiado');
        //-- Redirigir a la interfaz de la empresa.
        return res.redirect(`/sesion-empresa/${id}/interfaz`);
    }
}

//-- Exportamos las funciones.
module.exports = {
    registrarEmpresaVerificadadb,
    iniciarSesionEmpresaVerificadadb,
    actualizarMarcaVerificadadb,
    actualizarTipoVerificadodb,
    actualizarNIFVerificadodb,
    actualizarEmailVerificadodb,
    actualizarPasswordVerificadadb,
    darseBajaEmpresadb,
    ingresoDescripcionEmpresadb,
    ingresoInstagramEmpresadb,
    ingresoTwitterEmpresadb,
    ingresoWhatsAppEmpresadb,
    ingresoPagWebEmpresadb
};