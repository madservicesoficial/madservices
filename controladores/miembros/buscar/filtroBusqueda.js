//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { filtroTipoEmpresadb, filtroNombreEmpresadb } = require('../../../modelos/clientes/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const filtroBusquedaMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const seleccion = req.body.seleccion;
    const nombre = req.body.nombre;
    //-- Proceso de validación.
    if((!seleccion && !nombre) || (seleccion && nombre)) {
        //-- Redirigir.
        return res.redirect(`/sesion-miembro/${id}/empieza/themall`);
    }else if(seleccion && !nombre) {
        filtroTipoEmpresadb(id, seleccion, res);
    }else if(!seleccion && nombre) {
        filtroNombreEmpresadb(id, nombre, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = filtroBusquedaMiembro;
//#######################################################################################################//