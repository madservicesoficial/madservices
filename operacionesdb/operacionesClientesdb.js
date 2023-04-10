//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare } = require('bcrypt');
//-- Le añadimos SAL al cifrado de las contraseñas.
const SALT = 10;

//-- Creamos la función para registrarse como Cliente en la base de datos de MAD Services.
const registrarClientedb = async (madservicesdb, data) => {

    //-- Instrucción para registrarse en la base de datos.
    let instruccionRegistrarse = 
        "INSERT INTO clientes (id, email, password, nombre, apellidos, direccion, poblacion, region, pais, cp, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [data.id, data.email, data.password, data.nombre, data.apellidos, data.direccion, data.poblacion, data.region, data.pais, data.cp, data.genero]);
    //-- Establecer la conexión dinámica.
    await madservicesdb.getConnection(function(error, madservicesdb) {
        if(error) {
            throw error;
        }else {
            //-- Establecer la comunicación de insertar datos en la base de datos.
            madservicesdb.query(formatoInstruccionRegistrarse);
        }
    });
}

//-- Creamos la función para consultar si el email del Cliente existe en la base de datos de MAD Services.
const consultaEmailClientedb = async (madservicesdb, data, res) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT EXISTS(SELECT * FROM clientes WHERE email = ?) as emailExists';
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    await madservicesdb.getConnection( (error, madservicesdb) => {
        if(error) {
            throw error;
        }else {
            //-- Establecer la comunicación para consultar el email en la base de datos.
            madservicesdb.query(formatoInstruccionConsultar, (error, result) => {
                if(error) {
                    throw error;
                }else {
                    if(result[0].emailExists == 1) {
                        return res.render('paginas/clienteRegistrarse', {alertStatus: 401, alertMessage: 'Correo ya en uso'});
                    }
                }
            });
        }
    });
}

//-- Creamos la función para consultar si el email del Cliente existe en la base de datos de MAD Services.
const consultaNoEmailClientedb = async (madservicesdb, data, res) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT EXISTS(SELECT * FROM clientes WHERE email = ?) as emailExists';
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    await madservicesdb.getConnection( (error, madservicesdb) => {
        if(error) {
            throw error;
        }else {
            //-- Establecer la comunicación para consultar el email en la base de datos.
            madservicesdb.query(formatoInstruccionConsultar, (error, result) => {
                if(error) {
                    throw error;
                }else {
                    if(result[0].emailExists == 0) {
                        return res.render('paginas/clienteLogin', {alertStatus: 401, alertMessage: 'No se encuentra el correo electrónico'});
                    }
                }
            });
        }
    });
}

//-- Creamos la función para consultar si la Contraseña del Cliente existe en la base de datos de MAD Services.
const consultaPasswordClientedb = async (madservicesdb, data, res) => {

    //-- Ciframos la contraseña introducida para poder comparar la contraseña de la base de datos cifrada.
    const passwordIntroducida = data.password;
    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT EXISTS(SELECT * FROM clientes WHERE email = ?)';
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    await madservicesdb.getConnection( (error, madservicesdb) => {
        if(error) {
            throw error;
        }else {
            //-- Establecer la comunicación para consultar la password en la base de datos.
            madservicesdb.query(formatoInstruccionConsultar, (error, result) => {
                if(error) throw error;
                if(result.length === 0)
                {
                    return res.render('paginas/clienteLogin', {alertStatus: 401, alertMessage: 'Contraseña incorrecta'});
                }
                else
                {
                    const passwordLeida = result[0].password;
                    compare(passwordIntroducida, passwordLeida, (err, match) => {
                        if (err) throw err;
                        //-- Si la contraseña existe, crear la sesión y redireccionar a inicio autenticado.
                        if (match) {
                            req.session.id = result[0].id;
                            res.redirect(`/${id}`);
                        }else {
                            return res.render('paginas/clienteLogin', {alertStatus: 401, alertMessage: 'Contraseña incorrecta'});
                        }
                    });
                }
            });
        }
    });
}

//-- Exportamos las funciones.
module.exports = {registrarClientedb, consultaEmailClientedb, consultaNoEmailClientedb, consultaPasswordClientedb};