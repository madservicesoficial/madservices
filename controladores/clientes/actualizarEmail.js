//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarEmailVerificadodb } = require('../../modelos/clientes/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la actualización del campo email del perfil del cliente.
const actualizarEmailCliente = (req, res) => {

    //-- Introducción del campo email del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const email = req.body.email;
    //-- Función actualizar el campo.
    actualizarEmailVerificadodb(id, email, res);
}

//-- Exportamos la configuración de la actualización del campo email del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarEmailCliente;