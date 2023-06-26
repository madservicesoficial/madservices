//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { filtroTipoEmpresadb, filtroNombreEmpresadb, filtroNombreTipoEmpresadb } = require('../../../modelos/clientes/buscar/buscar.js');
const { mostrarProductosTheMallClientedb } = require('../../../modelos/clientes/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const filtroBusquedaCliente = (req, res) => {

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
        mostrarProductosTheMallClientedb(id, res);
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
        filtroNombreTipoEmpresadb(id, nombre, seleccion, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = filtroBusquedaCliente;
//#######################################################################################################//