//-- Importamos las funciones de operaciones de General para interactuar con la base de datos.
const {busquedaPorPreciodb} = require('../../modelos/general/filtroBusqueda.js');

//-- Pto de control para la búsqueda por precio.
const busquedaPorPrecio = (req, res) => {

    //-- Introducción del precio.
    const precio = req.body.busquedaPorPrecio;
    //-- Proceso de búsqueda.
    console.log(precio);
    /* busquedaPorPreciodb(precio, res); */
}

//-- Exportamos a otras rutas.
module.exports = busquedaPorPrecio;