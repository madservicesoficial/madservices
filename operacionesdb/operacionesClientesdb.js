//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const bcrypt = require('bcrypt');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../randomIDs/generarIDRandom.js');
//-- Importamos la función que comprueba que no se repita el ID aleatorio.
const comprobarIDclientedb = require('../comprobarIDs/comprobarIDcliente.js');

//-- Creamos la función para registrarse como Cliente, con verificación de correo electrónico, en la base de datos de MAD Services.
const registrarClienteVerificadodb = (madservicesdb, data, res) => {

    //-- Instrucción para consultar Email en la base de datos.
    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM clientes WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para consultar Email en base de datos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    //-- Establecer la comunicación de consultar Email en la base de datos.
    madservicesdb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        const cont = results[0].count;
        const emailExiste = cont > 0;
        if(emailExiste) {
            res.status(401).render('paginas/clienteRegistrarse', { mensaje: 'Correo ya en uso' });
            return res.end();
        }else {
            let idCliente = generarIDrandom() * 2;
            comprobarIDclientedb(idCliente, (idExiste) => {
                while(idExiste) {
                    idCliente = generarIDrandom() * 2;
                    comprobarIDclientedb(idCliente, (idExiste) => {
                        idExiste = idExiste;
                    });
                }
            });
            //-- Instrucción para registrarse en la base de datos.
            let instruccionRegistrarse = "INSERT INTO clientes (id, email, password, nombre, apellidos, direccion, poblacion, region, pais, cp, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            //-- Configuración del formato de los datos introducidos para registrar en base de datos.
            let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [idCliente, data.email, data.password, data.nombre, data.apellidos, data.direccion, data.poblacion, data.region, data.pais, data.cp, data.genero]);
            madservicesdb.query(formatoInstruccionRegistrarse, (error) => {
                if(error) throw error;
                return res.redirect('/');
            });
        }
    });
}

//-- Creamos la función para iniciar sesión como Cliente, con verificación de correo electrónico y contraseña, en la base de datos de MAD Services.
const iniciarSesionClienteVerificadodb = (madservicesdb, email, password, req, res) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultarEmail = 'SELECT * FROM clientes WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para iniciar sesión y consultar en base de datos.
    let formatoInstruccionConsultarEmail = mysql.format(instruccionConsultarEmail, [email]);
    //-- Establecer la comunicación para consultar el email y la contraseña en la base de datos.
    madservicesdb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            res.status(401).render('paginas/clienteLogin', { mensaje: 'Correo electrónico incorrecto' });
            return res.end();
        }else {
            const miembro = results[0];
            bcrypt.compare(password, miembro.password).then((result) => {
                if(result) {
                    req.session.miembro = miembro;
                    return res.redirect(`/sesion/${miembro.id}`);
                }else {
                    res.status(401).render('paginas/clienteLogin', { mensaje: 'Contraseña incorrecta' });
                    return res.end();
                }
            });
        }
    });
}

//-- Creamos la función para Actualizar los datos de la base de datos de MAD Services.
const actualizarClienteVerificadodb = (madservicesdb, data, res) => {

    //-- Establecer la comunicación para actualizar en la base de datos.
    const hayNombreCliente = data.nombre;
    if(hayNombreCliente) {
            //-- Instrucción para actualizar en la base de datos.
        let instruccionActualizarNombre = 'UPDATE clientes SET nombre = ? WHERE id = ?';
        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
        let formatoInstruccionActualizarNombre = mysql.format(instruccionActualizarNombre, [data.nombre, data.id]);
        //-- Proceso de actualización en base de datos.
        madservicesdb.query(formatoInstruccionActualizarNombre);
    }else {
        const hayApellidosCliente = data.apellidos;
        if(hayApellidosCliente) {
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarApellidos = 'UPDATE clientes SET apellidos = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarApellidos = mysql.format(instruccionActualizarApellidos, [data.apellidos, data.id]);
            //-- Proceso de actualización en base de datos.
            madservicesdb.query(formatoInstruccionActualizarApellidos);
        }else {
            const hayGeneroCliente = data.genero;
            if(hayGeneroCliente) {
                //-- Instrucción para actualizar en la base de datos.
                let instruccionActualizarGenero = 'UPDATE clientes SET genero = ? WHERE id = ?';
                //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                let formatoInstruccionActualizarGenero = mysql.format(instruccionActualizarGenero, [data.genero, data.id]);
                //-- Proceso de actualización en base de datos.
                madservicesdb.query(formatoInstruccionActualizarGenero);
            }else {
                const hayEmailCliente = data.email;
                if(hayEmailCliente) {
                    //-- Instrucción para actualizar en la base de datos.
                    let instruccionActualizarEmail = 'UPDATE clientes SET email = ? WHERE id = ?';
                    //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                    let formatoInstruccionActualizarEmail = mysql.format(instruccionActualizarEmail, [data.email, data.id]);
                    //-- Proceso de actualización en base de datos.
                    madservicesdb.query(formatoInstruccionActualizarEmail);
                }else {
                    const hayDireccionCliente = data.direccion;
                    if(hayDireccionCliente) {
                        //-- Instrucción para actualizar en la base de datos.
                        let instruccionActualizarDireccion = 'UPDATE clientes SET direccion = ? WHERE id = ?';
                        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                        let formatoInstruccionActualizarDireccion = mysql.format(instruccionActualizarDireccion, [data.direccion, data.id]);
                        //-- Proceso de actualización en base de datos.
                        madservicesdb.query(formatoInstruccionActualizarDireccion);
                    }else {
                        const hayPoblacionCliente = data.poblacion;
                        if(hayPoblacionCliente) {
                            //-- Instrucción para actualizar en la base de datos.
                            let instruccionActualizarPoblacion = 'UPDATE clientes SET poblacion = ? WHERE id = ?';
                            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                            let formatoInstruccionActualizarPoblacion = mysql.format(instruccionActualizarPoblacion, [data.poblacion, data.id]);
                            //-- Proceso de actualización en base de datos.
                            madservicesdb.query(formatoInstruccionActualizarPoblacion);
                        }else {
                            const hayRegionCliente = data.region;
                            if(hayRegionCliente) {
                                //-- Instrucción para actualizar en la base de datos.
                                let instruccionActualizarRegion = 'UPDATE clientes SET region = ? WHERE id = ?';
                                //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                                let formatoInstruccionActualizarRegion = mysql.format(instruccionActualizarRegion, [data.region, data.id]);
                                //-- Proceso de actualización en base de datos.
                                madservicesdb.query(formatoInstruccionActualizarRegion);
                            }else {
                                const hayPaisCliente = data.pais;
                                if(hayPaisCliente) {
                                    //-- Instrucción para actualizar en la base de datos.
                                    let instruccionActualizarPais = 'UPDATE clientes SET pais = ? WHERE id = ?';
                                    //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                                    let formatoInstruccionActualizarPais = mysql.format(instruccionActualizarPais, [data.pais, data.id]);
                                    //-- Proceso de actualización en base de datos.
                                    madservicesdb.query(formatoInstruccionActualizarPais);
                                }else {
                                    const hayCPCliente = data.cp;
                                    if(hayCPCliente) {
                                        //-- Instrucción para actualizar en la base de datos.
                                        let instruccionActualizarCP = 'UPDATE clientes SET cp = ? WHERE id = ?';
                                        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                                        let formatoInstruccionActualizarCP = mysql.format(instruccionActualizarCP, [data.cp, data.id]);
                                        //-- Proceso de actualización en base de datos.
                                        madservicesdb.query(formatoInstruccionActualizarCP);
                                    }else {
                                        const hayOldPasswordCliente = data.oldpassword;
                                        const hayPasswordCliente = data.password;
                                        const hayRepitePasswordCliente = data.repitePassword;
                                        if(hayOldPasswordCliente && hayPasswordCliente && hayRepitePasswordCliente) {
                                            //-- Verificamos que la contraseña de la base de datos es la misma que la antigua introducida.
                                            //-- Instrucción para consultar contraseña dado el id.
                                            let instruccionConsultarPasswordPerfil = 'SELECT password FROM clientes WHERE id = ?';
                                            //-- Configuración del formato para consultar contraseña dado el id.
                                            let formatoInstruccionConsultarPasswordPerfil = mysql.format(instruccionConsultarPasswordPerfil, [data.id]);
                                            //-- Proceso de consulta de contraseña.
                                            madservicesdb.query(formatoInstruccionConsultarPasswordPerfil, (error, resultado) => {
                                                if(error) throw error;
                                                const passwordEnDatabase = resultado[0];
                                                bcrypt.compare(hayOldPasswordCliente, passwordEnDatabase).then((result) => {
                                                    if(result) {
                                                        //-- Verificamos que la nueva contraseña introducida es correcta.
                                                        if(hayPasswordCliente === hayRepitePasswordCliente) {
                                                            //-- Instrucción para actualizar en la base de datos.
                                                            let instruccionActualizarANuevaPassword = 'UPDATE clientes SET password = ? WHERE id = ?';
                                                            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                                                            let formatoInstruccionActualizarANuevaPassword = mysql.format(instruccionActualizarANuevaPassword, [data.password, data.id]);
                                                            //-- Proceso de actualización en base de datos.
                                                            madservicesdb.query(formatoInstruccionActualizarANuevaPassword, (error) => {
                                                                if(error) throw error;
                                                                if(hayNombreCliente || hayApellidosCliente || hayGeneroCliente || hayEmailCliente || hayPasswordCliente || hayDireccionCliente || hayPoblacionCliente || hayRegionCliente || hayPaisCliente || hayCPCliente) {
                                                                    res.status(201).render('paginas/perfilClientes',
                                                                    {
                                                                        msjActualizacion: `Has actualizado:\n
                                                                        Nombre: ${hayNombreCliente}\n
                                                                        Apellidos: ${hayApellidosCliente}\n
                                                                        Género: ${hayGeneroCliente}\n
                                                                        Email: ${hayEmailCliente}\n
                                                                        Contraseña: ${hayPasswordCliente}\n
                                                                        Dirección: ${hayDireccionCliente}\n
                                                                        Población: ${hayPoblacionCliente}\n
                                                                        Región: ${hayRegionCliente}\n
                                                                        País: ${hayPaisCliente}\n
                                                                        Código Postal: ${hayCPCliente}\n`
                                                                    });
                                                                    return res.end();
                                                                }
                                                            });
                                                        }else {
                                                            res.status(401).render('paginas/perfilClientes', 
                                                            { 
                                                                msjError: `La nueva contraseña introducida\n no es igual a la repetida`
                                                            });
                                                            return res.end();
                                                        }
                                                    }else {
                                                        res.status(401).render('paginas/perfilClientes', 
                                                        { 
                                                            msjError: `La antigua contraseña introducida\n no coincide con la de la base de datos`
                                                        });
                                                        return res.end();
                                                    }
                                                });
                                            });
                                        }else {
                                            if(hayNombreCliente || hayApellidosCliente || hayGeneroCliente || hayEmailCliente || hayDireccionCliente || hayPoblacionCliente || hayRegionCliente || hayPaisCliente || hayCPCliente) {
                                                res.status(201).render('paginas/perfilClientes',
                                                {
                                                    msjActualizacion: `Has actualizado:\n
                                                    Nombre: ${hayNombreCliente}\n
                                                    Apellidos: ${hayApellidosCliente}\n
                                                    Género: ${hayGeneroCliente}\n
                                                    Email: ${hayEmailCliente}\n
                                                    Dirección: ${hayDireccionCliente}\n
                                                    Población: ${hayPoblacionCliente}\n
                                                    Región: ${hayRegionCliente}\n
                                                    País: ${hayPaisCliente}\n
                                                    Código Postal: ${hayCPCliente}\n`
                                                });
                                                return res.end();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

//-- Creamos la función para Borrar los datos de la base de datos de MAD Services.
const darseBajaEmpresadb = async (madservicesdb, data) => {
    //-- Variables usadas para borrar los datos de la base de datos.
    let instruccionDarseBajaEmpresa = "DELETE FROM empresas WHERE email = ?";
    let formatoinstruccionDarseBajaEmpresa = mySQL.format(instruccionDarseBajaEmpresa, [data.email]);
    //-- Establecer la conexión dinámica.
    await madservicesdb.getConnection(function(error, madservicesdb) {
        if(error) throw error;
        //-- Establecer la configuración de borrar los datos de la base de datos.
        madservicesdb.query(formatoinstruccionDarseBajaEmpresa);
    });
}

//-- Exportamos las funciones.
module.exports = {registrarClienteVerificadodb, iniciarSesionClienteVerificadodb, actualizarClienteVerificadodb};