//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { registrarEmpresaVerificadadb } = require('../../modelos/empresas/operacionesDB.js');
//-- Importamos la Tecnología para validar datos enviados por la Empresa.
const validacion = require("validator");
//-- Importamos la Tecnología para validar el CIF/NIF introducido.
const cifvalidacion = require('nif-dni-nie-cif-validation');

//-- la función de Express-Validator: isEmail(), comprueba que el email introducido cumple con el estándar RFC5322, estándar basado
//-- en que la estructura válida de un correo electrónico debe cumplir uno de estos tres esquemas:
//-- 1) usuario@dominio.com
//-- 2) usuario123@subdominio.dominio.co.uk
//-- 3) usuario+etiqueta@dominio.com
//-- Es decir, debe cumplir con la estructura: usuario + @ + dominio (incluyendo o no subdominio) + terminación .com (global/comercial)
//-- o .es (España) o .abreviacionPais (cualquier otro pais).

//-- Creamos la función que valida los datos enviados por la Empresa.
const validacionCamposEmpresa = (data, res) => {

    //-- Declaración de ctes.
    const minLong = 3;
    const minLong2 = 4 * minLong - 2;
    const maxLong = 98;
    const maxLong2 = 50 + maxLong;
    //-- Declaramos las variables o campos de la Empresa.
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    const marca = data.marca;
    const nif = data.nif;
    const tipo = data.tipo;
    //-- Declaración de la estructura correcta del Email.
    const estructuraEmail = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|es)$/;
    //-- Comprobamos que no hay campos vacíos.
    if(!email || !password || !confirmPassword || !marca || !nif || !tipo) {
        res.status(401).render('paginas/empresas/registrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
        if(password !== confirmPassword) {
            res.status(401).render('paginas/empresas/registrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
            return res.end();
        }else {
            //-- Si no, chequeamos que cada campo cumpla con los requisitos.
            if(marca.length < minLong || marca.length > maxLong2) {
                res.status(401).render('paginas/empresas/registrarse', {mensaje: 'La marca empresarial es demasiado larga'});
                return res.end();
            }else if(!cifvalidacion.isValidCif(nif) || !cifvalidacion.isValidNif(nif)) {
                res.status(401).render('paginas/empresas/registrarse', {mensaje: 'El CIF/NIF no es oficial'});
                return res.end();
            }else if(!validacion.isEmail(email) && !estructuraEmail.test(email)) {
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
                //-- Registramos la Empresa en la base de datos de MAD Services, verificando que no existía ya.
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

//-- Exportamos dicha función para unirlo al resto del programa.
module.exports = validacionCamposEmpresa;