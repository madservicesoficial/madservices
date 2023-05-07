//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { registrarClienteVerificadodb } = require('../../modelos/clientes/operacionesDB.js');
//-- Importamos la Tecnología para validar datos enviados por el cliente.
const validacion = require("validator");
//-- Importamos la Tecnología para validar el país introducido.
const {getCountries, getCode } = require('country-list-spanish');
//-- Importamos la Tecnología para validar el Código Postal introducido.
const { postcodeValidator } = require('postcode-validator');
//-- Importamos la configuración del entorno ENV para poder usar su información.
require('../../config/env.js');
//-- Importamos la Tecnología para solicitar URLs de Geolocalización.
const axios = require('axios');

//-- Creamos el Punto de Control para configurar el registro de los Clientes.
const registroClientes = async (req, res) => {
    
    //-- Obtenemos los campos de entrada del Registro de los Clientes.
    const email = req.body.email; 
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const direccion = req.body.direccion;
    const poblacion = req.body.poblacion;
    const region = req.body.region;
    const pais = req.body.pais;
    const cp = req.body.cp;
    const genero = req.body.genero;
    //-- Declaración de ctes.
    const minLong = 3;
    const minLong2 = 4 * minLong - 2;
    const maxLong = 48;
    const maxLong2 = 2 * maxLong;
    //-- Declaración de la estructura correcta del Email.
    const estructuraEmail = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|es)$/;
    //-- Comprobamos que no hay campos vacíos.
    if(!email || !password || !confirmPassword || !nombre || !apellidos || !genero || !direccion || !poblacion || !region || !pais || !cp) {
        res.status(401).render('paginas/clientes/registrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
        if(password !== confirmPassword) {
            res.status(401).render('paginas/clientes/registrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
            return res.end();
        }else {
            //-- Si no, chequeamos que cada campo cumpla con los requisitos.
            if(nombre.length > maxLong) {
                res.status(401).render('paginas/clientes/registrarse', {mensaje: `El nombre no puede ser más largo de ${maxLong} caracteres`});
                return res.end();
            }else if(apellidos.length > maxLong2) {
                res.status(401).render('paginas/clientes/registrarse', {mensaje: `Los apellidos no pueden ser más largos de ${maxLong2} caracteres`});
                return res.end();
            }else if(!validacion.isEmail(email) || !estructuraEmail.test(email)) {
                res.status(401).render('paginas/clientes/registrarse', { mensaje: `El Email: ${email} no es válido` });
                return res.end();
            }else if(!validacion.isLength(password, { min: minLong2, max: maxLong2}) || !validacion.matches(password, /[a-z]/)
            || !validacion.matches(password, /[A-Z]/) || !validacion.matches(password, /[0-9]/) ||
            !validacion.matches(password, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                res.status(401).render('paginas/clientes/registrarse', 
                {
                    mensaje: `La contraseña debe contener como mínimo ${minLong2} caracteres, letras`,
                    mensaje2: 'minúsculas y mayúsculas, números y caracteres especiales'
                });
                return res.end();
            }else {
                //-- Declaración de la cte que saca todos los países del mundo en español.
                const paises = getCountries();
                //-- Proceso de verificación de la localización.
                if(paises.includes(pais)) {
                    const codigoPais = getCode(pais);
                    if(postcodeValidator(cp, codigoPais)) {
                        //-- Enviamos una solicitud HTTP a la API de Geonames.
                        const response = await axios.get('http://api.geonames.org/postalCodeLookupJSON', {
                            params: {
                                postalcode: cp,
                                country: codigoPais,
                                username: process.env.USUARIO_DE_GEONAMES,
                                password: process.env.MYSQL_PASSWORD_CLIENTE
                            },
                        });
                        const lugar = response.data.postalcodes[0];
                        if(region === lugar.adminName1) {
                            if(poblacion === lugar.adminName3) {
                                const minDir = 5;
                                const maxDir= 48;
                                if(direccion.length >= minDir && direccion.length <= maxDir) {
                                    //-- Registramos el Cliente en la base de datos de MAD Services, verificando que no existía ya.
                                    registrarClienteVerificadodb
                                    (
                                        {email: email, nombre: nombre, apellidos: apellidos, direccion: direccion, poblacion: poblacion,
                                        region: region, pais: pais, cp: cp, genero: genero},
                                        password,
                                        res
                                    );
                                }else {
                                    res.status(401).render('paginas/clientes/registrarse', {mensaje: `Dirección de ${poblacion} incorrecta`});
                                    return res.end();
                                }
                            }else {
                                res.status(401).render('paginas/clientes/registrarse', {mensaje: `Población de ${region} incorrecta`});
                                return res.end();
                            }
                        }else {
                            res.status(401).render('paginas/clientes/registrarse', {mensaje: `Región de ${pais} incorrecta`});
                            return res.end();
                        }
                    }else {
                        res.status(401).render('paginas/clientes/registrarse', {mensaje: 'Código Postal incorrecto'});
                        return res.end();
                    }
                }else {
                    res.status(401).render('paginas/clientes/registrarse', {mensaje: 'País incorrecto'});
                    return res.end();
                }
            }
        }
    }
};

//-- Exportamos la configuración de registro de los Clientes para unificarlo con el resto de rutas.
module.exports = registroClientes;