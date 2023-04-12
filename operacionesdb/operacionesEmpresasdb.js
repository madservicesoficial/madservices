//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');

//-- Creamos la función para registrarse como Empresa, con verificación de correo electrónico, en la base de datos de MAD Services.
const registrarEmpresaVerificadadb = async (madservicesdb, data, res) => {

    //-- Instrucción para registrarse en la base de datos.
    let instruccionRegistrarse = 
        "INSERT INTO empresas (id, nombre, nif, email, password, tiposoc) VALUES (?, ?, ?, ?, ?, ?)";
    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM empresas WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para registrar y consultar en base de datos.
    let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [data.id, data.nombre, data.nif, data.email, data.password, data.tiposoc]);
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    //-- Establecer la comunicación de insertar y consultar datos en la base de datos.
    madservicesdb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        const cont = results[0].count;
        const emailExiste = cont > 0;
        if(emailExiste) {
            res.status(401).render('paginas/empresaRegistrarse', { mensaje: 'Correo ya en uso' });
            return res.end();
        }else {
            madservicesdb.query(formatoInstruccionRegistrarse, (error) => {
                if(error) throw error;
                res.redirect('/');
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
module.exports = {registrarEmpresaVerificadadb, actualizarEmpresadb, darseBajaEmpresadb};