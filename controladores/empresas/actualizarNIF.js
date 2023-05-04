//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { actualizarNIFVerificadodb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para actualizar el campo nif de la interfaz de la Empresa.
const actualizarNIF = (req, res) => {

    //-- Introducción del campo nif de la interfaz de la Empresa para actualizar en base de datos.
    let id = req.params.id;
    const nif = req.body.nif;
    //-- Función actualizar el campo.
    actualizarNIFVerificadodb(id, nif, res);
}

//-- Exportamos la configuración de actualizar el campo nif de la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = actualizarNIF;