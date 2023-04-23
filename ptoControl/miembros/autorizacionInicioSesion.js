//-- Importamos la configuración del entorno ENV para poder usar su información.
require('../config/env.js');

//-- Creamos el Punto de Control para configurar la autorización de los miembros MAD para Login.
const autorizacionMiembroMADLogin = {}

autorizacionMiembroMADLogin.autorizacionMiembroMADLogin = async (req, res) => {

    //-- Introducir correctamente la contraseña para poder acceder.
    const passwordMAD = req.body.passwordMAD;
    //-- Condición de haber metido correctamente la contraseña.
    if(passwordMAD === process.env.MYSQL_PASSWORD_ADMIN) {
        res.redirect('/login/miembroMAD');
        return res.end();
    }else if(!passwordMAD) {
        res.render('paginas/autorizacionMiembroMADLogin', {msjError: 'Campo vacío'});
        return res.end();
    }else {
        res.render('paginas/autorizacionMiembroMADLogin', {msjError: 'Contraseña incorrecta'});
        return res.end();
    }
}

//-- Exportamos la configuración de autorizar a miembros MAD para unificarlo con el resto de rutas.
module.exports = autorizacionMiembroMADLogin;