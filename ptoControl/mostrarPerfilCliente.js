//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos la función que conecta con la base de datos para mostrar datos del cliente.
const { mostrarClientedb } = require('../operacionesdb/operacionesClientesdb.js');

//-- Creamos el Punto de Control para configurar la posibilidad de mostrar datos de los Clientes.
const mostrarPerfilCliente = {}

mostrarPerfilCliente.perfilClientes = (req, res) => {
    let id = req.params.id;
    mostrarClientedb
    (
        madservicesdb,
        id,
        res
    );
}

//-- Exportamos la configuración de la posibilidad de mostrar datos de los Clientes para unificarlo con el resto de rutas.
module.exports = mostrarPerfilCliente;