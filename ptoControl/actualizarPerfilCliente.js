//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarClienteVerificadodb } = require('../operacionesdb/operacionesClientesdb.js');

//-- Creamos el Punto de Control para configurar la actualización del nombre del cliente.
const actualizarPerfilCliente = {}

actualizarPerfilCliente.perfilClientes = (req, res) => {

    //-- Introducción de los campos del cliente para actualizar en base de datos.
    let idAct = req.params.id;
    const nombreAct = req.body.nombreAct;
    const apellidosAct = req.body.apellidosAct;
    const generoAct = req.body.generoAct;
    const emailAct = req.body.emailAct;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    const direccionAct = req.body.direccionAct;
    const poblacionAct = req.body.poblacionAct;
    const regionAct = req.body.regionAct;
    const paisAct = req.body.paisAct;
    const cpAct = req.body.cpAct;
    //-- Actualizamos los datos del Cliente en la base de datos de MAD Services.
    actualizarClienteVerificadodb
    (
        madservicesdb,
        {idAct: idAct, nombreAct: nombreAct, apellidosAct: apellidosAct, generoAct: generoAct,
        emailAct: emailAct, oldpassword: oldpassword, password: newpassword, repitePassword: repitePassword,
        direccionAct: direccionAct, poblacionAct: poblacionAct, regionAct: regionAct, paisAct: paisAct, cpAct: cpAct},
        res
    );
}

//-- Exportamos la configuración de la actualización del nombre del cliente para unificarlo con el resto de rutas.
module.exports = actualizarPerfilCliente;