//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { registrarClienteVerificadodb } = require('../../modelos/clientes/operacionesDB.js');
//-- Importamos la función que valida todos los campos del registro clientes.
const validacionCamposCliente = require('../../validaciones/clientes/validacionRegistro.js');

//-- Creamos el Punto de Control para configurar el registro de los Clientes.
const registroClientes = {}

registroClientes.registrarse = (req, res) => {
    
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
    //-- Función de validación de todos los campos.
    validacionCamposCliente
    (
        {email: email, password: password, confirmPassword: confirmPassword, nombre: nombre, apellidos: apellidos,
        direccion: direccion, poblacion: poblacion, region: region, pais: pais, cp: cp, genero: genero},
        req,
        res
    );
    //-- Registramos el Cliente en la base de datos de MAD Services, verificando que no existía ya.
    registrarClienteVerificadodb
    (
        {email: email, password: password, nombre: nombre, apellidos: apellidos,
        direccion: direccion, poblacion: poblacion, region: region, pais: pais, cp: cp, genero: genero},
        res
    );
};

//-- Exportamos la configuración de registro de los Clientes para unificarlo con el resto de rutas.
module.exports = registroClientes;