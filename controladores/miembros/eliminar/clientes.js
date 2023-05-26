//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { bajaClientePorMiembrodb } = require('../../../modelos/miembros/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const bajaClientePorMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const email = req.body.email;
    const idcliente = req.body.idcliente;
    //-- Proceso de validación.
    if(!email || !idcliente) {
        //-- Mostrar alerta.
        alerta('Campos vacíos');
        //-- Redirigir.
        return res.redirect(`/sesion-miembro/${id}/interfaz`);
    }else {
        //-- Llamada a función.
        bajaClientePorMiembrodb(id, email, idcliente, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = bajaClientePorMiembro;
//#######################################################################################################//