//-- Importamos la función que valida todos los campos del registro miembros MAD.
const validacionCamposMiembro = require('../../validaciones/miembros/validacionRegistro.js');

//-- Creamos el Punto de Control para configurar el registro de los Clientes.
const registroMiembros = {}

registroMiembros.registrarse = (req, res) => {

    //-- Obtenemos los campos de entrada del Registro de los Miembros MAD.
    const miembro = req.body.miembro;
    const departamento = req.body.departamento;
    const genero = req.body.genero;
    const email = req.body.email; 
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    //-- Función que valida cada campo del registro.
    validacionCamposMiembro
    (
        {miembro: miembro, departamento: departamento, genero: genero, email: email, password: password,
        confirmPassword: confirmPassword},
        res
    );
}

//-- Exportamos la configuración de registro de los Miembros MAD para unificarlo con el resto de rutas.
module.exports = registroMiembros;