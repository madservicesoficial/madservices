//-- Importamos la configuración del entorno ENV para poder usar su información.
require('../config/env.js');

//-- Creamos el Punto de Control para configurar la autorización de los miembros MAD para Registro.
const autorizacionMiembroMADRegistro = {}

autorizacionMiembroMADRegistro.autorizacionMiembroMADRegistro = async (req, res) => {

    //-- Introducir correctamente la contraseña para poder acceder.
    const passwordMAD = req.body.passwordMAD;
    //-- Condición de haber metido correctamente la contraseña.
    if(passwordMAD === process.env.MYSQL_PASSWORD) {
        res.redirect('/registrarse/miembroMAD');
        return res.end();
    }else {
        res.render('paginas/autorizacionMiembroMADRegistro', {msjError: 'Contraseña incorrecta'});
        return res.end();
    }
}

//-- Exportamos la configuración de autorizar a miembros MAD para unificarlo con el resto de rutas.
module.exports = autorizacionMiembroMADRegistro;