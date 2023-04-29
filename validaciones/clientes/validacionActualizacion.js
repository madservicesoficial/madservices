//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarClienteVerificadodb, mostrarClienteVerificadodb } = require('../../modelos/clientes/operacionesDB.js');
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
const validacionCamposCliente = (id, oldpassword, newpassword, repitePassword, data, res) => {

    //-- Declaración de ctes.
    const minLong = 3;
    const minLong2 = 4 * minLong;
    const maxLong = 48;
    const maxLong2 = 2 * maxLong;
    //-- Si no, chequeamos que cada campo cumpla con los requisitos.
    if(data.nombre.length < minLong || data.nombre.length > maxLong) {
        res.status(401).render('paginas/clientes/perfil', {mensaje: `El nombre debe tener entre ${minLong} y ${maxLong} caracteres`});
        return res.end();
    }
    if(data.apellidos.length < minLong || data.apellidos.length > maxLong2) {
        res.status(401).render('paginas/clientes/perfil', {mensaje: `Los apellidos deben tener entre ${minLong} y ${maxLong2} caracteres`});
        return res.end();
    }
    const estructuraEmail = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|es)$/;
    if(validacion.isEmail(data.email) && estructuraEmail.test(data.email)) {
        console.log('Email verificado y correcto');
    }else {
        res.status(401).render('paginas/clientes/perfil', 
        {
            mensaje: `El Email: ${data.email} debe seguir la estructura válida Internacional`
        });
        return res.end();
    }
    const paises = getCountries();
    if(paises.includes(data.pais)) {
        console.log('País verificado y correcto');
    }else {
        res.status(401).render('paginas/clientes/perfil', {mensaje: 'País incorrecto'});
        return res.end();
    }
    const codigoPais = getCode(data.pais);
    if(postcodeValidator(data.cp, codigoPais)) {
        console.log('Código Postal verificado y correcto');
    }else {
        res.status(401).render('paginas/clientes/perfil', {mensaje: 'Código Postal incorrecto'});
        return res.end();
    }
    //-- Declaramos las variables o campos del cliente.
    const email = data.email;
    const nombre = data.nombre;
    const apellidos = data.apellidos;
    const direccion = data.direccion;
    const poblacion = data.poblacion;
    const region = data.region;
    const pais = data.pais;
    const cp = data.cp;
    const genero = data.genero;
    //-- Actualizamos todos los campos menos la contraseña.
    actualizarClienteVerificadodb
    (
        id,
        {nombre: nombre, apellidos: apellidos, genero: genero, email: email, direccion: direccion,
        poblacion: poblacion, region: region, pais: pais, cp: cp}
    );
    //-- Actualizamos la contraseña y mostramos en función de lo que se haya introducido en ella.
    mostrarClienteVerificadodb
    (
        id,
        oldpassword,
        newpassword,
        repitePassword,
        res
    );
}

//-- Exportamos dicha función para unirlo al resto del programa.
module.exports = validacionCamposCliente;