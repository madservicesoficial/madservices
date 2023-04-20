//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { iniciarSesionMiembroMADVerificadodb } = require('../operacionesdb/operacionesMiembroMADdb.js');

//-- Creamos el Punto de Control para configurar el inicio de sesión de los Miembros MAD.
const loginMiembroMAD = {}

loginMiembroMAD.miembroMADlogin = (req, res) => {

    //-- Introducimos los campos para Iniciar Sesión como Miembro MAD.
    const emailMiembro = req.body.emailMiembro; 
    const passwordMiembro = req.body.passwordMiembro;
    //-- Comprobamos que ningún campo está vacío.
    if(!emailMiembro || !passwordMiembro) {
        res.status(401).render('paginas/miembroMADlogin', {mensaje: 'Campos vacíos'});
        return res.end();
    }
    //-- Llamamos a la función para Iniciar Sesión de forma verificada.
    iniciarSesionMiembroMADVerificadodb
    (
        emailMiembro,
        passwordMiembro,
        req,
        res
    );
}

//-- Exportamos la configuración de inicio de sesión de los Miembros MAD para unificarlo con el resto de rutas.
module.exports = loginMiembroMAD;