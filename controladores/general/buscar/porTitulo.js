//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { busquedaPorTitulodb } = require('../../../modelos/general/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const busquedaPorTitulo = (req, res) => {

    //-- Variables y Ctes.
    const titulo = req.body.titulo;
    //-- Proceso de validación.
    if(titulo) {
        //-- Llamada a función.
        busquedaPorTitulodb(titulo, res);
    }
    else {
        //-- Redirigir.
        res.redirect('/empieza/productosmadservices');
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = busquedaPorTitulo;
//#######################################################################################################//