//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { borrarProductoMADdb } = require('../../../modelos/miembros/eliminar/eliminar.js');
const { consultarEnumeracionAndActualizardb } = require('../../../modelos/miembros/consultar/consultar.js');
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
    //-- Mostrar alerta.
    alerta('Producto MAD borrado');
    //-- Redirigir.
    return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = borrarProductoMAD;
//#######################################################################################################//