//-- Importamos las funciones de operaciones de Miembros MAD para interactuar con la base de datos.
const {busquedaPorCategoriaEnMiembrodb} = require('../../modelos/miembros/filtroBusqueda.js');

//-- Pto de control para la búsqueda por categoria.
const busquedaPorCategoriaEnMiembro = (req, res) => {

    //-- Obtenemos el parámetro del ID miembro MAD.
    let id = req.params.id;
    //-- Introducción de la categoria.
    const categoria = req.body.categoria;
    //-- Proceso de búsqueda.
    if(categoria === 'Todo') {
        res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }else {
        busquedaPorCategoriaEnMiembrodb(categoria, res, id);
    }
}

//-- Exportamos a otras rutas.
module.exports = busquedaPorCategoriaEnMiembro;