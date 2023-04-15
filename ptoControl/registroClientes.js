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
    const email = req.body.email; 
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const direccion = req.body.direccion;
    const poblacion = req.body.poblacion;
    const region = req.body.region;
    const pais = req.body.pais;
    const cp = req.body.cp;
    const genero = req.body.genero;
    //-- Comprobamos que ningún campo está vacío.
    if(!email || !password || !confirmPassword || !nombre || !apellidos || !direccion || !poblacion || !region || !pais || !cp || !genero) {
        res.status(401).render('paginas/clienteRegistrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }
    //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
    if(password !== confirmPassword) {
        res.status(401).render('paginas/clienteRegistrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
        return res.end();
    }
    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(password, 1);
    //-- Registramos el Cliente en la base de datos de MAD Services, verificando que no existía ya.
    registrarClienteVerificadodb
    (
        madservicesdb,
        {email: email, password: passwordCifrada, nombre: nombre, apellidos: apellidos, direccion: direccion, poblacion: poblacion, region: region,
        pais: pais, cp: cp, genero: genero},
        res
    );
};

//-- Exportamos la configuración de registro de los Clientes para unificarlo con el resto de rutas.
module.exports = registroClientes;