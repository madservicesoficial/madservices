//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarApellidosdb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarApellidos = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const apellidos = req.body.apellidos;
    const maxLong = 96;
    //-- Llamada a función.
    if(apellidos) {
        if(apellidos.length > maxLong) {
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: `Apellidos más largos de ${maxLong} caracteres`,
                    icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                }
            );
            res.status(401).render('paginas/clientes/perfil');
            return res.end();
        }else {
            actualizarApellidosdb(id, apellidos);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Actualizado!',
                    message: 'Los apellidos se han actualizado',
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
                message: 'Apellidos no actualizados',
                icon: path.join(__dirname, '../../../public/images/NotModified.png')
            }
        );
        res.status(304).render('paginas/clientes/perfil');
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarApellidos;
//#######################################################################################################//