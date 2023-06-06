//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');

//-- Función que consulta el título metido en la base de datos.
const busquedaPorTitulodb = (titulo, res, id) => {

    let incluir = `%${titulo}%`;
    let instruccionConsultaTitulo = 'SELECT * FROM productos WHERE titulo LIKE ?';
    let formatoInstruccionConsultaTitulo = mysql.format(instruccionConsultaTitulo, [incluir]);
    madservicesClientedb.query(formatoInstruccionConsultaTitulo, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/clientes/productosmadservices', { cartaProducto: results, id: id});
        return res.end();
    });
}

//-- Función que consulta la categoria metida en la base de datos.
const busquedaPorCategoriadb = (categoria, res, id) => {

    let instruccionConsultaTitulo = 'SELECT * FROM productos WHERE producto = ?';
    let formatoInstruccionConsultaTitulo = mysql.format(instruccionConsultaTitulo, [categoria]);
    madservicesClientedb.query(formatoInstruccionConsultaTitulo, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/clientes/productosmadservices', { cartaProducto: results, id: id});
        return res.end();
    });
}

//-- Función que consulta el precio metido en la base de datos.
const busquedaPorPreciodb = (min, max, res, id) => {
    
    let instruccionConsultaTitulo = 'SELECT * FROM productos WHERE precio BETWEEN ? AND ?';
    let formatoInstruccionConsultaTitulo = mysql.format(instruccionConsultaTitulo, [min, max]);
    madservicesClientedb.query(formatoInstruccionConsultaTitulo, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/clientes/productosmadservices', { cartaProducto: results, id: id});
        return res.end();
    });
}

//-- Función que consulta el precio y la categoria metida en la base de datos.
const busquedaPorCategoriaPreciodb = (categoria, min, max, res, id) => {

    let instruccionConsulta = 'SELECT * FROM productos WHERE precio BETWEEN ? AND ? AND producto = ?';
    let formatoInstruccionConsulta = mysql.format(instruccionConsulta, [min, max, categoria]);
    madservicesClientedb.query(formatoInstruccionConsulta, (error, results) => {
        if(error) throw error;
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: 'Por categoría y precio',
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        res.status(201).render('paginas/clientes/productosmadservices', { cartaProducto: results, id: id });
        return res.end();
    });
}

//-- Función que consulta el precio y el título metido en la base de datos.
const busquedaPorTituloPreciodb = (titulo, min, max, res, id) => {

    let incluir = `%${titulo}%`;
    let instruccionConsulta = 'SELECT * FROM productos WHERE precio BETWEEN ? AND ? AND titulo LIKE ?';
    let formatoInstruccionConsulta = mysql.format(instruccionConsulta, [min, max, incluir]);
    madservicesClientedb.query(formatoInstruccionConsulta, (error, results) => {
        if(error) throw error;
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: 'Por título y precio',
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        res.status(201).render('paginas/clientes/productosmadservices', { cartaProducto: results, id: id });
        return res.end();
    });
}

//-- Función que consulta la categoria y el título metido en la base de datos.
const busquedaPorCategoriaTitulodb = (titulo, categoria, res, id) => {

    let incluir = `%${titulo}%`;
    let instruccionConsulta = 'SELECT * FROM productos WHERE producto = ? AND titulo LIKE ?';
    let formatoInstruccionConsulta = mysql.format(instruccionConsulta, [categoria, incluir]);
    madservicesClientedb.query(formatoInstruccionConsulta, (error, results) => {
        if(error) throw error;
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: 'Por título y categoría',
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        res.status(201).render('paginas/clientes/productosmadservices', { cartaProducto: results, id: id });
        return res.end();
    });
}

//-- Función que consulta la categoria y el título metido en la base de datos.
const busquedaPorTodo = (titulo, categoria, min, max, res, id) => {

    let incluir = `%${titulo}%`;
    let instruccionConsulta = 'SELECT * FROM productos WHERE precio BETWEEN ? AND ? AND producto = ? AND titulo LIKE ?';
    let formatoInstruccionConsulta = mysql.format(instruccionConsulta, [min, max, categoria, incluir]);
    madservicesClientedb.query(formatoInstruccionConsulta, (error, results) => {
        if(error) throw error;
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: 'Por título, precio y categoría',
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        res.status(201).render('paginas/clientes/productosmadservices', { cartaProducto: results, id: id });
        return res.end();
    });
}

//-- Función que consulta el tipo de empresa elegida.
const filtroTipoEmpresadb = (id, seleccion, res) => {

    let instruccionConsultaTipoEmpresa = 'SELECT * FROM empresas WHERE tipo = ?';
    let formatoInstruccionConsultaTipoEmpresa = mysql.format(instruccionConsultaTipoEmpresa, [seleccion]);
    madservicesClientedb.query(formatoInstruccionConsultaTipoEmpresa, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/clientes/productosTheMall', { empresas: results, id: id });
        return res.end();
    });
}

//-- Función que consulta el nombre de empresa elegida.
const filtroNombreEmpresadb = (id, nombre, res) => {

    let incluir = `%${nombre}%`;
    let instruccionConsultaNombreEmpresa = 'SELECT * FROM empresas WHERE marca LIKE ?';
    let formatoInstruccionConsultaNombreEmpresa= mysql.format(instruccionConsultaNombreEmpresa, [incluir]);
    madservicesClientedb.query(formatoInstruccionConsultaNombreEmpresa, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/clientes/productosTheMall', { empresas: results, id: id });
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
    filtroNombreEmpresadb
};
//#######################################################################################################//