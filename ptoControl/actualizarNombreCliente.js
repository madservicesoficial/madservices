//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');

//-- Creamos el Punto de Control para configurar la actualización del nombre del cliente.
const actualizarNombreCliente = {}

actualizarNombreCliente.perfilClientes = async (req, res) => {

    //-- Introducción del campo Nombre.
    const nombre = req.body.nombre;
    //-- Si le das a actualizar, no puede quedar vacío

}

//-- Exportamos la configuración de la actualización del nombre del cliente para unificarlo con el resto de rutas.
module.exports = actualizarNombreCliente;