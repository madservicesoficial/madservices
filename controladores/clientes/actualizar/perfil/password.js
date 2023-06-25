//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//-- Importamos la Tecnología para validar datos enviados por el cliente.
const validacion = require("validator");
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarPassworddb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarPasswordCliente = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
    let validezOldPassword = true;
    //-- Llamada a función.
    actualizarPassworddb(id, oldpassword, newpassword, repitePassword);
    //-- Llamada a función.
    if(oldpassword && newpassword && repitePassword) {
        consultaOldPassworddb(id, validezOldPassword, oldpassword);
        if(validezOldPassword === true) {

        }else {
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: 'No conoces la contraseña anterior',
                    icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                }
            );
            res.status(401).render('paginas/clientes/perfil');
            return res.end();
        }
        if(!validacion.isEmail(email)) {
            
        }else {
            actualizarEmaildb(id, email);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Actualizado!',
                    message: 'El correo electrónico se ha actualizado',
                    icon: path.join(__dirname, '../../../public/images/correcto.png')
                }
            );
            res.status(201).render('paginas/clientes/perfil');
            return res.end();
        }
    }else {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Sin cambios!',
                message: 'Contraseña no actualizada',
                icon: path.join(__dirname, '../../../public/images/NotModified.png')
            }
        );
        res.status(304).render('paginas/clientes/perfil');
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarPasswordCliente;
//#######################################################################################################//