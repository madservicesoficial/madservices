//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');

//-- Creamos el Punto de Control para configurar el inicio de sesión de los Clientes.
const loginClientes = {}

loginClientes.clienteLogin = (req, res) => {

    //-- Introducimos los campos para Iniciar Sesión como Cliente.
    const email = req.body.email;
    const password = req.body.password;
    //-- Comprobamos que ningún campo está vacío.
    if(!email || !password) {
        res.status(401).render('paginas/clienteLogin', {mensaje: 'Campos vacíos'});
    }
    //-- Instrucción para consultar en la base de datos.
    let instruccionConsultar = 'SELECT * FROM clientes WHERE email = ?';
    //-- Establecer la comunicación para consultar el email y la contraseña en la base de datos,
    //-- e iniciar sesión con el id.
    madservicesdb.query(instruccionConsultar, [email], (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            res.status(401).render('paginas/clienteLogin', { mensaje: 'Correo electrónico incorrecto' });
        }else {
            const miembro = results[0];
            bcrypt.compare(password, miembro.password, (error, match) => {
                if(error) throw error;
                if (match) {
                    
                }else {
                    res.status(401).render('paginas/clienteLogin', { mensaje: 'Contraseña incorrecta' });
                }
            })
        }
    });
}

//-- Exportamos la configuración de inicio de sesión de los Clientes para unificarlo con el resto de rutas.
module.exports = loginClientes;