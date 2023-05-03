//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { iniciarSesionClienteVerificadodb } = require('../../modelos/clientes/operacionesDB.js');

//-- Creamos el Punto de Control para configurar el inicio de sesión de los Clientes.
const iniciarSesionClientes = (req, res) => {

    //-- Introducimos los campos para Iniciar Sesión como Cliente.
    const email = req.body.email;
    const password = req.body.password;
    //-- Comprobamos que ningún campo está vacío.
    if(!email || !password) {
        res.status(401).render('paginas/clientes/login', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        //-- Llamamos a la función para Iniciar Sesión de forma verificada.
        iniciarSesionClienteVerificadodb
        (
            email,
            password,
            req,
            res
        );
    }
}

//-- Exportamos la configuración de inicio de sesión de los Clientes para unificarlo con el resto de rutas.
module.exports = iniciarSesionClientes;