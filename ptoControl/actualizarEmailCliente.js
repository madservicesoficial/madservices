//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');

//-- Creamos el Punto de Control para configurar la actualización del email del cliente.
const actualizarEmailCliente = {}

actualizarEmailCliente.perfilClientes = async (req, res) => {

}

//-- Exportamos la configuración de la actualización del email del cliente para unificarlo con el resto de rutas.
module.exports = actualizarEmailCliente;