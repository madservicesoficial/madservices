//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { ingresoDescripcionEmpresadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para ingresar la descripción en la interfaz de la Empresa.
const ingresoDescripcionEmpresa = (req, res) => {

    //-- Introducción de la descripción en la interfaz de la Empresa para ingresar en base de datos.
    let id = req.params.id;
    const descripcion = req.body.descripCo;
    //-- Función ingresar el campo.
    ingresoDescripcionEmpresadb(id, descripcion, res);
}

//-- Exportamos la configuración de ingresar la descripción en la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = ingresoDescripcionEmpresa;