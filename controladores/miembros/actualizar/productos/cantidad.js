//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarCantidaddb } = require('../../../../modelos/miembros/actualizar/productos/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarCantidad = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const cantidad = req.body.cantidad;
    //-- Proceso de validación.
    if(cantidad) {
        //-- Llamada a función.
        actualizarCantidaddb(id, enumeracion, cantidad, res);
    }else {
        //-- Mostrar alerta.
        alerta('Cantidad no actualizada');
        //-- Redirigir.
        return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarCantidad;
//#######################################################################################################//