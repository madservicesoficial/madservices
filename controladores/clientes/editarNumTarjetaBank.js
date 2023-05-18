//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { editarNumTarjetaBankdb } = require('../../modelos/clientes/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar la actualización de la tarjeta bancaria del cliente.
const editarNumTarjetaBank = (req, res) => {

    //-- Obtenemos el parámetro del ID cliente.
    let id = req.params.id;
    //-- Obtenemos las ctes que confirman la actualización o no la tarjeta bancaria.
    const numtarjeta = req.body.numtarjeta;
    //-- Proceso de actualizar la tarjeta bancaria.
    if(numtarjeta) {
        editarNumTarjetaBankdb(id, numtarjeta, res);
    }else {
        //-- Mostrar alerta.
        alerta('No ha habido cambios en la tarjeta bancaria');
        //-- Redirigir.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}

//-- Exportamos la configuración para unificarlo con el resto de rutas.
module.exports = editarNumTarjetaBank;