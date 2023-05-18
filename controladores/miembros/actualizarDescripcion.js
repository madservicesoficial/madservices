//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarDescripciondb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar la actualización de la descripcion del producto MAD.
const actualizarDescripcion = async (req, res) => {

    //-- Introducción de los campos para actualizar la descripcion del producto.
    let id = req.params.id;
    const enumeracion = req.body.enumeracion;
    const descripcion = req.body.descripcion;
    if(!enumeracion) {
        //-- Mostrar Alerta Emergente.
        alerta('Sin cambios en la descripción de ningún producto');
        // Redirigir a la página principal de la aplicación.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }else {
        if(descripcion) {
            //-- Actualizamos la descripcion del producto en la base de datos.
            actualizarDescripciondb(id, enumeracion, descripcion, res);
        }else {
            //-- Mostrar Alerta Emergente.
            alerta('Descripción no actualizada');
            // Redirigir a la página de la interfaz del Miembro MAD.
            return res.redirect(`/sesion-miembro/${id}/interfaz`);
        }
    }
}

//-- Exportamos la configuración de la actualización de la descripcion del producto MAD para unificarlo con el resto de rutas.
module.exports = actualizarDescripcion;