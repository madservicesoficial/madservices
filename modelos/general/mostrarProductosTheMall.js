//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../config/database.js');

//-- Función que muestra los productos Multimarca o The Mall.
const mostrarProductosTheMall = (req, res) => {
    
    //-- Renderizar la Página de The Mall.
    res.status(201).render('paginas/general/productosTheMall');
}

//-- Exportamos para unir con todo.
module.exports = mostrarProductosTheMall;