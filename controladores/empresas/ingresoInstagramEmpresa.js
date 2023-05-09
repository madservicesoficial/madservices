//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { ingresoInstagramEmpresadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para ingresar el Instagram en la interfaz de la Empresa.
const ingresoInstagramEmpresa = (req, res) => {

    //-- Introducción del Instagram en la interfaz de la Empresa para ingresar en base de datos.
    let id = req.params.id;
    const instagram = req.body.urlInstagram;
    //-- Función ingresar el campo.
    ingresoInstagramEmpresadb(id, instagram, res);
}

//-- Exportamos la configuración de ingresar el Instagram en la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = ingresoInstagramEmpresa;