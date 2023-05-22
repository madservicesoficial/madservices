//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarGeneroVerificadodb } = require('../../modelos/miembros/operacionesDB.js');

//-- Creamos el Punto de Control para actualizar el campo género del Miembro MAD.
const actualizarGenero = (req, res) => {

    //-- Introducimos los campos a actualizar.
    let id = req.params.id;
    const genero = req.body.genero;
    //-- Función actualizar el campo género del Miembro MAD.
    actualizarGeneroVerificadodb(id, genero, res);
}

//-- Exportamos la configuración de actualizar el campo género del Miembro MAD para unificarlo con el resto de rutas.
module.exports = actualizarGenero;