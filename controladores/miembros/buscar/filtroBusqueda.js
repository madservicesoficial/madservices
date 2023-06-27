//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { filtroTipoEmpresadb, filtroNombreEmpresadb, filtroNombreTipoEmpresadb } = require('../../../modelos/miembros/buscar/buscar.js');
const { mostrarProductosTheMallMiembroMADdb } = require('../../../modelos/miembros/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const filtroBusquedaMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
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
        mostrarProductosTheMallMiembroMADdb(id, res);
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
        filtroTipoEmpresadb(id, seleccion, res);
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
        filtroNombreEmpresadb(id, nombre, res);
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
        filtroNombreTipoEmpresadb(id, seleccion, nombre, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = filtroBusquedaMiembro;
//#######################################################################################################//