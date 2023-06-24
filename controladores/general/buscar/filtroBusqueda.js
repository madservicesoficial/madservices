//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { filtroTipoEmpresadb, filtroNombreEmpresadb, filtroTotalEmpresadb } = require('../../../modelos/general/buscar/buscar.js');
const { mostrarProductosTheMalldb } = require('../../../modelos/general/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const filtroBusqueda = (req, res) => {

    //-- Variables y Ctes.
    const seleccion = req.body.seleccion;
    const nombre = req.body.nombre;
    //-- Proceso de validación.
    if(!seleccion && !nombre) {
        mostrarProductosTheMalldb(res);
    }else if(seleccion && !nombre) {
        filtroTipoEmpresadb(seleccion, res);
    }else if(!seleccion && nombre) {
        filtroNombreEmpresadb(nombre, res);
    }else if(seleccion && nombre) {
        filtroTotalEmpresadb(seleccion, nombre, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = filtroBusqueda;
//#######################################################################################################//