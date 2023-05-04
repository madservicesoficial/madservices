//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarPasswordVerificadadb } = require('../../modelos/clientes/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la actualización del campo contraseña del perfil del cliente.
const actualizarPasswordCliente = (req, res) => {

    //-- Introducción del campo contraseña del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    //-- Función actualizar el campo.
    actualizarPasswordVerificadadb(id, oldpassword, newpassword, repitePassword, res);
}

//-- Exportamos la configuración de la actualización del campo contraseña del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarPasswordCliente;