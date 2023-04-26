//-- Importamos la Tecnología para validar datos enviados por el cliente.
const { check, validationResult } = require("express-validator");

//-- la función de Express-Validator: isEmail(), comprueba que el email introducido cumple con el estándar RFC5322, estándar basado
//-- en que la estructura válida de un correo electrónico debe cumplir uno de estos tres esquemas:
//-- 1) usuario@dominio.com
//-- 2) usuario123@subdominio.dominio.co.uk
//-- 3) usuario+etiqueta@dominio.com
//-- Es decir, debe cumplir con la estructura: usuario + @ + dominio (incluyendo o no subdominio) + terminación .com (global/comercial)
//-- o .es (España) o .abreviacionPais (cualquier otro pais).

//-- Creamos la función que valida los datos enviados por el cliente.
const validacionCamposCliente = (data, req, res) => {

    //-- Declaración de ctes.
    const minLong = 3;
    const maxLong = 48;
    const maxLong2 = 2 * maxLong;
    //-- Comprobamos que ningún campo está vacío.
    if(!data.email || !data.password || !data.confirmPassword || !data.nombre || !data.apellidos || !data.direccion ||
    !data.poblacion || !data.region || !data.pais || !data.cp || !data.genero) {
        check(data.nombre).notEmpty().withMessage('El campo nombre no puede quedar vacío');
        check(data.apellidos).notEmpty().withMessage('El campo apellidos no puede quedar vacío');
        check(data.genero).notEmpty().withMessage('El campo género no puede quedar vacío');
        check(data.email).notEmpty().withMessage('El campo email no puede quedar vacío');
        check(data.password).notEmpty().withMessage('El campo contraseña no puede quedar vacío');
        check(data.confirmPassword).notEmpty().withMessage('El campo confirmar la contraseña no puede quedar vacío');
        check(data.direccion).notEmpty().withMessage('El campo dirección no puede quedar vacío');
        check(data.poblacion).notEmpty().withMessage('El campo población no puede quedar vacío');
        check(data.region).notEmpty().withMessage('El campo región no puede quedar vacío');
        check(data.pais).notEmpty().withMessage('El campo país no puede quedar vacío');
        check(data.cp).notEmpty().withMessage('El campo Código Postal no puede quedar vacío');
    }else {
        //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
        if(data.password !== data.confirmPassword) {
            res.status(401).render('paginas/clientes/registrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
            return res.end();
        }else {
            //-- Si no, chequeamos que cada campo cumpla con los requisitos.
            check(data.nombre)
                .isLength({ min: minLong, max: maxLongNombre }).withMessage(`El nombre debe tener entre ${minLong} y ${maxLong} caracteres`);
            check(data.apellidos)
            .isLength({ min: minLong, max: maxLong }).withMessage(`Los apellidos deben tener entre ${minLong} y ${maxLong2} caracteres`);
            check(data.email)
                .isEmail().withMessage(`El Email: ${data.email} debe seguir la estructura válida Internacional`)
                .isIn(['gmail', 'yahoo', 'outlook', 'hotmail']).withMessage(`El Email: ${data.email} sólo puede ser de: Gmail, Yahoo, Hotmail u Outlook`)
                .matches(/^[a-zA-Z0-9]+[!@#\$%\^&\*]+[a-zA-Z0-9]+$/).withMessage('La parte de usuario del correo electrónico debe contener letras, números y un carácter especial');
            check(data.password)
                .matches(/^[a-zA-Z0-9]+[!@#\$%\^&\*]+[a-zA-Z0-9]+$/).withMessage('La contraseña debe contener letras, números y un carácter especial')
            check(data.direccion)
        }
    }
}

//-- Exportamos dicha función para unirlo al resto del programa.
module.exports = validacionCamposCliente;