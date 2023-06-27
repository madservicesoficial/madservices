//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');

//-- Función que consulta el título metido en la base de datos.
const busquedaPorTitulodb = (titulo, res) => {

    let incluir = `%${titulo}%`;
    let instruccionConsulta = 'SELECT * FROM productos WHERE titulo LIKE ?';
    let formatoInstruccionConsulta = mysql.format(instruccionConsulta, [incluir]);
    madservicesClientedb.query(formatoInstruccionConsulta, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosmadservices', { cartaProducto: results});
        return res.end();
    });
}

//-- Función que consulta la categoria metida en la base de datos.
const busquedaPorCategoriadb = (categoria, res) => {

    let instruccionConsulta = 'SELECT * FROM productos WHERE producto = ?';
    let formatoInstruccionConsulta = mysql.format(instruccionConsulta, [categoria]);
    madservicesClientedb.query(formatoInstruccionConsulta, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosmadservices', { cartaProducto: results});
        return res.end();
    });
}

//-- Función que consulta el precio metido en la base de datos.
const busquedaPorPreciodb = (min, max, res) => {
    
    let instruccionConsulta = 'SELECT * FROM productos WHERE precio BETWEEN ? AND ?';
    let formatoInstruccionConsulta = mysql.format(instruccionConsulta, [min, max]);
    madservicesClientedb.query(formatoInstruccionConsulta, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosmadservices', { cartaProducto: results});
        return res.end();
    });
}

//-- Función que consulta el precio y la categoria metida en la base de datos.
const busquedaPorCategoriaPreciodb = (categoria, min, max, res) => {

    let instruccionConsulta = 'SELECT * FROM productos WHERE precio BETWEEN ? AND ? AND producto = ?';
    let formatoInstruccionConsulta = mysql.format(instruccionConsulta, [min, max, categoria]);
    madservicesClientedb.query(formatoInstruccionConsulta, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosmadservices', { cartaProducto: results});
        return res.end();
    });
}

//-- Función que consulta el precio y el título metido en la base de datos.
const busquedaPorTituloPreciodb = (titulo, min, max, res) => {

    let incluir = `%${titulo}%`;
    let instruccionConsulta = 'SELECT * FROM productos WHERE precio BETWEEN ? AND ? AND titulo LIKE ?';
    let formatoInstruccionConsulta = mysql.format(instruccionConsulta, [min, max, incluir]);
    madservicesClientedb.query(formatoInstruccionConsulta, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosmadservices', { cartaProducto: results});
        return res.end();
    });
}

//-- Función que consulta la categoria y el título metido en la base de datos.
const busquedaPorCategoriaTitulodb = (categoria, titulo, res) => {

    let incluir = `%${titulo}%`;
    let instruccionConsulta = 'SELECT * FROM productos WHERE producto = ? AND titulo LIKE ?';
    let formatoInstruccionConsulta = mysql.format(instruccionConsulta, [categoria, incluir]);
    madservicesClientedb.query(formatoInstruccionConsulta, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosmadservices', { cartaProducto: results});
        return res.end();
    });
}

//-- Función que consulta la categoria y el título metido en la base de datos.
const busquedaPorTodo = (categoria, titulo, min, max, res) => {

    let incluir = `%${titulo}%`;
    let instruccionConsulta = 'SELECT * FROM productos WHERE precio BETWEEN ? AND ? AND producto = ? AND titulo LIKE ?';
    let formatoInstruccionConsulta = mysql.format(instruccionConsulta, [min, max, categoria, incluir]);
    madservicesClientedb.query(formatoInstruccionConsulta, (error, results) => {
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

//-- Función que consulta el nombre y el tipo de empresa elegida.
const filtroTotalEmpresadb = (seleccion, nombre, res) => {

    let incluir = `%${nombre}%`;
    let instruccionConsultaNombreEmpresa = 'SELECT * FROM empresas WHERE marca LIKE ? AND tipo = ?';
    let formatoInstruccionConsultaNombreEmpresa= mysql.format(instruccionConsultaNombreEmpresa, [incluir, seleccion]);
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
    busquedaPorCategoriaPreciodb,
    busquedaPorTituloPreciodb,
    busquedaPorCategoriaTitulodb,
    busquedaPorTodo,
    filtroTipoEmpresadb,
    filtroNombreEmpresadb,
    filtroTotalEmpresadb
};
//#######################################################################################################//