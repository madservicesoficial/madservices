//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../../config/database.js');

//-- Función que consulta el título metido en la base de datos.
const busquedaPorTituloEnMiembrodb = (titulo, res, id) => {

    let incluir = `%${titulo}%`;
    let instruccionConsultaTitulo = 'SELECT * FROM productos WHERE titulo LIKE ?';
    let formatoInstruccionConsultaTitulo = mysql.format(instruccionConsultaTitulo, [incluir]);
    madservicesAdmindb.query(formatoInstruccionConsultaTitulo, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/miembros/productosmadservices', { cartaProducto: results, id: id});
        return res.end();
    });
}

//-- Función que consulta la categoria metida en la base de datos.
const busquedaPorCategoriaEnMiembrodb = (categoria, res, id) => {

    let instruccionConsultaTitulo = 'SELECT * FROM productos WHERE producto = ?';
    let formatoInstruccionConsultaTitulo = mysql.format(instruccionConsultaTitulo, [categoria]);
    madservicesAdmindb.query(formatoInstruccionConsultaTitulo, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/miembros/productosmadservices', { cartaProducto: results, id: id});
        return res.end();
    });
}

//-- Función que consulta el precio metido en la base de datos.
const busquedaPorPrecioEnMiembrodb = (min, max, res, id) => {
    
    let instruccionConsultaTitulo = 'SELECT * FROM productos WHERE precio BETWEEN ? AND ?';
    let formatoInstruccionConsultaTitulo = mysql.format(instruccionConsultaTitulo, [min, max]);
    madservicesAdmindb.query(formatoInstruccionConsultaTitulo, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/miembros/productosmadservices', { cartaProducto: results, id: id});
        return res.end();
    });
}

//-- Función que consulta el tipo de empresa elegida.
const filtroTipoEmpresadb = (id, seleccion, res) => {

    let instruccionConsultaTipoEmpresa = 'SELECT * FROM empresas WHERE tipo = ?';
    let formatoInstruccionConsultaTipoEmpresa = mysql.format(instruccionConsultaTipoEmpresa, [seleccion]);
    madservicesAdmindb.query(formatoInstruccionConsultaTipoEmpresa, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/miembros/productosTheMall', { empresas: results, id: id });
        return res.end();
    });
}

//-- Función que consulta el nombre de empresa elegida.
const filtroNombreEmpresadb = (id, nombre, res) => {

    let incluir = `%${nombre}%`;
    let instruccionConsultaNombreEmpresa = 'SELECT * FROM empresas WHERE marca LIKE ?';
    let formatoInstruccionConsultaNombreEmpresa= mysql.format(instruccionConsultaNombreEmpresa, [incluir]);
    madservicesAdmindb.query(formatoInstruccionConsultaNombreEmpresa, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/miembros/productosTheMall', { empresas: results, id: id });
        return res.end();
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    busquedaPorTituloEnMiembrodb,
    busquedaPorPrecioEnMiembrodb,
    busquedaPorCategoriaEnMiembrodb,
    filtroTipoEmpresadb,
    filtroNombreEmpresadb
};
//#######################################################################################################//