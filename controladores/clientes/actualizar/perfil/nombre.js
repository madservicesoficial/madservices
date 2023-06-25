//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { actualizarNombredb } = require('../../../../modelos/clientes/actualizar/perfil/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const actualizarNombre = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const nombre = req.body.nombre;
    const maxLong = 48;
    //-- Llamada a función.
    if(nombre) {
        if(nombre.length > maxLong) {
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Atención!',
                    message: `Nombre más largo de ${maxLong} caracteres`,
                    icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                }
            );
            res.status(401).render('paginas/clientes/perfil');
            return res.end();
        }else {
            actualizarNombredb(id, nombre);
            //-- Renderizar y mostrar mensaje.
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Actualizado!',
                    message: 'El nombre se ha actualizado',
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
                message: 'Nombre no actualizado',
                icon: path.join(__dirname, '../../../public/images/NotModified.png')
            }
        );
        res.status(304).render('paginas/clientes/perfil');
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = actualizarNombre;
//#######################################################################################################//