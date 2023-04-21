//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarMiembroMADVerificadodb, mostrarMiembroMADVerificadodb } = require('../operacionesdb/operacionesMiembroMADdb.js');

//-- Creamos el Punto de Control para configurar la organización de la interfaz del Miembro MAD.
const actualizarInterfazMiembroMAD = {}

actualizarInterfazMiembroMAD.interfazMiembroMAD = (req, res) => {

    //-- Introducción de los campos de la interfaz del Miembro MAD para organizar en base de datos.
    let id = req.params.id;
    const nombre = req.body.nombreMiembroMAD;
    const apellidos = req.body.apellidosMiembroMAD;
    const genero = req.body.generoMiembroMAD;
    const email = req.body.emailMiembroMAD;
    const oldpassword = req.body.oldpasswordMiembroMAD;
    const newpassword = req.body.newpasswordMiembroMAD;
    const repitePassword = req.body.repitePasswordMiembroMAD;
    //-- Actualizamos todos los campos menos la contraseña.
    actualizarMiembroMADVerificadodb
    (
        {id: id, nombre: nombre, apellidos: apellidos, genero: genero, email: email}
    );
    //-- Actualizamos la contraseña y mostramos en función de lo que se haya introducido en ella.
    mostrarMiembroMADVerificadodb
    (
        id,
        oldpassword,
        newpassword,
        repitePassword,
        res
    );
}

//-- Exportamos la configuración de la organización de la interfaz del Miembro MAD para unificarlo con el resto de rutas.
module.exports = actualizarInterfazMiembroMAD;