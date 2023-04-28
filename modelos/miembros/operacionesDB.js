//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../../randomIDs/generarIDRandom.js');
//-- Importamos la función que comprueba que no se repita el ID aleatorio.
const consultaID = require('./consultaID.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos la función para registrarse como Miembro MAD, con verificación de correo electrónico, en la base de datos de MAD Services.
const registrarMiembroVerificadodb = async (data, res) => {

    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(data.password, 1);
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
            bcrypt.compare(password, miembro.password).then((match) => {
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

//-- Creamos la función para actualizar los campos de la interfaz del Miembro MAD de la base de datos de MAD Services.
const actualizarMiembroVerificadodb = (data) => {

    //-- Creamos la estructura para definir los campos de la interfaz del Miembro MAD.
    const hayMiembro = {
        hayMiembro: data.miembro,
        hayDepartamento: data.departamento,
        hayGenero: data.genero,
        hayEmail: data.email
    };
    //-- Actualizamos cada campo de la interfaz del Miembro MAD, si así lo ha indicado el propio Miembro MAD.
    if(hayMiembro.hayMiembro) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarNombre = 'UPDATE miembros SET miembro = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarNombre = mysql.format(instruccionActualizarNombre, [hayMiembro.hayMiembro, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesAdmindb.query(formatoInstruccionActualizarNombre);
    }
    if(hayMiembro.hayDepartamento) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarApellidos = 'UPDATE miembros SET departamento = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarApellidos = mysql.format(instruccionActualizarApellidos, [hayMiembro.hayDepartamento, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesAdmindb.query(formatoInstruccionActualizarApellidos);
    }
    if(hayMiembro.hayGenero) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarGenero = 'UPDATE miembros SET genero = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarGenero = mysql.format(instruccionActualizarGenero, [hayMiembro.hayGenero, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesAdmindb.query(formatoInstruccionActualizarGenero);
    }
    if(hayMiembro.hayEmail) {
        //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarEmail = 'UPDATE miembros SET email = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarEmail = mysql.format(instruccionActualizarEmail, [hayMiembro.hayEmail, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesAdmindb.query(formatoInstruccionActualizarEmail);
    }
}

//-- Creamos la función para mostrar los campos de la interfaz del Miembro MAD de la base de datos de MAD Services.
const mostrarMiembroVerificadodb = (id, oldpassword, newpassword, repitePassword, res) => {

    //-- Proceso de verificación y actualización de la contraseña + Mostrar todos los campos de la interfaz del Miembro MAD.
    if(oldpassword && newpassword && repitePassword) {
        //-- Verificamos que la contraseña de la base de datos es la misma que la antigua introducida.
        //-- Instrucción para consultar contraseña dado el id.
        let instruccionConsultarPasswordPerfil = 'SELECT * FROM miembros WHERE id = ?';
        //-- Configuración del formato para consultar contraseña dado el id.
        let formatoInstruccionConsultarPasswordPerfil = mysql.format(instruccionConsultarPasswordPerfil, [id]);
        //-- Proceso de consulta de contraseña.
        madservicesAdmindb.query(formatoInstruccionConsultarPasswordPerfil, (error, results) => {
            if(error) throw error;
            const passwordEnDatabase = results[0].password;
            bcrypt.compare(oldpassword, passwordEnDatabase).then( async (match) => {
                if(match) {
                    //-- Verificamos que la nueva contraseña introducida es correcta.
                    if(newpassword === repitePassword) {
                        //-- Cifrar la nueva contraseña.
                        const nuevaPasswordCifrada = await hash(newpassword,1);
                        //-- Instrucción para actualizar en la base de datos.
                        let instruccionActualizarANuevaPassword = 'UPDATE miembros SET password = ? WHERE id = ?';
                        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                        let formatoInstruccionActualizarANuevaPassword = mysql.format(instruccionActualizarANuevaPassword, [nuevaPasswordCifrada, id]);
                        //-- Proceso de actualización en base de datos.
                        madservicesAdmindb.query(formatoInstruccionActualizarANuevaPassword);
                        //-- Instrucción consultar para mostrar.
                        let instruccionConsultarParaMostrar = 'SELECT * FROM miembros WHERE id = ?';
                        //-- Configuración del formato de la instrucción.
                        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
                        //-- Proceso de la consulta.
                        madservicesAdmindb.query(formatoinstruccionConsultarParaMostrar, (error, resultado) => {
                            if(error) throw error;
                            const tablaMiembro = resultado[0];
                            res.status(201).render('paginas/miembros/interfaz',
                            {
                                msjActualizacion: 'Campos actualizados con éxito y contraseña: ',
                                id: tablaMiembro.id,
                                miembro: tablaMiembro.miembro,
                                departamento: tablaMiembro.departamento,
                                genero: tablaMiembro.genero,
                                email: tablaMiembro.email,
                                password: tablaMiembro.password
                            });
                            return res.end();
                        });
                    }else {
                        //-- Instrucción consultar para mostrar.
                        let instruccionConsultarParaMostrar = 'SELECT * FROM miembros WHERE id = ?';
                        //-- Configuración del formato de la instrucción.
                        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
                        //-- Proceso de la consulta.
                        madservicesAdmindb.query(formatoinstruccionConsultarParaMostrar, (error, result) => {
                            if(error) throw error;
                            const tablaMiembro = result[0];
                            res.status(401).render('paginas/miembros/interfaz', 
                            {
                                msjError: `La nueva contraseña introducida`,
                                msjError1: `no es igual a la repetida`,
                                id: tablaMiembro.id,
                                miembro: tablaMiembro.miembro,
                                departamento: tablaMiembro.departamento,
                                genero: tablaMiembro.genero,
                                email: tablaMiembro.email,
                                password: tablaMiembro.password
                            });
                            return res.end();
                        });
                    }
                }else {
                    //-- Instrucción consultar para mostrar.
                    let instruccionConsultarParaMostrar = 'SELECT * FROM miembros WHERE id = ?';
                    //-- Configuración del formato de la instrucción.
                    let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
                    //-- Proceso de la consulta.
                    madservicesAdmindb.query(formatoinstruccionConsultarParaMostrar, (error, field) => {
                        if(error) throw error;
                        const tablaMiembro = field[0];
                        res.status(401).render('paginas/miembros/interfaz', 
                        {
                            msjError: `La antigua contraseña introducida`,
                            msjError1: `no coincide con la de la base de datos`,
                            id: tablaMiembro.id,
                            miembro: tablaMiembro.miembro,
                            departamento: tablaMiembro.departamento,
                            genero: tablaMiembro.genero,
                            email: tablaMiembro.email,
                            password: tablaMiembro.password
                        });
                        return res.end();
                    });
                }
            });
        });
    }else {
        //-- Instrucción consultar para mostrar.
        let instruccionConsultarParaMostrar = 'SELECT * FROM miembros WHERE id = ?';
        //-- Configuración del formato de la instrucción.
        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
        //-- Proceso de la consulta.
        madservicesAdmindb.query(formatoinstruccionConsultarParaMostrar, (error, fields) => {
            if(error) throw error;
            const tablaMiembro = fields[0];
            res.status(201).render('paginas/miembros/interfaz',
            {
                msjActualizacion: `Campos actualizados con éxito sin contraseña: `,
                id: tablaMiembro.id,
                miembro: tablaMiembro.miembro,
                departamento: tablaMiembro.departamento,
                genero: tablaMiembro.genero,
                email: tablaMiembro.email,
                password: tablaMiembro.password
            });
            return res.end();
        });
    }
}

//-- Creamos la función para Dar de Baja al Miembro MAD de la base de datos de MAD Services.
const darseBajaMiembrodb = (id, req, res) => {
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

//-- Creamos la función para ingresar los productos MAD en la base de datos de MAD Services.
const ingresarProductosMADdb = (id, data, res) => {
    //-- Instrucción para ingresar productos.
    let instruccionIngresaProductos = 'INSERT INTO productos (producto, titulo, precio, peso, descripcion) VALUES (?, ?, ?, ?, ?)';
    //-- Formato de la instrucción ingresar.
    let formatoinstruccionIngresaProductos = mysql.format(instruccionIngresaProductos, [data.categoria, data.titulo, data.precio, data.peso, data.descripcion]);
    //-- Establecimiento de la conexión con base de datos.
    madservicesAdmindb.query(formatoinstruccionIngresaProductos, (error) => {
        if(error) throw error;
        //-- Mostrar Alerta Emergente.
        alerta('Producto ingresado con éxito');
        // Redirigir a la página principal de la aplicación.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    });
}

//-- Exportamos las funciones.
module.exports = {registrarMiembroVerificadodb, iniciarSesionMiembroVerificadodb, actualizarMiembroVerificadodb, mostrarMiembroVerificadodb, darseBajaMiembrodb, ingresarProductosMADdb};