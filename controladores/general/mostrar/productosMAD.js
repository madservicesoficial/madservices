//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { mostrarProductosMADdb } = require('../../../modelos/general/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const mostrarProductosMAD = (req, res) => {

    //-- Llamada a función.
    mostrarProductosMADdb(res);
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarProductosMAD;
//#######################################################################################################//