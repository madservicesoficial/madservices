//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { registrarClienteVerificadodb } = require('../modelos/clientes/operacionesDB.js');
//-- Importamos la Tecnología para validar el país introducido.
const {getCountries, getCode } = require('country-list-spanish');
//-- Importamos la Tecnología para validar el Código Postal introducido.
const { postcodeValidator } = require('postcode-validator');
//-- Importamos la configuración del entorno ENV para poder usar su información.
require('../config/env.js');
//-- Importamos la Tecnología para solicitar URLs de Geolocalización.
const axios = require('axios');

//-- Creamos la función para verificar la localización del cliente.
const localizacionCliente = async (data, res) => {

    //-- Obtenemos los campos de data de los Clientes.
    const email = data.email; 
    const password = data.password;
    const nombre = data.nombre;
    const apellidos =data.apellidos;
    const direccion = data.direccion;
    const poblacion = data.poblacion;
    const region = data.region;
    const pais = data.pais;
    const cp = data.cp;
    const genero = data.genero;
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
                    username: process.env.USUARIO_DE_GEONAMES
                }
            });
            const lugar = response.data.postalcodes[0];
            if(region === lugar.adminName1) {
                if(poblacion === lugar.adminName3) {
                    const minLong = 5;
                    const maxLong = 48;
                    if(direccion.length >= minLong && direccion.length <= maxLong) {
                        //-- Registramos el Cliente en la base de datos de MAD Services, verificando que no existía ya.
                        registrarClienteVerificadodb
                        (
                            {email: email, password: password, nombre: nombre, apellidos: apellidos, direccion: direccion,
                            poblacion: poblacion, region: region, pais: pais, cp: cp, genero: genero},
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

//-- Exportamos la función de localización del cliente para unificarlo al resto de rutas.
module.exports = localizacionCliente;