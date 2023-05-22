//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { borrarInstagramEmpresadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para borrar el Instagram en la interfaz de la Empresa.
const borrarInstagramEmpresa = (req, res) => {

    //-- Introducción del Instagram en la interfaz de la Empresa para borrar en base de datos.
    let id = req.params.id;
    //-- Función borrar el campo.
    borrarInstagramEmpresadb(id, res);
}

//-- Exportamos la configuración de borrar el Instagram en la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = borrarInstagramEmpresa;