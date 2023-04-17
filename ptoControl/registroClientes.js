//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { registrarClienteVerificadodb } = require('../operacionesdb/operacionesClientesdb.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const {hash} = require('bcrypt');

//-- Creamos el Punto de Control para configurar el registro de los Clientes.
const registroClientes = {}

registroClientes.clienteRegistrarse = async (req, res) => {
    
    //-- Obtenemos los campos de entrada del Registro de los Clientes.
    const emailReg = req.body.emailReg; 
    const passwordReg = req.body.passwordReg;
    const confirmPassword = req.body.confirmPassword;
    const nombreReg = req.body.nombreReg;
    const apellidosReg = req.body.apellidosReg;
    const direccionReg = req.body.direccionReg;
    const poblacionReg = req.body.poblacionReg;
    const regionReg = req.body.regionReg;
    const paisReg = req.body.paisReg;
    const cpReg = req.body.cpReg;
    const generoReg = req.body.generoReg;
    //-- Comprobamos que ningún campo está vacío.
    if(!emailReg || !passwordReg || !confirmPassword || !nombreReg || !apellidosReg || !direccionReg || !poblacionReg ||
        !regionReg || !paisReg || !cpReg || !generoReg) {
        res.status(401).render('paginas/clienteRegistrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }
    //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
    if(passwordReg !== confirmPassword) {
        res.status(401).render('paginas/clienteRegistrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
        return res.end();
    }
    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(passwordReg, 1);
    //-- Registramos el Cliente en la base de datos de MAD Services, verificando que no existía ya.
    registrarClienteVerificadodb
    (
        madservicesdb,
        {emailReg: emailReg, passwordReg: passwordCifrada, nombreReg: nombreReg, apellidosReg: apellidosReg,
        direccionReg: direccionReg, poblacionReg: poblacionReg, regionReg: regionReg,
        paisReg: paisReg, cpReg: cpReg, generoReg: generoReg},
        res
    );
};

//-- Exportamos la configuración de registro de los Clientes para unificarlo con el resto de rutas.
module.exports = registroClientes;