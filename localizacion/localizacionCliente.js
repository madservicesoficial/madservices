//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { registrarClienteVerificadodb } = require('../modelos/clientes/operacionesDB.js');
//-- Importamos la Tecnología para validar el país introducido.
const {getCountries, getCode} = require('country-list-spanish');
//-- Importamos la Tecnología para validar el Código Postal introducido.
const { postcodeValidator } = require('postcode-validator');
//-- Importamos la Tecnología que verifica la localización del Cliente con su ubicación en tiempo real.
const GeoNames = require('node-geonames-client');
//-- Importamos la configuración del entorno ENV para poder usar su información.
require('../config/env.js');

//-- Creamos la función para verificar la localización del cliente.
function localizacionCliente(data, res) {

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
        //-- Declaración de la cte que saca el código del país en español.
        const codigoPais = getCode(pais);
        
            /* if(existeRegion > 0) {
                //-- Localizamos la población.
                geonames.search({ country: codigoPais, maxRows: 1, featureClass: 'P' })
                .then((resultado) => {
                    //-- Declaramos la cte de la existencia de la población.
                    const existePoblacion = resultado[0];
                    if(existePoblacion > 0) {
                        //-- Localizamos la dirección.
                        geonames.search({ country: codigoPais, maxRows: 1, featureClass: 'S' })
                        .then((results) => {
                            //-- Declaramos la cte de la existencia de la dirección.
                            const existeDireccion = results[0];
                            if(existeDireccion > 0) {
                                //-- Registramos el Cliente en la base de datos de MAD Services, verificando que no existía ya.
                                registrarClienteVerificadodb
                                (
                                    {email: email, password: password, nombre: nombre, apellidos: apellidos, direccion: direccion,
                                    poblacion: poblacion, region: region, pais: pais, cp: cp, genero: genero},
                                    res
                                );
                            }
                        });
                    }else {
                        res.status(401).render('paginas/clientes/registrarse', {mensaje: 'Población incorrecta'});
                        return res.end();
                    }
                });
            }else {
                res.status(401).render('paginas/clientes/registrarse', {mensaje: 'Región incorrecta'});
                return res.end();
            } */
    }else {
        res.status(401).render('paginas/clientes/registrarse', {mensaje: 'País incorrecto'});
        return res.end();
    }
}

//-- Exportamos la función de localización del cliente para unificarlo al resto de rutas.
module.exports = localizacionCliente;