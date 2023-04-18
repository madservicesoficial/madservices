//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../randomIDs/generarIDRandom.js');
//-- Importamos la función que comprueba que no se repita el ID aleatorio.
const comprobarIDempresadb = require('../comprobarIDs/comprobarIDempresa.js');

//-- Creamos la función para registrarse como Empresa, con verificación de correo electrónico, en la base de datos de MAD Services.
const registrarEmpresaVerificadadb = async (data, res) => {

    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(data.password, 1);
    //-- Instrucción para consultar Email en la base de datos.
    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM empresas WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para consultar Email en base de datos.
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
            let idEmpresa = generarIDrandom() * 3;
            comprobarIDempresadb(idEmpresa, (idExiste) => {
                while(idExiste) {
                    idEmpresa = generarIDrandom() * 3;
                    comprobarIDempresadb(idEmpresa, (idExiste) => {
                        idExiste = idExiste;
                    });
                }
            });
            //-- Instrucción para registrarse en la base de datos.
            let instruccionRegistrarse = "INSERT INTO empresas (id, nombre, nif, email, password, tiposoc) VALUES (?, ?, ?, ?, ?, ?)";
            //-- Configuración del formato de los datos introducidos para registrar en base de datos.
            let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [idEmpresa, data.nombredelaempresa, data.nif, data.email, passwordCifrada, data.tiposoc]);
            madservicesdb.query(formatoInstruccionRegistrarse, (error) => {
                if(error) throw error;
                return res.redirect('/');
            });
        }
    });
}

//-- Creamos la función para iniciar sesión como Empresa, con verificación de correo electrónico y contraseña, en la base de datos de MAD Services.
const iniciarSesionEmpresaVerificadadb = (email, password, req, res) => {

    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultarEmail = 'SELECT * FROM empresas WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para iniciar sesión y consultar en base de datos.
    let formatoInstruccionConsultarEmail = mysql.format(instruccionConsultarEmail, [email]);
    //-- Establecer la comunicación para consultar el email y la contraseña en la base de datos.
    madservicesdb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            res.status(401).render('paginas/empresaLogin', { mensaje: 'Correo electrónico incorrecto' });
            return res.end();
        }else {
            const miembro = results[0];
            compare(password, miembro.password).then((result) => {
                if(result) {
                    req.session.miembro = miembro;
                    return res.redirect(`/sesion-empresa/${miembro.id}`);
                }else {
                    res.status(401).render('paginas/empresaLogin', { mensaje: 'Contraseña incorrecta' });
                    return res.end();
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
module.exports = {registrarEmpresaVerificadadb, iniciarSesionEmpresaVerificadadb, actualizarEmpresadb, darseBajaEmpresadb};