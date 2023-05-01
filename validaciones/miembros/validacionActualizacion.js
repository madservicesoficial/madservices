//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarMiembroVerificadodb, mostrarMiembroVerificadodb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología para validar datos enviados por el Miembro MAD.
const validacion = require("validator");
//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../config/database.js');

//-- la función de Express-Validator: isEmail(), comprueba que el email introducido cumple con el estándar RFC5322, estándar basado
//-- en que la estructura válida de un correo electrónico debe cumplir uno de estos tres esquemas:
//-- 1) usuario@dominio.com
//-- 2) usuario123@subdominio.dominio.co.uk
//-- 3) usuario+etiqueta@dominio.com
//-- Es decir, debe cumplir con la estructura: usuario + @ + dominio (incluyendo o no subdominio) + terminación .com (global/comercial)
//-- o .es (España) o .abreviacionPais (cualquier otro pais).

//-- Creamos la función que valida los datos enviados por el Miembro MAD.
const validacionEntradasMiembro = (id, data, oldpassword, newpassword, repitePassword, res) => {

    //-- Declaración de ctes.
    const minLong = 3;
    const maxLong = 98;
    const maxLong2 = 50 + maxLong;
    if(data.miembro) {
        //-- Si no, chequeamos que cada campo cumpla con los requisitos.
        if(data.miembro.length < minLong || data.miembro.length > maxLong2) {
            //-- Instrucción consultar para mostrar.
            let instruccionConsultarParaMostrar = 'SELECT * FROM miembros WHERE id = ?';
            //-- Configuración del formato de la instrucción.
            let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
            //-- Proceso de la consulta.
            madservicesAdmindb.query(formatoinstruccionConsultarParaMostrar, (error, salida) => {
                if(error) throw error;
                const tablaMiembro = salida[0];
                res.status(401).render('paginas/miembros/interfaz', 
                {
                    msjError: `El nombre del Miembro MAD debe tener entre ${minLong} y ${maxLong2} caracteres`,
                    id: tablaMiembro.id,
                    email: tablaMiembro.email,
                    password: tablaMiembro.password,
                    miembro: tablaMiembro.miembro,
                    departamento: tablaMiembro.departamento,
                    genero: tablaMiembro.genero
                });
                return res.end();
            });
        }
    }
    if(data.email) {
        const estructuraEmail = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|es)$/;
        if(validacion.isEmail(data.email) && estructuraEmail.test(data.email)) {
            console.log('Email verificado y correcto');
        }else {
            //-- Instrucción consultar para mostrar.
            let instruccionConsultarParaMostrar = 'SELECT * FROM miembros WHERE id = ?';
            //-- Configuración del formato de la instrucción.
            let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
            //-- Proceso de la consulta.
            madservicesAdmindb.query(formatoinstruccionConsultarParaMostrar, (error, result) => {
                if(error) throw error;
                const tablaMiembro = result[0];
                res.status(401).render('paginas/miembros/interfaz', 
                {
                    msjError: `El Email: ${data.email} debe seguir la estructura válida Internacional`,
                    id: tablaMiembro.id,
                    email: tablaMiembro.email,
                    password: tablaMiembro.password,
                    miembro: tablaMiembro.miembro,
                    departamento: tablaMiembro.departamento,
                    genero: tablaMiembro.genero
                });
                return res.end();
            });
        }
    }
    //-- Declaramos las variables o campos del Miembro MAD.
    const email = data.email;
    const miembro = data.miembro;
    const departamento = data.departamento;
    const genero = data.genero;
    //-- Actualizamos todos los campos menos la contraseña.
    actualizarMiembroVerificadodb
    (
        id,
        {miembro: miembro, departamento: departamento, genero: genero, email: email}
    );
    //-- Actualizamos la contraseña y mostramos en función de lo que se haya introducido en ella.
    mostrarMiembroVerificadodb
    (
        id,
        oldpassword,
        newpassword,
        repitePassword,
        res
    );
}

//-- Exportamos dicha función para unirlo al resto del programa.
module.exports = validacionEntradasMiembro;