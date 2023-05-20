//-- Importamos las funciones de operaciones de Miembros MAD para interactuar con la base de datos.
const {busquedaPorPrecioEnMiembrodb} = require('../../modelos/miembros/filtroBusqueda.js');

//-- Pto de control para la búsqueda por precio.
const busquedaPorPrecioEnMiembro = (req, res) => {

    //-- Obtenemos el parámetro del ID miembro MAD.
    let id = req.params.id;
    //-- Introducción del precio.
    const busquedaPorPrecio = req.body.busquedaPorPrecio;
    if(busquedaPorPrecio !== 'Todos') {
        const precio = parseInt(busquedaPorPrecio, 10);;
        //-- Declaración de variable mínima y máxima.
        let min = precio;
        let max;
        if(precio >= 0 && precio <= 90) {
            max = precio + 10;
        }else if(precio >= 100 && precio <= 175) {
            max = precio + 25;
        }else if(precio >= 200 && precio <= 450) {
            max = precio + 50;
        }else if(precio >= 500 && precio <= 900) {
            max = precio + 100;
        }else {
            max = 900000000000000;
        }
        //-- Proceso de búsqueda.
        busquedaPorPrecioEnMiembrodb(min, max, res, id);
    }else {
        res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}

//-- Exportamos a otras rutas.
module.exports = busquedaPorPrecioEnMiembro;