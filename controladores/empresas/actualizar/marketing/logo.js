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
const { actualizarLogoEmpresadb } = require('../../../../modelos/empresas/actualizar/marketing/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarLogoEmpresa = async (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const rutaAlDirectorio = path.join(__dirname, '../../../../archivos');
    const readdir = util.promisify(fs.readdir);
    const unlink = util.promisify(fs.unlink);
    const files = await readdir(rutaAlDirectorio);
    const file = files[0];
    //-- Proceso de validación.
    if(typeof file !== 'string') {
        //-- Mostrar alerta.
        alerta('Sin cambios en el logo de la empresa');
        //-- Redirigir.
        return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
    }else {
        let fullFile = path.parse(file);
        let extension = fullFile.ext;
        if(extension === '.png' || extension === '.jpg' || extension === '.jpeg') {
            //-- Llamada a función.
            actualizarLogoEmpresadb(id, res);
        }else {
            //-- Eliminar localmente.
            let eliminarArchivo = path.join(rutaAlDirectorio, file);
            await unlink(eliminarArchivo);
            //-- Mostrar alerta.
            alerta('Formato de imagen incorrecto\nFormatos permitidos: PNG, JPG, JPEG');
            //-- Redirigir.
            return res.status(201).redirect(`/sesion-empresa/${id}/interfaz`);
        }
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarLogoEmpresa;
//#######################################################################################################//