//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarPasswordVerificadadb } = require('../../modelos/miembros/operacionesDB.js');

//-- Creamos el Punto de Control para actualizar el campo password del Miembro MAD.
const actualizarPassword = (req, res) => {

    //-- Introducimos los campos a actualizar.
    let id = req.params.id;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    //-- Función actualizar el campo password del Miembro MAD.
    actualizarPasswordVerificadadb(id, oldpassword, newpassword, repitePassword, res);
}

//-- Exportamos la configuración de actualizar el campo password del Miembro MAD para unificarlo con el resto de rutas.
module.exports = actualizarPassword;