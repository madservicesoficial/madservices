//-- Importamos el componente para cifrar las contraseñas.
const { hash } = require('bcrypt');
//-- Le añadimos SAL al cifrado de las contraseñas.
const SALT = 10;
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { registrarEmpresadb, consultaEmailEmpresadb, actualizarEmpresadb, darseBajaEmpresadb } = require('../operacionesdb/operacionesEmpresasdb.js');
//-- Importamos la función que genera el ID aleatoriamente.
const { generarIDrandom } = require('../randomIDs/generarIDRandom.js');

//-- Creamos el Punto de Control para configurar el registro de las Empresas.
const registroEmpresas = {}

registroEmpresas.empresaRegistrarse = async (req, res) => {
    
    //-- Obtenemos los campos de entrada del Registro de las Empresas.
    const { nombreEm, cif, email, password, confirmPassword, tiposoc } = req.body;
    //-- Comprobamos que ningún campo está vacío.
    if(nombreEm === "" || cif === "" || email === "" || password === "" || confirmPassword === "" || tiposoc === "")
    {
        return res.render('paginas/empresaRegistrarse', {
            alert: true,
            alertStatus: 401,
            alertMessage: 'Campos vacíos',
            alertIcon: 'warning',
            showConfirmButton: false
        });
    }
    //-- Consulta del email introducido por si ya existía en la base de datos.
    consultaEmailEmpresadb
    (
        madservicesdb,
        {email: email},
        res
    )
    //-- Generación del ID aleatorio.
    const idEmpresa = generarIDrandom() * 3;
    //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
    const checkPassword = await compare(password, confirmPassword);
    if(!checkPassword)
    {
        return res.render('paginas/empresaRegistrarse', {
            alert: true,
            alertStatus: 401,
            alertMessage: 'Introduce la misma contraseña en ambos campos',
            alertIcon: 'warning',
            showConfirmButton: false
        });
    }
    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(password, SALT);
    //-- Registramos la Empresa en la base de datos de MAD Services.
    registrarEmpresadb
    (
        madservicesdb, 
        {idEmpresa: idEmpresa, nombre: nombreEm, cif: cif, email: email, password: passwordCifrada, tiposoc: tiposoc}
    );
    return res.render('paginas/inicio', {
        alert: true,
        alertStatus: 201,
        alertMessage: 'Empresa registrada con éxito.\n¡Bienvenido a MAD Services!',
        alertIcon: 'success',
        showConfirmButton: false
    });
};

//-- Exportamos la configuración de registro de las Empresas para unificarlo con el resto de rutas.
module.exports = registroEmpresas;