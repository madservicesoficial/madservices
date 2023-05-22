//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { busquedaPorTituloEnClientedb } = require('../../../modelos/clientes/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const busquedaPorTituloEnCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const titulo = req.body.titulo;
    //-- Proceso de validación.
    if(titulo) {
        //-- Llamada a función.
        busquedaPorTituloEnClientedb(titulo, res, id);
    }
    else {
        //-- Redirigir.
        res.redirect(`/sesion-cliente/${id}/empieza/productosmadservices`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = busquedaPorTituloEnCliente;
//#######################################################################################################//