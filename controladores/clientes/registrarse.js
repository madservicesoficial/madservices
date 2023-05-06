//-- Importamos la Tecnología para validar datos enviados por el cliente.
const validacion = require("validator");
//-- Importamos la función que verifica la localización del cliente.
const localizacionCliente = require('../../localizacion/localizacionCliente.js');

//-- Creamos el Punto de Control para configurar el registro de los Clientes.
const registroClientes = (req, res) => {
    
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
    if(!email || !password || !confirmPassword || !nombre || !apellidos || !genero || !direccion || !poblacion || !region || !pais) {
        res.status(401).render('paginas/clientes/registrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
        if(password !== confirmPassword) {
            res.status(401).render('paginas/clientes/registrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
            return res.end();
        }else {
            //-- Si no, chequeamos que cada campo cumpla con los requisitos.
            if(nombre.length < minLong || nombre.length > maxLong) {
                res.status(401).render('paginas/clientes/registrarse', {mensaje: `El nombre no puede ser más largo de ${maxLong} caracteres`});
                return res.end();
            }else if(apellidos.length < minLong || apellidos.length > maxLong2) {
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
                localizacionCliente
                (
                    {email: email, password: password, nombre: nombre, apellidos: apellidos, direccion: direccion, poblacion: poblacion,
                    region: region, pais: pais, cp: cp, genero: genero},
                    res
                );
            }
        }
    }
};

//-- Exportamos la configuración de registro de los Clientes para unificarlo con el resto de rutas.
module.exports = registroClientes;