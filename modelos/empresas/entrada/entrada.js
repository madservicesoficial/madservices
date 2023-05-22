//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare, hash } = require('bcrypt');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../../../controladores/general/generar/IDaleatorio.js');
//-- Importamos la función que comprueba que no se repita el ID aleatorio.
const consultaID = require('../consultar/ID.js');

//-- Creamos la función para registrarse como Empresa, con verificación de correo electrónico, en la base de datos de MAD Services.
const registrarEmpresaVerificadadb = async (data, password, res) => {

    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(password, 1);
    //-- Instrucción para consultar Email en la base de datos.
    let instruccionConsultar = 'SELECT COUNT(*) AS count FROM empresas WHERE email = ?';
    //-- Configuración del formato de los datos introducidos para consultar Email en base de datos.
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [data.email]);
    //-- Establecer la comunicación de insertar y consultar datos en la base de datos.
    madservicesEmpresadb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        const cont = results[0].count;
        const emailExiste = cont > 0;
        if(emailExiste) {
            res.status(401).render('paginas/empresas/registrarse', { mensaje: 'Correo ya en uso' });
            return res.end();
        }else {
            let idEmpresa = generarIDrandom() * 3;
            consultaID(idEmpresa, (idExiste) => {
                while(idExiste) {
                    idEmpresa = generarIDrandom() * 3;
                    consultaID(idEmpresa, (idExiste) => {
                        idExiste = idExiste;
                    });
                }
            });
            //-- Instrucción para registrarse en la base de datos.
            let instruccionRegistrarse = "INSERT INTO empresas (id, email, password, marca, nif, tipo) VALUES (?, ?, ?, ?, ?, ?)";
            //-- Configuración del formato de los datos introducidos para registrar en base de datos.
            let formatoInstruccionRegistrarse = mysql.format(instruccionRegistrarse, [idEmpresa, data.email, passwordCifrada, data.marca, data.nif, data.tipo]);
            madservicesEmpresadb.query(formatoInstruccionRegistrarse, (error) => {
                if(error) throw error;
                //-- Mostrar Alerta Emergente.
                alerta('Empresa registrada con éxito');
                // Redirigir a la página principal de la aplicación.
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
    madservicesEmpresadb.query(formatoInstruccionConsultarEmail, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            res.status(401).render('paginas/empresas/login', { mensaje: 'Correo electrónico incorrecto' });
            return res.end();
        }else {
            const miembro = results[0];
            compare(password, miembro.password).then((result) => {
                if(result) {
                    //-- Establecemos el inicio de sesión.
                    req.session.miembro = miembro;
                    return res.redirect(`/sesion-empresa/${miembro.id}`);
                }else {
                    res.status(401).render('paginas/empresas/login', { mensaje: 'Contraseña incorrecta' });
                    return res.end();
                }
            });
        }
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    registrarEmpresaVerificadadb,
    iniciarSesionEmpresaVerificadadb
};
//#######################################################################################################//