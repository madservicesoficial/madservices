//-- Importamos las funciones de operaciones de Clientes para interactuar con la base de datos.
const {busquedaPorTituloEnClientedb} = require('../../modelos/clientes/filtroBusqueda.js');

//-- Pto de control para la búsqueda por título.
const busquedaPorTituloEnCliente = (req, res) => {

    //-- Obtenemos el parámetro del ID cliente.
    let id = req.params.id;
    //-- Introducción del título.
    const titulo = req.body.titulo;
    //-- Proceso de búsqueda.
    if(titulo) {
        busquedaPorTituloEnClientedb(titulo, res, id);
    }
    else {
        res.redirect(`/sesion-cliente/${id}/empieza/productosmadservices`);
    }
}

//-- Exportamos a otras rutas.
module.exports = busquedaPorTituloEnCliente;