//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');

//-- Función que consulta el título metido en la base de datos.
const busquedaPorTitulodb = (titulo, res) => {

    let incluir = `%${titulo}%`;
    let instruccionConsultaTitulo = 'SELECT * FROM productos WHERE titulo LIKE ?';
    let formatoInstruccionConsultaTitulo = mysql.format(instruccionConsultaTitulo, [incluir]);
    madservicesClientedb.query(formatoInstruccionConsultaTitulo, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosmadservices', { cartaProducto: results});
        return res.end();
    });
}

//-- Función que consulta la categoria metida en la base de datos.
const busquedaPorCategoriadb = (categoria, res) => {

    let instruccionConsultaTitulo = 'SELECT * FROM productos WHERE producto = ?';
    let formatoInstruccionConsultaTitulo = mysql.format(instruccionConsultaTitulo, [categoria]);
    madservicesClientedb.query(formatoInstruccionConsultaTitulo, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosmadservices', { cartaProducto: results});
        return res.end();
    });
}

//-- Función que consulta el precio metido en la base de datos.
const busquedaPorPreciodb = (min, max, res) => {
    
    let instruccionConsultaTitulo = 'SELECT * FROM productos WHERE precio BETWEEN ? AND ?';
    let formatoInstruccionConsultaTitulo = mysql.format(instruccionConsultaTitulo, [min, max]);
    madservicesClientedb.query(formatoInstruccionConsultaTitulo, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosmadservices', { cartaProducto: results});
        return res.end();
    });
}

//-- Función que consulta el tipo de empresa elegida.
const filtroTipoEmpresadb = (seleccion, res) => {

    let instruccionConsultaTipoEmpresa = 'SELECT * FROM empresas WHERE tipo = ?';
    let formatoInstruccionConsultaTipoEmpresa = mysql.format(instruccionConsultaTipoEmpresa, [seleccion]);
    madservicesClientedb.query(formatoInstruccionConsultaTipoEmpresa, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosTheMall', { empresas: results});
        return res.end();
    });
}

//-- Función que consulta el nombre de empresa elegida.
const filtroNombreEmpresadb = (nombre, res) => {

    let incluir = `%${nombre}%`;
    let instruccionConsultaNombreEmpresa = 'SELECT * FROM empresas WHERE marca LIKE ?';
    let formatoInstruccionConsultaNombreEmpresa= mysql.format(instruccionConsultaNombreEmpresa, [incluir]);
    madservicesClientedb.query(formatoInstruccionConsultaNombreEmpresa, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosTheMall', { empresas: results });
        return res.end();
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    busquedaPorTitulodb,
    busquedaPorPreciodb,
    busquedaPorCategoriadb,
    filtroTipoEmpresadb,
    filtroNombreEmpresadb
};
//#######################################################################################################//