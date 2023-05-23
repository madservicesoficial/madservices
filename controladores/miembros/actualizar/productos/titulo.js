//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarTitulodb } = require('../../../../modelos/miembros/actualizar/productos/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarTitulo = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const titulo = req.body.titulo;
    //-- Proceso de validación.
    if(titulo) {
        //-- Llamada a función.
        actualizarTitulodb(id, enumeracion, titulo, res);
    }else {
        //-- Mostrar alerta.
        alerta('Título no actualizado');
        //-- Redirigir.
        return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarTitulo;
//#######################################################################################################//