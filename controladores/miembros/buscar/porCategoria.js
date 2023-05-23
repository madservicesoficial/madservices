//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { busquedaPorCategoriaEnMiembrodb } = require('../../../modelos/miembros/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const busquedaPorCategoriaEnMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const categoria = req.body.categoria;
    //-- Proceso de validación.
    if(categoria === 'Todo') {
        //-- Redirigir.
        return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }else {
        //-- Llamada a función.
        busquedaPorCategoriaEnMiembrodb(categoria, res, id);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = busquedaPorCategoriaEnMiembro;
//#######################################################################################################//