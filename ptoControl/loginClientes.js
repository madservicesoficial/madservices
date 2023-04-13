//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos la Tecnología para cifrar y verificar las contraseñas.
const { hash } = require('bcrypt');

//-- Creamos el Punto de Control para configurar el inicio de sesión de los Clientes.
const loginClientes = {}

loginClientes.clienteLogin = async (req, res) => {

    //-- Introducimos los campos para Iniciar Sesión como Cliente.
    const email = req.body.email;
    const password = req.body.password;
    //-- Comprobamos que ningún campo está vacío.
    if(!email || !password) {
        res.status(401).render('paginas/clienteLogin', {mensaje: 'Debes ingresar el correo electrónico y la contraseña'});
        return res.end();
    }
    //-- Configuramos el sistema para cifrar la contraseña metida.
    const passwordCifrada = await hash(password, 1);
    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT id FROM clientes WHERE email = ?';
    //-- Establecer la comunicación para consultar el email en la base de datos.
    madservicesdb.query(instruccionConsultar, [email], (error, results) => {
        if(error) throw error;
        if(results.length === 0 || (passwordCifrada !== results[0].password)) {
            res.status(401).render('paginas/clienteLogin', { mensaje: 'Correo electrónico y/o contraseña incorrectas' });
            return res.end();
        }else {
            req.session.id = results[0].id;
            res.redirect('/:id');
        }
    });
}

//-- Exportamos la configuración de inicio de sesión de los Clientes para unificarlo con el resto de rutas.
module.exports = loginClientes;