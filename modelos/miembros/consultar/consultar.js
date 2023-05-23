//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../../config/database.js');

//-- Creamos la función para consultar la enumeración del producto MAD de la base de datos de MAD Services.
const consultarEnumeracionAndActualizardb = (enumeracionSig) => {

    //-- Consultamos los productos MAD en la base de datos.
    let instruccionConsultarProductoMAD = 'SELECT * FROM productos WHERE enumeracion = ?';
    let formatoInstruccionConsultarProductoMAD = mysql.format(instruccionConsultarProductoMAD, [enumeracionSig]);
    //-- Establecer la comunicación para sacarlo como variable.
    madservicesAdmindb.query(formatoInstruccionConsultarProductoMAD, (error, salida) => {
        if(error) throw error;
        if(salida.length > 0) {
            let enumeracionAnt = enumeracionSig - 1;
            //-- Proceso de actualización de la enumeración del producto.
            let instruccionCambioEnumeracion = 'UPDATE productos SET enumeracion = ? WHERE enumeracion = ?';
            let formatoInstruccionCambioEnumeracion = mysql.format(instruccionCambioEnumeracion, [enumeracionAnt, enumeracionSig]);
            madservicesAdmindb.query(formatoInstruccionCambioEnumeracion);
            enumeracionSig = enumeracionSig + 1;
            //-- Llamamos de nuevo a la función.
            consultarEnumeracionAndActualizardb(enumeracionSig);
        }
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    consultarEnumeracionAndActualizardb
};
//#######################################################################################################//