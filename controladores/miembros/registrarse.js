//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { registrarMiembroVerificadodb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología para validar datos enviados por el Miembro MAD.
const validacion = require("validator");

//-- Creamos el Punto de Control para configurar el registro de los Miembros MAD.
const registroMiembros = (req, res) => {

    //-- Obtenemos los campos de entrada del Registro de los Miembros MAD.
    const miembro = req.body.miembro;
    const departamento = req.body.departamento;
    const genero = req.body.genero;
    const email = req.body.email; 
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    //-- Declaración de ctes.
    const minLong = 3;
    const minLong2 = 4 * minLong - 2;
    const maxLong = 98;
    const maxLong2 = 50 + maxLong;
    //-- Declaración de la estructura correcta del Email.
    const estructuraEmail = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|es)$/;
    //-- Comprobamos que no hay campos vacíos.
    if(!email || !password || !confirmPassword || !miembro || !departamento || !genero) {
        res.status(401).render('paginas/miembros/registrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
        if(password !== confirmPassword) {
            res.status(401).render('paginas/miembros/registrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
            return res.end();
        }else {
            //-- Si no, chequeamos que cada campo cumpla con los requisitos.
            if(miembro.length < minLong || miembro.length > maxLong2) {
                res.status(401).render('paginas/miembros/registrarse', {mensaje: 'Nombre del Miembro MAD demasiado largo'});
                return res.end();
            }else if(!validacion.isEmail(email) && !estructuraEmail.test(email)) {
                res.status(401).render('paginas/miembros/registrarse', { mensaje: `El Email: ${email} no es válido`});
                return res.end();
            }else if(!validacion.isLength(password, { min: minLong2, max: maxLong}) && !validacion.matches(password, /[a-z]/)
            && !validacion.matches(password, /[A-Z]/) && !validacion.matches(password, /[0-9]/) &&
            !validacion.matches(password, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                res.status(401).render('paginas/miembros/registrarse', 
                {
                    mensaje: `La contraseña debe contener como mínimo ${minLong2} caracteres, letras`,
                    mensaje2: 'minúsculas y mayúsculas, números y caracteres especiales'
                });
                return res.end();
            }else {
                //-- Registramos el Miembro MAD en la base de datos de MAD Services, verificando que no existía ya.
                registrarMiembroVerificadodb
                (
                    {miembro: miembro, departamento: departamento, genero: genero, email: email},
                    password,
                    res
                );
            }
        }
    }
}

//-- Exportamos la configuración de registro de los Miembros MAD para unificarlo con el resto de rutas.
module.exports = registroMiembros;