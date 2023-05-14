//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../config/database.js');

//-- Pto de control de sacar por pantalla los productos agregados al carrito.
const mostrarCarrito = (req, res) => {
    
    //-- Obtenemos el ID del Cliente.
    let id = req.params.id;
    //-- Sacar los productos MAD del carrito de la base de datos.
    let instruccionConsultaCarrito = 'SELECT * FROM carrito WHERE id = ?'
    let formatoInstruccionConsultaCarrito = mysql.format(instruccionConsultaCarrito, [id]);
    madservicesClientedb.query(formatoInstruccionConsultaCarrito, (error, results) => {
        if(error) throw error;
        //-- Sacarlo por pantalla.
        res.status(201).render('paginas/clientes/carrito', { id: id, carrito: results });
        return res.end();
    });
}

//-- Exportamos para unir con el resto de rutas.
module.exports = mostrarCarrito;