//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../../config/database.js');

//-- Función que consulta el tipo de empresa elegida.
const filtroTipoEmpresadb = (id, seleccion, res) => {

    let instruccionConsultaTipoEmpresa = 'SELECT * FROM empresas WHERE tipo = ?';
    let formatoInstruccionConsultaTipoEmpresa = mysql.format(instruccionConsultaTipoEmpresa, [seleccion]);
    madservicesEmpresadb.query(formatoInstruccionConsultaTipoEmpresa, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/empresas/productosTheMall', { empresas: results, id: id });
        return res.end();
    });
}

//-- Función que consulta el nombre de empresa elegida.
const filtroNombreEmpresadb = (id, nombre, res) => {

    let incluir = `%${nombre}%`;
    let instruccionConsultaNombreEmpresa = 'SELECT * FROM empresas WHERE marca LIKE ?';
    let formatoInstruccionConsultaNombreEmpresa= mysql.format(instruccionConsultaNombreEmpresa, [incluir]);
    madservicesEmpresadb.query(formatoInstruccionConsultaNombreEmpresa, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/empresas/productosTheMall', { empresas: results, id: id });
        return res.end();
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    filtroTipoEmpresadb,
    filtroNombreEmpresadb
};
//#######################################################################################################//