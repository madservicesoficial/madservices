//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarCategoriadb } = require('../../../../modelos/miembros/actualizar/productos/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarCategoria = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const categoria = req.body.categoria;
    //-- Proceso de validación.
    if(categoria) {
        //-- Llamada a función.
        actualizarCategoriadb(id, enumeracion, categoria, res);
    }else {
        //-- Mostrar alerta.
        alerta('Categoria no actualizada');
        //-- Redirigir.
        return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarCategoria;
//#######################################################################################################//