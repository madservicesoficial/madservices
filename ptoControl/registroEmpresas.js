//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { registrarEmpresaVerificadadb } = require('../operacionesdb/operacionesEmpresasdb.js');

//-- Creamos el Punto de Control para configurar el registro de las Empresas.
const registroEmpresas = {}

registroEmpresas.empresaRegistrarse = (req, res) => {
    
    //-- Obtenemos los campos de entrada del Registro de las Empresas.
    const nombredelaempresa = req.body.nombredelaempresa;
    const nif = req.body.nif;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const tiposoc = req.body.tiposoc;
    //-- Comprobamos que ningún campo está vacío.
    if(!nombredelaempresa || !nif || !email || !password || !confirmPassword || !tiposoc) {
        res.status(401).render('paginas/empresaRegistrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }
    //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
    if(password !== confirmPassword) {
        res.status(401).render('paginas/empresaRegistrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
        return res.end();
    }
    //-- Registramos la Empresa en la base de datos de MAD Services, verificando que no existía ya.
    registrarEmpresaVerificadadb
    (
        {email: email, password: password, nombredelaempresa: nombredelaempresa, nif: nif, tiposoc: tiposoc},
        res
    );
};

//-- Exportamos la configuración de registro de las Empresas para unificarlo con el resto de rutas.
module.exports = registroEmpresas;