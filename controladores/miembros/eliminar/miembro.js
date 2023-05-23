//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { darseBajaMiembrodb } = require('../../../modelos/miembros/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const darseBajaMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    const decideConfirmar = req.body.decideConfirmar;
    //-- Llamada a función.
    darseBajaMiembrodb(id, decideConfirmar, req, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = darseBajaMiembro;
//#######################################################################################################//