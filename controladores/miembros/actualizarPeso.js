//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarPesodb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar la actualización del peso del producto MAD.
const actualizarPeso = async (req, res) => {

    //-- Introducción de los campos para actualizar el peso del producto.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const peso = req.body.peso;
    if(peso) {
        //-- Actualizamos el peso del producto en la base de datos.
        actualizarPesodb(id, enumeracion, peso, res);
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('Peso no actualizado');
        // Redirigir a la página de la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}

//-- Exportamos la configuración de la actualización del peso del producto MAD para unificarlo con el resto de rutas.
module.exports = actualizarPeso;