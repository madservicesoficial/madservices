//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarCategoriadb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar la actualización de las categorias del producto MAD.
const actualizarCategoria = async (req, res) => {

    //-- Introducción de los campos para actualizar las categorias del producto.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    const categoria = req.body.categoria;
    if(categoria) {
        //-- Actualizamos las categorias del producto en la base de datos.
        actualizarCategoriadb(id, enumeracion, categoria, res);
    }else {
        //-- Mostrar Alerta Emergente.
        alerta('Categoria no actualizada');
        // Redirigir a la página de la interfaz del Miembro MAD.
        return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
    }
}

//-- Exportamos la configuración de la actualización de las categorias del producto MAD para unificarlo con el resto de rutas.
module.exports = actualizarCategoria;