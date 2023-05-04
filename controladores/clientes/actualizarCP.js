//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarCPVerificadodb } = require('../../modelos/clientes/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la actualización del campo CP del perfil del cliente.
const actualizarCP = (req, res) => {

    //-- Introducción del campo CP del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const cp = req.body.cp;
    //-- Función actualizar el campo.
    actualizarCPVerificadodb(id, cp, res);
}

//-- Exportamos la configuración de la actualización del campo CP del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarCP;