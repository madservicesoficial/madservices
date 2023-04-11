//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { consultaNoEmailClientedb, consultaPasswordClientedb } = require('../operacionesdb/operacionesClientesdb.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { compare } = require('bcrypt');

//-- Creamos el Punto de Control para configurar el inicio de sesión de los Clientes.
const loginClientes = {}

loginClientes.clienteLogin = async (req, res) => {

    //-- Introducimos los campos para Iniciar Sesión como Cliente.
    const { email, password } = req.body;
    //-- Comprobamos que el email introducido existe y se encuentra en la base de datos.
    await consultaNoEmailClientedb
    (
        madservicesdb,
        {email: email},
        (existencia) => {
            if(existencia) return res.status(401).render('paginas/clienteLogin', {mensaje: 'No se encuentra el correo electrónico'});
        }
    )
    //-- Comprobamos que la contraseña introducida existe y se encuentra en la base de datos.
    await consultaPasswordClientedb
    (
        madservicesdb,
        {email: email},
        (existencia) => {
            if(existencia) {
                return res.status(401).render('paginas/clienteLogin', {mensaje: 'Contraseña incorrecta'});
            }else {
                console.log(result[0].password);
                const passwordLeida = result[0].password;
                compare(password, passwordLeida, (err, match) => {
                    if (err) throw err;
                    //-- Si la contraseña existe, crear la sesión y redireccionar a inicio autenticado.
                    if (match) {
                        req.session.id = result[0].id;
                        res.redirect(`/${id}`);
                    }else {
                        return res.status(401).render('paginas/clienteLogin', {mensaje: 'Contraseña incorrecta'});
                    }
                });
            }
        }
    )
    return res.status(201).render('paginas/inicioAuth', {mensaje: '¡Bienvenido a MAD Services!'});
}

//-- Exportamos la configuración de inicio de sesión de los Clientes para unificarlo con el resto de rutas.
module.exports = loginClientes;