//-- Importamos la función que valida todos los campos de la actualización de los clientes.
const validacionEntradasMiembro = require('../../validaciones/miembros/validacionActualizacion.js');

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
    //-- Función que valida los campos de actualización del Miembro MAD.
    validacionEntradasMiembro
    (
        id,
        {miembro: miembro, departamento: departamento, genero: genero, email: email},
        oldpassword,
        newpassword,
        repitePassword,
        res
    );
}

//-- Exportamos la configuración de actualizar la interfaz del Miembro MAD para unificarlo con el resto de rutas.
module.exports = actualizarMiembro;