//-- Importamos la Tecnología para validar campos de registro.
const validacion = require('validator');
//-- Importamos la Tecnología para validar contraseñas.
const validacionPassword = require('password-validator');

//-- Crear esquema de validación.
var estructuraPassword = new validacionPassword();

//-- Definir las propiedades de validación.
estructuraPassword
.is().min(15)
.is().max(40)
.has().not().spaces()

//-- Exportamos la validación de los clientes.
module.exports.validacionClientes = async (req,res, next) => {
    var mensaje = await formularioValidacion(req.body);
    if(mensaje)
    {
        next();
    }
    else
    {
        res.render('paginas/clienteRegistrarse');
    }
}

//-- Creamos la función de validación del formulario.
const formularioValidacion = async (data) => {
    //-- Obtenemos los campos de entrada del Registro de los Clientes.
    const { email, password, confirmPassword, nombre, apellidos, direccion, poblacion, region, pais, cp, genero } = data;

    
}