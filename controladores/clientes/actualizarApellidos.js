//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarApellidosVerificadosdb } = require('../../modelos/clientes/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la actualización del campo apellidos del perfil del cliente.
const actualizarApellidos = (req, res) => {

    //-- Introducción del campo apellidos del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const apellidos = req.body.apellidos;
    //-- Función actualizar el campo.
    actualizarApellidosVerificadosdb(id, apellidos, res);
}

//-- Exportamos la configuración de la actualización del campo apellidos del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarApellidos;