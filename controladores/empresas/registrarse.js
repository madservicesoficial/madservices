//-- Importamos la función que valida todos los campos del registro empresa.
const validacionCamposEmpresa = require('../../validaciones/empresas/validacionRegistro.js');

//-- Creamos el Punto de Control para configurar el registro de las Empresas.
const registroEmpresas = {}

registroEmpresas.registrarse = (req, res) => {
    
    //-- Obtenemos los campos de entrada del Registro de las Empresas.
    const marca = req.body.marca;
    const nif = req.body.nif;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const tipo = req.body.tipo;
    //-- Función de validación de todos los campos.
    validacionCamposEmpresa
    (
        {marca: marca, nif: nif, email: email, password: password, confirmPassword: confirmPassword, tipo: tipo},
        res
    );
};

//-- Exportamos la configuración de registro de las Empresas para unificarlo con el resto de rutas.
module.exports = registroEmpresas;