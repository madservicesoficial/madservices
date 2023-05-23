//###################################### ENTORNO DE VARIABLES ENV #######################################//
require('../../config/env.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const autorizacionInicioSesionMiembros = (req, res) => {

    //-- Variables y Ctes.
    const password = req.body.password;
    //-- Proceso de validación.
    if(password === process.env.MYSQL_PASSWORD_ADMIN) {
        //-- Redirigir.
        return res.status(201).redirect('/login/autorizar/miembro');
    }else if(!password) {
        //-- Renderizar y mostrar mensaje.
        res.status(401).render('paginas/miembros/autorizacionInicioSesion', {msjError: 'Campo vacío'});
        return res.end();
    }else {
        //-- Renderizar y mostrar mensaje.
        res.status(401).render('paginas/miembros/autorizacionInicioSesion', {msjError: 'Contraseña incorrecta'});
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = autorizacionInicioSesionMiembros;
//#######################################################################################################//