//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { busquedaPorPrecioEnMiembrodb } = require('../../../modelos/miembros/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const busquedaPorPrecioEnMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const busquedaPorPrecio = req.body.busquedaPorPrecio;
    const precio = parseInt(busquedaPorPrecio, 10);;
    let min = precio;
    let max;
    //-- Proceso de validación.
    if(busquedaPorPrecio !== 'Todos') {
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
        //-- Llamada a función.
        busquedaPorPrecioEnMiembrodb(min, max, res, id);
    }else {
        //-- Redirigir.
        res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = busquedaPorPrecioEnMiembro;
//#######################################################################################################//