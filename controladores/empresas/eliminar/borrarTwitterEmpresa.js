//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { borrarTwitterEmpresadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para borrar el Twitter en la interfaz de la Empresa.
const borrarTwitterEmpresa = (req, res) => {

    //-- Introducción del Twitter en la interfaz de la Empresa para borrar en base de datos.
    let id = req.params.id;
    //-- Función borrar el campo.
    borrarTwitterEmpresadb(id, res);
}

//-- Exportamos la configuración de borrar el Twitter en la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = borrarTwitterEmpresa;