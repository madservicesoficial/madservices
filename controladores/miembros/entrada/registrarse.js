//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para validar datos enviados por el Miembro MAD.
const validacion = require("validator");
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { registrarMiembroVerificadodb } = require('../../../modelos/miembros/entrada/entrada.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const registroMiembros = (req, res) => {

    //-- Variables y Ctes.
    const miembro = req.body.miembro;
    const departamento = req.body.departamento;
    const genero = req.body.genero;
    const email = req.body.email; 
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const minLong = 3;
    const minLong2 = 4 * minLong - 2;
    const maxLong = 98;
    const maxLong2 = 50 + maxLong;
    //-- Proceso de validación.
    if(!email || !password || !confirmPassword || !miembro || !departamento || !genero) {
        //-- Renderizar y mostrar mensaje.
        res.status(401).render('paginas/miembros/registrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        if(password !== confirmPassword) {
            //-- Renderizar y mostrar mensaje.
            res.status(401).render('paginas/miembros/registrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
            return res.end();
        }else {
            if(miembro.length < minLong || miembro.length > maxLong2) {
                //-- Renderizar y mostrar mensaje.
                res.status(401).render('paginas/miembros/registrarse', {mensaje: 'Nombre del Miembro MAD demasiado largo'});
                return res.end();
            }else if(!validacion.isEmail(email)) {
                //-- Renderizar y mostrar mensaje.
                res.status(401).render('paginas/miembros/registrarse', { mensaje: `El Email: ${email} no es válido`});
                return res.end();
            }else if(!validacion.isLength(password, { min: minLong2, max: maxLong}) && !validacion.matches(password, /[a-z]/)
            && !validacion.matches(password, /[A-Z]/) && !validacion.matches(password, /[0-9]/) &&
            !validacion.matches(password, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                //-- Renderizar y mostrar mensaje.
                res.status(401).render('paginas/miembros/registrarse', 
                {
                    mensaje: `La contraseña debe contener como mínimo ${minLong2} caracteres, letras`,
                    mensaje2: 'minúsculas y mayúsculas, números y caracteres especiales'
                });
                return res.end();
            }else {
                //-- Llamada a función.
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
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = registroMiembros;
//#######################################################################################################//