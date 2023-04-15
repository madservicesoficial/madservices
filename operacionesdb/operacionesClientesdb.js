//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');

//-- Creamos la función para registrarse como Cliente, con verificación de correo electrónico, en la base de datos de MAD Services.
const registrarClienteVerificadodb = (madservicesdb, data, res) => {

    //-- Instrucción para registrarse en la base de datos.
    let instruccionRegistrarse = 
        "INSERT INTO clientes (id, email, password, nombre, apellidos, direccion, poblacion, region, pais, cp, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM clientes WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para registrar y consultar en base de datos.
    let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [data.id, data.email, data.password, data.nombre, data.apellidos, data.direccion, data.poblacion, data.region, data.pais, data.cp, data.genero]);
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    //-- Establecer la comunicación de insertar y consultar datos en la base de datos.
    madservicesdb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        const cont = results[0].count;
        const emailExiste = cont > 0;
        if(emailExiste) {
            res.status(401).render('paginas/clienteRegistrarse', { mensaje: 'Correo ya en uso' });
            return res.end();
        }else {
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
            if(password !== miembro.password) {
                res.status(401).render('paginas/clienteLogin', { mensaje: 'Contraseña incorrecta' });
                return res.end();
            }else {
                req.session.miembro = miembro;
                return res.redirect(`/sesion/${miembro.id}`);
            }
        }
    });
}

//-- Exportamos las funciones.
module.exports = {registrarClienteVerificadodb, iniciarSesionClienteVerificadodb};