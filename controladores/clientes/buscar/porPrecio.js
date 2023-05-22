//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { busquedaPorPrecioEnClientedb } = require('../../../modelos/clientes/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const busquedaPorPrecioEnCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const busquedaPorPrecio = req.body.busquedaPorPrecio;
    //-- Proceso de validación.
    if(busquedaPorPrecio !== 'Todos') {
        const precio = parseInt(busquedaPorPrecio, 10);
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
        //-- Llamada a función.
        busquedaPorPrecioEnClientedb(min, max, res, id);
    }else {
        //-- Redirigir.
        res.redirect(`/sesion-cliente/${id}/empieza/productosmadservices`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = busquedaPorPrecioEnCliente;
//#######################################################################################################//