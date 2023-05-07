//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarLocalizacionVerificadadb } = require('../../modelos/clientes/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la actualización del campo país del perfil del cliente.
const actualizarLocalizacion = (req, res) => {

    //-- Introducción del campo país del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const pais = req.body.pais;
    const cp = req.body.cp;
    const region = req.body.region;
    const poblacion = req.body.poblacion;
    const direccion = req.body.direccion;
    //-- Función actualizar el campo.
    actualizarLocalizacionVerificadadb(id, pais, cp, region, poblacion, direccion, res);
}

//-- Exportamos la configuración de la actualización del campo país del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarLocalizacion;