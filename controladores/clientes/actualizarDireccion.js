//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarDireccionVerificadadb } = require('../../modelos/clientes/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la actualización del campo dirección del perfil del cliente.
const actualizarDireccion = (req, res) => {

    //-- Introducción del campo dirección del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const direccion = req.body.direccion;
    //-- Función actualizar el campo.
    actualizarDireccionVerificadadb(id, direccion, res);
}

//-- Exportamos la configuración de la actualización del campo dirección del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarDireccion;