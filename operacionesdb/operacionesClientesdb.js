//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');

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
const consultaCorreoEdb = async (madservicesdb, data, res) => {

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
                        res.status(401).send("Correo ya en uso");
                    }
                }
            });
        }
    });
}

//-- Exportamos las funciones.
module.exports = {registrarClientedb, consultaCorreoEdb};