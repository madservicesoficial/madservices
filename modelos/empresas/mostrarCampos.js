//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../config/database.js');

//-- Creamos la función que saca parámetros de la base de datos de las Empresas.
const mostrarEmpresadb = (req, res) => {

    //-- Leemos el ID de la Empresa en ese momento.
    let id = req.params.id;
    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM empresas WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, id);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesEmpresadb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        const tablaEmpresa = result[0];
        res.status(201).render('paginas/empresas/interfaz', 
        {
            id: id,
            email: tablaEmpresa.email,
            password: tablaEmpresa.password,
            marca: tablaEmpresa.marca,
            nif: tablaEmpresa.nif,
            tipo: tablaEmpresa.tipo,
            ebitda: tablaEmpresa.ebitda
        });
        return res.end();
    });
}

//-- Exportamos las funciones.
module.exports = mostrarEmpresadb;