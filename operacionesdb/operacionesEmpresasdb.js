//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');

//-- Creamos la función para registrarse como Empresa en la base de datos de MAD Services.
const registrarEmpresadb = async (madservicesdb, data, callback) => {

    //-- Instrucción para registrarse en la base de datos.
    let instruccionRegistrarse = 
        "INSERT INTO empresas (id, nombre, nif, email, password, tiposoc) VALUES (?, ?, ?, ?, ?, ?)";
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionRegistrarse = mySQL.format(instruccionRegistrarse, [data.id, data.nombre, data.nif, data.email, data.password, data.tiposoc]);
    //-- Establecer la configuración de insertar datos en la base de datos.
    madservicesdb.query(formatoInstruccionRegistrarse, (error) => {
        if(error) {
            return callback(error);
        }
        const miembroRegistrado = true;
        return callback(miembroRegistrado);
    });
}

//-- Creamos la función para consultar si el email de la Empresa existe en la base de datos de MAD Services.
const consultaEmailEmpresadb = async (madservicesdb, email, callback) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM empresas WHERE email = ?';
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [email]);
    //-- Establecer la comunicación para consultar el email en la base de datos.
    madservicesdb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) {
            return callback(error);
        }
        const cont = results[0].count;
        const emailExiste = cont > 0;
        return callback(emailExiste);
    });
}

//-- Creamos la función para consultar si el email de la Empresa no existe en la base de datos de MAD Services.
const consultaNoEmailEmpresadb = async (madservicesdb, data, res) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT EXISTS(SELECT * FROM empresas WHERE email = ?) as emailExists';
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
                        return res.render('paginas/empresaLogin', {
                            alert: true,
                            alertStatus: 401,
                            alertMessage: 'No se encuentra el correo electrónico',
                            alertIcon: 'warning',
                            showConfirmButton: false
                        });
                    }
                }
            });
        }
    });
}

//-- Creamos la función para consultar si la Contraseña de la Empresa existe en la base de datos de MAD Services.
const consultaPasswordEmpresadb = async (madservicesdb, data, res) => {

    //-- Ciframos la contraseña introducida para poder comparar la contraseña de la base de datos cifrada.
    const passwordIntroducida = data.password;
    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT EXISTS(SELECT password FROM empresas WHERE email = ?)';
    //-- Configuración del formato de los datos introducidos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    await madservicesdb.getConnection( (error, madservicesdb) => {
        if(error) {
            throw error;
        }else {
            //-- Establecer la comunicación para consultar la password en la base de datos.
            madservicesdb.query(formatoInstruccionConsultar, (error, results) => {
                if(error) {
                    throw error;
                }else {
                    if(results.length > 0) {
                        const passwordLeida = results[0].password;
                        compare(passwordIntroducida, passwordLeida, (error, result) => {
                            if (error) throw error;
                            if(result === false)
                            {
                                return res.render('paginas/empresaLogin', {
                                    alert: true,
                                    alertStatus: 401,
                                    alertMessage: 'Contraseña incorrecta',
                                    alertIcon: 'warning',
                                    showConfirmButton: false
                                });
                            }
                        });

                    }
                }
            });
        }
    });
}

//-- Creamos la función para Actualizar los datos de la base de datos de MAD Enterprise.
const actualizarEmpresadb = async (madservicesdb, data) => {

    //-- Ctes usadas para crear emails de forma aleatoria para la base de datos.
    const radomLetras = Math.random().toString(36).substring(7);
    const newEmail = `${radomLetras}@outlook.com`;
    //-- Variables usadas para actualizar los datos de la base de datos.
    let actualizarquery = "UPDATE empresas SET email = ? WHERE id = ?";
    let query = mySQL.format(actualizarquery, [newEmail, data.id]);
    //-- Establecer la conexión dinámica.
    await madservicesdb.getConnection(function(error, madservicesdb) {
        if(error) throw error;
        //-- Establecer la configuración de actualizar los datos de la base de datos.
        madservicesdb.query(query);
    });
}

//-- Creamos la función para Borrar los datos de la base de datos de MAD Enterprise.
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
module.exports = {registrarEmpresadb, consultaEmailEmpresadb, consultaNoEmailEmpresadb, consultaPasswordEmpresadb, actualizarEmpresadb, darseBajaEmpresadb};