//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
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
    const files = req.files;
    const extensionesPermitidas = ['.png', '.jpg', '.jpeg', '.mp4'];
    let condicionFormato = false;
    files.forEach(file => {
        let extensionValida = path.extname(file.originalname).toLowerCase();
        if (extensionesPermitidas.includes(extensionValida)) {
            condicionFormato = true;
        }else {
            condicionFormato = false;
        }
    });
    /* const rutaAlDirectorio = path.join(__dirname, '../../../imagenes');
    const files = fs.readdirSync(rutaAlDirectorio);
    let fueraFormato = false;
    //-- Filtrar los archivos aceptados según la extensión.
    for(let i=0; i<files.length; i++) {
        console.log(files[i]);
        if(files[i].split('.').pop() === 'png' || files[i].split('.').pop() === 'jpg' || files[i].split('.').pop() === 'jpeg' || files[i].split('.').pop() === 'mp4') {
            fueraFormato = true;
        }else {
            fueraFormato = false;
            i = files.length + 1;
        }
    }
    if(files.length === 0) {
        fueraFormato = true;
    }
    if(fueraFormato === false) {
        //-- Eliminación de los archivos en local.
        for(let cont=0; cont<files.length; cont++) {
            let file = files[cont];
            let eliminarArchivo = path.join(rutaAlDirectorio, file);
            fs.unlinkSync(eliminarArchivo);
        }
        //-- Mostrar alerta.
        alerta('Formato de alguna imagen incorrecto\nFormatos permitidos: PNG, JPG, JPEG, MP4');
        //-- Redirigir.
        return res.status(201).redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }else {
        //-- Proceso de validación.
        if(files.length === 0) {
            //-- Mostrar alerta.
            alerta('Ningun archivo subido');
            //-- Redirigir.
            return res.status(201).redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
        }else if(files.length > 8) {
            //-- Eliminación de los archivos en local.
            for(let j=0; j<files.length; j++) {
                let file = files[j];
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                fs.unlinkSync(eliminarArchivo);
            }
            //-- Mostrar alerta.
            alerta('No puedes meter más de 8 archivos multimedia');
            //-- Redirigir.
            return res.status(201).redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
        }else {
            //-- Eliminación de los archivos en local.
            for(let j=0; j<files.length; j++) {
                let file = files[j];
                let eliminarArchivo = path.join(rutaAlDirectorio, file);
                fs.unlinkSync(eliminarArchivo);
            }
            //-- Mostrar alerta.
            alerta('Ingresado con éxito');
            //-- Redirigir.
            return res.status(201).redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
            //-- Llamada a la función.
            /* ingresarArchivosMultimediaMADdb(id, enumeracion, res); */
  //--      }
 //--   } 
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresarArchivosMultimediaMAD;
//#######################################################################################################//