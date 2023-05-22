//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { ingresoCarritodb } = require('../../../modelos/clientes/ingresar/ingresar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const ingresoCarrito = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const enumeracion = req.body.enumeracion;
    const numProducto = parseInt(enumeracion, 10);
    //-- Llamada a función.
    ingresoCarritodb(numProducto, res, id);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresoCarrito;
//#######################################################################################################//