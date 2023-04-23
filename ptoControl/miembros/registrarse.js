//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { registrarMiembroVerificadodb } = require('../operacionesdb');

//-- Creamos el Punto de Control para configurar el registro de los Clientes.
const registroMiembros = {}

registroMiembros.registrarse = (req, res) => {

    //-- Obtenemos los campos de entrada del Registro de los Miembros MAD.
    const miembro = req.body.miembro;
    const departamento = req.body.departamento;
    const genero = req.body.genero;
    const email = req.body.email; 
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    //-- Comprobamos que ningún campo está vacío.
    if(!miembro || !departamento || !genero || !email || !password || !confirmPassword) {
        res.status(401).render('paginas/miembros/registrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }
    //-- Comprobamos que la Contraseña metida y la confirmación de la Contraseña son iguales.
    if(password !== confirmPassword) {
        res.status(401).render('paginas/miembros/registrarse', {mensaje: 'Introduce la misma contraseña en ambos campos'});
        return res.end();
    }
    //-- Registramos el Miembro MAD en la base de datos de MAD Services, verificando que no existía ya.
    registrarMiembroVerificadodb
    (
        {miembro: miembro, departamento: departamento, genero: genero, email: email, password: password,
        confirmPassword: confirmPassword},
        res
    );
}

//-- Exportamos la configuración de registro de los Miembros MAD para unificarlo con el resto de rutas.
module.exports = registroMiembros;