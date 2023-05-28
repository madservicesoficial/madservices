//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para validar datos enviados por la Empresa.
const validacion = require("validator");
//-- Importamos la Tecnología para validar el CIF/NIF introducido.
const cifvalidacion = require('nif-dni-nie-cif-validation');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { registrarEmpresaVerificadadb } = require('../../../modelos/empresas/entrada/entrada.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const registroEmpresas = (req, res) => {

    //-- Variables y Ctes.
    const marca = req.body.marca;
    const nif = req.body.nif;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const tipo = req.body.tipo;
    const minLong = 3;
    const minLong2 = 4 * minLong - 2;
    const maxLong = 98;
    const maxLong2 = 50 + maxLong;
    //-- Proceso de validación.
    if(!email || !password || !confirmPassword || !marca || !nif || !tipo) {
        //-- Renderizar y mostrar mensaje.
        res.status(401).render('paginas/empresas/registrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        console.log(!cifvalidacion.isValidCif(nif));
        console.log(!cifvalidacion.isValidNif(nif));
        if(password !== confirmPassword) {
            //-- Renderizar y mostrar mensaje.
            res.status(401).render('paginas/empresas/registrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
            return res.end();
        }else {
            if(marca.length < minLong || marca.length > maxLong2) {
                res.status(401).render('paginas/empresas/registrarse', {mensaje: 'La marca empresarial es demasiado larga'});
                return res.end();
            }else if((cifvalidacion.isValidCif(nif) === false) && (cifvalidacion.isValidNif(nif) === false)) {
                res.status(401).render('paginas/empresas/registrarse', {mensaje: 'El CIF/NIF no es oficial'});
                return res.end();
            }else if(!validacion.isEmail(email)) {
                res.status(401).render('paginas/empresas/registrarse', { mensaje: `El Email: ${email} no es válido`});
                return res.end();
            }else if(!validacion.isLength(password, { min: minLong2, max: maxLong}) && !validacion.matches(password, /[a-z]/)
            && !validacion.matches(password, /[A-Z]/) && !validacion.matches(password, /[0-9]/) &&
            !validacion.matches(password, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                res.status(401).render('paginas/empresas/registrarse', 
                {
                    mensaje: `La contraseña debe contener como mínimo ${minLong2} caracteres, letras`,
                    mensaje2: 'minúsculas y mayúsculas, números y caracteres especiales'
                });
                return res.end();
            }else {
                //-- Llamada a función.
                registrarEmpresaVerificadadb
                (
                    {email: email, marca: marca, nif: nif, tipo: tipo},
                    password,
                    res
                );
            }
        }
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = registroEmpresas;
//#######################################################################################################//