//-- Importamos el componente para cifrar las contraseñas.
const { hash } = require('bcrypt');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { registrarEmpresaVerificadadb, actualizarEmpresadb, darseBajaEmpresadb } = require('../operacionesdb/operacionesEmpresasdb.js');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../randomIDs/generarIDRandom.js');

//-- Creamos el Punto de Control para configurar el registro de las Empresas.
const registroEmpresas = {}

registroEmpresas.empresaRegistrarse = async (req, res) => {
    
    //-- Obtenemos los campos de entrada del Registro de las Empresas.
    const nombreEm = req.body.nombreEm;
    const cif = req.body.cif;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const tiposoc = req.body.tiposoc;
    //-- Comprobamos que ningún campo está vacío.
    if(!nombreEm || !cif || !email || !password || !confirmPassword || !tiposoc) {
        res.status(401).render('paginas/empresaRegistrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }
    //-- Generación del ID aleatorio.
    const idEmpresa = generarIDrandom() * 3;
    //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
    if(password !== confirmPassword) {
        res.status(401).render('paginas/empresaRegistrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
        return res.end();
    }
    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(password, 1);
    //-- Registramos la Empresa en la base de datos de MAD Services, verificando que no existía ya.
    registrarEmpresaVerificadadb
    (
        madservicesdb,
        {id: idEmpresa, email: email, password: passwordCifrada, nombre: nombreEm, nif: cif, tiposoc: tiposoc},
        res
    );
};

//-- Exportamos la configuración de registro de las Empresas para unificarlo con el resto de rutas.
module.exports = registroEmpresas;