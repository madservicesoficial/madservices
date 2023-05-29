//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { filtroTipoEmpresadb, filtroNombreEmpresadb } = require('../../../modelos/general/buscar/buscar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const filtroBusqueda = (req, res) => {

    //-- Variables y Ctes.
    const seleccion = req.body.seleccion;
    const nombre = req.body.nombre;
    //-- Proceso de validación.
    if((!seleccion && !nombre) || (seleccion && nombre)) {
        //-- Redirigir.
        return res.redirect('/empieza/themall');
    }else if(seleccion && !nombre) {
        filtroTipoEmpresadb(seleccion, res);
    }else if(!seleccion && nombre) {
        filtroNombreEmpresadb(nombre, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = filtroBusqueda;
//#######################################################################################################//