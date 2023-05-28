//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { filtroBusquedaClientedb } = require('../../../modelos/clientes/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const filtroBusquedaCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const categoria = req.body.categoria;
    //-- Proceso de validación.
    if(categoria === 'Todo') {
        //-- Redirigir.
        res.redirect(`/sesion-cliente/${id}/empieza/themall`);
    }else {
        //-- Llamada a función.
        filtroBusquedaClientedb(categoria, res, id);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = filtroBusquedaCliente;
//#######################################################################################################//