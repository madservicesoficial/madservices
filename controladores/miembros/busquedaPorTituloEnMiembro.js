//-- Importamos las funciones de operaciones de Miembros MAD para interactuar con la base de datos.
const {busquedaPorTituloEnMiembrodb} = require('../../modelos/miembros/filtroBusqueda.js');

//-- Pto de control para la búsqueda por título.
const busquedaPorTituloEnMiembro = (req, res) => {

    //-- Obtenemos el parámetro del ID miembro MAD.
    let id = req.params.id;
    //-- Introducción del título.
    const titulo = req.body.titulo;
    //-- Proceso de búsqueda.
    if(titulo) {
        busquedaPorTituloEnMiembrodb(titulo, res, id);
    }
    else {
        res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}

//-- Exportamos a otras rutas.
module.exports = busquedaPorTituloEnMiembro;