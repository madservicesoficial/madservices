//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { actualizarMarcaVerificadadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para actualizar el campo marca de la interfaz de la Empresa.
const actualizarMarca = (req, res) => {

    //-- Introducción del campo marca de la interfaz de la Empresa para actualizar en base de datos.
    let id = req.params.id;
    const marca = req.body.marca;
    //-- Función actualizar el campo.
    actualizarMarcaVerificadadb(id, marca, res);
}

//-- Exportamos la configuración de actualizar el campo marca de la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = actualizarMarca;