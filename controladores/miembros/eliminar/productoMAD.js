//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { borrarProductoMADdb, consultarEnumeracionAndActualizardb } = require('../../../modelos/miembros/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const borrarProductoMAD = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const enumeracion = req.body.enumeracion;
    const ptoPartida = parseInt(enumeracion, 10);
    //-- Llamada a 1º función.
    borrarProductoMADdb(ptoPartida);
    //-- Llamada a 2º función.
    let enumeracionSig = ptoPartida + 1;
    consultarEnumeracionAndActualizardb(enumeracionSig);
    //-- Renderizar y mostrar mensaje.
    notifier.notify(
        {
            sound: true,
            wait: true,
            title: '¡Eliminado!',
            message: 'Producto MAD borrado',
            icon: path.join(__dirname, '../../../public/images/correcto.png')
        }
    );
    res.status(201);
    res.redirect(`/sesion-miembro/${id}/productosmadservices`);
    return res.end();
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = borrarProductoMAD;
//#######################################################################################################//