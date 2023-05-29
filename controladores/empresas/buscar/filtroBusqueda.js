//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { filtroTipoEmpresadb, filtroNombreEmpresadb } = require('../../../modelos/empresas/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const filtroBusquedaEmpresa = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const seleccion = req.body.seleccion;
    const nombre = req.body.nombre;
    //-- Proceso de validación.
    if((!seleccion && !nombre) || (seleccion && nombre)) {
        //-- Redirigir.
        return res.redirect(`/sesion-empresa/${id}/empieza`);
    }else if(seleccion && !nombre) {
        filtroTipoEmpresadb(id, seleccion, res);
    }else if(!seleccion && nombre) {
        filtroNombreEmpresadb(id, nombre, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = filtroBusquedaEmpresa;
//#######################################################################################################//