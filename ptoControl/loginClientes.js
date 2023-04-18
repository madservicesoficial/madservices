//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { iniciarSesionClienteVerificadodb } = require('../operacionesdb/operacionesClientesdb.js');
//-- Creamos el Punto de Control para configurar el inicio de sesión de los Clientes.
const loginClientes = {}

loginClientes.clienteLogin = (req, res) => {

    //-- Introducimos los campos para Iniciar Sesión como Cliente.
    const email = req.body.email;
    const password = req.body.password;
    //-- Comprobamos que ningún campo está vacío.
    if(!email || !password) {
        res.status(401).render('paginas/clienteLogin', {mensaje: 'Campos vacíos'});
        return res.end();
    }
    //-- Llamamos a la función para Iniciar Sesión de forma verificada.
    iniciarSesionClienteVerificadodb
    (
        madservicesdb,
        email,
        password,
        req,
        res
    );
}

//-- Exportamos la configuración de inicio de sesión de los Clientes para unificarlo con el resto de rutas.
module.exports = loginClientes;