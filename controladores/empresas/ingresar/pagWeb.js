//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { ingresoPagWebEmpresadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para ingresar la Página Web en la interfaz de la Empresa.
const ingresoPagWebEmpresa = (req, res) => {

    //-- Introducción de la Página Web en la interfaz de la Empresa para ingresar en base de datos.
    let id = req.params.id;
    const pagweb = req.body.urlPagWeb;
    //-- Función ingresar el campo.
    ingresoPagWebEmpresadb(id, pagweb, res);
}

//-- Exportamos la configuración de ingresar la Página Web en la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = ingresoPagWebEmpresa;