//-- Importamos las funciones de operaciones de General para interactuar con la base de datos.
const {busquedaPorCategoriadb} = require('../../modelos/general/filtroBusqueda.js');

//-- Pto de control para la búsqueda por categoria.
const busquedaPorCategoria = (req, res) => {

    //-- Introducción de la categoria.
    const categoria = req.body.categoria;
    //-- Proceso de búsqueda.
    if(categoria === 'Todo') {
        res.redirect('/empieza/productosmadservices');
    }else {
        busquedaPorCategoriadb(categoria, res);
    }
}

//-- Exportamos a otras rutas.
module.exports = busquedaPorCategoria;