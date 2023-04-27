//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { registrarClienteVerificadodb } = require('../../');
//-- Importamos la Tecnología para validar datos enviados por el cliente.
const validacion = require("validator");
//-- Importamos la Tecnología para validar el país introducido.
const {getCountries, getCode} = require('country-list-spanish');
//-- Importamos la Tecnología para validar el Código Postal introducido.
const { postcodeValidator } = require('postcode-validator');

//-- la función de Express-Validator: isEmail(), comprueba que el email introducido cumple con el estándar RFC5322, estándar basado
//-- en que la estructura válida de un correo electrónico debe cumplir uno de estos tres esquemas:
//-- 1) usuario@dominio.com
//-- 2) usuario123@subdominio.dominio.co.uk
//-- 3) usuario+etiqueta@dominio.com
//-- Es decir, debe cumplir con la estructura: usuario + @ + dominio (incluyendo o no subdominio) + terminación .com (global/comercial)
//-- o .es (España) o .abreviacionPais (cualquier otro pais).

//-- Creamos la función que valida los datos enviados por el cliente.
const validacionCamposCliente = (data, res) => {

    //-- Declaración de ctes.
    const minLong = 3;
    const minLong2 = 4 * minLong;
    const maxLong = 48;
    const maxLong2 = 2 * maxLong;
    //-- Comprobamos que no hay campos vacíos.
    if(!data.email || !data.password || !data.confirmPassword || !data.nombre || !data.apellidos ||
    !data.direccion || !data.poblacion || !data.region || !data.pais || !data.cp || !data.genero) {
        res.status(401).render('paginas/clientes/registrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
        if(data.password !== data.confirmPassword) {
            res.status(401).render('paginas/clientes/registrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
            return res.end();
        }else {
            //-- Si no, chequeamos que cada campo cumpla con los requisitos.
            if(data.nombre.length < minLong || data.nombre.length > maxLong) {
                res.status(401).render('paginas/clientes/registrarse', {mensaje: `El nombre debe tener entre ${minLong} y ${maxLong} caracteres`});
                return res.end();
            }
            if(data.apellidos.length < minLong || data.apellidos.length > maxLong2) {
                res.status(401).render('paginas/clientes/registrarse', {mensaje: `Los apellidos deben tener entre ${minLong} y ${maxLong2} caracteres`});
                return res.end();
            }
            const estructuraEmail = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|es)$/;
            if(validacion.isEmail(data.email) && estructuraEmail.test(data.email)) {
                console.log('Email verificado y correcto');
            }else {
                res.status(401).render('paginas/clientes/registrarse', 
                {
                    mensaje: `El Email: ${Email} debe seguir la estructura válida Internacional`
                });
                return res.end();
            }
            if(validacion.isLength(data.password, { min: minLong2, max: maxLong2}) && validacion.matches(data.password, /[a-z]/)
            && validacion.matches(data.password, /[A-Z]/) && validacion.matches(data.password, /[0-9]/) &&
            validacion.matches(data.password, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                console.log('Contraseña verificada y correcta');
            }else {
                res.status(401).render('paginas/clientes/registrarse', 
                {
                    mensaje: 'La contraseña debe contener como mínimo 12 caracteres, letras',
                    mensaje2: 'minúsculas y mayúsculas, números y caracteres especiales'
                });
                return res.end();
            }
            const paises = getCountries();
            if(paises.includes(data.pais)) {
                console.log('País verificado y correcto');
            }else {
                res.status(401).render('paginas/clientes/registrarse', {mensaje: 'País incorrecto'});
                return res.end();
            }
            const codigoPais = getCode(data.pais);
            if(postcodeValidator(data.cp, codigoPais)) {
                console.log('Código Postal verificado y correcto');
            }else {
                res.status(401).render('paginas/clientes/registrarse', {mensaje: 'Código Postal incorrecto'});
                return res.end();
            }
        }
    }
}

//-- Exportamos dicha función para unirlo al resto del programa.
module.exports = validacionCamposCliente;