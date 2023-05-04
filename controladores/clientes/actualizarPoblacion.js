//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarPoblacionVerificadadb } = require('../../modelos/clientes/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la actualización del campo población del perfil del cliente.
const actualizarPoblacion = (req, res) => {

    //-- Introducción del campo población del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const poblacion = req.body.poblacion;
    //-- Función actualizar el campo.
    actualizarPoblacionVerificadadb(id, poblacion, res);
}

//-- Exportamos la configuración de la actualización del campo población del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarPoblacion;