//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarMiembroVerificadodb } = require('../../modelos/miembros/operacionesDB.js');

//-- Creamos el Punto de Control para actualizar el campo miembro del Miembro MAD.
const actualizarMiembro = (req, res) => {

    //-- Introducimos los campos a actualizar.
    let id = req.params.id;
    const miembro = req.body.miembro;
    //-- Función actualizar el campo miembro del Miembro MAD.
    actualizarMiembroVerificadodb(id, miembro, res);
}

//-- Exportamos la configuración de actualizar el campo miembro del Miembro MAD para unificarlo con el resto de rutas.
module.exports = actualizarMiembro;