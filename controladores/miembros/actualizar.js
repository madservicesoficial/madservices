//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarMiembroVerificadodb, mostrarMiembroVerificadodb } = require('../../modelos/miembros/operacionesDB.js');

//-- Creamos el Punto de Control para actualizar la interfaz del Miembro MAD.
const actualizarMiembro = {}

actualizarMiembro.interfaz = (req, res) => {

    //-- Introducción de los campos de la interfaz del Miembro MAD para actualizar en base de datos.
    let id = req.params.id;
    const miembro = req.body.miembro;
    const departamento = req.body.departamento;
    const genero = req.body.genero;
    const email = req.body.email;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    //-- Actualizamos todos los campos menos la contraseña.
    actualizarMiembroVerificadodb
    (
        {id: id, miembro: miembro, departamento: departamento, genero: genero, email: email}
    );
    //-- Actualizamos la contraseña y mostramos en función de lo que se haya introducido en ella.
    mostrarMiembroVerificadodb
    (
        id,
        oldpassword,
        newpassword,
        repitePassword,
        res
    );
}

//-- Exportamos la configuración de actualizar la interfaz del Miembro MAD para unificarlo con el resto de rutas.
module.exports = actualizarMiembro;