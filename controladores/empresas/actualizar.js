//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { actualizarEmpresaVerificadadb, mostrarEmpresaVerificadadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para actualizar la interfaz de la Empresa.
const actualizarEmpresa = {}

actualizarEmpresa.interfaz = (req, res) => {

    //-- Introducción de los campos de la interfaz de la Empresa para actualizar en base de datos.
    let id = req.params.id;
    const marca = req.body.marca;
    const tipo = req.body.tipo;
    const nif = req.body.nif;
    const ebitda = req.body.ebitda;
    const email = req.body.email;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    //-- Actualizamos todos los campos menos la contraseña.
    actualizarEmpresaVerificadadb
    (
        {id: id, marca: marca, tipo: tipo, nif: nif, ebitda: ebitda, email: email}
    );
    //-- Actualizamos la contraseña y mostramos en función de lo que se haya introducido en ella.
    mostrarEmpresaVerificadadb
    (
        id,
        oldpassword,
        newpassword,
        repitePassword,
        res
    );
}

//-- Exportamos la configuración de actualizar la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = actualizarEmpresa;