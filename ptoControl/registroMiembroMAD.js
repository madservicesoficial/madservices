//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { registrarMiembroMADVerificadodb } = require('../operacionesdb/operacionesMiembroMADdb.js');

//-- Creamos el Punto de Control para configurar el registro de los Clientes.
const registroMiembroMAD = {}

registroMiembroMAD.miembroMADregistrarse = (req, res) => {

    //-- Obtenemos los campos de entrada del Registro de los Miembros MAD.
    const nombreMiembro = req.body.nombreMiembro;
    const apellidosMiembro = req.body.apellidosMiembro;
    const generoMiembro = req.body.generoMiembro;
    const emailMiembro = req.body.emailMiembro; 
    const passwordMiembro = req.body.passwordMiembro;
    const confirmPasswordMiembro = req.body.confirmPasswordMiembro;
    //-- Comprobamos que ningún campo está vacío.
    if(!nombreMiembro || !apellidosMiembro || !generoMiembro || !emailMiembro || !passwordMiembro || !confirmPasswordMiembro) {
        res.status(401).render('paginas/miembroMADregistrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }
    //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
    if(passwordMiembro !== confirmPasswordMiembro) {
        res.status(401).render('paginas/miembroMADregistrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
        return res.end();
    }
    //-- Registramos el Miembro MAD en la base de datos de MAD Services, verificando que no existía ya.
    registrarMiembroMADVerificadodb
    (
        {nombreMiembro: nombreMiembro, apellidosMiembro: apellidosMiembro, generoMiembro: generoMiembro, emailMiembro: emailMiembro,
        passwordMiembro: passwordMiembro, confirmPasswordMiembro: confirmPasswordMiembro},
        res
    );
}

//-- Exportamos la configuración de registro de los Miembros MAD para unificarlo con el resto de rutas.
module.exports = registroMiembroMAD;