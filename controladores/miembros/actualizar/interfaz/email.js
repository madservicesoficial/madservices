//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarEmailVerificadodb } = require('../../modelos/miembros/operacionesDB.js');

//-- Creamos el Punto de Control para actualizar el campo email del Miembro MAD.
const actualizarEmail = (req, res) => {

    //-- Introducimos los campos a actualizar.
    let id = req.params.id;
    const email = req.body.email;
    //-- Función actualizar el campo email del Miembro MAD.
    actualizarEmailVerificadodb(id, email, res);
}

//-- Exportamos la configuración de actualizar el campo email del Miembro MAD para unificarlo con el resto de rutas.
module.exports = actualizarEmail;