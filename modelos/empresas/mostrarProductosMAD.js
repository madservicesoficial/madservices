//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../config/database.js');

//-- Función que muestra los productos MAD.
const mostrarProductosMADempresas = (req, res) => {
    //-- Captar el ID empresa.
    let id = req.params.id;
    //-- Instrucción que muestra productos MAD.
    let instruccionMuestraProductosMAD = 'SELECT * FROM productos';
    //-- Formato de la instrucción que muestra productos MAD.
    let formatoInstruccionMuestraProductosMAD = mysql.format(instruccionMuestraProductosMAD);
    //-- Establecemos la conexión con la base de datos.
    madservicesEmpresadb.query(formatoInstruccionMuestraProductosMAD, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/empresas/productosmadservices', { cartaProducto: results, id: id });
        return res.end();
    });
}

//-- Exportamos para unir con todo.
module.exports = mostrarProductosMADempresas;