//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');

//-- Creamos el Punto de Control para configurar el darse de baja del cliente.
const darseBajaCliente = {}

darseBajaCliente.perfilClientes = async (req, res) => {

}

//-- Exportamos la configuración del darse de baja del cliente para unificarlo con el resto de rutas.
module.exports = darseBajaCliente;