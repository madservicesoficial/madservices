//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { ingresarProductosMADdb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar el ingreso de productos MAD.
const ingresoProductosMAD = async (req, res) => {

    //-- Introducción de los campos para ingresar 1 producto.
    let id = req.params.id;
    const cantidad = req.body.cantidad;
    const categoria = req.body.categoria;
    const titulo = req.body.titulo;
    const precio = req.body.precio;
    const peso = req.body.peso;
    const descripcion = req.body.descripcion;
    //-- Declaración de ctes.
    const LONG_TITULO = 98;
    const LONG_DESCRIPCION = 998;
    const CANTIDAD_MIN = 1;
    const COSTE_NULO = 1.0;
    //-- Comprobamos que no haya campos vacíos.
    if(!cantidad || !categoria || !titulo || !precio || !peso || !descripcion) {
        //-- Ruta al directorio de las imágenes almacenadas localmente.
        const rutaAlDirectorio = path.join(__dirname, '../../imagenes');
        //-- Fichero asíncrono leer directorio.
        const readdir = util.promisify(fs.readdir);
        //-- Fichero asíncrono borrar fichero.
        const unlink = util.promisify(fs.unlink);
        //-- Ruta donde está el archivo metido localmente.
        const files = await readdir(rutaAlDirectorio);
        const file = files[0];
        if(typeof file === 'string') {
            //-- Eliminación de las imágenes locales.
            let eliminarArchivo = path.join(rutaAlDirectorio, file);
            await unlink(eliminarArchivo);
        }
        //-- Mostrar Alerta Emergente.
        alerta('Campos vacíos');
        // Redirigir a la página principal de la aplicación.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }else {
        if(titulo.length > LONG_TITULO) {
            //-- Mostrar Alerta Emergente.
            alerta(`El título no puede tener más de ${LONG_TITULO} caracteres`);
            // Redirigir a la página principal de la aplicación.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }else if(descripcion.length > LONG_DESCRIPCION) {
            //-- Mostrar Alerta Emergente.
            alerta(`La descripción no puede tener más de ${LONG_DESCRIPCION} caracteres`);
            // Redirigir a la página principal de la aplicación.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }else if(cantidad < CANTIDAD_MIN) {
            //-- Mostrar Alerta Emergente.
            alerta(`No tiene sentido la cantidad ${cantidad}`);
            // Redirigir a la página principal de la aplicación.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }else if(precio < COSTE_NULO) {
            //-- Mostrar Alerta Emergente.
            alerta(`No puedes vender por debajo de ${COSTE_NULO}€`);
            // Redirigir a la página principal de la aplicación.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }else {
            //-- Ingresamos los productos en la base de datos.
            ingresarProductosMADdb
            (
                id,
                {cantidad: cantidad, categoria: categoria, titulo: titulo, precio: precio, peso: peso, descripcion: descripcion},
                res
            );
        }
    }
}

//-- Exportamos la configuración del ingreso de productos MAD para unificarlo con el resto de rutas.
module.exports = ingresoProductosMAD;