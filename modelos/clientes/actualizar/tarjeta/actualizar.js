//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../../config/database.js');

//-- Crear la función para consultar si hay tarjeta bancaria en base de datos o no.
const consultarTarjetaBankdb = (id, existenciaTarjBank, callback) => {

    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            existenciaTarjBank = 0;
            callback(existenciaTarjBank);
        }else {
            existenciaTarjBank = 1;
            callback(existenciaTarjBank);
        }
    });
}
//-- Crear la función para editar el nº de la tarjeta bancaria en base de datos.
const editarNumTarjetaBankdb = (id, numtarjeta) => {

    let instruccionActualizarTarjetaBank = 'UPDATE tarjeta SET numcard = ? WHERE id = ?';
    let formatoInstruccionActualizarTarjetaBank = mysql.format(instruccionActualizarTarjetaBank, [numtarjeta, id]);
    madservicesClientedb.query(formatoInstruccionActualizarTarjetaBank);
}
const editarValidezTarjetaBankdb = (id, validez, res) => {

    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            //-- Mostrar alerta.
            alerta('No hay ninguna tarjeta bancaria en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            const newExpiracion = validez + '-01';
            let instruccionActualizarTarjetaBank = 'UPDATE tarjeta SET expiracion = ? WHERE id = ?';
            let formatoInstruccionActualizarTarjetaBank = mysql.format(instruccionActualizarTarjetaBank, [newExpiracion, id]);
            madservicesClientedb.query(formatoInstruccionActualizarTarjetaBank);
            //-- Mostrar alerta.
            alerta('Fecha de validez de la tarjeta bancaria actualizada en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }
    });
}
const editarNombreTarjetaBankdb = (id, namecard, res) => {

    let instruccionVerTarjetaBank = 'SELECT * FROM tarjeta WHERE id = ?';
    let formatoInstruccionVerTarjetaBank = mysql.format(instruccionVerTarjetaBank, [id]);
    madservicesClientedb.query(formatoInstruccionVerTarjetaBank, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            //-- Mostrar alerta.
            alerta('No hay ninguna tarjeta bancaria en tu perfil');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            if(namecard > 148) {
                //-- Mostrar alerta y redirigir a donde estaba de nuevo.
                alerta(`${namecard} demasiado largo`);
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }else {
                let instruccionActualizarTarjetaBank = 'UPDATE tarjeta SET cliente = ? WHERE id = ?';
                let formatoInstruccionActualizarTarjetaBank = mysql.format(instruccionActualizarTarjetaBank, [namecard, id]);
                madservicesClientedb.query(formatoInstruccionActualizarTarjetaBank);
                //-- Mostrar alerta.
                alerta('Nombre de la tarjeta bancaria actualizado en tu perfil');
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }
        }
    });
}

//-- Crear la función para editar el código CVV de la tarjeta bancaria en base de datos.
const editarCVVTarjetaBankdb = (id, cvv) => {

    let instruccionActualizarTarjetaBank = 'UPDATE tarjeta SET cvv = ? WHERE id = ?';
    let formatoInstruccionActualizarTarjetaBank = mysql.format(instruccionActualizarTarjetaBank, [cvv, id]);
    madservicesClientedb.query(formatoInstruccionActualizarTarjetaBank);
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    consultarTarjetaBankdb,
    editarNumTarjetaBankdb,
    editarValidezTarjetaBankdb,
    editarNombreTarjetaBankdb,
    editarCVVTarjetaBankdb
};
//#######################################################################################################//