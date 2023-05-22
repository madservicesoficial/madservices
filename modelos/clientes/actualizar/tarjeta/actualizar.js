//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../../config/database.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para validar datos de la tarjeta bancaria del cliente.
const validarCard = require('card-validator');

//-- Creamos las funciones para actualizar la tarjeta bancaria en el perfil.
const editarNumTarjetaBankdb = (id, numtarjeta, res) => {

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
            //-- Validamos el nº de tarjeta bancaria.
            const validacionCard = validarCard.number(numtarjeta);
            if(!validacionCard.isValid || numtarjeta.length > 18) {
                //-- Mostrar alerta.
                alerta(`${numtarjeta} no es un nº de tarjeta bancaria válido`);
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }else {
                let instruccionActualizarTarjetaBank = 'UPDATE tarjeta SET numcard = ? WHERE id = ?';
                let formatoInstruccionActualizarTarjetaBank = mysql.format(instruccionActualizarTarjetaBank, [numtarjeta, id]);
                madservicesClientedb.query(formatoInstruccionActualizarTarjetaBank);
                //-- Mostrar alerta.
                alerta('Nº de tarjeta bancaria actualizado en tu perfil');
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }
        }
    });
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
const editarCVVTarjetaBankdb = (id, cvv, res) => {

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
            //-- Comprobar que el CVV es válido y actualizarlo.
            const validacionCVV = validarCard.cvv(cvv);
            if(!validacionCVV.isValid) {
                //-- Mostrar alerta.
                alerta(`${cvv} no es un CVV válido`);
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }else {
                let instruccionActualizarTarjetaBank = 'UPDATE tarjeta SET cvv = ? WHERE id = ?';
                let formatoInstruccionActualizarTarjetaBank = mysql.format(instruccionActualizarTarjetaBank, [cvv, id]);
                madservicesClientedb.query(formatoInstruccionActualizarTarjetaBank);
                //-- Mostrar alerta.
                alerta('CVV de la tarjeta bancaria actualizado en tu perfil');
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }
        }
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    editarNumTarjetaBankdb,
    editarValidezTarjetaBankdb,
    editarNombreTarjetaBankdb,
    editarCVVTarjetaBankdb
};
//#######################################################################################################//