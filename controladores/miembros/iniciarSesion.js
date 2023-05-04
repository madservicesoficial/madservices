//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { iniciarSesionMiembroVerificadodb } = require('../../modelos/miembros/operacionesDB.js');

//-- Creamos el Punto de Control para configurar el inicio de sesión de los Miembros MAD.
const iniciarSesionMiembros = (req, res) => {

    //-- Introducimos los campos para Iniciar Sesión como Miembro MAD.
    const email = req.body.email; 
    const password = req.body.password;
    //-- Comprobamos que ningún campo está vacío.
    if(!email || !password) {
        res.status(401).render('paginas/miembros/login', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        //-- Llamamos a la función para Iniciar Sesión de forma verificada.
        iniciarSesionMiembroVerificadodb
        (
            email,
            password,
            req,
            res
        );
    }
}

//-- Exportamos la configuración de inicio de sesión de los Miembros MAD para unificarlo con el resto de rutas.
module.exports = iniciarSesionMiembros;