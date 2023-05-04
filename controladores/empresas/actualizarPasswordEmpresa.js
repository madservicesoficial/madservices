//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { actualizarPasswordVerificadadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para actualizar el campo contraseña de la interfaz de la Empresa.
const actualizarPasswordEmpresa = (req, res) => {

    //-- Introducción del campo contraseña de la interfaz de la Empresa para actualizar en base de datos.
    let id = req.params.id;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    //-- Función actualizar el campo.
    actualizarPasswordVerificadadb(id, oldpassword, newpassword, repitePassword, res);
}

//-- Exportamos la configuración de actualizar el campo contraseña de la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = actualizarPasswordEmpresa;