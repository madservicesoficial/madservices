//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { consultaNoEmailClientedb, consultaPasswordClientedb } = require('../operacionesdb/operacionesClientesdb.js');

//-- Creamos el Punto de Control para configurar el inicio de sesión de los Clientes.
const loginClientes = {}

loginClientes.clienteLogin = async (req, res) => {

    //-- Obtenemos los campos de entrada del Inicio de Sesión de los Clientes.
    const email = req.body.email;
    const password = req.body.password;
    //-- Comprobamos que el email introducido existe y se encuentra en la base de datos.
    consultaNoEmailClientedb
    (
        madservicesdb,
        {email: email},
        res
    )
    //-- Comprobamos que la contraseña introducida existe y se encuentra en la base de datos.
    consultaPasswordClientedb
    (
        madservicesdb,
        {email: email},
        res
    )
}

//-- Exportamos la configuración de inicio de sesión de los Clientes para unificarlo con el resto de rutas.
module.exports = loginClientes;