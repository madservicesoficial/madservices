//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarGeneroVerificadodb } = require('../../modelos/clientes/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la actualización del campo género del perfil del cliente.
const actualizarGeneroCliente = (req, res) => {

    //-- Introducción del campo género del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const genero = req.body.genero;
    //-- Función actualizar el campo.
    actualizarGeneroVerificadodb(id, genero, res);
}

//-- Exportamos la configuración de la actualización del campo género del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarGeneroCliente;