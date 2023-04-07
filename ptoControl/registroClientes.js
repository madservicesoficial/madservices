//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { registrarClientedb, consultaEmailClientedb } = require('../operacionesdb/operacionesClientesdb.js');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../randomIDs/generarIDRandom.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { hash, compare} = require('bcrypt');
//-- Le añadimos SAL al cifrado de las contraseñas.
const SALT = 10;

//-- Creamos el Punto de Control para configurar el registro de los Clientes.
const registroClientes = {}

registroClientes.clienteRegistrarse = async (req, res) => {
    
    //-- Obtenemos los campos de entrada del Registro de los Clientes.
    const { email, password, confirmPassword, nombre, apellidos, direccion, poblacion, region, pais, cp, genero } = req.body;
    //-- Comprobamos que ningún campo está vacío.
    if(email === "" || password === "" || confirmPassword === "" || nombre === "" || apellidos === "" || direccion === "" || poblacion === "" || region === "" || pais === "" || cp === "" || genero === "")
    {
        return res.render('paginas/clienteRegistrarse', {
            alert: true,
            alertStatus: 401,
            alertMessage: 'Campos vacíos',
            alertIcon: 'warning',
            showConfirmButton: false
        });
    }
    //-- Consultamos si existe el email del Cliente en la base de datos de MAD Services.
    consultaEmailClientedb
    (
        madservicesdb,
        {email: email},
        res
    );
    //-- Generación del ID aleatorio.
    const idCliente = generarIDrandom() * 2;
    //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
    const checkPassword = await compare(password, confirmPassword);
    if(!checkPassword)
    {
        return res.render('paginas/clienteRegistrarse', {
            alert: true,
            alertStatus: 401,
            alertMessage: 'Introduce la misma contraseña en ambos campos',
            alertIcon: 'warning',
            showConfirmButton: false
        });
    }
    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(password, SALT);
    //-- Registramos el Cliente en la base de datos de MAD Services.
    registrarClientedb
    (
        madservicesdb, 
        {id: idCliente, email: email, password: passwordCifrada, nombre: nombre, apellidos: apellidos, direccion: direccion,
        poblacion: poblacion, region: region, pais: pais, cp: cp, genero: genero}
    );
    return res.render('paginas/inicio', {
        alert: true,
        alertStatus: 201,
        alertMessage: 'Cliente registrado con éxito.\n¡Bienvenido a MAD Services!',
        alertIcon: 'success',
        showConfirmButton: false
    });
};

//-- Exportamos la configuración de registro de los Clientes para unificarlo con el resto de rutas.
module.exports = registroClientes;