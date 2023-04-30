//-- Importamos la función que valida todos los campos de la actualización de los clientes.
const validacionEntradasEmpresa = require('../../validaciones/empresas/validacionActualizacion.js');

//-- Creamos el Punto de Control para actualizar la interfaz de la Empresa.
const actualizarEmpresa = {}

actualizarEmpresa.interfaz = (req, res) => {

    //-- Introducción de los campos de la interfaz de la Empresa para actualizar en base de datos.
    let id = req.params.id;
    const marca = req.body.marca;
    const tipo = req.body.tipo;
    const nif = req.body.nif;
    const email = req.body.email;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    //-- Función de validación de todos los campos.
    validacionEntradasEmpresa
    (
        id,
        {marca: marca, nif: nif, tipo: tipo, email: email},
        oldpassword,
        newpassword,
        repitePassword,
        res
    );
}

//-- Exportamos la configuración de actualizar la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = actualizarEmpresa;