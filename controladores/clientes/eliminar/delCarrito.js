//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { quitarProductosdb } = require('../../../modelos/clientes/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const quitarProductos = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const titulo = req.body.titulo;
    //-- Llamada a función.
    quitarProductosdb
    (
        id, titulo,
        (cantidad) => {
            if(cantidad === 1) {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Carrito modificado!',
                        message: `${titulo} eliminado del carrito`,
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
                codResp = 201;
                res.status(codResp);
                res.redirect(`/sesion-cliente/${id}/carrito`);
                return res.end();
            }else {
                //-- Renderizar y mostrar mensaje.
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Carrito modificado!',
                        message: `Hemos quitado un producto de los ${cantidad} que había en ${titulo}`,
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
                codResp = 201;
                res.status(codResp);
                res.redirect(`/sesion-cliente/${id}/carrito`);
                return res.end();
            }
        }
    );
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = quitarProductos;
//#######################################################################################################//