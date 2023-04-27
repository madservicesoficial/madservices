//-- Importamos la Tecnología para validar datos enviados por el cliente.
const validacion = require("validator");
//-- Importamos la Tecnología para localizar la API de Google Maps y el GPS y saber si la ubicación es correcta.
const GPS = require('axios');

//-- la función de Express-Validator: isEmail(), comprueba que el email introducido cumple con el estándar RFC5322, estándar basado
//-- en que la estructura válida de un correo electrónico debe cumplir uno de estos tres esquemas:
//-- 1) usuario@dominio.com
//-- 2) usuario123@subdominio.dominio.co.uk
//-- 3) usuario+etiqueta@dominio.com
//-- Es decir, debe cumplir con la estructura: usuario + @ + dominio (incluyendo o no subdominio) + terminación .com (global/comercial)
//-- o .es (España) o .abreviacionPais (cualquier otro pais).

//-- Función GPS.
async function ubicacionCliente(ubicA, ubicB, ubicC, ubicD, ubicE) {

    try {
        //-- Declaramos la ubicación completa.
        const ubicacion = `${ubicA}, ${ubicB}, ${ubicC}, ${ubicD} - ${ubicE}`;
        //-- Declaramos la conexión con el GPS.
        const conexionGPS = await GPS.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: ubicacion,
                key: 'TU_API_KEY_DE_GOOGLE_MAPS'
              }
        });

        //-- Declaramos y obtenemos los resultados.
        const resultados = conexionGPS.data.results;
        if (resultados.length === 0) {
            return false;
        }
        const resultados_ubica = results[0];
        if (resultados_ubica.types.includes('postal_code') && resultados_ubica.formatted_address.includes(ubicE)) {
            return true;
        }

    }catch(error) {
        throw error;
    }
}

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
            const Email = data.email;
            const estructuraEmail = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|es)$/;
            if(validacion.isEmail(Email) && estructuraEmail.test(Email) && validacion.matches(Email, /[a-z]/)
            && validacion.matches(Email, /[A-Z]/) && validacion.matches(Email, /[0-9]/) && validacion.matches(Email, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                console.log('Email verificado y correcto');
            }else {
                res.status(401).render('paginas/clientes/registrarse', 
                {
                    mensaje: `El Email: ${Email} debe seguir la estructura válida Internacional`,
                    mensaje2: `Y debe contener letras minúsculas, mayúsculas, números y caracteres especiales`
                });
                return res.end();
            }
            const Password = data.password;
            if(validacion.isLength(Password, { min: minLong2, max: maxLong2}) && validacion.matches(Email, /[a-z]/)
            && validacion.matches(Email, /[A-Z]/) && validacion.matches(Email, /[0-9]/) && validacion.matches(Email, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                console.log('Contraseña verificado y correcto');
            }else {
                res.status(401).render('paginas/clientes/registrarse', 
                {
                    mensaje: 'La contraseña debe contener como mínimo 12 caracteres, letras',
                    mensaje2: 'minúsculas y mayúsculas, números y caracteres especiales'
                });
                return res.end();
            }
            //-- Comprobamos la ubicación del cliente.
            /* const ubicA = data.direccion;
            const ubicB = data.poblacion;
            const ubicC = data.region;
            const ubicD = data.pais;
            const ubicE = data.cp;
            ubicacionCliente(ubicA, ubicB, ubicC, ubicD, ubicE); */
        }
    }
}

//-- Exportamos dicha función para unirlo al resto del programa.
module.exports = validacionCamposCliente;