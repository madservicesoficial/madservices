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
const { ingresarProductosMADdb } = require('../../../modelos/miembros/ingresar/ingresar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const ingresoProductosMAD = async (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const cantidad = req.body.cantidad;
    const categoria = req.body.categoria;
    const titulo = req.body.titulo;
    const precio = req.body.precio;
    const peso = req.body.peso;
    const descripcion = req.body.descripcion;
    const LONG_TITULO = 98;
    const LONG_DESCRIPCION = 998;
    const CANTIDAD_MIN = 1;
    const COSTE_NULO = 1.0;
    const rutaAlDirectorio = path.join(__dirname, '../../imagenes');
    const readdir = util.promisify(fs.readdir);
    const unlink = util.promisify(fs.unlink);
    const files = await readdir(rutaAlDirectorio);
    const file = files[0];
    //-- Proceso de validación.
    if(!cantidad || !categoria || !titulo || !precio || !peso || !descripcion) {
        if(typeof file === 'string') {
            let eliminarArchivo = path.join(rutaAlDirectorio, file);
            await unlink(eliminarArchivo);
        }
        //-- Mostrar alerta.
        alerta('Campos vacíos');
        // Redirigir.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }else {
        if(titulo.length > LONG_TITULO) {
            //-- Mostrar alerta.
            alerta(`El título no puede tener más de ${LONG_TITULO} caracteres`);
            // Redirigir.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }else if(descripcion.length > LONG_DESCRIPCION) {
            //-- Mostrar alerta.
            alerta(`La descripción no puede tener más de ${LONG_DESCRIPCION} caracteres`);
            // Redirigir.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }else if(cantidad < CANTIDAD_MIN) {
            //-- Mostrar alerta.
            alerta(`No tiene sentido la cantidad ${cantidad}`);
            // Redirigir.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }else if(precio < COSTE_NULO) {
            //-- Mostrar alerta.
            alerta(`No puedes vender por debajo de ${COSTE_NULO}€`);
            // Redirigir.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }else {
            //-- Llamamos a la función.
            ingresarProductosMADdb
            (
                id,
                {cantidad: cantidad, categoria: categoria, titulo: titulo, precio: precio, peso: peso, descripcion: descripcion},
                res
            );
        }
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresoProductosMAD;
//#######################################################################################################//