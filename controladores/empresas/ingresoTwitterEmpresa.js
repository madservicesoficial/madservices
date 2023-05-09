//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { ingresoTwitterEmpresadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para ingresar el Twitter en la interfaz de la Empresa.
const ingresoTwitterEmpresa = (req, res) => {

    //-- Introducción del Twitter en la interfaz de la Empresa para ingresar en base de datos.
    let id = req.params.id;
    const twitter = req.body.urlTwitter;
    //-- Función ingresar el campo.
    ingresoTwitterEmpresadb(id, twitter, res);
}

//-- Exportamos la configuración de ingresar el Twitter en la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = ingresoTwitterEmpresa;