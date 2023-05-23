//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { busquedaPorTituloEnMiembrodb } = require('../../../modelos/miembros/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const busquedaPorTituloEnMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const titulo = req.body.titulo;
    //-- Proceso de validación.
    if(titulo) {
        //-- Llamada a función.
        busquedaPorTituloEnMiembrodb(titulo, res, id);
    }
    else {
        //-- Redirigir.
        res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = busquedaPorTituloEnMiembro;
//#######################################################################################################//