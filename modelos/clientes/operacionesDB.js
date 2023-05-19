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
const { getCode, getCountries } = require('country-list-spanish');
const countries = require('country-list');
//-- Importamos la Tecnología para validar el Código Postal introducido.
const { postcodeValidator } = require('postcode-validator');
//-- Importamos la configuración del entorno ENV para poder usar su información.
require('../../config/env.js');
//-- Importamos la Tecnología para solicitar URLs de Geolocalización.
const axios = require('axios');
//-- Importamos la Tecnología para validar datos de la tarjeta bancaria del cliente.
const validarCard = require('card-validator');
//-- Importamos la Tecnología para sacar la hora de Madrid con la fecha.
const { DateTime } = require('luxon');

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

    //-- Actualizamos y validamos el campo.
    if(email) {
        if(!validacion.isEmail(email)) {
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

    //-- Declaración de la lista de países existentes en el mundo.
    const paises = getCountries();
    const paisesENG = countries.getNames();
    //-- Proceso de verificación de la localización.
    if(pais && cp && region && poblacion && direccion) {
        if(paises.includes(pais) || paisesENG.includes(pais)) {
            //-- Obtenemos el código del país.
            let codigoPais = getCode(pais);
            let countryCode = countries.getCode(pais);
            if(codigoPais === undefined) {
                codigoPais = countryCode;
            }
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
                if(lugar || typeof lugar !== 'undefined') {
                    if(region === lugar.adminName1 || region === lugar.adminName2) {
                        if(poblacion === lugar.adminName3 || poblacion === lugar.placeName) {
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
                    alerta('Código Postal no encontrado');
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
const darseBajaClientedb = (id, dileAdios, req, res) => {
    //-- Caso 1: dejar en blanco la confirmación.
    if(!dileAdios) {
        //-- Mostrar Alerta Emergente.
        alerta('Debes confirmar si quieres o no darte de baja');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    //-- Caso 2: pulsar que no quieres darte de baja.
    }else if(dileAdios === 'No') {
        //-- Mostrar Alerta Emergente.
        alerta('Gracias por no querer darte de baja');
        // Redirigir al perfil del Cliente.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    //-- Caso 3: pulsar que sí quieres darte de baja.
    }else if(dileAdios === 'Sí') {
        //-- Si tiene productos en el carrito, también se borran.
        let instruccionVerCarrito = "SELECT * FROM carrito WHERE id = ?";
        let formatoInstruccionVerCarrito = mysql.format(instruccionVerCarrito, [id]);
        //-- Establecer la configuración de ver los datos de la base de datos.
        madservicesClientedb.query(formatoInstruccionVerCarrito, (error, results) => {
            if(error) throw error;
            if(results.length > 0) {
                //-- Si tiene productos en el carrito, se borran.
                let instruccionDarseBajaCarrito = "DELETE FROM carrito WHERE id = ?";
                let formatoInstruccionDarseBajaCarrito = mysql.format(instruccionDarseBajaCarrito, [id]);
                //-- Establecer la configuración de borrar los datos de la base de datos.
                madservicesClientedb.query(formatoInstruccionDarseBajaCarrito);
            }
        });
        //-- Si tiene guardada la tarjeta bancaria, también se borra.
        let instruccionVerTarjetasBank = "SELECT * FROM tarjeta WHERE id = ?";
        let formatoInstruccionVerTarjetasBank = mysql.format(instruccionVerTarjetasBank, [id]);
        //-- Establecer la configuración de ver los datos de la base de datos.
        madservicesClientedb.query(formatoInstruccionVerTarjetasBank, (error, resultados) => {
            if(error) throw error;
            if(resultados.length > 0) {
                let instruccionBorrarTarjetasBank = "DELETE FROM tarjeta WHERE id = ?";
                let formatoInstruccionBorrarTarjetasBank = mysql.format(instruccionBorrarTarjetasBank, [id]);
                //-- Establecer la configuración de borrar los datos de la base de datos.
                madservicesClientedb.query(formatoInstruccionBorrarTarjetasBank);
            }
        });
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

//-- Creamos la función para ingresar el producto en el carrito de la compra de la base de datos y de la web de MAD Services.
const ingresoCarritodb = (numProducto, res, id) => {

    //-- Consulta producto MAD en base de datos.
    let instruccionConsultaProductoMAD = 'SELECT * FROM productos WHERE enumeracion = ?'
    let formatoInstruccionConsultaProductoMAD = mysql.format(instruccionConsultaProductoMAD, [numProducto]);
    //-- Conexión para consultar.
    madservicesClientedb.query(formatoInstruccionConsultaProductoMAD, (error, results) => {
        if(error) throw error;
        const cantidad = parseInt(results[0].cantidad, 10);
        const titulo = results[0].titulo;
        const precio = parseFloat(results[0].precio, 10);
        //-- Comprobamos el nº de productos metidos en el carrito.
        let instruccionConsultaCarrito = 'SELECT * FROM carrito WHERE titulo = ? AND id = ?'
        let formatoInstruccionConsultaCarrito = mysql.format(instruccionConsultaCarrito, [titulo, id]);
        //-- Conexión para consultar.
        madservicesClientedb.query(formatoInstruccionConsultaCarrito, (error, salidas) => {
            if(error) throw error;
            if(salidas.length === 0) {
                //-- Ingresamos en el carrito de la base de datos.
                let instruccionIngresoCarrito = 'INSERT INTO carrito (id, cantidad, titulo, precio) VALUES (?, ?, ?, ?)';
                let formatoInstruccionIngresoCarrito = mysql.format(instruccionIngresoCarrito, [id, 1, titulo, precio]);
                madservicesClientedb.query(formatoInstruccionIngresoCarrito);
                //-- Mostrar Alerta Emergente.
                alerta('Producto añadido al carrito');
                // Redirigir a la página de productos MAD.
                return res.redirect(`/sesion-cliente/${id}/empieza/productosmadservices`);
            }else {
                if(cantidad === salidas[0].cantidad) {
                    //-- Mostrar Alerta Emergente.
                    alerta('No hay más productos que añadir');
                    // Redirigir a la página de productos MAD.
                    return res.redirect(`/sesion-cliente/${id}/empieza/productosmadservices`);
                }else {
                    //-- Convertimos a nº entero.
                    let insertar = parseInt(salidas[0].cantidad, 10);
                    //-- Actualziamos el precio.
                    let precioFinal = precio + parseFloat(salidas[0].precio, 10);
                    //-- Actualizamos la cantidad en el carrito de la base de datos.
                    let instruccionActualizarCarrito = 'UPDATE carrito SET cantidad = ?, precio = ? WHERE titulo = ? AND id = ?';
                    let formatoInstruccionActualizarCarrito = mysql.format(instruccionActualizarCarrito, [insertar+1, precioFinal, titulo, id]);
                    madservicesClientedb.query(formatoInstruccionActualizarCarrito);
                    //-- Mostrar Alerta Emergente.
                    alerta(`${insertar+1}º producto de ${titulo} añadido al carrito`);
                    // Redirigir a la página de productos MAD.
                    return res.redirect(`/sesion-cliente/${id}/empieza/productosmadservices`);
                }
            }
        });
    });
}

//-- Creamos la función para quitar el producto del carrito de la compra de la base de datos y de la web de MAD Services.
const quitarProductosdb = (id, titulo, res) => {

    let instruccionConsultarCantidadCarrito = 'SELECT * FROM carrito WHERE id = ? AND titulo = ?';
    let formatoInstruccionConsultarCantidadCarrito = mysql.format(instruccionConsultarCantidadCarrito, [id, titulo]);
    madservicesClientedb.query(formatoInstruccionConsultarCantidadCarrito, (error, results) => {
        if(error) throw error;
        const cantidad = results[0].cantidad;
        const precio = results[0].precio;
        if(cantidad === 1) {
            let instruccionEliminarDelCarrito = 'DELETE FROM carrito WHERE id = ? AND titulo = ?';
            let formatoInstruccionEliminarDelCarrito = mysql.format(instruccionEliminarDelCarrito, [id, titulo]);
            madservicesClientedb.query(formatoInstruccionEliminarDelCarrito);
            //-- Mostrar Alerta Emergente.
            alerta(`${titulo} eliminado del carrito`);
            // Redirigir a la página de productos MAD.
            return res.redirect(`/sesion-cliente/${id}/carrito`);
        }else {
            //-- Convertimos cantidad a entero para operarlo.
            const cantidadINT = parseInt(cantidad, 10);
            //-- Comprobar el precio del producto a quitar del carrito.
            let instruccionConsultarPrecioBase = 'SELECT * FROM productos WHERE titulo = ?';
            let formatoInstruccionConsultarPrecioBase = mysql.format(instruccionConsultarPrecioBase, [titulo]);
            madservicesClientedb.query(formatoInstruccionConsultarPrecioBase, (error, salidas) => {
                if(error) throw error;
                const precioBase = salidas[0].precio;
                let precioTotal = parseFloat(precio, 10) - parseFloat(precioBase, 10);
                //-- Actualizar el carrito.
                let instruccionActualizarProductoCarrito = 'UPDATE carrito SET cantidad = ?, precio = ? WHERE titulo = ? AND id = ?';
                let formatoInstruccionActualizarProductoCarrito = mysql.format(instruccionActualizarProductoCarrito, [cantidadINT-1, precioTotal, titulo, id]);
                madservicesClientedb.query(formatoInstruccionActualizarProductoCarrito);
                //-- Mostrar Alerta Emergente.
                alerta(`Hemos quitado un producto de los ${cantidadINT} que había en ${titulo}`);
                // Redirigir a la página de productos MAD.
                return res.redirect(`/sesion-cliente/${id}/carrito`);
            });
        }
    });
}

//-- Creamos la función para adquirir el nombre y los apellidos del cliente y meterlos en la variable.
const adquirirNombredb = (id) => {

    let instruccionConsultaNombreApellidos = 'SELECT * FROM clientes WHERE id = ?';
    let formatoInstruccionConsultaNombreApellidos = mysql.format(instruccionConsultaNombreApellidos, [id]);
    return new Promise((resolve) => {
        madservicesClientedb.query(formatoInstruccionConsultaNombreApellidos, (error, results) => {
            if(error) throw error;
            const nombre = results[0].nombre;
            const apellidos = results[0].apellidos;
            const cliente = nombre + ' ' + apellidos;
            resolve(cliente);
        });
    });
}

//-- Creamos la función para guardar la tarjeta bancaria del cliente si así lo ha querido.
const guardaTarjetadb = (id, nombreTarjeta, numTarjeta, newExpiracion, cvv) => {

    let instruccionComprobarExistenciaTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionComprobarExistenciaTarjetaBank = mysql.format(instruccionComprobarExistenciaTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionComprobarExistenciaTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            let instruccionIngresarTarjetaBank = 'INSERT INTO tarjeta (id, cliente, numcard, expiracion, cvv) VALUES (?, ?, ?, ?, ?)';
            let formatoInstruccionIngresarTarjetaBank = mysql.format(instruccionIngresarTarjetaBank, [id, nombreTarjeta, numTarjeta, newExpiracion, cvv]);
            madservicesClientedb.query(formatoInstruccionIngresarTarjetaBank);
        }
    });
}

//-- Creamos la función para borrar el carrito según el ID del cliente que está comprando.
const borrarCarritoSegunIDdb = (id) => {

    let instruccionEliminarCarritoPorID = 'DELETE FROM carrito WHERE id = ?';
    let formatoInstruccionEliminarCarritoPorID = mysql.format(instruccionEliminarCarritoPorID, [id]);
    madservicesClientedb.query(formatoInstruccionEliminarCarritoPorID);
}

//-- Creamos la función para confirmar que el/los producto/s ha/han sido vendidos con éxito.
const confirmacionCompradb = (id) => {
    
    let instruccionConsultarProductoComprado = 'SELECT titulo, SUM(cantidad) AS total_cantidad, SUM(precio) AS total_precio FROM carrito WHERE id = ? GROUP BY titulo';
    let formatoInstruccionConsultarProductoComprado = mysql.format(instruccionConsultarProductoComprado, [id]);
    return new Promise((resolve) => {
        madservicesClientedb.query(formatoInstruccionConsultarProductoComprado, (error, results) => {
            if(error) throw error;
            let instruccionConsultarLocalizacionCliente = 'SELECT * FROM clientes WHERE id = ?';
            let formatoInstruccionConsultarLocalizacionCliente = mysql.format(instruccionConsultarLocalizacionCliente, [id]);
            madservicesClientedb.query(formatoInstruccionConsultarLocalizacionCliente, (error, sacar1) => {
                if(error) throw error;
                let tiempo = DateTime.now().setZone('Europe/Madrid');
                let fechaCompra = `${tiempo.c.year}-${tiempo.c.month}-${tiempo.c.day} ${tiempo.c.hour}:${tiempo.c.minute}:${tiempo.c.second}`;
                const email = sacar1[0].email;
                const direccion = sacar1[0].direccion;
                const poblacion = sacar1[0].poblacion;
                const region = sacar1[0].region;
                const pais = sacar1[0].pais;
                const cp = sacar1[0].cp;
                for(let i=0; i<results.length; i++) {
                    let instruccionSacar = 'SELECT * FROM productos WHERE titulo = ?';
                    let formatoInstruccionSacar = mysql.format(instruccionSacar, [results[i].titulo]);
                    madservicesClientedb.query(formatoInstruccionSacar, (error, sacar2) => {
                        if(error) throw error;
                        let enumeracion = sacar2[0].enumeracion;
                        let cantidad = sacar2[0].cantidad;
                        if(cantidad >= results[i].total_cantidad) {
                            let imagen = sacar2[0].portada;
                            let instruccionIngresarCompra = 'INSERT INTO comprados (email, direccion, poblacion, region, pais, cp, imagen, titulo, cantidades, preciototal, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                            let formatoInstruccionIngresarCompra = mysql.format(instruccionIngresarCompra, [email, direccion, poblacion, region, pais, cp, imagen, results[i].titulo, results[i].total_cantidad, results[i].total_precio, fechaCompra]);
                            madservicesClientedb.query(formatoInstruccionIngresarCompra);
                            if(cantidad === 1) {
                                let instruccionEliminarProducto = 'DELETE FROM productos WHERE titulo = ?';
                                let formatoInstruccionEliminarProducto = mysql.format(instruccionEliminarProducto, [results[i].titulo]);
                                madservicesClientedb.query(formatoInstruccionEliminarProducto);
                                let enumeracionSig = enumeracion + 1;
                                for(let j=enumeracionSig; j > enumeracion; j++) {
                                    let instruccionConsultarEnumeracionSig = 'SELECT * FROM productos WHERE enumeracion = ?';
                                    let formatoInstruccionConsultarEnumeracionSig = mysql.format(instruccionConsultarEnumeracionSig, [enumeracionSig]);
                                    madservicesClientedb.query(formatoInstruccionConsultarEnumeracionSig, (error, sacar3) => {
                                        if(error) throw error;
                                        if(sacar3.length === 0) {
                                            j = enumeracion - 1;
                                        }else {
                                            let insertar = j - 1;
                                            let instruccionActualizarOrden = 'UPDATE productos SET enumeracion = ? WHERE enumeracion = ?';
                                            let formatoInstruccionActualizarOrden = mysql.format(instruccionActualizarOrden, [insertar, j]);
                                            madservicesClientedb.query(formatoInstruccionActualizarOrden);
                                        }
                                    });
                                }
                            }else {
                                let cantidadRestante = cantidad - results[i].total_cantidad;
                                if(cantidadRestante === 0) {
                                    let instruccionEliminarProducto = 'DELETE FROM productos WHERE titulo = ?';
                                    let formatoInstruccionEliminarProducto = mysql.format(instruccionEliminarProducto, [results[i].titulo]);
                                    madservicesClientedb.query(formatoInstruccionEliminarProducto);
                                    let enumeracionSig = enumeracion + 1;
                                    for(let j=enumeracionSig; j > enumeracion; j++) {
                                        let instruccionConsultarEnumeracionSig = 'SELECT * FROM productos WHERE enumeracion = ?';
                                        let formatoInstruccionConsultarEnumeracionSig = mysql.format(instruccionConsultarEnumeracionSig, [enumeracionSig]);
                                        madservicesClientedb.query(formatoInstruccionConsultarEnumeracionSig, (error, sacar3) => {
                                            if(error) throw error;
                                            if(sacar3.length === 0) {
                                                j = enumeracion - 1;
                                            }else {
                                                let insertar = j - 1;
                                                let instruccionActualizarOrden = 'UPDATE productos SET enumeracion = ? WHERE enumeracion = ?';
                                                let formatoInstruccionActualizarOrden = mysql.format(instruccionActualizarOrden, [insertar, j]);
                                                madservicesClientedb.query(formatoInstruccionActualizarOrden);
                                            }
                                        });
                                    }
                                }else {
                                    let instruccionReducirProducto = 'UPDATE productos SET cantidad = ? WHERE titulo = ?';
                                    let formatoInstruccionReducirProducto = mysql.format(instruccionReducirProducto, [cantidadRestante, results[i].titulo]);
                                    madservicesClientedb.query(formatoInstruccionReducirProducto);
                                }
                            }
                            let fallo = false;
                            resolve(fallo);
                        }else {
                            let instruccionEliminarComprados = 'DELETE FROM comprados WHERE email = ?';
                            let formatoInstruccionEliminarComprados = mysql.format(instruccionEliminarComprados, [email]);
                            madservicesClientedb.query(formatoInstruccionEliminarComprados);
                            let fallo = true;
                            i = results.length + 1;
                            resolve(fallo);
                        }
                    });
                }
            });
        });
    });
}

//-- Creamos la función para borrar la tarjeta bancaria del perfil.
const borrarTarjetaBankdb = (id, res) => {

    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            //-- Mostrar alerta.
            alerta('No hay ninguna tarjeta bancaria en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            let instruccionBorrarTarjetaBank = 'DELETE FROM tarjeta WHERE id = ?';
            let formatoInstruccionBorrarTarjetaBank = mysql.format(instruccionBorrarTarjetaBank, [id]);
            madservicesClientedb.query(formatoInstruccionBorrarTarjetaBank);
            //-- Mostrar alerta.
            alerta('Tarjeta bancaria borrada de tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }
    });
}

//-- Creamos las funciones para actualizar la tarjeta bancaria en el perfil.
const editarNumTarjetaBankdb = (id, numtarjeta, res) => {

    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            //-- Mostrar alerta.
            alerta('No hay ninguna tarjeta bancaria en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            //-- Validamos el nº de tarjeta bancaria.
            const validacionCard = validarCard.number(numtarjeta);
            if(!validacionCard.isValid || numtarjeta.length > 18) {
                //-- Mostrar alerta.
                alerta(`${numtarjeta} no es un nº de tarjeta bancaria válido`);
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }else {
                let instruccionActualizarTarjetaBank = 'UPDATE tarjeta SET numcard = ? WHERE id = ?';
                let formatoInstruccionActualizarTarjetaBank = mysql.format(instruccionActualizarTarjetaBank, [numtarjeta, id]);
                madservicesClientedb.query(formatoInstruccionActualizarTarjetaBank);
                //-- Mostrar alerta.
                alerta('Nº de tarjeta bancaria actualizado en tu perfil');
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }
        }
    });
}
const editarValidezTarjetaBankdb = (id, validez, res) => {

    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            //-- Mostrar alerta.
            alerta('No hay ninguna tarjeta bancaria en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            const newExpiracion = validez + '-01';
            let instruccionActualizarTarjetaBank = 'UPDATE tarjeta SET expiracion = ? WHERE id = ?';
            let formatoInstruccionActualizarTarjetaBank = mysql.format(instruccionActualizarTarjetaBank, [newExpiracion, id]);
            madservicesClientedb.query(formatoInstruccionActualizarTarjetaBank);
            //-- Mostrar alerta.
            alerta('Fecha de validez de la tarjeta bancaria actualizada en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }
    });
}
const editarNombreTarjetaBankdb = (id, namecard, res) => {

    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            //-- Mostrar alerta.
            alerta('No hay ninguna tarjeta bancaria en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            if(namecard > 148) {
                //-- Mostrar alerta y redirigir a donde estaba de nuevo.
                alerta(`${namecard} demasiado largo`);
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }else {
                let instruccionActualizarTarjetaBank = 'UPDATE tarjeta SET cliente = ? WHERE id = ?';
                let formatoInstruccionActualizarTarjetaBank = mysql.format(instruccionActualizarTarjetaBank, [namecard, id]);
                madservicesClientedb.query(formatoInstruccionActualizarTarjetaBank);
                //-- Mostrar alerta.
                alerta('Nombre de la tarjeta bancaria actualizado en tu perfil');
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }
        }
    });
}
const editarCVVTarjetaBankdb = (id, cvv, res) => {

    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            //-- Mostrar alerta.
            alerta('No hay ninguna tarjeta bancaria en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            //-- Comprobar que el CVV es válido y actualizarlo.
            const validacionCVV = validarCard.cvv(cvv);
            if(!validacionCVV.isValid) {
                //-- Mostrar alerta.
                alerta(`${cvv} no es un CVV válido`);
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }else {
                let instruccionActualizarTarjetaBank = 'UPDATE tarjeta SET cvv = ? WHERE id = ?';
                let formatoInstruccionActualizarTarjetaBank = mysql.format(instruccionActualizarTarjetaBank, [cvv, id]);
                madservicesClientedb.query(formatoInstruccionActualizarTarjetaBank);
                //-- Mostrar alerta.
                alerta('CVV de la tarjeta bancaria actualizado en tu perfil');
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }
        }
    });
}

//-- Creamos las funciones para ingresar la tarjeta bancaria en el perfil.
const ingresarTarjetaBankdb = (id, numtarjeta, newExpiracion, namecard, cvv, res) => {
    
    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            let instruccionIngresarTarjetaBank = 'INSERT INTO tarjeta (id, cliente, numcard, expiracion, cvv) VALUES (?, ?, ?, ?, ?)';
            let formatoInstruccionIngresarTarjetaBank = mysql.format(instruccionIngresarTarjetaBank, [id, namecard, numtarjeta, newExpiracion, cvv]);
            madservicesClientedb.query(formatoInstruccionIngresarTarjetaBank);
            //-- Mostrar alerta.
            alerta('Tarjeta bancaria ingresada en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            //-- Mostrar alerta.
            alerta('Ya ingresaste una tarjeta bancaria en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }
    });
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
    darseBajaClientedb,
    ingresoCarritodb,
    quitarProductosdb,
    adquirirNombredb,
    guardaTarjetadb,
    borrarCarritoSegunIDdb,
    confirmacionCompradb,
    borrarTarjetaBankdb,
    editarNumTarjetaBankdb,
    editarValidezTarjetaBankdb,
    editarNombreTarjetaBankdb,
    editarCVVTarjetaBankdb,
    ingresarTarjetaBankdb
};