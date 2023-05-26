//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { bajaEmpresaPorMiembrodb } = require('../../../modelos/miembros/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const bajaEmpresaPorMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const email = req.body.email;
    const cif = req.body.cif;
    const idempresa = req.body.idempresa;
    //-- Proceso de validación.
    if(!email || !idempresa) {
        //-- Mostrar alerta.
        alerta('Campos vacíos');
        //-- Redirigir.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }else {
        //-- Llamada a función.
        bajaEmpresaPorMiembrodb(id, email, cif, idempresa, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = bajaEmpresaPorMiembro;
//#######################################################################################################//