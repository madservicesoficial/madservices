//-- Importamos las funciones de operaciones de Clientes para interactuar con la base de datos.
const {busquedaPorPrecioEnClientedb} = require('../../modelos/clientes/filtroBusqueda.js');

//-- Pto de control para la búsqueda por título.
const busquedaPorPrecioEnCliente = (req, res) => {

    //-- Obtenemos el parámetro del ID cliente.
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
            max = precio;
        }
        //-- Proceso de búsqueda.
        busquedaPorPrecioEnClientedb(min, max, res, id);
    }else {
        res.redirect(`/sesion-cliente/${id}/empieza/productosmadservices`);
    }
}

//-- Exportamos a otras rutas.
module.exports = busquedaPorPrecioEnCliente;