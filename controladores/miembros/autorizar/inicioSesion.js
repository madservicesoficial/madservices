//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//###################################### ENTORNO DE VARIABLES ENV #######################################//
require('../../../config/env.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const autorizacionInicioSesionMiembros = (req, res) => {

    //-- Variables y Ctes.
    const password = req.body.password;
    //-- Proceso de validación.
    if(password === process.env.MYSQL_PASSWORD_ADMIN) {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Acceso confirmado!',
                message: 'La contraseña se ha escrito correctamente',
                icon: path.join(__dirname, '../../../public/images/correcto.png')
            }
        );
        res.status(201);
        res.redirect('/login/autorizar/miembro');
        return res.end();
    }else if(!password) {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Acceso denegado!',
                message: 'Campo vacío',
                icon: path.join(__dirname, '../../../public/images/incorrecto.png')
            }
        );
        res.status(401).render('paginas/miembros/autorizacionInicioSesion');
        return res.end();
    }else {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Acceso denegado!',
                message: 'Contraseña incorrecta',
                icon: path.join(__dirname, '../../../public/images/incorrecto.png')
            }
        );
        res.status(401).render('paginas/miembros/autorizacionInicioSesion');
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = autorizacionInicioSesionMiembros;
//#######################################################################################################//