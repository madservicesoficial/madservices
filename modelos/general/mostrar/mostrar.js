//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');

//-- Función que muestra los productos MAD de forma completa e individualmente.
const mostrarExpansiondb = (req, res) => {

    //-- Obtenemos la variable de enumeración del Producto MAD por parámetro.
    let enumeracion = req.params.enumeracion;
    //-- Instrucción que muestra productos MAD.
    let instruccionMuestraExpansionGeneral = 'SELECT * FROM productos WHERE enumeracion = ?';
    //-- Formato de la instrucción que muestra productos MAD.
    let formatoInstruccionMuestraExpansionGeneral = mysql.format(instruccionMuestraExpansionGeneral, [enumeracion]);
    //-- Establecemos la conexión con la base de datos.
    madservicesClientedb.query(formatoInstruccionMuestraExpansionGeneral, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/expansion', 
        { 
            enumeracion: enumeracion,
            imagenPortada: results[0].portada,
            titulo: results[0].titulo,
            precio: results[0].precio,
            peso: results[0].peso,
            cantidad: results[0].cantidad,
            categoria: results[0].producto,
            descripcion: results[0].descripcion
        });
        return res.end();
    });
}

//-- Función que muestra los productos MAD.
const mostrarProductosMADdb = (req, res) => {
    //-- Instrucción que muestra productos MAD.
    let instruccionMuestraProductosMAD = 'SELECT * FROM productos';
    //-- Formato de la instrucción que muestra productos MAD.
    let formatoInstruccionMuestraProductosMAD = mysql.format(instruccionMuestraProductosMAD);
    //-- Establecemos la conexión con la base de datos.
    madservicesClientedb.query(formatoInstruccionMuestraProductosMAD, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosmadservices', { cartaProducto: results});
        return res.end();
    });
}

//-- Función que muestra los productos Multimarca o The Mall.
const mostrarProductosTheMalldb = (req, res) => {
    
    //-- Renderizar la Página de The Mall.
    res.status(201).render('paginas/general/productosTheMall');
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    mostrarExpansiondb,
    mostrarProductosMADdb,
    mostrarProductosTheMalldb
};
//#######################################################################################################//