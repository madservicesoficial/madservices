//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { borrarDescripcionEmpresadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para borrar la descripción en la interfaz de la Empresa.
const borrarDescripcionEmpresa = (req, res) => {

    //-- Introducción de la descripción en la interfaz de la Empresa para borrar en base de datos.
    let id = req.params.id;
    //-- Función borrar el campo.
    borrarDescripcionEmpresadb(id, res);
}

//-- Exportamos la configuración de borrar la descripción en la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = borrarDescripcionEmpresa;