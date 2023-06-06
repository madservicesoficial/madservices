//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { editarCVVTarjetaBankdb } = require('../../../../modelos/clientes/actualizar/tarjeta/actualizar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const editarCVVTarjetaBank = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const cvv = req.body.cvv;
    //-- Proceso de validación.
    if(cvv) {
        //-- Llamada a función.
        editarCVVTarjetaBankdb(id, cvv, res);
    }else {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Atención!',
                message: 'Sin cambios en la tarjeta bancaria',
                icon: path.join(__dirname, '../../../../public/images/indiferencia.png')
            }
        );
        res.status(304).render('paginas/clientes/perfil', { id: id });
        return res.end();
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = editarCVVTarjetaBank;
//#######################################################################################################//