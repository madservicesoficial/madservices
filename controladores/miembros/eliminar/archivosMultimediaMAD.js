//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { borrarArchivosMultimediaMADdb } = require('../../../modelos/miembros/eliminar/eliminar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const borrarArchivosMultimediaMAD = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let enumeracion = req.params.enumeracion;
    //-- Llamada a la función.
    borrarArchivosMultimediaMADdb(id, enumeracion, res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = borrarArchivosMultimediaMAD;
//#######################################################################################################//