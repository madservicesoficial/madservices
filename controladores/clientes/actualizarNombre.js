//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarNombreVerificadodb } = require('../../modelos/clientes/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la actualización del campo nombre del perfil del cliente.
const actualizarNombre = (req, res) => {

    //-- Introducción del campo nombre del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const nombre = req.body.nombre;
    //-- Función actualizar el campo.
    actualizarNombreVerificadodb(id, nombre, res);
}

//-- Exportamos la configuración de la actualización del campo nombre del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarNombre;