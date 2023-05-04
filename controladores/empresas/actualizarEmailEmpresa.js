//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { actualizarEmailVerificadodb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para actualizar el campo email de la interfaz de la Empresa.
const actualizarEmailEmpresa = (req, res) => {

    //-- Introducción del campo email de la interfaz de la Empresa para actualizar en base de datos.
    let id = req.params.id;
    const email = req.body.email;
    //-- Función actualizar el campo.
    actualizarEmailVerificadodb(id, email, res);
}

//-- Exportamos la configuración de actualizar el campo email de la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = actualizarEmailEmpresa;