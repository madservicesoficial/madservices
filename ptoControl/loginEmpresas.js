//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { consultaNoEmailEmpresadb, consultaPasswordEmpresadb } = require('../operacionesdb/operacionesEmpresasdb.js');

//-- Creamos el Punto de Control para configurar el inicio de sesión de las Empresas.
const loginEmpresas = {}

loginEmpresas.empresaLogin = async (req, res) => {

    //-- Introducimos los campos para Iniciar Sesión como Empresa.
    const { email, password } = req.body;
    //-- Comprobamos que el email introducido existe y se encuentra en la base de datos.
    consultaNoEmailEmpresadb
    (
        madservicesdb,
        {email: email},
        res
    )
    //-- Comprobamos que la contraseña introducida existe y se encuentra en la base de datos.
    consultaPasswordEmpresadb
    (
        madservicesdb,
        {email: email, password: password},
        res
    )
    return res.render('paginas/inicioAuth', {
        alert: true,
        alertStatus: 201,
        alertMessage: '¡Bienvenido a MAD Services!',
        alertIcon: 'success',
        showConfirmButton: true
    });
}

//-- Exportamos la configuración de inicio de sesión de las Empresas para unificarlo con el resto de rutas.
module.exports = loginEmpresas;