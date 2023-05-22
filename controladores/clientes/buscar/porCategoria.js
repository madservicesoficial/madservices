//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { busquedaPorCategoriaEnClientedb } = require('../../../modelos/clientes/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const busquedaPorCategoriaEnCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const categoria = req.body.categoria;
    //-- Proceso de validación.
    if(categoria === 'Todo') {
        //-- Redirigir.
        res.redirect(`/sesion-cliente/${id}/empieza/productosmadservices`);
    }else {
        //-- Llamada a función.
        busquedaPorCategoriaEnClientedb(categoria, res, id);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = busquedaPorCategoriaEnCliente;
//#######################################################################################################//