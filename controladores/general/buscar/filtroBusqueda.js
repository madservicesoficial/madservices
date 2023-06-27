//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { filtroTipoEmpresadb, filtroNombreEmpresadb, filtroTotalEmpresadb } = require('../../../modelos/general/buscar/buscar.js');
const { mostrarProductosTheMalldb } = require('../../../modelos/general/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const filtroBusqueda = (req, res) => {

    //-- Variables y Ctes.
    const seleccion = req.body.seleccion;
    const nombre = req.body.nombre;
    //-- Proceso de validación.
    if(!seleccion && !nombre) {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: 'Todo el Centro Comercial',
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        mostrarProductosTheMalldb(res);
    }else if(seleccion && !nombre) {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: `Por empresa tipo ${seleccion}`,
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        filtroTipoEmpresadb(seleccion, res);
    }else if(!seleccion && nombre) {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: `Por la empresa de ${nombre}`,
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        filtroNombreEmpresadb(nombre, res);
    }else if(seleccion && nombre) {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: `Por la empresa de ${nombre} de tipo ${seleccion}`,
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        filtroTotalEmpresadb(seleccion, nombre, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = filtroBusqueda;
//#######################################################################################################//