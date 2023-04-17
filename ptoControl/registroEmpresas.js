//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const {hash} = require('bcrypt');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { registrarEmpresaVerificadadb } = require('../operacionesdb/operacionesEmpresasdb.js');

//-- Creamos el Punto de Control para configurar el registro de las Empresas.
const registroEmpresas = {}

registroEmpresas.empresaRegistrarse = async (req, res) => {
    
    //-- Obtenemos los campos de entrada del Registro de las Empresas.
    const nombreEmReg = req.body.nombreEmReg;
    const nifEmReg = req.body.nifEmReg;
    const emailEmReg = req.body.emailEmReg;
    const passwordEmReg = req.body.passwordEmReg;
    const confirmPasswordEmReg = req.body.confirmPasswordEmReg;
    const tiposocEmReg = req.body.tiposocEmReg;
    //-- Comprobamos que ningún campo está vacío.
    if(!nombreEmReg || !nifEmReg || !emailEmReg || !passwordEmReg || !confirmPasswordEmReg || !tiposocEmReg) {
        res.status(401).render('paginas/empresaRegistrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }
    //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
    if(passwordEmReg !== confirmPasswordEmReg) {
        res.status(401).render('paginas/empresaRegistrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
        return res.end();
    }
    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifradaEmReg = await hash(passwordEmReg, 1);
    //-- Registramos la Empresa en la base de datos de MAD Services, verificando que no existía ya.
    registrarEmpresaVerificadadb
    (
        madservicesdb,
        {emailEmReg: emailEmReg, passwordEmReg: passwordCifradaEmReg, nombreEmReg: nombreEmReg, nifEmReg: nifEmReg,
        tiposocEmReg: tiposocEmReg},
        res
    );
};

//-- Exportamos la configuración de registro de las Empresas para unificarlo con el resto de rutas.
module.exports = registroEmpresas;