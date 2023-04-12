//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { consultaEmailPasswordClientedb } = require('../operacionesdb/operacionesClientesdb.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare } = require('bcrypt');

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
    //-- Comprobamos que el email introducido y la contraseña introducida existen y se encuentran en la base de datos.
    //-- E iniciamos sesión si así es.
    consultaEmailPasswordClientedb
    (
        madservicesdb,
        email,
        (results) => {
            if (results.length > 0) {
                
                const miembro = results[0];
                compare(password,miembro.password, (result) => {
                    if(result) {
                        req.session.loggedin = true;
                        req.session.id = miembro.id;
                        res.redirect('/:id');
                    }else {
                        res.status(401).render('paginas/clienteLogin', {mensaje: 'Contraseña incorrecta'});
                    }
                    res.end();
                });
    
            }else {
                res.status(401).render('paginas/clienteLogin', {mensaje: 'Correo electrónico incorrecto'});
            }
            res.end();
        }
    )
}

//-- Exportamos la configuración de inicio de sesión de los Clientes para unificarlo con el resto de rutas.
module.exports = loginClientes;