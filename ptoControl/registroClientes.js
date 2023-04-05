//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { registrarClientedb, consultaCorreoEdb } = require('../operacionesdb/operacionesClientesdb.js');
//-- Importamos la función que genera el ID aleatoriamente.
const generarIDrandom = require('../randomIDs/generarIDRandom.js');

//-- Creamos el Punto de Control para configurar el registro de los Clientes.
const registroClientes = {}

registroClientes.clienteRegistrarse = (req, res) => {
    
    //-- Obtenemos los campos de entrada del Registro de los Clientes.
    const { email, password, confirmPassword, nombre, apellidos, direccion, poblacion, region, pais, cp, genero } = req.body;
    //-- Comprobamos que ningún campo está vacío.
    if(email === "" || password === "" || confirmPassword === "" || nombre === "" || apellidos === "" || direccion === ""
    || poblacion === "" || region === "" || pais === "" || cp === "" || genero === "") return res.status(401).send('Campos vacíos').render('paginas/clienteRegistrarse',
    {email: email, password: password, confirmPassword: confirmPassword, nombre: nombre, apellidos: apellidos, direccion: direccion,
    poblacion: poblacion, region: region, pais: pais, cp: cp, genero: genero});
    //-- Consultamos si existe el email del Cliente en la base de datos de MAD Services.
    consultaCorreoEdb
    (
        madservicesdb,
        {email: email},
        res
    );
    //-- Generación del ID aleatorio.
    const idCliente = generarIDrandom() * 2;
    //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
    if(camposCliente.password !== camposCliente.confirmPassword) return res.status(401).send('Contraseña incorrecta').render('paginas/clienteRegistrarse',
    {email: email, password: password, confirmPassword: confirmPassword, nombre: nombre, apellidos: apellidos, direccion: direccion,
    poblacion: poblacion, region: region, pais: pais, cp: cp, genero: genero});
    //-- Registramos el Cliente en la base de datos de MAD Services.
    registrarClientedb
    (
        madservicesdb, 
        {id: idCliente, email: email, password: password, nombre: nombre, apellidos: apellidos, direccion: direccion,
        poblacion: poblacion, region: region, pais: pais, cp: cp, genero: genero}
    );
    return res.status(201).send('Cliente registrado con éxito.\n¡Bienvenido a MAD Services!').render('paginas/inicio',
    {email: email, password: password, confirmPassword: confirmPassword, nombre: nombre, apellidos: apellidos, direccion: direccion,
    poblacion: poblacion, region: region, pais: pais, cp: cp, genero: genero});
};

//-- Exportamos la configuración de registro de los Clientes para unificarlo con el resto de rutas.
module.exports = registroClientes;