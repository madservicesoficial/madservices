//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { busquedaPorPreciodb } = require('../../../modelos/general/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const busquedaPorPrecio = (req, res) => {

    //-- Variables y Ctes.
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
        busquedaPorPreciodb(min, max, res);
    }else {
        //-- Redirigir.
        res.redirect('/empieza/productosmadservices');
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = busquedaPorPrecio;
//#######################################################################################################//