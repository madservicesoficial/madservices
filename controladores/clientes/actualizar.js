//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarClienteVerificadodb, mostrarClienteVerificadodb } = require('../../modelos/clientes/operacionesDB.js');
//-- Importamos la función que valida todos los campos de la actualización de los clientes.
const validacionEntradasCliente = require('../../validaciones/clientes/validacionActualizacion.js');

//-- Creamos el Punto de Control para configurar la organización del perfil del cliente.
const actualizarPerfilCliente = {}

actualizarPerfilCliente.perfil = (req, res) => {

    //-- Introducción de los campos del perfil del cliente para organizar en base de datos.
    let id = req.params.id;
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
    //-- Función de validación de todos los campos.
    validacionEntradasCliente
    (
        {email: email, password: password, confirmPassword: confirmPassword, nombre: nombre, apellidos: apellidos,
        direccion: direccion, poblacion: poblacion, region: region, pais: pais, cp: cp, genero: genero},
        res
    );
    //-- Actualizamos todos los campos menos la contraseña.
    actualizarClienteVerificadodb
    (
        {id: id, nombre: nombre, apellidos: apellidos, genero: genero, email: email, direccion: direccion,
        poblacion: poblacion, region: region, pais: pais, cp: cp}
    );
    //-- Actualizamos la contraseña y mostramos en función de lo que se haya introducido en ella.
    mostrarClienteVerificadodb
    (
        id,
        oldpassword,
        newpassword,
        repitePassword,
        res
    );
}

//-- Exportamos la configuración de la organización del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarPerfilCliente;