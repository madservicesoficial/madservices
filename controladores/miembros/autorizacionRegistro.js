//-- Importamos la configuración del entorno ENV para poder usar su información.
require('../../config/env.js');

//-- Creamos el Punto de Control para configurar la autorización de los miembros MAD para Registro.
const autorizacionRegistroMiembros = {}

autorizacionRegistroMiembros.autorizacionRegistro = async (req, res) => {

    //-- Introducir correctamente la contraseña para poder acceder.
    const password = req.body.password;
    //-- Condición de haber metido correctamente la contraseña.
    if(password === process.env.MYSQL_PASSWORD_ADMIN) {
        return res.redirect('/registrarse/autorizar/miembro');
    }else if(!password) {
        res.status(401).render('paginas/miembros/autorizacionRegistro', {msjError: 'Campo vacío'});
        return res.end();
    }else {
        res.status(401).render('paginas/miembros/autorizacionRegistro', {msjError: 'Contraseña incorrecta'});
        return res.end();
    }
}

//-- Exportamos la configuración de autorizar a miembros MAD para unificarlo con el resto de rutas.
module.exports = autorizacionRegistroMiembros;