//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarPreciodb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar la actualización del precio del producto MAD.
const actualizarPrecio = async (req, res) => {

    //-- Introducción de los campos para actualizar el precio del producto.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const precio = req.body.precio;
    if(precio) {
        //-- Actualizamos el precio del producto en la base de datos.
        actualizarPreciodb(id, enumeracion, precio, res);
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('Precio no actualizado');
        // Redirigir a la página de la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}

//-- Exportamos la configuración de la actualización del precio del producto MAD para unificarlo con el resto de rutas.
module.exports = actualizarPrecio;