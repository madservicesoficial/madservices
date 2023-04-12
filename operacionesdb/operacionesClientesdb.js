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
                res.redirect('/');
            });
        }
    });
}

//-- Creamos la función para verificar en el Inicio de Sesión, que el email y la contraseña del Cliente están en la base de datos de MAD Services.
const consultaEmailPasswordClientedb = (madservicesdb, email, callback) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT id FROM clientes WHERE email = ?';
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [email]);
    //-- Establecer la comunicación para consultar el email en la base de datos.
    madservicesdb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        callback(results);
    });
}

//-- Exportamos las funciones.
module.exports = {registrarClienteVerificadodb, consultaEmailPasswordClientedb};