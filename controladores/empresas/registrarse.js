//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { registrarEmpresaVerificadadb } = require('../../modelos/empresas/operacionesDB.js');
//-- Importamos la Tecnología para validar datos enviados por la Empresa.
const validacion = require("validator");
//-- Importamos la Tecnología para validar el CIF/NIF introducido.
const cifvalidacion = require('nif-dni-nie-cif-validation');

//-- Creamos el Punto de Control para configurar el registro de las Empresas.
const registroEmpresas = (req, res) => {
    
    //-- Obtenemos los campos de entrada del Registro de las Empresas.
    const marca = req.body.marca;
    const nif = req.body.nif;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const tipo = req.body.tipo;
    //-- Declaración de ctes.
    const minLong = 3;
    const minLong2 = 4 * minLong - 2;
    const maxLong = 98;
    const maxLong2 = 50 + maxLong;
    //-- Comprobamos que no hay campos vacíos.
    if(!email || !password || !confirmPassword || !marca || !nif || !tipo) {
        res.status(401).render('paginas/empresas/registrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
        if(password !== confirmPassword) {
            res.status(401).render('paginas/empresas/registrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
            return res.end();
        }else {
            //-- Si no, chequeamos que cada campo cumpla con los requisitos.
            if(marca.length < minLong || marca.length > maxLong2) {
                res.status(401).render('paginas/empresas/registrarse', {mensaje: 'La marca empresarial es demasiado larga'});
                return res.end();
            }else if(!cifvalidacion.isValidCif(nif) || !cifvalidacion.isValidNif(nif)) {
                res.status(401).render('paginas/empresas/registrarse', {mensaje: 'El CIF/NIF no es oficial'});
                return res.end();
            }else if(!validacion.isEmail(email)) {
                res.status(401).render('paginas/empresas/registrarse', { mensaje: `El Email: ${email} no es válido`});
                return res.end();
            }else if(!validacion.isLength(password, { min: minLong2, max: maxLong}) && !validacion.matches(password, /[a-z]/)
            && !validacion.matches(password, /[A-Z]/) && !validacion.matches(password, /[0-9]/) &&
            !validacion.matches(password, /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
                res.status(401).render('paginas/empresas/registrarse', 
                {
                    mensaje: `La contraseña debe contener como mínimo ${minLong2} caracteres, letras`,
                    mensaje2: 'minúsculas y mayúsculas, números y caracteres especiales'
                });
                return res.end();
            }else {
                //-- Registramos la Empresa en la base de datos de MAD Services, verificando que no existía ya.
                registrarEmpresaVerificadadb
                (
                    {email: email, marca: marca, nif: nif, tipo: tipo},
                    password,
                    res
                );
            }
        }
    }
};

//-- Exportamos la configuración de registro de las Empresas para unificarlo con el resto de rutas.
module.exports = registroEmpresas;