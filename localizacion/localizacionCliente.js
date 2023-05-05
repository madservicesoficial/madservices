//-- Importamos la Tecnología para validar el país introducido.
const {getCountries, getCode} = require('country-list-spanish');
//-- Importamos la Tecnología para validar el Código Postal introducido.
const { postcodeValidator } = require('postcode-validator');

//-- Creamos la función para verificar la localización del cliente.
function localizacionCliente(pais, cp, region, poblacion, direccion) {

    //-- Declaración de la cte que saca todos los países del mundo en español.
    const paises = getCountries();
    //-- Proceso de verificación de la localización.
    if(paises.includes(pais)) {
        //-- Declaración de la cte que saca el código del país en español.
        const codigoPais = getCode(pais);
        if(postcodeValidator(cp, codigoPais)) {
            fetch(`http://api.geonames.org/searchJSON?country=${codigoPais}&adminCode1=ADM1&username=madservicesoficial`)
            .then(data => {
                //-- Procesamiento y obtención de la lista de regiones/provincias/estados.
                const regiones = data.geonames.map(region => region.adminCode1);
                if(region === regiones) {
                    fetch(`http://api.geonames.org/searchJSON?country=${codigoPais}&adminCode1=ADM1&name=${region}&username=madservicesoficial`)
                        .then(data => {
                            //-- Procesamiento y obtención de la lista de poblaciones.
                            const poblaciones = data.geonames.map(poblacion => poblacion.name);
                            if(poblacion === poblaciones) {
                                fetch(`http://api.geonames.org/postalCodeLookupJSON?postalcode=${cp}&country=${codigoPais}&username=madservicesoficial`)
                                    .then(data => {
                                        //-- Procesamiento y obtención de la lista de direcciones.
                                        const direcciones = data.postalcodes.map(pc => pc.placeName);
                                        if(direccion !== direcciones) {
                                            res.status(401).render('paginas/clientes/registrarse', {mensaje: 'Dirección incorrecta'});
                                            return res.end();
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
                }
            });
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