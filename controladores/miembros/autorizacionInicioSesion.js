//-- Importamos la configuración del entorno ENV para poder usar su información.
require('../../config/env.js');

//-- Creamos el Punto de Control para configurar la autorización de los miembros MAD para Login.
const autorizacionInicioSesionMiembros = {}

autorizacionInicioSesionMiembros.autorizacionInicioSesion = async (req, res) => {

    //-- Introducir correctamente la contraseña para poder acceder.
    const password = req.body.password;
    //-- Condición de haber metido correctamente la contraseña.
    if(password === process.env.MYSQL_PASSWORD_ADMIN) {
        return res.status(201).redirect('/login/autorizar/miembro');
    }else if(!password) {
        res.status(401).render('paginas/miembros/autorizacionInicioSesion', {msjError: 'Campo vacío'});
        return res.end();
    }else {
        res.status(401).render('paginas/miembros/autorizacionInicioSesion', {msjError: 'Contraseña incorrecta'});
        return res.end();
    }
}

//-- Exportamos la configuración de autorizar a miembros MAD para unificarlo con el resto de rutas.
module.exports = autorizacionInicioSesionMiembros;