//-- Importamos las funciones de operaciones de General para interactuar con la base de datos.
const {busquedaPorTitulodb} = require('../../modelos/general/filtroBusqueda.js');

//-- Pto de control para la búsqueda por título.
const busquedaPorTitulo = (req, res) => {

    //-- Introducción del título.
    const titulo = req.body.titulo;
    //-- Proceso de búsqueda.
    if(titulo) {
        busquedaPorTitulodb(titulo, res);
    }
    else {
        res.redirect('/empieza/productosmadservices');
    }
}

//-- Exportamos a otras rutas.
module.exports = busquedaPorTitulo;