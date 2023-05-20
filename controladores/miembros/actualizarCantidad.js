//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarCantidaddb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar la actualización de la cantidad del producto MAD.
const actualizarCantidad = async (req, res) => {

    //-- Introducción de los campos para actualizar la cantidad del producto.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const cantidad = req.body.cantidad;
    if(cantidad) {
        //-- Actualizamos la cantidad del producto en la base de datos.
        actualizarCantidaddb(id, enumeracion, cantidad, res);
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('Cantidad no actualizada');
        // Redirigir a la página de la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}

//-- Exportamos la configuración de la actualización de la cantidad del producto MAD para unificarlo con el resto de rutas.
module.exports = actualizarCantidad;