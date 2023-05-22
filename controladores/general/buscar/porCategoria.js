//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { busquedaPorCategoriadb } = require('../../../modelos/general/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const busquedaPorCategoria = (req, res) => {

    //-- Variables y Ctes.
    const categoria = req.body.categoria;
    //-- Proceso de validación.
    if(categoria === 'Todo') {
        //-- Redirigir.
        res.redirect('/empieza/productosmadservices');
    }else {
        //-- Llamada a función.
        busquedaPorCategoriadb(categoria, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = busquedaPorCategoria;
//#######################################################################################################//