//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarTitulodb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar la actualización del título del producto MAD.
const actualizarTitulo = async (req, res) => {

    //-- Introducción de los campos para actualizar el título del producto.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const titulo = req.body.titulo;
    if(titulo) {
        //-- Actualizamos el título del producto en la base de datos.
        actualizarTitulodb(id, enumeracion, titulo, res);
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('Título no actualizado');
        // Redirigir a la página de la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}

//-- Exportamos la configuración de la actualización del título del producto MAD para unificarlo con el resto de rutas.
module.exports = actualizarTitulo;