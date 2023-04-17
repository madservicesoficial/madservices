//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarClienteVerificadodb } = require('../operacionesdb/operacionesClientesdb.js');

//-- Creamos el Punto de Control para configurar la actualización del nombre del cliente.
const actualizarPerfilCliente = {}

actualizarPerfilCliente.perfilClientes = (req, res) => {

    //-- Introducción de los campos del cliente para actualizar en base de datos.
    const id = req.params.id;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const genero = req.body.genero;
    const email = req.body.email;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    const direccion = req.body.direccion;
    const poblacion = req.body.poblacion;
    const region = req.body.region;
    const pais = req.body.pais;
    const cp = req.body.cp;
    //-- Actualizamos los datos del Cliente en la base de datos de MAD Services.
    actualizarClienteVerificadodb
    (
        madservicesdb,
        {id: id, nombre: nombre, apellidos: apellidos, genero: genero,
        email: email, password: newpassword, oldpassword: oldpassword, repitePassword: repitePassword,
        direccion: direccion, poblacion: poblacion, region: region, pais: pais, cp: cp},
        res
    );
}

//-- Exportamos la configuración de la actualización del nombre del cliente para unificarlo con el resto de rutas.
module.exports = actualizarPerfilCliente;