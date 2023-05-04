//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { actualizarTipoVerificadodb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para actualizar el campo tipo de la interfaz de la Empresa.
const actualizarTipo = (req, res) => {

    //-- Introducción del campo tipo de la interfaz de la Empresa para actualizar en base de datos.
    let id = req.params.id;
    const tipo = req.body.tipo;
    //-- Función actualizar el campo.
    actualizarTipoVerificadodb(id, tipo, res);
}

//-- Exportamos la configuración de actualizar el campo tipo de la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = actualizarTipo;