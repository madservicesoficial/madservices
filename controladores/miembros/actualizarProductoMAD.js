//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarProductoMADdb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar la actualización de productos MAD.
const actualizarProductoMAD = async (req, res) => {

    //-- Introducción de los campos para actualizar 1 producto.
    let id = req.params.id;
    const enumeracion = req.body.enumeracion;
    const cantidad = req.body.cantidad;
    const categoria = req.body.categoria;
    const titulo = req.body.titulo;
    const precio = req.body.precio;
    const peso = req.body.peso;
    const descripcion = req.body.descripcion;
    //-- Comprobamos que no haya campos vacíos.
    if(!cantidad || !categoria || !titulo || !precio || !peso || !descripcion || !enumeracion) {
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
        //-- Actualizamos los productos en la base de datos.
        actualizarProductoMADdb
        (
            id,
            {enumeracion: enumeracion, cantidad: cantidad, categoria: categoria, titulo: titulo, precio: precio, peso: peso,
            descripcion: descripcion},
            res
        );
    }
}

//-- Exportamos la configuración del ingreso de productos MAD para unificarlo con el resto de rutas.
module.exports = actualizarProductoMAD;