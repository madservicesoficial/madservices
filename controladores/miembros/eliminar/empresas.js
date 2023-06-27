//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { listaTodasEmpresasdb, bajaEmpresaPorMiembrodb } = require('../../../modelos/miembros/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const bajaEmpresaPorMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const email = req.body.email;
    const cif = req.body.cif;
    const idEmpresa = req.body.idempresa;
    //-- Proceso de validación.
    if(!email || !idEmpresa) {
        //-- Renderizar y mostrar mensaje.
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Atención!',
                message: 'Campos vacíos',
                icon: path.join(__dirname, '../../../public/images/incorrecto.png')
            }
        );
        res.status(401);
        res.redirect(`/sesion-miembro/${id}/interfaz`);
        return res.end();
    }else {
        //-- Llamada a función.
        listaTodasEmpresasdb
        (
            email, cif, idEmpresa,
            (confirmacion) => {
                if(confirmacion === true) {
                    //-- Llamada a función.
                    bajaEmpresaPorMiembrodb(idEmpresa);
                    //-- Renderizar y mostrar mensaje.
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Eliminado!',
                            message: 'Empresa dada de baja definitivamente',
                            icon: path.join(__dirname, '../../../public/images/correcto.png')
                        }
                    );
                    res.status(201);
                    res.redirect(`/sesion-miembro/${id}/interfaz`);
                    return res.end();
                }else {
                    //-- Renderizar y mostrar mensaje.
                    notifier.notify(
                        {
                            sound: true,
                            wait: true,
                            title: '¡Atención!',
                            message: 'Empresa Errónea',
                            icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                        }
                    );
                    res.status(401);
                    res.redirect(`/sesion-miembro/${id}/interfaz`);
                    return res.end();
                }
            }
        );
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = bajaEmpresaPorMiembro;
//#######################################################################################################//