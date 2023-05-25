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
const ingresarArchivosMultimediaMAD = async (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const rutaAlDirectorio = path.join(__dirname, '../../../archivos');
    const readdir = util.promisify(fs.readdir);
    const unlink = util.promisify(fs.unlink);
    const files = await readdir(rutaAlDirectorio);
    const file = files[0];
    //-- Proceso de validación.
    if(typeof file !== 'string') {
        //-- Mostrar alerta.
        alerta('Ningun archivo subido');
        //-- Redirigir.
        return res.status(201).redirect(`/sesion-miembro/${id}/empieza/productosmadservices/expandir${enumeracion}`);
    }else {
        let fullFile = path.parse(file);
        let extension = fullFile.ext;
        if(extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
            //-- Llamada a la función.
            ingresarArchivosMultimediaMADdb(id, enumeracion, res);
        }else {
            //-- Eliminar localmente.
            let eliminarArchivo = path.join(rutaAlDirectorio, file);
            await unlink(eliminarArchivo);
            //-- Mostrar alerta.
            alerta('Formato de imagen incorrecto\nFormatos permitidos: PNG, JPG, JPEG');
            //-- Redirigir.
            return res.status(201).redirect(`/sesion-miembro/${id}/empieza/productosmadservices/expandir${enumeracion}`);
        }
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresarArchivosMultimediaMAD;
//#######################################################################################################//