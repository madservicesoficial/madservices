//-- Importamos las funciones de operaciones de Clientes para interactuar con la base de datos.
const {busquedaPorCategoriaEnClientedb} = require('../../modelos/clientes/filtroBusqueda.js');

//-- Pto de control para la búsqueda por título.
const busquedaPorCategoriaEnCliente = (req, res) => {

    //-- Obtenemos el parámetro del ID cliente.
    let id = req.params.id;
    //-- Introducción de la categoria.
    const categoria = req.body.categoria;
    //-- Proceso de búsqueda.
    if(categoria === 'Todo') {
        res.redirect(`/sesion-cliente/${id}/empieza/productosmadservices`);
    }else {
        busquedaPorCategoriaEnClientedb(categoria, res, id);
    }
}

//-- Exportamos a otras rutas.
module.exports = busquedaPorCategoriaEnCliente;