//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { iniciarSesionEmpresaVerificadadb } = require('../operacionesdb/operacionesEmpresasdb.js');

//-- Creamos el Punto de Control para configurar el inicio de sesión de las Empresas.
const loginEmpresas = {}

loginEmpresas.empresaLogin = (req, res) => {

    //-- Introducimos los campos para Iniciar Sesión como Empresa.
    const email = req.body.email;
    const password = req.body.password;
    //-- Comprobamos que ningún campo está vacío.
    if(!email || !password) {
        res.status(401).render('paginas/empresaLogin', {mensaje: 'Campos vacíos'});
        return res.end();
    }
    //-- Llamamos a la función para Iniciar Sesión de forma verificada.
    iniciarSesionEmpresaVerificadadb
    (
        email,
        password,
        req,
        res
    );
}

//-- Exportamos la configuración de inicio de sesión de las Empresas para unificarlo con el resto de rutas.
module.exports = loginEmpresas;