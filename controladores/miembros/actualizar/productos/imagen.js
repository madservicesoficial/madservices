//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarImagendb } = require('../../../../modelos/miembros/actualizar/productos/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarImagen = async (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const rutaAlDirectorio = path.join(__dirname, '../../../../imagenes');
    const readdir = util.promisify(fs.readdir);
    const files = await readdir(rutaAlDirectorio);
    const file = files[0];
    //-- Proceso de validación.
    if(typeof file === 'string') {
        //-- Llamada a función.
        actualizarImagendb(id, enumeracion, res);
    }else {
        //-- Mostrar alerta.
        alerta('Imagen no actualizada');
        //-- Redirigir.
        return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarImagen;
//#######################################################################################################//