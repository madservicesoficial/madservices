//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { ingresarArchivosMultimediaMADdb } = require('../../../modelos/miembros/ingresar/ingresar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const ingresarArchivosMultimediaMAD = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const rutaAlDirectorio = path.join(__dirname, '../../imagenes');
    const readdir = util.promisify(fs.readdir);
    const unlink = util.promisify(fs.unlink);
    const files = await readdir(rutaAlDirectorio);
    const file = files[0];
    //-- Proceso de validación.
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresarArchivosMultimediaMAD;
//#######################################################################################################//