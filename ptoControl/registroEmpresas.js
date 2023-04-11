//-- Importamos el componente para cifrar las contraseñas.
const { hash } = require('bcrypt');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { registrarEmpresadb, consultaEmailEmpresadb, actualizarEmpresadb, darseBajaEmpresadb } = require('../operacionesdb/operacionesEmpresasdb.js');
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
        return res.status(401).render('paginas/empresaRegistrarse', {mensaje: 'Campos vacíos'});
    }
    //-- Consulta del email introducido por si ya existía en la base de datos.
    await consultaEmailEmpresadb
    (
        madservicesdb,
        email,
        (emailExiste) => {
            if(emailExiste) {
                res.status(401).render('paginas/empresaRegistrarse', { mensaje: 'Correo ya en uso' });
                return res.end();
            }
        }
    );
    //-- Generación del ID aleatorio.
    const idEmpresa = generarIDrandom() * 3;
    //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
    if(password !== confirmPassword) {
        return res.status(401).render('paginas/empresaRegistrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
    }
    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(password, 1);
    //-- Registramos la Empresa en la base de datos de MAD Services.
    await registrarEmpresadb
    (
        madservicesdb, 
        {id: idEmpresa, nombre: nombreEm, nif: cif, email: email, password: passwordCifrada, tiposoc: tiposoc},
        (miembroRegistrado) => {
            if(miembroRegistrado) {
                return res.status(201).redirect('/');
            }
        }
    );
};

//-- Exportamos la configuración de registro de las Empresas para unificarlo con el resto de rutas.
module.exports = registroEmpresas;