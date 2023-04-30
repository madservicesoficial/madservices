//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { actualizarEmpresaVerificadadb, mostrarEmpresaVerificadadb } = require('../../modelos/empresas/operacionesDB.js');
//-- Importamos la Tecnología para validar datos enviados por la Empresa.
const validacion = require("validator");
//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../config/database.js');

//-- la función de Express-Validator: isEmail(), comprueba que el email introducido cumple con el estándar RFC5322, estándar basado
//-- en que la estructura válida de un correo electrónico debe cumplir uno de estos tres esquemas:
//-- 1) usuario@dominio.com
//-- 2) usuario123@subdominio.dominio.co.uk
//-- 3) usuario+etiqueta@dominio.com
//-- Es decir, debe cumplir con la estructura: usuario + @ + dominio (incluyendo o no subdominio) + terminación .com (global/comercial)
//-- o .es (España) o .abreviacionPais (cualquier otro pais).

//-- Creamos la función que valida los datos enviados por la Empresa.
const validacionEntradasEmpresa = (id, data, oldpassword, newpassword, repitePassword, res) => {

    //-- Declaración de ctes.
    const minLong = 3;
    const maxLong = 98;
    const maxLong2 = 50 + maxLong;
    //-- Si no, chequeamos que cada campo cumpla con los requisitos.
    if((data.marca.length < minLong || data.marca.length > maxLong2) && data.marca) {
        //-- Instrucción consultar para mostrar.
        let instruccionConsultarParaMostrar = 'SELECT * FROM empresas WHERE id = ?';
        //-- Configuración del formato de la instrucción.
        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
        //-- Proceso de la consulta.
        madservicesEmpresadb.query(formatoinstruccionConsultarParaMostrar, (error, salida) => {
            if(error) throw error;
            const tablaEmpresa = salida[0];
            res.status(401).render('paginas/empresas/interfaz', 
            {
                msjError: `La marca empresarial debe tener entre ${minLong} y ${maxLong2} caracteres`,
                id: tablaEmpresa.id,
                email: tablaEmpresa.email,
                password: tablaEmpresa.password,
                marca: tablaEmpresa.marca,
                tipo: tablaEmpresa.tipo,
                nif: tablaEmpresa.nif
            });
            return res.end();
        });
    }
    if((cifvalidacion.isValidCif(data.nif) || cifvalidacion.isValidNif(data.nif)) && data.nif) {
        console.log('CIF/NIF verificado y correcto');
    }else {
        //-- Instrucción consultar para mostrar.
        let instruccionConsultarParaMostrar = 'SELECT * FROM empresas WHERE id = ?';
        //-- Configuración del formato de la instrucción.
        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
        //-- Proceso de la consulta.
        madservicesEmpresadb.query(formatoinstruccionConsultarParaMostrar, (error, results) => {
            if(error) throw error;
            const tablaEmpresa = results[0];
            res.status(401).render('paginas/empresas/interfaz', 
            {
                msjError: `El CIF/NIF no es oficial`,
                id: tablaEmpresa.id,
                email: tablaEmpresa.email,
                password: tablaEmpresa.password,
                marca: tablaEmpresa.marca,
                tipo: tablaEmpresa.tipo,
                nif: tablaEmpresa.nif
            });
            return res.end();
        });
    }
    const estructuraEmail = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|es)$/;
    if(validacion.isEmail(data.email) && estructuraEmail.test(data.email) && data.email) {
        console.log('Email verificado y correcto');
    }else {
        //-- Instrucción consultar para mostrar.
        let instruccionConsultarParaMostrar = 'SELECT * FROM empresas WHERE id = ?';
        //-- Configuración del formato de la instrucción.
        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
        //-- Proceso de la consulta.
        madservicesEmpresadb.query(formatoinstruccionConsultarParaMostrar, (error, result) => {
            if(error) throw error;
            const tablaEmpresa = result[0];
            res.status(401).render('paginas/empresas/interfaz', 
            {
                msjError: `El Email: ${data.email} debe seguir la estructura válida Internacional`,
                id: tablaEmpresa.id,
                email: tablaEmpresa.email,
                password: tablaEmpresa.password,
                marca: tablaEmpresa.marca,
                tipo: tablaEmpresa.tipo,
                nif: tablaEmpresa.nif
            });
            return res.end();
        });
    }
    //-- Declaramos las variables o campos de la Empresa.
    const email = data.email;
    const marca = data.marca;
    const tipo = data.tipo;
    const nif = data.nif;
    //-- Actualizamos todos los campos menos la contraseña.
    actualizarEmpresaVerificadadb
    (
        id,
        {marca: marca, tipo: tipo, nif: nif, email: email}
    );
    //-- Actualizamos la contraseña y mostramos en función de lo que se haya introducido en ella.
    mostrarEmpresaVerificadadb
    (
        id,
        oldpassword,
        newpassword,
        repitePassword,
        res
    );
}

//-- Exportamos dicha función para unirlo al resto del programa.
module.exports = validacionEntradasEmpresa;