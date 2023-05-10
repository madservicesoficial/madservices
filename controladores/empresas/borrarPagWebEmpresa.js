//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { borrarPagWebEmpresadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para borrar la Página Web en la interfaz de la Empresa.
const borrarPagWebEmpresa = (req, res) => {

    //-- Introducción de la Página Web en la interfaz de la Empresa para borrar en base de datos.
    let id = req.params.id;
    //-- Función borrar el campo.
    borrarPagWebEmpresadb(id, res);
}

//-- Exportamos la configuración de borrar la Página Web en la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = borrarPagWebEmpresa;