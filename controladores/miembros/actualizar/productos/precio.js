//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarPreciodb } = require('../../../../modelos/miembros/actualizar/productos/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarPrecio = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const precio = req.body.precio;
    //-- Proceso de validación.
    if(precio) {
        //-- Llamada a función.
        actualizarPreciodb(id, enumeracion, precio, res);
    }else {
        //-- Mostrar alerta.
        alerta('Precio no actualizado');
        //-- Redirigir.
        return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarPrecio;
//#######################################################################################################//