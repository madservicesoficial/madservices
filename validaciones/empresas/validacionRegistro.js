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
    const minLong2 = 4 * minLong;
    const maxLong = 98;
    const maxLong2 = 50 + maxLong;
    //-- Comprobamos que no hay campos vacíos.
    if(!data.email || !data.password || !data.confirmPassword || !data.marca || !data.nif || !data.tipo) {
        res.status(401).render('paginas/empresas/registrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
        if(data.password !== data.confirmPassword) {
            res.status(401).render('paginas/empresas/registrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
            return res.end();
        }else {
            //-- Si no, chequeamos que cada campo cumpla con los requisitos.
            if(data.marca.length < minLong || data.marca.length > maxLong2) {
                res.status(401).render('paginas/empresas/registrarse', {mensaje: `La marca empresarial debe tener entre ${minLong} y ${maxLong2} caracteres`});
                return res.end();
            }
            if(cifvalidacion.isValidCif(data.nif) || cifvalidacion.isValidNif(data.nif)) {
                console.log('CIF/NIF verificado y correcto');
            }else {
                res.status(401).render('paginas/empresas/registrarse', {mensaje: `El CIF/NIF no es oficial`});
                return res.end();
            }
            const estructuraEmail = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|es)$/;
            if(validacion.isEmail(data.email) && estructuraEmail.test(data.email)) {
                console.log('Email verificado y correcto');
            }else {
                res.status(401).render('paginas/empresas/registrarse', 
                {
                    mensaje: `El Email: ${data.email} debe seguir la estructura válida Internacional`
                });
                return res.end();
            }
            if(validacion.isLength(data.password, { min: minLong2, max: maxLong}) && validacion.matches(data.password, /[a-z]/)
            && validacion.matches(data.password, /[A-Z]/) && validacion.matches(data.password, /[0-9]/) &&
            validacion.matches(data.password, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                console.log('Contraseña verificada y correcta');
            }else {
                res.status(401).render('paginas/empresas/registrarse', 
                {
                    mensaje: 'La contraseña debe contener como mínimo 12 caracteres, letras',
                    mensaje2: 'minúsculas y mayúsculas, números y caracteres especiales'
                });
                return res.end();
            }
            //-- Declaramos las variables o campos de la Empresa.
            const email = data.email;
            const password = data.password;
            const marca = data.marca;
            const nif = data.nif;
            const tipo = data.tipo;
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

//-- Exportamos dicha función para unirlo al resto del programa.
module.exports = validacionCamposEmpresa;