//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');
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
            compare(password, miembro.password).then((result) => {
                if(result) {
                    req.session.miembro = miembro;
                    return res.redirect(`/sesion-cliente/${miembro.id}`);
                }else {
                    res.status(401).render('paginas/clienteLogin', { mensaje: 'Contraseña incorrecta' });
                    return res.end();
                }
            });
        }
    });
}

//-- Creamos la función para Actualizar los datos de la base de datos de MAD Services.
const actualizarClienteVerificadodb = async (madservicesdb, data, res) => {

    //-- Declaramos la estructura para actualizar el cliente, con todos sus campos.
    const hayCliente = {
        hayNombreCliente: data.nombre,
        hayApellidosCliente: data.apellidos,
        hayGeneroCliente: data.genero,
        hayEmailCliente: data.email,
        hayDireccionCliente: data.direccion,
        hayPoblacionCliente: data.poblacion,
        hayRegionCliente: data.region,
        hayPaisCliente: data.pais,
        hayCPCliente: data.cp,
        hayOldPasswordCliente: data.oldpassword,
        hayPasswordCliente: data.password,
        hayRepitePasswordCliente: data.repitePassword
    };
    //-- Cifrar la nueva contraseña.
    const nuevaPasswordCifrada = await hash(hayCliente.hayPasswordCliente,1);
    //-- Actualizar campos del cliente en función se quiera.
    switch(hayCliente) {
        case hayCliente.hayNombreCliente:
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarNombre = 'UPDATE clientes SET nombre = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarNombre = mysql.format(instruccionActualizarNombre, [data.nombre, data.id]);
            //-- Establecer la comunicación para actualizar en la base de datos.
            madservicesdb.query(formatoInstruccionActualizarNombre);
            break;
        case hayCliente.hayApellidosCliente:
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarApellidos = 'UPDATE clientes SET apellidos = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarApellidos = mysql.format(instruccionActualizarApellidos, [data.apellidos, data.id]);
            //-- Proceso de actualización en base de datos.
            madservicesdb.query(formatoInstruccionActualizarApellidos);
            break;
        case hayCliente.hayGeneroCliente:
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarGenero = 'UPDATE clientes SET genero = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarGenero = mysql.format(instruccionActualizarGenero, [data.genero, data.id]);
            //-- Proceso de actualización en base de datos.
            madservicesdb.query(formatoInstruccionActualizarGenero);
            break;
        case hayCliente.hayEmailCliente:
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarEmail = 'UPDATE clientes SET email = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarEmail = mysql.format(instruccionActualizarEmail, [data.email, data.id]);
            //-- Proceso de actualización en base de datos.
            madservicesdb.query(formatoInstruccionActualizarEmail);
            break;
        case hayCliente.hayDireccionCliente:
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarDireccion = 'UPDATE clientes SET direccion = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarDireccion = mysql.format(instruccionActualizarDireccion, [data.direccion, data.id]);
            //-- Proceso de actualización en base de datos.
            madservicesdb.query(formatoInstruccionActualizarDireccion);
            break;
        case hayCliente.hayPoblacionCliente:
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarPoblacion = 'UPDATE clientes SET poblacion = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarPoblacion = mysql.format(instruccionActualizarPoblacion, [data.poblacion, data.id]);
            //-- Proceso de actualización en base de datos.
            madservicesdb.query(formatoInstruccionActualizarPoblacion);
            break;
        case hayCliente.hayRegionCliente:
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarRegion = 'UPDATE clientes SET region = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarRegion = mysql.format(instruccionActualizarRegion, [data.region, data.id]);
            //-- Proceso de actualización en base de datos.
            madservicesdb.query(formatoInstruccionActualizarRegion);
            break;
        case hayCliente.hayPaisCliente:
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarPais = 'UPDATE clientes SET pais = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarPais = mysql.format(instruccionActualizarPais, [data.pais, data.id]);
            //-- Proceso de actualización en base de datos.
            madservicesdb.query(formatoInstruccionActualizarPais);
            break;
        case hayCliente.hayCPCliente:
            //-- Instrucción para actualizar en la base de datos.
            let instruccionActualizarCP = 'UPDATE clientes SET cp = ? WHERE id = ?';
            //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
            let formatoInstruccionActualizarCP = mysql.format(instruccionActualizarCP, [data.cp, data.id]);
            //-- Proceso de actualización en base de datos.
            madservicesdb.query(formatoInstruccionActualizarCP);
            break;
    }
    if(hayCliente.hayOldPasswordCliente && hayCliente.hayPasswordCliente && hayCliente.hayRepitePasswordCliente) {
        //-- Verificamos que la contraseña de la base de datos es la misma que la antigua introducida.
        //-- Instrucción para consultar contraseña dado el id.
        let instruccionConsultarPasswordPerfil = 'SELECT password FROM clientes WHERE id = ?';
        //-- Configuración del formato para consultar contraseña dado el id.
        let formatoInstruccionConsultarPasswordPerfil = mysql.format(instruccionConsultarPasswordPerfil, [data.id]);
        //-- Proceso de consulta de contraseña.
        madservicesdb.query(formatoInstruccionConsultarPasswordPerfil, (error, resultado) => {
            if(error) throw error;
            const passwordEnDatabase = resultado[0];
            compare(hayCliente.hayOldPasswordCliente, passwordEnDatabase).then((result) => {
                if(result) {
                    //-- Verificamos que la nueva contraseña introducida es correcta.
                    if(hayCliente.hayPasswordCliente === hayCliente.hayRepitePasswordCliente) {
                        //-- Instrucción para actualizar en la base de datos.
                        let instruccionActualizarANuevaPassword = 'UPDATE clientes SET password = ? WHERE id = ?';
                        //-- Configuración del formato de los datos introducidos para actualizar en base de datos.
                        let formatoInstruccionActualizarANuevaPassword = mysql.format(instruccionActualizarANuevaPassword, [nuevaPasswordCifrada, data.id]);
                        //-- Proceso de actualización en base de datos.
                        madservicesdb.query(formatoInstruccionActualizarANuevaPassword, (error) => {
                            if(error) throw error;
                            if(hayCliente.hayNombreCliente || hayCliente.hayApellidosCliente || hayCliente.hayGeneroCliente ||
                                hayCliente.hayEmailCliente || hayCliente.hayDireccionCliente || hayCliente.hayPoblacionCliente ||
                                hayCliente.hayRegionCliente || hayCliente.hayPaisCliente || hayCliente.hayCPCliente) {
                                res.status(201).render('paginas/perfilClientes',
                                {
                                    msjActualizacion: `Has actualizado: `,
                                    msjActualizacion1: `Nombre: ${hayCliente.hayNombreCliente}`,
                                    msjActualizacion2: `Apellidos: ${hayCliente.hayApellidosCliente}`,
                                    msjActualizacion3: `Género: ${hayCliente.hayGeneroCliente}`,
                                    msjActualizacion4: `Email: ${hayCliente.hayEmailCliente}`,
                                    msjActualizacion5: `Contraseña: #ActualizadaYoculta#`,
                                    msjActualizacion6: `Dirección: ${hayCliente.hayDireccionCliente}`,
                                    msjActualizacion7: `Población: ${hayCliente.hayPoblacionCliente}`,
                                    msjActualizacion8: `Región: ${hayCliente.hayRegionCliente}`,
                                    msjActualizacion9: `País: ${hayCliente.hayPaisCliente}`,
                                    msjActualizacion10: `Código Postal: ${hayCliente.hayCPCliente}`

                                });
                                return res.end();
                            }
                        });
                    }else {
                        if(hayCliente.hayNombreCliente || hayCliente.hayApellidosCliente || hayCliente.hayGeneroCliente ||
                            hayCliente.hayEmailCliente || hayCliente.hayDireccionCliente || hayCliente.hayPoblacionCliente ||
                            hayCliente.hayRegionCliente || hayCliente.hayPaisCliente || hayCliente.hayCPCliente) {
                            res.status(401).render('paginas/perfilClientes', 
                            {
                                msjError: `La nueva contraseña introducida`,
                                msjError1: `no es igual a la repetida`,
                                msjActualizacion: `Pero aun así has actualizado: `,
                                msjActualizacion1: `Nombre: ${hayCliente.hayNombreCliente}`,
                                msjActualizacion2: `Apellidos: ${hayCliente.hayApellidosCliente}`,
                                msjActualizacion3: `Género: ${hayCliente.hayGeneroCliente}`,
                                msjActualizacion4: `Email: ${hayCliente.hayEmailCliente}`,
                                msjActualizacion5: `Dirección: ${hayCliente.hayDireccionCliente}`,
                                msjActualizacion6: `Población: ${hayCliente.hayPoblacionCliente}`,
                                msjActualizacion7: `Región: ${hayCliente.hayRegionCliente}`,
                                msjActualizacion8: `País: ${hayCliente.hayPaisCliente}`,
                                msjActualizacion9: `Código Postal: ${hayCliente.hayCPCliente}`
                            });
                            return res.end();
                        }
                    }
                }else {
                    if(hayCliente.hayNombreCliente || hayCliente.hayApellidosCliente || hayCliente.hayGeneroCliente ||
                        hayCliente.hayEmailCliente || hayCliente.hayDireccionCliente || hayCliente.hayPoblacionCliente ||
                        hayCliente.hayRegionCliente || hayCliente.hayPaisCliente || hayCliente.hayCPCliente) {
                        res.status(401).render('paginas/perfilClientes', 
                        {
                            msjError: `La antigua contraseña introducida`,
                            msjError1: `no coincide con la de la base de datos`,
                            msjActualizacion: `Pero aun así has actualizado: `,
                            msjActualizacion1: `Nombre: ${hayCliente.hayNombreCliente}`,
                            msjActualizacion2: `Apellidos: ${hayCliente.hayApellidosCliente}`,
                            msjActualizacion3: `Género: ${hayCliente.hayGeneroCliente}`,
                            msjActualizacion4: `Email: ${hayCliente.hayEmailCliente}`,
                            msjActualizacion5: `Dirección: ${hayCliente.hayDireccionCliente}`,
                            msjActualizacion6: `Población: ${hayCliente.hayPoblacionCliente}`,
                            msjActualizacion7: `Región: ${hayCliente.hayRegionCliente}`,
                            msjActualizacion8: `País: ${hayCliente.hayPaisCliente}`,
                            msjActualizacion9: `Código Postal: ${hayCliente.hayCPCliente}`

                        });
                        return res.end();
                    }
                }
            });
        });
    }else {
        if(hayCliente.hayNombreCliente || hayCliente.hayApellidosCliente || hayCliente.hayGeneroCliente ||
            hayCliente.hayEmailCliente || hayCliente.hayDireccionCliente || hayCliente.hayPoblacionCliente ||
            hayCliente.hayRegionCliente || hayCliente.hayPaisCliente || hayCliente.hayCPCliente) {
            res.status(201).render('paginas/perfilClientes',
            {
                msjActualizacion: `Has actualizado: `,
                msjActualizacion1: `Nombre: ${hayCliente.hayNombreCliente}`,
                msjActualizacion2: `Apellidos: ${hayCliente.hayApellidosCliente}`,
                msjActualizacion3: `Género: ${hayCliente.hayGeneroCliente}`,
                msjActualizacion4: `Email: ${hayCliente.hayEmailCliente}`,
                msjActualizacion5: `Contraseña: #ActualizadaYoculta#`,
                msjActualizacion6: `Dirección: ${hayCliente.hayDireccionCliente}`,
                msjActualizacion7: `Población: ${hayCliente.hayPoblacionCliente}`,
                msjActualizacion8: `Región: ${hayCliente.hayRegionCliente}`,
                msjActualizacion9: `País: ${hayCliente.hayPaisCliente}`,
                msjActualizacion10: `Código Postal: ${hayCliente.hayCPCliente}`
            });
            return res.end();
        }
    }
}

//-- Creamos la función para Mostrar datos de la base de datos de MAD Services.
const mostrarClientedb = (madservicesdb, id, res) => {
    //-- Instrucción.
    let instruccionID = 'SELECT * FROM clientes WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, id);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesdb.query(formatoInstruccionID, (error, results) => {
        if(error) throw error;
        const datos = results[0];
        res.status(201).render('paginas/perfilClientes', {id: id, nombre: datos.nombre, apellidos: datos.apellidos, genero: datos.genero, email: datos.email, password: datos.password, direccion: datos.direccion, poblacion: datos.poblacion, region: datos.region, pais: datos.pais, cp: datos.cp});
    });
}

//-- Creamos la función para Borrar los datos de la base de datos de MAD Services.
const darseBajaEmpresadb = (madservicesdb, data) => {
    //-- Variables usadas para borrar los datos de la base de datos.
    let instruccionDarseBajaEmpresa = "DELETE FROM empresas WHERE email = ?";
    let formatoinstruccionDarseBajaEmpresa = mySQL.format(instruccionDarseBajaEmpresa, [data.email]);
    //-- Establecer la conexión dinámica.
    madservicesdb.getConnection(function(error, madservicesdb) {
        if(error) throw error;
        //-- Establecer la configuración de borrar los datos de la base de datos.
        madservicesdb.query(formatoinstruccionDarseBajaEmpresa);
    });
}

//-- Exportamos las funciones.
module.exports = {registrarClienteVerificadodb, iniciarSesionClienteVerificadodb, actualizarClienteVerificadodb, mostrarClientedb};