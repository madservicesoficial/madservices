//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../config/database.js');

//-- Función que muestra los productos MAD.
const mostrarExpansion = (req, res) => {

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

//-- Exportamos para unir con todo.
module.exports = mostrarExpansion;